import { Coords } from '../types'
import { isCoords } from './IsCoords'

export const isCoordsArray = (coords: unknown): coords is Coords[] => {
  return Array.isArray(coords) && isCoords(coords[0])
}
