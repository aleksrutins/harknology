// https://remysharp.com/2016/03/22/the-copy-paste-guide-to-your-first-service-worker
// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheName = 'v1::static';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/offline',
        '/banner.svg',
        '/favicon.ico',
        '/logo.svg',
        '/vercel.svg'
      ]).then(() => self.skipWaiting());
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  try {
      event.respondWith(fetch(event.request));
  } catch(e) {
      event.respondWith(
            // ensure we check the *right* cache to match against
            caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(res => {
                return res || cache.match('/offline');
            });
            })
        );
}
});