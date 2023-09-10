/** Возвращает новый объект исключая переданные поля.
 * @prop obj Объект у которого нужно удалить ключи.
 * @prop keys Массив ключей.
 */
export const omitObject = (obj: Record<string, any>, keys: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(e => !keys.includes(e[0])))

/** Функция инициирующая serviceWorker. */
export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registration successful: ', registration.scope)
        })
        .catch((error: string) => {
          console.log('SW registration failed: ', error)
        })
    })
  }
}
