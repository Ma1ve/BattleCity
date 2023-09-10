const CACHE_NAME = 'tanks-cache-v1'
const MAX_AGE = 3600
const resources = ['/']

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(resources))
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    // ищем запрошенный ресурс
    caches.match(event.request).then(cachedResponse => {
      let lastModified
      const fetchRequest = event.request.clone()

      // если ресурса нет в кэше
      if (!cachedResponse) {
        return fetch(fetchRequest).then(response => {
          const responseClone = response.clone()

          updateCache(event.request, responseClone)
          return response
        })
      }

      // если ресурс есть в кэше
      lastModified = new Date(cachedResponse.headers.get('last-modified'))
      // если ресурс устаревший
      if (lastModified && Date.now() - lastModified.getTime() > MAX_AGE) {
        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status >= 500) {
              return cachedResponse
            }
            updateCache(event.request, response.clone())
            return response
          })
          .catch(() => cachedResponse)
      }

      return cachedResponse
    })
  )
})

const updateCache = (req, res) => {
  caches.open(CACHE_NAME).then(cache => {
    cache.put(req, res)
  })
}

self.addEventListener('activate', function (event) {
  const cacheNames = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheNames.indexOf(key) === -1) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})
