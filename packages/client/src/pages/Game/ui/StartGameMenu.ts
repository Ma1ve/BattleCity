import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { LevelLoadingStage } from './LevelLoadingStage'
import { gameUI } from './GameUI'
import { KeyPressSubscription } from '../model/keyPressSubscription'
import { gameController } from '../controllers/GameController'

export class StartGameMenu {
  public ctx
  public positionY
  private canvasTextDrawer
  private levelLoadingStage: LevelLoadingStage

  private indentPressEnterTextByX
  private indentVeisaTextByX
  private battleCityTextIndentationByY
  private alignmentTankCenter
  private keyPressHandler

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)
    this.levelLoadingStage = new LevelLoadingStage(this.ctx, 1)

    this.indentPressEnterTextByX = 250
    this.indentVeisaTextByX = 500
    this.battleCityTextIndentationByY = 40
    this.alignmentTankCenter = 25

    this.keyPressHandler = new KeyPressSubscription(keyCode => {
      // В этой функции вы можете выполнить необходимую логику на основе keyCode
      if (keyCode === 'Enter' && this.positionY <= 80) {
        gameController.setLoadingLevel(true)
      }
    })

    this.keyPressHandler.subscribe()
  }

  public draw() {
    if (gameController.loadingLevel) {
      this.levelLoadingStage.draw()
    } else {
      this.drawGameMenu()
    }
  }

  // Отрисовывает главное меню с анимациями
  private drawGameMenu() {
    // Очищаем  canvas
    this.ctx.fillStyle = '#020202'
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Надпись будет выезжать до момента когда позиция по Y не станет больше 80
    if (this.positionY > 80) {
      this.positionY -= 6
    }

    // Отрисовываем верхний текст
    this.canvasTextDrawer.drawTextCentered({
      text: 'I- 00    HI- 20000',
      fontSize: 20,
      color: '#fff',
      x: this.positionY,
      y: 50,
    })

    // Отрисовываем текст Battle City
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: gameUI.images.stage.battleCity,
      canvasPosition: {
        x: 110,
        y: this.positionY + this.battleCityTextIndentationByY,
      },
      sW: 450,
      sH: 144,
    })

    // Отображаем танчик
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition:
        gameUI.images.tanks.yellow.basic.right[
          gameUI.animateSprite({ frameCount: 2 })
        ],
      canvasPosition: {
        x: 200,
        y:
          this.positionY +
          this.indentPressEnterTextByX -
          this.alignmentTankCenter,
      },
      sH: 32,
      sW: 32,
    })

    // Отрисовываем текст Press Enter
    this.canvasTextDrawer.drawTextCentered({
      text: 'Player 1',
      fontSize: 20,
      color: '#fff',
      x: 255,
      y: this.positionY + this.indentPressEnterTextByX,
    })

    // Отрисовываем текст в самом низу
    this.canvasTextDrawer.drawTextCentered({
      text: '© 2023 V.E.I.S.A LTD.',
      fontSize: 10,
      color: '#fff',
      y: this.positionY + this.indentVeisaTextByX,
    })
  }

  get getKeyPressHandler() {
    return this.keyPressHandler
  }
}
