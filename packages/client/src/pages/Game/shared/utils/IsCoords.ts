import { Coords } from '../types'

export const isCoords = (coords: unknown): coords is Coords => {
  return (
    typeof coords === 'object' &&
    !Array.isArray(coords) &&
    coords !== null &&
    Object.keys(coords).length === 2 &&
    'x' in coords &&
    typeof coords?.x === 'number' &&
    'y' in coords &&
    typeof coords?.y === 'number'
  )
}
