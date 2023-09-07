import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'

export class LevelLoadingStage {
  private ctx: CanvasRenderingContext2D
  private levelStage: number
  private startDrawRectangleUp: number
  private startDrawRectangleDown: number
  private isGameStart: boolean
  private canvasTextDrawer: CanvasTextDrawer

  constructor(ctx: CanvasRenderingContext2D, levelStage: number) {
    this.ctx = ctx
    this.levelStage = levelStage

    this.startDrawRectangleUp = 0
    this.startDrawRectangleDown = 0
    this.isGameStart = false

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)
  }

  public draw() {
    // Очищаем canvas
    this.ctx.fillStyle = '#020202'
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Надпись будет выезжать до момента когда позиция startDrawRectangleUp не станет больше половины canvas
    if (this.startDrawRectangleUp < canvasHeight / 2) {
      this.startDrawRectangleUp += 15
      this.startDrawRectangleDown -= 15

      this.ctx.fillStyle = '#4a4c51'
      // Отрисовываем сверзу часть прямоугольника
      this.ctx.fillRect(0, 0, canvasWidth, this.startDrawRectangleUp)
      // Отрисовываем снизу часть прямоугольника
      this.ctx.fillRect(
        0,
        canvasHeight,
        canvasWidth,
        this.startDrawRectangleDown
      )
    } else {
      // Если две части прямоугольников соединились, полностью закрашиваем canvas данным цветом
      this.ctx.fillStyle = '#4a4c51'
      this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      this.canvasTextDrawer.drawTextCentered(
        `STAGE ${this.levelStage}`,
        22,
        '#000'
      )

      //Тут будет загрузка игры, сделал setTimeout в 1 секунду, чтобы после анимации,
      // соединяющихся прямоугольников, показывалась на секунду надпись stage 1
      setTimeout(() => {
        this.isGameStart = true
        this.isGameLoaded()
      }, 1000)
    }
  }

  public isGameLoaded() {
    return this.isGameStart
  }
}
