import {
  Stage,
  SceneBlockPositions,
  TankType,
  TankColor,
  MovementDirection,
  TankOwner,
  Coords,
  DirectionKey,
} from '../shared/types'
import { gameUI } from './GameUI'
import {
  blockHeight,
  blockHeightQuarter,
  blockWidth,
  blockWidthQuarter,
  canvasHeight,
  canvasWidth,
  TankControlKeys,
} from '../shared/config/gameConstants'
import { Tank } from './Tank'
import { Bullet } from './Bullet'
import { isCoordsArray } from '../shared/utils/isCoordsArray'

export class Scene {
  public sceneBlocks: SceneBlockPositions
  public ctx: CanvasRenderingContext2D
  public tanks: Record<TankOwner, Tank<TankOwner>[]> = { player: [], enemy: [] }
  public bullets: Record<string, Bullet>

  constructor({
    ctx,
    blockPositions,
  }: {
    ctx: CanvasRenderingContext2D
    blockPositions: SceneBlockPositions
  }) {
    this.sceneBlocks = blockPositions
    this.ctx = ctx
    this.bullets = {}

    const player = new Tank<'player'>({
      tankType: TankType.basic,
      tankColor: TankColor.yellow,
      initialDirection: MovementDirection.up,
      initialPosition: { x: 4 * 32 * 1.5, y: 12 * 32 * 1.5 },
      controlKeys: TankControlKeys.movement,
      fireKey: TankControlKeys.fire,
      sceneBlockPositions: this.sceneBlocks,
      onFire: ({
        tankPosition,
        tankDirection,
        tankId,
      }: {
        tankPosition: Coords
        tankDirection: DirectionKey
        tankId: string
      }) => {
        if (this.bullets[tankId]) {
          return
        }
        this.bullets[tankId] = new Bullet({ tankPosition, tankDirection })
      },
    })

    this.tanks.player = [player]
  }

  public render() {
    Object.entries(this.sceneBlocks).forEach(([key, coords]) => {
      if (!Array.isArray(coords)) {
        this.drawSceneImage({
          ...coords,
          stageItemName: key as keyof Stage,
        })
        return
      }

      coords.forEach(subCoords => {
        this.drawSceneImage({
          ...subCoords,
          stageItemName: key as keyof Stage,
        })
      })
    })

    Object.values(this.tanks).forEach(tankArray => {
      tankArray.forEach(tank => {
        const { spritePosition, canvasPosition } = tank.render()
        gameUI.drawImage({ ctx: this.ctx, spritePosition, canvasPosition })
      })
    })

    const bullets = { ...this.bullets }

    Object.entries(bullets).forEach(([tankId, bullet]) => {
      const { sprite, position, direction } = bullet.render()
      gameUI.drawImage({
        ctx: this.ctx,
        spritePosition: sprite,
        canvasPosition: { ...position },
      })

      const { sceneBlockKey, intersectedBlockCoords, hasIntersection } =
        gameUI.checkSceneBlockIntersection({
          movedItemCoords: position,
          sceneBlockPositions: this.sceneBlocks,
          movementDirection: direction,
          movedItemSize: {
            w: blockWidthQuarter,
            h: blockHeightQuarter,
          },
        })

      if (
        hasIntersection ||
        position.x < 0 ||
        position.y < 0 ||
        position.x > canvasWidth ||
        position.y > canvasHeight
      ) {
        delete this.bullets[tankId]
      }

      if (sceneBlockKey && intersectedBlockCoords) {
        let searchedSceneBlock = this.sceneBlocks[sceneBlockKey]

        if (isCoordsArray(searchedSceneBlock)) {
          searchedSceneBlock = searchedSceneBlock.filter(
            el => el !== intersectedBlockCoords
          ) as Coords[]
          ;(this.sceneBlocks[sceneBlockKey] as Coords[]) = searchedSceneBlock
          return
        }

        delete this.sceneBlocks[sceneBlockKey]
      }
    })
  }

  private getItemPosition({
    spritePosition,
    isXPos,
  }: {
    spritePosition: number
    isXPos: boolean
  }) {
    return spritePosition * (isXPos ? blockWidth : blockHeight)
  }

  private drawSceneImage({
    x,
    y,
    stageItemName,
  }: {
    x: number
    y: number
    stageItemName: keyof Stage
  }) {
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: gameUI.images.stage[stageItemName],
      canvasPosition: {
        x: this.getItemPosition({ spritePosition: x, isXPos: true }),
        y: this.getItemPosition({ spritePosition: y, isXPos: false }),
      },
    })
  }

  public getSceneBlocks() {
    return this.sceneBlocks
  }
}
