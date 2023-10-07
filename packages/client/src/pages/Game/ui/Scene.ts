import {
  Stage,
  SceneConfig,
  TankType,
  TankColor,
  MovementDirection,
  TankOwner,
  Coords,
  OnFireParams,
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
import { SpriteAnimator } from './SpriteAnimator'
import { v4 as uuidv4 } from 'uuid'
import { GameController } from '../controllers/GameController'

export class Scene {
  public sceneConfig: SceneConfig
  public ctx: CanvasRenderingContext2D
  public tanks: Record<TankOwner, Tank<TankOwner>[]> = { player: [], enemy: [] }
  public bullets: Record<string, Bullet>
  public gameController: GameController
  public explosions: { [k in string]: { coords: Coords; draw: () => void } } =
    {}

  constructor({
    ctx,
    sceneConfig,
  }: {
    ctx: CanvasRenderingContext2D
    sceneConfig: SceneConfig
  }) {
    this.sceneConfig = sceneConfig
    this.ctx = ctx
    this.bullets = {}
    this.gameController = new GameController(ctx)

    const player = new Tank<'player'>({
      tankType: TankType.basic,
      tankColor: TankColor.yellow,
      initialDirection: MovementDirection.up,
      initialPosition: { x: 4 * blockWidth, y: 12 * blockHeight },
      controlKeys: TankControlKeys.movement,
      fireKey: TankControlKeys.fire,
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
    })

    const enemy = new Tank<'enemy'>({
      tankType: TankType.basic,
      tankColor: TankColor.silver,
      initialDirection: MovementDirection.down,
      initialPosition: { x: 4 * blockWidth, y: 0 },
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
    })

    this.tanks.player = [player]
    this.tanks.enemy = [enemy]
  }

  private onFire({ tankPosition, tankDirection, tankId }: OnFireParams) {
    if (this.bullets[tankId]) {
      return
    }
    this.bullets[tankId] = new Bullet({ tankPosition, tankDirection })
  }

  public render() {
    if (!this.sceneConfig.blocks.eagle) {
      this.gameController.drawGameOverMenu()

      return
    }

    Object.entries(this.sceneConfig.blocks).forEach(([key, coords]) => {
      if (key === 'tanks') {
        this.sceneConfig.blocks.tanks = []
        Object.values(this.tanks).forEach(tankArray => {
          tankArray.forEach(tank => {
            const { spritePosition, canvasPosition } = tank.render()

            this.sceneConfig.blocks.tanks.push(canvasPosition)
            gameUI.drawImage({ ctx: this.ctx, spritePosition, canvasPosition })
          })
        })

        return
      }

      if (!isCoordsArray(coords)) {
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

    const bullets = { ...this.bullets }

    Object.values(this.explosions).forEach(explosion => {
      explosion.draw()
    })

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
          sceneBlockPositions: this.sceneConfig.blocks,
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
        if (sceneBlockKey === 'tanks') {
          this.tanks.player = this.tanks.player.filter(
            tank => tank.position !== intersectedBlockCoords
          )

          this.tanks.enemy = this.tanks.enemy.filter(
            tank => tank.position !== intersectedBlockCoords
          )

          const explosionId = uuidv4()
          const spriteAnimator = new SpriteAnimator()

          this.explosions[explosionId] = {
            coords: intersectedBlockCoords,
            draw: () => {
              gameUI.drawImage({
                ctx: this.ctx,
                spritePosition: spriteAnimator.animate({
                  frameCount: 6,
                  sprites: gameUI.images.animations.explosionSmall,
                  onAnimationEnd: () => {
                    delete this.explosions[explosionId]
                  },
                }),
                canvasPosition: intersectedBlockCoords,
              })
            },
          }
        }

        let searchedSceneBlock = this.sceneConfig.blocks[sceneBlockKey]

        if (isCoordsArray(searchedSceneBlock)) {
          searchedSceneBlock = searchedSceneBlock.filter(
            el => el !== intersectedBlockCoords
          ) as Coords[]
          ;(this.sceneConfig.blocks[sceneBlockKey] as Coords[]) =
            searchedSceneBlock
          return
        }

        delete this.sceneConfig.blocks[sceneBlockKey]
      }
    })
  }

  private getItemPosition({
    spritePosition,
    size,
  }: {
    spritePosition: number
    size: number
  }) {
    return spritePosition * size
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
        x: this.getItemPosition({ spritePosition: x, size: blockWidth }),
        y: this.getItemPosition({ spritePosition: y, size: blockHeight }),
      },
    })
  }
}
