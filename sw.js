/* Electrical Tools combined PWA service worker. Cache names are app-scoped. */
'use strict';
const CACHE_PREFIX = 'electrical-tools-combined-';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const APP_FILES = [
  './',
  './index.html',
  './electrical-tools.html',
  './voltage-drop.html',
  './app.html',
  './VD_Tool_RevAE.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(request).then(response => {
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {});
    }
    return response;
  }).catch(() => caches.match(request, {ignoreSearch: true}).then(cached => cached || (request.mode === 'navigate' ? caches.match('./index.html') : undefined))));
});
