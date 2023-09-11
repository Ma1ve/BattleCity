import {
  battleCitySpriteWidth,
  canvasHeight,
  canvasWidth,
  canvasWidthWithoutScale,
} from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { LevelLoadingStage } from './LevelLoadingStage'
import { gameUI } from './GameUI'

export class StartGameMenu {
  public ctx
  public positionY
  private isLoadingLevel
  private canvasTextDrawer
  private levelLoadingStage: LevelLoadingStage
  private keyPressSubscription?: (event: KeyboardEvent) => void

  private indentPressEnterTextByX = 320
  private indentVeisaTextByX = 500
  private battleCityTextIndentationByY = 40
  private alignmentTankCenter = 35

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    // Проверяет рисовать ли анимацию загрузку уровня
    this.isLoadingLevel = false

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)
    this.levelLoadingStage = new LevelLoadingStage(this.ctx, 1)

    // Подписываемся на событие
    this.subscribe()
  }

  public draw() {
    if (this.isLoadingLevel) {
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
        x: (canvasWidthWithoutScale - battleCitySpriteWidth) / 2,
        y: this.positionY + this.battleCityTextIndentationByY,
      },
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

  // Если isGameLoaded true будет запускаться игра
  public isGameLoaded() {
    return this.levelLoadingStage.isGameLoaded()
  }

  private subscribe() {
    this.keyPressSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      // Делаю проверку пока не прошла анимация, при клике ничего не будет происходить
      if ('Enter' === keyCode && this.positionY <= 80) {
        this.isLoadingLevel = true
      }
    }

    document.addEventListener('keydown', this.keyPressSubscription)
  }

  // Отписываемся от события, мы это делает в index.tsx, в return у useEffect
  public unsubscribe() {
    if (!this.keyPressSubscription) {
      return
    }
    document.removeEventListener('keypress', this.keyPressSubscription)
  }
}
