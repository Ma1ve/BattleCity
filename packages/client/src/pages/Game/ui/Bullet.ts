import { gameUI } from './GameUI'
import {
  blockHeight,
  blockWidth,
  blockWidthQuoter,
  bulletSpeed,
  spriteHeight,
  spriteWidth,
} from '../shared/config/gameConstants'
import { Coords, DirectionKey, MovementDirection } from '../shared/types'

export interface IBulletProps {
  tankPosition: Coords
  tankDirection: DirectionKey
}

export class Bullet {
  public position
  public direction // up left right down
  public sprite
  constructor({ tankPosition, tankDirection }: IBulletProps) {
    this.direction = tankDirection

    let posX
    let posY

    const halfTankWidth = blockWidth / 2
    const halfTankHeight = blockHeight / 2
    const halfBulletWidth = blockWidthQuoter / 2
    const halfBulletHeight = blockWidthQuoter / 2

    switch (tankDirection) {
      case 'up':
        posX = tankPosition.x + halfTankWidth - halfBulletWidth // center of a bullet should be in center of a tank
        posY = tankPosition.y
        break
      case 'right':
        posX = tankPosition.x + spriteWidth
        posY = tankPosition.y + halfTankHeight - halfBulletHeight
        break
      case 'left':
        posX = tankPosition.x
        posY = tankPosition.y + halfTankHeight - halfBulletHeight
        break
      case 'down':
        posX = tankPosition.x + halfTankWidth - halfBulletWidth // center of a bullet should be in center of a tank
        posY = tankPosition.y + spriteHeight
        break
    }

    this.position = { x: posX, y: posY }

    this.sprite = gameUI.images.bullet[this.direction]
  }

  private move() {
    let { x: newX, y: newY } = this.position

    // do not move tank in case it have not the same direction (just rotate)
    switch (this.direction) {
      case MovementDirection.up: {
        newY = this.position.y - bulletSpeed
        break
      }
      case MovementDirection.right: {
        newX = this.position.x + bulletSpeed
        break
      }
      case MovementDirection.down: {
        newY = this.position.y + bulletSpeed
        break
      }
      case MovementDirection.left: {
        newX = this.position.x - bulletSpeed
        break
      }
    }

    this.position.y = newY
    this.position.x = newX
  }

  public render() {
    this.move()
    return {
      sprite: this.sprite,
      position: this.position,
      direction: this.direction,
    }
  }
}