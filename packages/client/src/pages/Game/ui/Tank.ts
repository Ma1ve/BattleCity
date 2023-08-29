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
  public initialPosition = { x: 0, y: 0 }
  public position = { x: 0, y: 0 }
  public activeSpriteIndex = 0 // 0 || 1 tank sprites animation
  public tankColor
  public controlKeys
  public tankVariants
  public sprites // array of 2 tank sprites
  public direction: TankDirectionKey // up left right down
  public tankType: TankTypeKey //basic fast powerful armored
  public sceneBlockPositions
  private keyPressSubscription?: (event: KeyboardEvent) => void

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

  private move(direction: TankDirectionKey) {
    let { x: newX, y: newY } = this.position

    // do not move tank in case it have not the same direction (just rotate)
    if (direction === this.direction) {
      switch (direction) {
        case MovementDirection.up: {
          newY = this.position.y - tankSpeed[this.tankType]
          break
        }
        case MovementDirection.right: {
          newX = this.position.x + tankSpeed[this.tankType]
          break
        }
        case MovementDirection.down: {
          newY = this.position.y + tankSpeed[this.tankType]
          break
        }
        case MovementDirection.left: {
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

  public setDirection(newDirection: MovementDirection) {
    this.direction = newDirection
  }

  public setType(newTankType: TankType) {
    this.tankType = newTankType
  }

  private subscribe() {
    if (!this.controlKeys) {
      return
    }

    this.keyPressSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      for (const direction in this.controlKeys) {
        if (this.controlKeys[direction as MovementDirection] === keyCode) {
          this.move(direction as TankDirectionKey)
          break
        }
      }
    }

    document.addEventListener('keydown', this.keyPressSubscription)
  }

  public unsubscribe() {
    if (!this.keyPressSubscription) {
      return
    }
    document.removeEventListener('keypress', this.keyPressSubscription)
  }

  public getSpriteForRender() {
    return {
      spritePosition: this.sprites[this.activeSpriteIndex],
      canvasPosition: this.position,
    }
  }
}
