'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const https = require('https');

admin.initializeApp();

/* CONFIG */
const cfg = () => functions.config();

const ARKESEL_API_KEY = () => cfg().arkesel?.api_key || 'T0h3b2RnUUdEZ3RadlBoQU5KT2w';
const SENDER_ID = () => cfg().arkesel?.sender_id || 'AuntieBee';
const ADMIN_PHONE_RAW = () => cfg().admin?.phone || '0558040216';

/* Convert Ghana phone number to international format */
function toIntl(phone) {
  const clean = String(phone).replace(/\s+/g, '').replace(/^\+/, '');

  if (clean.startsWith('233')) return clean;
  if (clean.startsWith('0')) return '233' + clean.slice(1);

  return '233' + clean;
}

/* Send SMS using Arkesel */
function sendArkeselSMS(recipients, message) {
  return new Promise((resolve, reject) => {

    const apiKey = ARKESEL_API_KEY();

    if (!apiKey) {
      console.warn('Arkesel API key not configured');
      return resolve({ skipped: true });
    }

    const body = JSON.stringify({
      sender: SENDER_ID(),
      message: message,
      recipients: Array.isArray(recipients)
        ? recipients.map(toIntl)
        : [toIntl(recipients)]
    });

    const options = {
      hostname: 'sms.arkesel.com',
      path: '/api/v2/sms/send',
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {

      let data = '';

      res.on('data', chunk => data += chunk);

      res.on('end', () => {

        try {

          const parsed = JSON.parse(data);

          if (parsed.status === 'success' || parsed.code === 'ok') {
            resolve(parsed);
          } else {
            reject(new Error(parsed.message || data));
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

/* ATTENDEE REGISTRATION SMS */
exports.onAttendeeRegistered = functions
  .region('us-central1')
  .firestore
  .document('attendees/{docId}')
  .onCreate(async (snap) => {

    const data = snap.data();

    const name = data.name || 'Valued Guest';
    const phone = data.phone;
    const events = data.events || 'the funeral events';

    if (!phone) return null;

    const message =
      `Hello ${name}, your attendance has been registered for ${events}. ` +
      `We look forward to seeing you. God bless you. ` +
      `- Auntie Bee Memorial Family`;

    try {

      await sendArkeselSMS(phone, message);
      console.log("SMS sent to", phone);

    } catch (err) {

      console.error("SMS failed:", err.message);

    }

    return null;

  });

/* CONDOLENCE NOTIFICATION SMS */
exports.onCondolenceSubmitted = functions
  .region('us-central1')
  .firestore
  .document('condolences/{docId}')
  .onCreate(async (snap) => {

    const data = snap.data();

    const adminPhone = ADMIN_PHONE_RAW();

    if (!adminPhone) return null;

    const senderName = data.name || 'Someone';
    const senderRelation = data.relation || 'Well-wisher';
    const preview = (data.message || '').slice(0, 80);

    const message =
      `New condolence from ${senderName} (${senderRelation}): ` +
      `"${preview}${data.message && data.message.length > 80 ? '...' : ''}"`;

    try {

      await sendArkeselSMS(adminPhone, message);
      console.log("Admin notified");

    } catch (err) {

      console.error("Admin SMS failed:", err.message);

    }

    return null;

  });