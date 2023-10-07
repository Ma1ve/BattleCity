import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { CoordsWithSize } from '../shared/types'
import { gameUI } from './GameUI'

interface IDrawPtsData {
  overallScore: number
  fontSize?: number
  color?: string
  x: number
  y: number
  countTanks: number
  spriteTank: CoordsWithSize
}

interface IDrawLine {
  color: string
  width: number
  moveToX: number
  moveToY: number
  lineToX: number
  lineToY: number
}

interface IDrawTextCenteredData {
  text: string
  fontSize: number
  color: string
  x?: number | null
  y?: number | null
}

export class CanvasTextDrawer {
  public ctx
  public canvasWidth
  public canvasHeight

  private arrowLineLength
  private indentCanvasPtsByX
  private indentCanvasCountTanks
  private indentCanvasLineByX
  private indentCanvasLineByY
  private indentCanvasArrowByX
  private indentCanvasArrowByY
  private indentCanvasTankByX
  private indentCanvasTankByY

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.arrowLineLength = 10
    this.indentCanvasPtsByX = 20
    this.indentCanvasCountTanks = 140
    this.indentCanvasLineByX = 150
    this.indentCanvasLineByY = 11
    this.indentCanvasArrowByX = 135
    this.indentCanvasArrowByY = 22
    this.indentCanvasTankByX = 170
    this.indentCanvasTankByY = 37
  }

  // Метод для настройки цвета и шрифта
  private setupTextStyle(fontSize: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.font = `${fontSize}px 'Press Start 2P'`
  }

  // Метод отрисовывает текст
  public drawText(text: string, fontSize: number, color: string, x = 0, y = 0) {
    this.setupTextStyle(fontSize, color)
    this.ctx.fillText(text, x, y)
  }

  public drawTextCentered(drawTextCenteredData: IDrawTextCenteredData) {
    const { text, fontSize, color, x, y } = drawTextCenteredData

    this.setupTextStyle(fontSize, color)

    // Нахождение ширины текста
    const textWidth = this.ctx.measureText(text).width

    // Вычисление кординат x и y для расположения текста по центру
    const xC = x ? x : (this.canvasWidth - textWidth) / 2
    const yC = y ? y : (this.canvasHeight + fontSize) / 2

    // Отрисовка текста по центру
    this.ctx.fillText(text, xC, yC)
  }

  // Отображаем кол-во убитых танков, их общий счёт (PTS) и сам спрайт танка
  public drawScorePts(drawPtsData: IDrawPtsData) {
    const {
      overallScore,
      fontSize = 20,
      color = '#fff',
      x,
      y,
      countTanks,
      spriteTank,
    } = drawPtsData

    this.setupTextStyle(fontSize, color)

    // Получаем ширину текста
    const textWidthScorePts = this.ctx.measureText(`${overallScore}`).width
    const textWidthCountTanks = this.ctx.measureText(`${countTanks}`).width

    // Если кол-во очков (PTS) становится двухзначным смещаем координату на textWidthScorePts
    const xC = x - textWidthScorePts

    // Отступ от score (PTS)
    const xPts = x + this.indentCanvasPtsByX

    // Если кол-во танков становится двухзначным смещаем координату на textWidthCountTanks
    const xCountTanks = x + this.indentCanvasCountTanks - textWidthCountTanks

    // Переменные для отрисовки линий для создания стрелки
    const xLineStart = x + this.indentCanvasLineByX
    const yLineStart = y - this.indentCanvasLineByY

    // Координаты стрелки по x и y
    const xArrowCanvasPosition = x + this.indentCanvasArrowByX
    const yArrowCanvasPosition = y - this.indentCanvasArrowByY

    // Координаты танка по x и y
    const xTankCanvasPosition = x + this.indentCanvasTankByX
    const yTankCanvasPosition = y - this.indentCanvasTankByY

    // Отрисовывает PTS пользователя (набранные очки)
    this.ctx.fillText(`${overallScore}`, xC, y)

    this.drawText(`PTS`, fontSize, '#fff', xPts, y)
    // Кол-во убитых танков
    this.drawText(`${countTanks}`, fontSize, '#fff', xCountTanks, y)

    // Отрисовываем линию для стрелки
    this.drawLine({
      color: '#fff',
      width: 5,
      moveToX: xLineStart,
      moveToY: yLineStart,
      lineToX: xLineStart + this.arrowLineLength,
      lineToY: yLineStart,
    })

    // Отрисовываем стрелку
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: gameUI.images.stage.arrowAmountDestroyTanks,
      canvasPosition: { x: xArrowCanvasPosition, y: yArrowCanvasPosition },
    })

    // Отрисовываем танк
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: spriteTank,
      canvasPosition: { x: xTankCanvasPosition, y: yTankCanvasPosition },
    })
  }

  public drawLine(drawLineData: IDrawLine) {
    const { color, width, moveToX, moveToY, lineToX, lineToY } = drawLineData

    // Устанавливаем свойства линии (цвет, толщину и другие)
    this.ctx.strokeStyle = color // Цвет линии
    this.ctx.lineWidth = width // Толщина линии
    // Начинаем рисование линии
    this.ctx.beginPath()
    // Указываем начальные координаты
    this.ctx.moveTo(moveToX, moveToY) // X и Y координаты начала линии
    // Указываем конечные координаты
    this.ctx.lineTo(lineToX, lineToY) // X и Y координаты конца линии
    // Завершаем рисование линии
    this.ctx.stroke()
  }
}
