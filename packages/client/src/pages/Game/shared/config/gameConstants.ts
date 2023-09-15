import { MovementDirection } from '../types'

export const canvasItemScale = 1.5
export const frameInterval = 1000 / 60 // 16.67 ms
export const spriteHeight = 32
export const spriteWidth = 32
export const columns = 13
export const rows = 13
export const tankSpeed = {
  basic: 1,
  fast: 2,
  powerful: 1,
  armored: 1,
}
export const bulletSpeed = 12
export const blockWidth = spriteWidth * canvasItemScale
export const blockHeight = spriteWidth * canvasItemScale
export const blockHeightQuarter = blockHeight / 4
export const blockWidthQuarter = blockWidth / 4
export const canvasWidth = columns * blockWidth
export const canvasHeight = columns * blockHeight

export const TankControlKeys = {
  movement: {
    [MovementDirection.up]: 'KeyW',
    [MovementDirection.down]: 'KeyS',
    [MovementDirection.left]: 'KeyA',
    [MovementDirection.right]: 'KeyD',
  },
  fire: 'Space',
}
