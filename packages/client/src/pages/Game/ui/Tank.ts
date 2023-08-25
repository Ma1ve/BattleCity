import { gameUI } from './GameUI'
import {
  blockHeight,
  blockWidth,
  canvasHeight,
  canvasWidth,
  tankSpeed,
} from '../shared/config/gameConstants'
import {
  Coords,
  EnemyTankColor,
  MovementDirection,
  PlayerTankColor,
  TankOwner,
  TankType,
  SceneBlockPositions,
  ControlKeys,
} from '../shared/types'

interface ITankProps<O extends TankOwner> {
  initialPosition: Coords
  tankColor: O extends 'player' ? PlayerTankColor : EnemyTankColor
  tankType: TankType
  controlKeys?: ControlKeys
  initialDirection: MovementDirection
  sceneBlockPositions: SceneBlockPositions
}

type TankDirectionKey = keyof typeof MovementDirection
type TankTypeKey = keyof typeof TankType

export class Tank<O extends TankOwner> {
  initialPosition = { x: 0, y: 0 }
  position = { x: 0, y: 0 }
  activeSpriteIndex = 0 // 0 || 1 tank sprites animation
  tankColor
  controlKeys
  tankVariants
  sprites // array of 2 tank sprites
  direction: TankDirectionKey // up left right down
  tankType: TankTypeKey //basic fast powerful armored
  sceneBlockPositions
  keyPressSubscription?: (event: KeyboardEvent) => void

  constructor({
    initialPosition,
    initialDirection,
    tankColor,
    tankType,
    controlKeys,
    sceneBlockPositions,
  }: ITankProps<O>) {
    this.tankColor = tankColor
    if (controlKeys) {
      this.controlKeys = controlKeys
    }

    this.initialPosition = initialPosition

    this.position = { ...this.initialPosition }

    this.tankVariants = gameUI.images.tanks[tankColor]

    this.direction = initialDirection

    this.tankType = tankType

    this.sprites = this.tankVariants[tankType][this.direction]

    this.sceneBlockPositions = sceneBlockPositions

    this.subscribe()
  }

  move(direction: TankDirectionKey) {
    let { x: newX, y: newY } = this.position

    // do not move tank in case it have not the same direction (just rotate)
    if (direction === this.direction) {
      switch (direction) {
        case 'up': {
          newY = this.position.y - tankSpeed[this.tankType]
          break
        }
        case 'right': {
          newX = this.position.x + tankSpeed[this.tankType]
          break
        }
        case 'down': {
          newY = this.position.y + tankSpeed[this.tankType]
          break
        }
        case 'left': {
          newX = this.position.x - tankSpeed[this.tankType]
          break
        }
      }
    }

    this.direction = direction

    if (newX + blockWidth > canvasWidth) {
      newX = canvasWidth - blockWidth
    }

    if (newY + blockHeight > canvasHeight) {
      newY = canvasHeight - blockHeight
    }

    if (newX < 0) {
      newX = 0
    }

    if (newY < 0) {
      newY = 0
    }

    const hasIntersection = (blockPosition: Coords) => {
      return gameUI.checkIntersection({
        movedItemCoords: { x: newX, y: newY },
        blockCoords: blockPosition,
        movementDirection: direction,
      })
    }

    const hasBlocksIntersection = () => {
      return Object.values(this.sceneBlockPositions).some(blockPositionData => {
        if (Array.isArray(blockPositionData)) {
          return blockPositionData.some(hasIntersection)
        }
        return hasIntersection(blockPositionData)
      })
    }

    if (!hasBlocksIntersection()) {
      this.position.y = newY
      this.position.x = newX
    }

    this.activeSpriteIndex = this.activeSpriteIndex === 0 ? 1 : 0

    this.sprites = this.tankVariants[this.tankType][direction]
  }

  setDirection(newDirection: MovementDirection) {
    this.direction = newDirection
  }

  setType(newTankType: TankType) {
    this.tankType = newTankType
  }

  subscribe() {
    if (!this.controlKeys) {
      return
    }

    this.keyPressSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      for (const k in this.controlKeys) {
        if (this.controlKeys[k as MovementDirection] === keyCode) {
          this.move(k as TankDirectionKey)
          break
        }
      }
    }

    document.addEventListener('keydown', this.keyPressSubscription)
  }

  unsubscribe() {
    if (!this.keyPressSubscription) {
      return
    }
    document.removeEventListener('keypress', this.keyPressSubscription)
  }

  getSpriteForRender() {
    return {
      spritePosition: this.sprites[this.activeSpriteIndex],
      canvasPosition: this.position,
    }
  }
}
