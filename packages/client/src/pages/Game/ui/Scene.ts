import {
  Stage,
  SceneConfig,
  TankType,
  TankColor,
  MovementDirection,
  TankOwner,
  Coords,
  OnFireParams,
  ScoreInfoTanks,
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

import { destroyedTanksActions } from '../../../app/store/reducers/TanksSlice'
import { store } from '../../../entry-client'

import vzryv from '../../../shared/sounds/vzryv.mp3'
import vystrel from '../../../shared/sounds/vystrel.mp3'

export class Scene {
  public sceneConfig: SceneConfig
  public ctx: CanvasRenderingContext2D
  public tanks: Record<TankOwner, Tank<TankOwner>[]> = { player: [], enemy: [] }
  public bullets: Record<string, Bullet>
  public gameController: GameController
  public explosions: { [k in string]: { coords: Coords; draw: () => void } } =
    {}

  public totalScore: number
  public playerTankColor: TankColor

  public playerBullet: Bullet | null

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

    this.totalScore = 0

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

    this.playerTankColor = player.tankColor

    const enemy = new Tank<'enemy'>({
      tankType: TankType.basic,
      tankColor: TankColor.silver,
      initialDirection: MovementDirection.down,
      initialPosition: { x: 4 * blockWidth, y: 0 },
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
      duration: 40,
    })

    const enemy1 = new Tank<'enemy'>({
      tankType: TankType.basic,
      tankColor: TankColor.silver,
      initialDirection: MovementDirection.down,
      initialPosition: { x: 5 * blockWidth, y: 9 * blockWidth },
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
      duration: 50,
    })
    const enemy2 = new Tank<'enemy'>({
      tankType: TankType.fast,
      tankColor: TankColor.red,
      initialDirection: MovementDirection.down,
      initialPosition: { x: 10 * blockWidth, y: 3 * blockWidth },
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
      duration: 70,
    })
    const enemy3 = new Tank<'enemy'>({
      tankType: TankType.powerful,
      tankColor: TankColor.red,
      initialDirection: MovementDirection.down,
      initialPosition: { x: 10 * blockWidth, y: 9 * blockWidth },
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
      duration: 70,
    })

    const enemy4 = new Tank<'enemy'>({
      tankType: TankType.armored,
      tankColor: TankColor.red,
      initialDirection: MovementDirection.down,
      initialPosition: { x: 2 * blockWidth, y: 2 * blockWidth },
      sceneBlockPositions: this.sceneConfig.blocks,
      onFire: this.onFire.bind(this),
      duration: 90,
    })

    this.tanks.player = [player]
    this.tanks.enemy = [enemy, enemy1, enemy2, enemy3, enemy4]

    this.playerBullet = null
  }

  private playSound(sound: string) {
    const audio = new Audio(sound)
    audio.play()
  }

  private onFire({
    tankPosition,
    tankDirection,
    tankId,
    isPlayerFire,
  }: OnFireParams) {
    if (this.bullets[tankId]) {
      return
    }
    this.bullets[tankId] = new Bullet({ tankPosition, tankDirection })

    // Так поставим звук выстрела на все танки
    // this.playSound(vystrel)

    if (isPlayerFire) {
      this.playerBullet = this.bullets[tankId]
      // Звук выстрела только танка игрока
      this.playSound(vystrel)
    }
  }

  public getTotalScoreDestroyedTanks() {
    const tanksArray = store.getState().tanks

    this.totalScore = tanksArray.destroyedTanks.reduce(
      (total: number, tank: { score: number }) => total + tank.score,
      0
    )
  }

  public render() {
    if (!this.sceneConfig.blocks.eagle || !this.tanks.player.length) {
      if (!this.gameController.isGameOver) {
        this.getTotalScoreDestroyedTanks()

        this.gameController.setGameOver(true, this.totalScore)
      }
      this.gameController.drawGameOverMenu()

      return
    }

    if (!this.tanks.enemy.length) {
      this.getTotalScoreDestroyedTanks()

      if (!this.gameController.isGameOver) {
        this.gameController.setGameOver(true, this.totalScore)
      }

      this.gameController.drawScoreGameOver()

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
        // Сравниваем tankId пули и если она совпадает с tankId пули игрока
        if (this.bullets[tankId] === this.playerBullet) {
          if (sceneBlockKey === 'tanks' && intersectedBlockCoords) {
            this.tanks.enemy.forEach(tank => {
              if (tank.position === intersectedBlockCoords) {
                // Сохраняем уничтоженный танк в store
                store.dispatch(
                  destroyedTanksActions.addDestroyedTank({
                    sprites: tank.sprites,
                    tankColor: tank.tankColor /* silver */,
                    tankId: tank.tankId,
                    tankType: tank.tankType /* armored */,
                    score: ScoreInfoTanks[tank.tankType],
                    countTanks: 1,
                    spriteTank:
                      gameUI.images.tanks[`${tank.tankColor}`][
                        `${tank.tankType}`
                      ].up[0],
                  })
                )
              }
            })
          }
        }

        delete this.bullets[tankId]
      }

      if (sceneBlockKey && intersectedBlockCoords) {
        if (sceneBlockKey === 'tanks') {
          this.tanks.player = this.tanks.player.filter(
            tank => tank.position !== intersectedBlockCoords
          )

          this.tanks.enemy = this.tanks.enemy.filter(tank => {
            if (tank.position === intersectedBlockCoords) {
              // Звук взрыва танка противника
              this.playSound(vzryv)

              return false
            }
            return true
          })

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

  get gameControllerScene() {
    return this.gameController
  }
}
