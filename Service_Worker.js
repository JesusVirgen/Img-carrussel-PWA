const CACHE_NAME = "WebDeveloper", urlsToCache = [
    "./",
    "./index.php",
    "./serv.php",
    "./css/index.css",

    "./main.js",

    './manifest.json',
    './regist_serviceWorker.js',
    './Service_Worker.js',

    "./imagenPWA/icon-30x30.png",
    "./imagenPWA/icon-50x50.png",
    "./imagenPWA/icon-80x80.png",
    "./imagenPWA/icon-100x100.png",
    "./imagenPWA/icon-200x200.png",
    "./imagenPWA/icon-300x300.png",
    "./imagenPWA/icon-400x400.png",
    "./imagenPWA/icon-500x500.png",
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
