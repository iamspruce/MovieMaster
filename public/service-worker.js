// service-worker.js

importScripts("indexedDBUtils.js");

const CACHE_NAME = "MOVIE_MASTER_V1";

// List of core assets to cache
const CORE_ASSETS = [
  "/",
  "/imdb-logo.svg",
  "/rotten-tomatoes-logo.svg",
  "/offline",
];

// Helper function to cache core assets
const cacheCoreAssets = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(CORE_ASSETS);
};

// Helper function to handle API requests
const handleApiRequest = async (request) => {
  try {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const responseClone = response.clone();
    const responseData = await responseClone.json();

    // Store only JSON responses in IndexedDB
    await addData(request.url, responseData);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API request failed:", error);
    const cachedResponse = await getData(request.url);

    if (cachedResponse) {
      console.log("Using cached response:", cachedResponse);
      return new Response(JSON.stringify(cachedResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("[]", { status: 200 });
  }
};

// Install event: Cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim();
});

// Fetch event: Network First for API, Cache First for others
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === "https://www.omdbapi.com") {
    event.respondWith(handleApiRequest(request));
  } else {
    event.respondWith(
      caches.match(request).then(
        (cachedResponse) =>
          cachedResponse ||
          fetch(request)
            .then((networkResponse) => {
              const responseClone = networkResponse.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone));
              return networkResponse;
            })
            .catch((err) => {
              if (request.mode === "navigate") {
                return caches
                  .open(CACHE_NAME)
                  .then((cache) => cache.match("/offline"));
              }

              console.log(err, request);
            })
      )
    );
  }
});
