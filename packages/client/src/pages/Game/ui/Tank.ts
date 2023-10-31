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
  ControlKeys,
  DirectionKey,
  SceneBlocks,
  CoordsWithSize,
  OnFire,
} from '../shared/types'
import { SpriteAnimator } from './SpriteAnimator'

interface ITankProps<O extends TankOwner> {
  initialPosition: Coords
  tankColor: O extends 'player' ? PlayerTankColor : EnemyTankColor
  tankType: TankType
  controlKeys?: ControlKeys
  initialDirection: MovementDirection
  fireKey?: string
  sceneBlockPositions: SceneBlocks
  onFire: OnFire
  duration?: number
}

type TankTypeKey = keyof typeof TankType

export class Tank<O extends TankOwner> {
  public initialPosition: Coords = { x: 0, y: 0 }
  public position: Coords = { x: 0, y: 0 }
  public activeSpriteIndex = 0 // 0 || 1 tank sprites animation
  public tankColor: PlayerTankColor | EnemyTankColor
  public controlKeys?: ControlKeys
  public tankVariants: Record<
    TankType,
    Record<MovementDirection, [CoordsWithSize, CoordsWithSize]>
  >
  public sprites: [CoordsWithSize, CoordsWithSize] // array of 2 tank sprites
  public direction: DirectionKey
  public directionKeyPressed?: DirectionKey
  public tankType: TankTypeKey
  public sceneBlockPositions: SceneBlocks
  public tankId: string
  public fireKey?: string
  public onFire: OnFire
  private keyDownSubscription?: (event: KeyboardEvent) => void
  private keyUpSubscription?: (event: KeyboardEvent) => void
  private spriteAnimator = new SpriteAnimator()

  //Enemy
  public moveEnemyPositionAnimate
  public choseRandomMovenemt
  public movementTank: Record<number, 'up' | 'right' | 'down' | 'left'>
  public duration

  constructor({
    initialPosition,
    initialDirection,
    tankColor,
    tankType,
    controlKeys,
    fireKey,
    onFire,
    sceneBlockPositions,
    duration,
  }: ITankProps<O>) {
    this.tankColor = tankColor
    if (controlKeys) {
      this.controlKeys = controlKeys
    }

    if (fireKey) {
      this.fireKey = fireKey
    }

    this.onFire = onFire

    this.initialPosition = initialPosition

    this.tankId = uuidv4()

    this.position = { ...this.initialPosition }

    this.tankVariants = gameUI.images.tanks[tankColor]

    this.direction = initialDirection

    this.tankType = tankType

    this.sprites = this.tankVariants[tankType][this.direction]

    this.sceneBlockPositions = sceneBlockPositions

    // Enemy

    this.duration = duration

    this.moveEnemyPositionAnimate = 0

    this.choseRandomMovenemt = 0

    this.movementTank = {
      0: 'up',
      1: 'left',
      2: 'down',
      3: 'right',
    }

    this.subscribe()
  }

  private move() {
    let { x: newX, y: newY } = this.position

    if (!this.directionKeyPressed) {
      return
    }

    if (this.directionKeyPressed === this.direction) {
      // do not move tank in case it have not the same direction (just rotate)
      switch (this.direction) {
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

    this.direction = this.directionKeyPressed

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

    const { hasIntersection } = gameUI.checkSceneBlockIntersection({
      movedItemCoords: { x: newX, y: newY },
      sceneBlockPositions: this.sceneBlockPositions,
      movementDirection: this.direction,
    })

    if (!hasIntersection) {
      this.position.y = newY
      this.position.x = newX
    }

    this.activeSpriteIndex = this.activeSpriteIndex === 0 ? 1 : 0

    this.sprites = this.tankVariants[this.tankType][this.direction]
  }

  private subscribe() {
    if (!this.controlKeys) {
      return
    }

    this.keyDownSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      if (keyCode === this.fireKey) {
        if (this.onFire) {
          this.onFire({
            tankId: this.tankId,
            tankDirection: this.direction,
            tankPosition: this.position,
          })
        }
      }

      for (const direction in this.controlKeys) {
        if (this.controlKeys[direction as MovementDirection] === keyCode) {
          this.directionKeyPressed = direction as DirectionKey
          break
        }
      }
    }

    this.keyUpSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      for (const direction in this.controlKeys) {
        if (this.controlKeys[direction as MovementDirection] === keyCode) {
          if (direction === this.directionKeyPressed) {
            this.directionKeyPressed = undefined
          }
          break
        }
      }
    }

    document.addEventListener('keydown', this.keyDownSubscription)
    document.addEventListener('keyup', this.keyUpSubscription)
  }

  public unsubscribe() {
    if (this.keyDownSubscription && this.keyUpSubscription) {
      document.removeEventListener('keydown', this.keyDownSubscription)
      document.removeEventListener('keyup', this.keyUpSubscription)
    }
  }

  public getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  private moveEnemyTank() {
    let { x: newX, y: newY } = this.position

    if (this.moveEnemyPositionAnimate === this.duration) {
      this.choseRandomMovenemt = this.getRandomNumber(4, 0)

      this.moveEnemyPositionAnimate = 0
    } else {
      this.moveEnemyPositionAnimate++
    }

    // Здесь изменяем направление перед стрельбой
    this.direction = this.movementTank[this.choseRandomMovenemt]

    // Вызываем стрельбу после изменения направления

    this.onFire({
      tankId: this.tankId,
      tankDirection: this.direction,
      tankPosition: this.position,
    })

    this.activeSpriteIndex = this.activeSpriteIndex === 0 ? 1 : 0

    switch (this.direction) {
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

    const { hasIntersection } = gameUI.checkSceneBlockIntersection({
      movedItemCoords: { x: newX, y: newY },
      sceneBlockPositions: this.sceneBlockPositions,
      movementDirection: this.direction,
    })

    if (!hasIntersection) {
      this.position.y = newY
      this.position.x = newX
    }

    this.sprites = this.tankVariants[this.tankType][this.direction]
  }

  public render() {
    if (this.tankColor === 'yellow') {
      this.move()

      return {
        spritePosition: this.spriteAnimator.animate({
          frameCount: 4,
          sprites: this.sprites,
          disabled: !this.directionKeyPressed,
        }),
        canvasPosition: this.position,
      }
    } else {
      this.moveEnemyTank()

      return {
        spritePosition: this.spriteAnimator.animate({
          frameCount: 4,
          sprites: this.sprites,
        }),
        canvasPosition: this.position,
      }
    }
  }
}
