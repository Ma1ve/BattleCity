import { store } from '../../../entry-client'
import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { DestroyedTank } from '../shared/types'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { gameUI } from './GameUI'

export class GameOverMenu {
  public ctx
  public positionY
  private canvasTextDrawer
  private tanksInfo: DestroyedTank[]
  private lastY
  private totalNumberOfDestroyedTanks: number | undefined
  private totalScoreIPlayer: number | undefined

  private indentCanvasScoreByX
  private startLineByX
  private endLineByX
  private startDrawingPositionTanksInfo

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)

    this.tanksInfo = []

    // Задаем начальный отступ первого объекта в массиве tanksInfo, в дальнейшем,
    // чтобы каждый следующий объект имел отступ на 70 больше предыдущего
    this.lastY = 0

    // Отступ на 180 всех полей, которые находятся в массиве tanksInfo
    this.indentCanvasScoreByX = 180

    // Координаты для отрисовки линия для подсчёта общего кол-ва уничтоженных танков
    this.startLineByX = 270
    this.endLineByX = 450

    // Начальная позиция отрисовки объекта в массиве tanksInfo по Y
    this.startDrawingPositionTanksInfo = 300

    this.initializeData()

    // Подписываемся на изменения состояния Redux
    store.subscribe(() => {
      // При каждом изменении состояния Redux вызываем функцию для обновления данных
      this.initializeData()
    })
  }

  private initializeData() {
    // Группируем танки по tankColor и tankType
    const groupedTanks = this.groupTanksByColorAndType(
      store.getState().tanks.destroyedTanks
    )

    // Обновляем this.tanksInfo
    this.tanksInfo = Object.values(groupedTanks)

    // Другие обновления свойств, которые зависят от состояния Redux
    this.totalNumberOfDestroyedTanks = this.tanksInfo.reduce(
      (total, { countTanks }) => total + countTanks,
      0
    )
    this.totalScoreIPlayer = this.tanksInfo.reduce(
      (total, { score, countTanks }) => total + score * countTanks,
      0
    )
  }

  public groupTanksByColorAndType(tanks: DestroyedTank[]) {
    const groupedTanks: Record<string, DestroyedTank> = {}

    tanks.forEach((tank: DestroyedTank) => {
      const key = `${tank.tankColor}-${tank.tankType}`
      if (!groupedTanks[key]) {
        groupedTanks[key] = { ...tank, countTanks: 0, score: 0 }
      }
      groupedTanks[key].countTanks++
      groupedTanks[key].score = tank.score
    })

    return groupedTanks
  }

  public drawGameOver() {
    if (this.positionY > canvasHeight / 2) {
      this.positionY -= 6
    }
    // Отрисовываем надпись Game Over
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: gameUI.images.stage.gameOver,
      canvasPosition: {
        x: canvasWidth / 2 - 55,
        y: this.positionY,
      },
      Sw: 100,
      Sh: 100,
    })
  }

  // Отрисовываем счёт игрока
  public drawGameOverScore() {
    // Очищаем canvas
    this.ctx.fillStyle = '#020202'
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Отрисовываем самую верзнюю надпить 'HI-SCORE 20000'
    this.canvasTextDrawer.drawTextCentered({
      text: 'HI-SCORE',
      fontSize: 22,
      color: '#ff0000',
      x: 147,
      y: 100,
    })

    this.canvasTextDrawer.drawTextCentered({
      text: '20000',
      fontSize: 22,
      color: '#fdb750',
      x: 367,
      y: 100,
    })

    // Отрисовываем надпись `STAGE (номер уровня)`
    this.canvasTextDrawer.drawTextCentered({
      text: `STAGE ${1}`,
      fontSize: 22,
      color: '#fff',
      y: 147,
    })

    // Отрисовываем `I-PLAYER` и его общий счёт (игрока)
    this.canvasTextDrawer.drawTextCentered({
      text: `I-PLAYER`,
      fontSize: 20,
      color: '#ff0000',
      x: 100,
      y: 200,
    })

    this.canvasTextDrawer.drawTextCentered({
      text: `${this.totalScoreIPlayer}`,
      fontSize: 20,
      color: '#fdb750',
      x: 180,
      y: 250,
    })

    // Перебираем массив this.tanksInfo и отображаем информацию, какие танки были уничтожены
    this.tanksInfo.map(({ score, countTanks, spriteTank }, index) => {
      const yOffset = 70 // Разница по Y между элементами
      const overallScore = countTanks * score // Подсчет общего score одного типа убитых танков

      this.lastY = this.startDrawingPositionTanksInfo + index * yOffset // Вычисляем Y на основе индекса

      this.canvasTextDrawer.drawScorePts({
        overallScore,
        x: this.indentCanvasScoreByX, // Отступ слева
        y: this.lastY,
        countTanks,
        spriteTank,
      })
    })

    // Отрисовываем линию
    this.canvasTextDrawer.drawLine({
      color: '#fff',
      width: 3,
      moveToX: this.startLineByX,
      moveToY: this.lastY + 20,
      lineToX: this.endLineByX,
      lineToY: this.lastY + 20,
    })

    // Измеряем measureText для того, чтобы смещать totalNumberOfDestroyedTanks если, кол-во танков превышвет 9
    const textWidthScorePts = this.ctx.measureText(
      `${this.totalNumberOfDestroyedTanks}`
    ).width

    // Отрисовываем общий счёт уничтоженых танков  `TOTAL (кол-во)`
    this.canvasTextDrawer.drawTextCentered({
      text: `TOTAL  ${this.totalNumberOfDestroyedTanks}`,
      fontSize: 20,
      color: '#fff',
      x: 180 - textWidthScorePts,
      y: this.lastY + 50,
    })
  }
}
