const self = this;

const staticCacheName = "static-assets-v1";
const dynamicCache = 'dynamic-assets-v1'

const assets = ["/", "/mydata"];

// Install serviceWorker
self.addEventListener("install", (event) => {
  // Waits until serviceWorker finishes to cache the requests(assets),
  // Only then finishes the install process (async...)
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// Listen for the activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    // Delete the old cache versions, except the latest cache
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request)
        // Caching for static values (isnt suitable for MoneyPipe...)
//       .then(response => {
//           return caches.open(dynamicCache).then(cache => {
//               cache.put(event.request.url, response.clone())
//               return response
//           })
//       }).catch(() => caches.match('/pages/fallback.html'))
    }).catch((cacheRes) => cacheRes)
  );
});
