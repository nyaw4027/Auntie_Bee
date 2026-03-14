/**
 * ═══════════════════════════════════════════════════════════════
 *  Auntie Bee Memorial — Firebase Cloud Functions
 *  SMS powered by Arkesel (https://sms.arkesel.com)
 * ═══════════════════════════════════════════════════════════════
 *
 *  SETUP — run these commands once in your terminal before deploying:
 *
 *  firebase functions:config:set \
 *    arkesel.api_key="YOUR_ARKESEL_API_KEY" \
 *    arkesel.sender_id="AuntieBee" \
 *    admin.phone="0558040216"
 *
 *  Then deploy:
 *    firebase deploy --only functions
 *
 *  Find your Arkesel API key at:
 *    https://sms.arkesel.com/user/sms-api/info
 *
 *  SENDER_ID rules:
 *    - Max 11 characters, no spaces
 *    - Must be registered/approved in your Arkesel dashboard
 *    - Suggested: "AuntieBee" or "AgnesPomaa"
 *
 *  ADMIN_PHONE:
 *    - The family phone number that receives condolence alerts
 *    - Use the format 0XXXXXXXXX (local Ghanaian format)
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

const functions = require('firebase-functions');
const admin     = require('firebase-admin');
const https     = require('https');

admin.initializeApp();

/* ── Config ───────────────────────────────────────────────────── */
const cfg = () => functions.config();

const ARKESEL_API_KEY = () => cfg().arkesel?.api_key  || '';
const SENDER_ID       = () => cfg().arkesel?.sender_id || 'AuntieBee';
const ADMIN_PHONE_RAW = () => cfg().admin?.phone       || '';

/* Convert local Ghanaian number (0XXXXXXXXX) → international (233XXXXXXXXX) */
function toIntl(phone) {
  const clean = String(phone).replace(/\s+/g, '').replace(/^\+/, '');
  if (clean.startsWith('233')) return clean;
  if (clean.startsWith('0'))   return '233' + clean.slice(1);
  return '233' + clean;
}

/* ── Arkesel SMS helper ───────────────────────────────────────── */
function sendArkeselSMS(recipients, message) {
  return new Promise((resolve, reject) => {
    const apiKey = ARKESEL_API_KEY();

    if (!apiKey) {
      console.warn('[SMS] Arkesel API key not configured. Skipping send.');
      return resolve({ skipped: true });
    }

    // Arkesel v2 API
    const body = JSON.stringify({
      sender:     SENDER_ID(),
      message:    message,
      recipients: Array.isArray(recipients)
                    ? recipients.map(toIntl)
                    : [toIntl(recipients)]
    });

    const options = {
      hostname: 'sms.arkesel.com',
      path:     '/api/v2/sms/send',
      method:   'POST',
      headers: {
        'api-key':       apiKey,
        'Content-Type':  'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('[SMS] Arkesel response:', JSON.stringify(parsed));
          if (parsed.status === 'success' || parsed.code === 'ok') {
            resolve(parsed);
          } else {
            reject(new Error(`Arkesel error: ${parsed.message || data}`));
          }
        } catch (e) {
          reject(new Error('Failed to parse Arkesel response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/* ══════════════════════════════════════════════════════════════
   FUNCTION 1: onAttendeeRegistered
   Triggers when a new document is created in the "attendees"
   Firestore collection. Sends an SMS confirmation to the
   person who just registered.
══════════════════════════════════════════════════════════════ */
exports.onAttendeeRegistered = functions
  .region('us-central1')
  .firestore
  .document('attendees/{docId}')
  .onCreate(async (snap) => {
    const data = snap.data();

    const name   = data.name   || 'Valued Guest';
    const phone  = data.phone;
    const events = data.events || 'the funeral events';

    if (!phone) {
      console.warn('[onAttendeeRegistered] No phone number found. Skipping SMS.');
      return null;
    }

    const message =
      `Hello ${name}, your attendance has been registered for: ${events}. ` +
      `We look forward to seeing you. God bless you. ` +
      `– Auntie Bee Memorial Family`;

    try {
      await sendArkeselSMS(phone, message);
      console.log(`[onAttendeeRegistered] SMS sent to ${phone}`);
    } catch (err) {
      console.error('[onAttendeeRegistered] SMS failed:', err.message);
    }

    return null;
  });

/* ══════════════════════════════════════════════════════════════
   FUNCTION 2: onCondolenceSubmitted
   Triggers when a new document is created in the "condolences"
   Firestore collection. Notifies the family admin phone that
   a new condolence message has been received.
══════════════════════════════════════════════════════════════ */
exports.onCondolenceSubmitted = functions
  .region('us-central1')
  .firestore
  .document('condolences/{docId}')
  .onCreate(async (snap) => {
    const data       = snap.data();
    const adminPhone = ADMIN_PHONE_RAW();

    if (!adminPhone) {
      console.warn('[onCondolenceSubmitted] Admin phone not configured. Skipping SMS.');
      return null;
    }

    const senderName    = data.name     || 'Someone';
    const senderRelation = data.relation || 'Well-wisher';
    const preview       = (data.message || '').slice(0, 80);

    const message =
      `New condolence from ${senderName} (${senderRelation}): ` +
      `"${preview}${data.message && data.message.length > 80 ? '…' : ''}" ` +
      `– View all messages at the Auntie Bee memorial site.`;

    try {
      await sendArkeselSMS(adminPhone, message);
      console.log(`[onCondolenceSubmitted] Admin notified at ${adminPhone}`);
    } catch (err) {
      console.error('[onCondolenceSubmitted] Admin SMS failed:', err.message);
    }

    return null;
  });