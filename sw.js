const CACHE_NAME = "tirth-portfolio-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/809-0.css",
  "/1199-810.css",
  "/manifest.json",
  "/res/Website%20Logo.png",
  "/res/home-w.svg",
  "/res/home-b.svg",
  "/res/summary-w.svg",
  "/res/summary-b.svg",
  "/res/projects-w.svg",
  "/res/projects-b.svg",
  "/res/skills-w.svg",
  "/res/skills-b.svg",
  "/res/links-w.svg",
  "/res/links-b.svg",
  "/res/mail.svg",
  "/res/phone.svg",
  "/res/linkedin.svg",
  "/res/location.svg",
  "/res/arrow.svg",
];

// Install — cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network-first strategy with cache fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache the fresh response
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request);
      })
  );
});
