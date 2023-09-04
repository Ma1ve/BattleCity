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
  blockHeightQuoter,
  blockWidth,
  blockWidthQuoter,
} from '../shared/config/gameConstants'
import { Tank } from './Tank'
import { Bullet } from './Bullet'

export class Scene {
  public sceneBlocks
  public ctx
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
      controlKeys: {
        //TODO: values (e.g. KeyW) should be replaced with keys from redux (user tank control settings)
        [MovementDirection.up]: 'KeyW',
        [MovementDirection.down]: 'KeyS',
        [MovementDirection.left]: 'KeyA',
        [MovementDirection.right]: 'KeyD',
      },
      fireKey: 'Space',
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
        gameUI.drawImage({ ctx: this.ctx, ...tank.getSpriteForRender() })
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

      if (
        gameUI.checkSceneBlockIntersection({
          movedItemCoords: position,
          sceneBlockPositions: this.sceneBlocks,
          movementDirection: direction,
          movedItemSize: {
            w: blockWidthQuoter * 1.5,
            h: blockHeightQuoter * 1.5,
          },
        })
      ) {
        delete this.bullets[tankId]
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
