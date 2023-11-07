import { KeyPressSubscription } from '../model/keyPressSubscription'
import { GameOverMenu } from '../ui/GameOverMenu'
import { LevelLoadingStage } from '../ui/LevelLoadingStage'
import { StartGameMenu } from '../ui/StartGameMenu'
import { LeaderboardAPI } from '../../../shared/api/LeaderboardApi'
import { toast } from 'react-toastify'
import { store } from '../../../entry-client'

export class GameController {
  private ctx
  public isGameStart
  public isGameOver
  public isGameLoaded
  public isShowGameScore
  public isLoadingLevel
  public isRestartGame

  public levelLoadingStage
  public startGameMenu
  public gameOverMenu
  public timeAnimation
  public keyPressHandler

  public levelState

  private animationStartGame
  private animationLoadingLevel
  private animationGameOver
  private animationShowScore

  private static instance: GameController | null = null

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.isGameStart = false
    this.isGameOver = false
    this.isGameLoaded = false
    this.isShowGameScore = false
    this.isLoadingLevel = false

    this.isRestartGame = false

    this.timeAnimation = 0

    this.levelState = store.getState().user.selectedLevel

    this.levelLoadingStage = new LevelLoadingStage(this.ctx, this.levelState)
    this.startGameMenu = new StartGameMenu(this.ctx)
    this.gameOverMenu = new GameOverMenu(this.ctx)

    this.animationStartGame = 80
    this.animationLoadingLevel = 150
    this.animationGameOver = 160
    this.animationShowScore = 250

    this.keyPressHandler = new KeyPressSubscription(keyCode => {
      // В этой функции вы можете выполнить необходимую логику на основе keyCode
      if (keyCode !== 'Tab' && this.timeAnimation <= this.animationStartGame) {
        this.setLoadingLevel(true)
      }
    })

    this.keyPressHandler.subscribe()
  }

  public static getInstance(ctx: CanvasRenderingContext2D) {
    if (GameController.instance === null) {
      GameController.instance = new GameController(ctx)
    }
    return GameController.instance
  }

  public drawStartGame() {
    if (this.isLoadingLevel) {
      this.levelLoadingStage.draw()

      if (this.timeAnimation < this.animationLoadingLevel) {
        this.timeAnimation++
      } else {
        this.setGameStart(true)
      }
    } else {
      this.startGameMenu.drawGameMenu()

      if (this.timeAnimation < this.animationStartGame) {
        this.timeAnimation++
      }
    }
  }

  public drawGameOverMenu() {
    if (this.isShowGameScore) {
      this.drawScoreGameOver()
    } else {
      this.gameOverMenu.drawGameOver()

      if (this.timeAnimation < this.animationGameOver) {
        this.timeAnimation++
      } else {
        this.setShowScoreGameOver(true)
      }
    }
  }

  public drawScoreGameOver() {
    this.gameOverMenu.drawGameOverScore()

    if (this.timeAnimation < this.animationShowScore) {
      this.timeAnimation++
    } else {
      this.setRestartGame(true)
    }
  }

  public setRestartGame(value: boolean) {
    this.isRestartGame = value
  }

  get restartGame() {
    return this.isRestartGame
  }

  public setGameStart(value: boolean) {
    this.isGameStart = value
  }

  // Метод для установки значения isGameOver
  public async setGameOver(value: boolean, score: number) {
    this.isGameOver = value
    if (value) {
      try {
        const { display_name, first_name, id } = store.getState().user.userInfo!

        await LeaderboardAPI.sendResult({
          score,
          name: display_name || first_name,
          id,
        })
      } catch (e: any) {
        toast.error(e?.response?.data?.reason)
      }
    }
  }

  public setShowScoreGameOver(value: boolean) {
    this.isShowGameScore = value
  }

  public setLoadingLevel(value: boolean) {
    this.isLoadingLevel = value
  }

  get gameOver() {
    return this.isGameOver
  }

  get gameStart() {
    return this.isGameStart
  }

  get showScoreGameOver() {
    return this.isShowGameScore
  }

  get loadingLevel() {
    return this.isLoadingLevel
  }

  get getKeyPressHandler() {
    return this.keyPressHandler
  }
}
