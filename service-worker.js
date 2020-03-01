const CACHE_NAME = "universitypwa";
var urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/nav.html",
    "/pages/home.html",
    "/pages/casestudy.html",
    "/pages/news.html",
    "/pages/blog.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/ug.jpg",
    "/gunadarma.png",
    "/vclass.jpg",
    "/taman.jpg",
     "/baak.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME})
        .then(function(response){
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("active", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cachesNames.map(function (cacheName) {
                    if(cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});