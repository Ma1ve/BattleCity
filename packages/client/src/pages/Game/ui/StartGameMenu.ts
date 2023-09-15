import {
  battleCitySpriteWidth,
  canvasHeight,
  canvasWidth,
  canvasWidthWithoutScale,
} from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { gameUI } from './GameUI'
import { SpriteAnimator } from './SpriteAnimator'

export class StartGameMenu {
  public ctx
  public positionY
  private canvasTextDrawer

  private indentPressEnterTextByX
  private indentVeisaTextByX
  private battleCityTextIndentationByY
  private alignmentTankCenter
  private spriteAnimator = new SpriteAnimator()

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)

    this.indentPressEnterTextByX = 250
    this.indentVeisaTextByX = 500
    this.battleCityTextIndentationByY = 40
    this.alignmentTankCenter = 25
  }

  // Отрисовывает главное меню с анимациями
  public drawGameMenu() {
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
      spritePosition: this.spriteAnimator.animate({
        frameCount: 4,
        sprites: gameUI.images.tanks.yellow.basic.right,
      }),
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
}
