import { Coords } from '../types'

export const isCoordsArray = (
  coords: Coords | Coords[]
): coords is Coords[] => {
  return Array.isArray(coords)
}
