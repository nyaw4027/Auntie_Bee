'use strict';

const CACHE_NAME    = 'auntie-bee-v4';
const OFFLINE_URL   = '/index.html';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/install.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png'
];

/* ── INSTALL: cache static assets ─────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .catch(err => console.warn('[SW] Precache skipped some assets:', err))
  );
  self.skipWaiting();
});

/* ── ACTIVATE: clean old caches ───────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── FETCH: network-first, fallback to cache ──────────────── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok && event.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(r => r || caches.match(OFFLINE_URL))
      )
  );
});

/* ── BACKGROUND SYNC ──────────────────────────────────────── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-condolences') {
    event.waitUntil(syncCondolences());
  }
});

async function syncCondolences() {
  // Placeholder — syncs any queued condolences when back online
  console.log('[SW] Background sync: condolences');
}

/* ── PERIODIC SYNC ────────────────────────────────────────── */
self.addEventListener('periodicsync', event => {
  if (event.tag === 'refresh-content') {
    event.waitUntil(refreshContent());
  }
});

async function refreshContent() {
  const cache = await caches.open(CACHE_NAME);
  await cache.add('/');
  console.log('[SW] Periodic sync: content refreshed');
}

/* ── PUSH NOTIFICATIONS ───────────────────────────────────── */
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title   = data.title   || 'Auntie Bee Memorial';
  const options = {
    body:    data.body    || 'New update from the Auntie Bee Memorial site.',
    icon:    data.icon    || '/icons/icon-192.png',
    badge:   data.badge   || '/icons/icon-192.png',
    data:    data.url     || '/',
    actions: [{ action: 'open', title: 'Open App' }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

/* ── NOTIFICATION CLICK ───────────────────────────────────── */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow(event.notification.data || '/');
    })
  );
});