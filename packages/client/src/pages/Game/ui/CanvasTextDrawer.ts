import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { gameUI } from './GameUI'

interface IDrawPtsData {
  overallScore: number
  fontSize?: number
  color?: string
  x: number
  y: number
  countTanks: number
  spriteTank: any
}

interface IDrawLine {
  color: string
  width: number
  moveToX: number
  moveToY: number
  lineToX: number
  lineToY: number
}

export class CanvasTextDrawer {
  public ctx
  public canvasWidth
  public canvasHeight

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
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

  public drawTextCentered(
    text: string,
    fontSize: number,
    color: string,
    x?: number | null,
    y?: number | null
  ) {
    this.setupTextStyle(fontSize, color)

    // Нахождение ширины текста
    const textWidth = this.ctx.measureText(text).width

    // Вычисление кординат x и y для расположения текста по центру
    const xC = x ? x : (this.canvasWidth - textWidth) / 2
    const yC = y ? y : this.canvasHeight / 2 + fontSize / 2

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

    const xPts = x + 20
    // Если кол-во танков становится двухзначным смещаем координату на textWidthCountTanks
    const xCountTanks = x + 140 - textWidthCountTanks

    // Переменные для отрисовки линии над TOTAL
    const xLineStart = x + 150
    const yLineStart = y - 11

    // Координаты стрелки по x и y
    const xArrowCanvasPosition = x + 135
    const yArrowCanvasPosition = y - 22

    // Координаты танка по x и y
    const xTankCanvasPosition = x + 170
    const yTankCanvasPosition = y - 37

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
      lineToX: xLineStart + 10,
      lineToY: yLineStart,
    })

    // Отрисовываем стрелку
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: { x: 17 * 32, y: 14.5 * 32, w: 16, h: 16 },
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
