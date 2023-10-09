import { Coords } from '../types'

/* export const isCoords = (coords: unknown): coords is Coords => {
  return (
    typeof coords === 'object' &&
    !Array.isArray(coords) &&
    coords !== null &&
    Object.keys(coords).length === 2 &&
    coords.hasOwnProperty('x') &&
    coords.hasOwnProperty('y') &&
    typeof coords?.x === 'number' &&
    typeof coords?.y === 'number'
  )
} */

export const isCoords = (coords: unknown): coords is Coords => {
  if (typeof coords === 'object' && !Array.isArray(coords) && coords !== null) {
    const { x, y } = coords as Coords // Приводим coords к типу Coords
    return typeof x === 'number' && typeof y === 'number'
  }
  return false
}
