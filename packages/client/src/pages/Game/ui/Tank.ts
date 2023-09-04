import { v4 as uuidv4 } from 'uuid'
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
  DirectionKey,
} from '../shared/types'

interface ITankProps<O extends TankOwner> {
  initialPosition: Coords
  tankColor: O extends 'player' ? PlayerTankColor : EnemyTankColor
  tankType: TankType
  controlKeys?: ControlKeys
  initialDirection: MovementDirection
  fireKey: string
  sceneBlockPositions: SceneBlockPositions
  onFire: ({
    tankPosition,
    tankDirection,
    tankId,
  }: {
    tankPosition: Coords
    tankDirection: DirectionKey
    tankId: string
  }) => void
}

type TankTypeKey = keyof typeof TankType

export class Tank<O extends TankOwner> {
  public initialPosition = { x: 0, y: 0 }
  public position = { x: 0, y: 0 }
  public activeSpriteIndex = 0 // 0 || 1 tank sprites animation
  public tankColor
  public controlKeys
  public tankVariants
  public sprites // array of 2 tank sprites
  public direction: DirectionKey // up left right down
  public tankType: TankTypeKey //basic fast powerful armored
  public sceneBlockPositions
  public tankId
  public fireKey
  public onFire
  private keyPressSubscription?: (event: KeyboardEvent) => void

  constructor({
    initialPosition,
    initialDirection,
    tankColor,
    tankType,
    controlKeys,
    fireKey,
    onFire,
    sceneBlockPositions,
  }: ITankProps<O>) {
    this.tankColor = tankColor
    if (controlKeys) {
      this.controlKeys = controlKeys
    }

    this.initialPosition = initialPosition

    this.tankId = uuidv4()

    this.position = { ...this.initialPosition }

    this.tankVariants = gameUI.images.tanks[tankColor]

    this.direction = initialDirection

    this.fireKey = fireKey

    this.onFire = onFire

    this.tankType = tankType

    this.sprites = this.tankVariants[tankType][this.direction]

    this.sceneBlockPositions = sceneBlockPositions

    this.subscribe()
  }

  private move(direction: DirectionKey) {
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

    const hasIntersection = gameUI.checkSceneBlockIntersection({
      movedItemCoords: { x: newX, y: newY },
      sceneBlockPositions: this.sceneBlockPositions,
      movementDirection: direction,
    })

    if (!hasIntersection) {
      this.position.y = newY
      this.position.x = newX
    }

    this.activeSpriteIndex = this.activeSpriteIndex === 0 ? 1 : 0

    this.sprites = this.tankVariants[this.tankType][direction]
  }

  private subscribe() {
    if (!this.controlKeys) {
      return
    }

    this.keyPressSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      if (keyCode === this.fireKey) {
        this.onFire({
          tankId: this.tankId,
          tankDirection: this.direction,
          tankPosition: this.position,
        })
      }

      for (const direction in this.controlKeys) {
        if (this.controlKeys[direction as MovementDirection] === keyCode) {
          this.move(direction as DirectionKey)
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
    document.removeEventListener('keydown', this.keyPressSubscription)
  }

  public getSpriteForRender() {
    return {
      spritePosition: this.sprites[this.activeSpriteIndex],
      canvasPosition: this.position,
    }
  }
}
