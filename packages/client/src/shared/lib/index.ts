/** Возвращает новый объект исключая переданные поля.
 * @prop obj Объект у которого нужно удалить ключи.
 * @prop keys Массив ключей.
 */
export const omitObject = (obj: Record<string, any>, keys: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(e => !keys.includes(e[0])))
