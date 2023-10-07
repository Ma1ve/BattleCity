import { SceneTankBlocks } from '../types'
import { isCoords } from './IsCoords'

export const isSceneTankBlock = (
  blockData: unknown
): blockData is SceneTankBlocks => {
  return (
    typeof blockData === 'object' &&
    !Array.isArray(blockData) &&
    blockData !== null &&
    Object.values(blockData).every(isCoords)
  )
}
