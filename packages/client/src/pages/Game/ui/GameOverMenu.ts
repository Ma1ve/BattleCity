import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { gameUI } from './GameUI'

export class GameOverMenu {
  public ctx
  public positionY
  public isGameOver
  public showScoreGameOver
  private canvasTextDrawer
  private tanksInfo
  private lastY
  private totalNumberOfDestroyedTanks
  private totalScoreIPlayer

  private indentCanvasScoreByX
  private startLineByX
  private endLineByX
  private startDrawingPositionTanksInfo

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    this.showScoreGameOver = false // showScoreGameOver, когда true показывает canvas счёта
    this.isGameOver = true // isGameOver проверяем завершена ли игра, будет true, когда флаг сломали

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)

    // В дальнейшем будем получать массив всех танков, которые уничтожил пользователь
    this.tanksInfo = [
      {
        score: 100,
        countTanks: 3,
        spriteTank: gameUI.images.tanks.silver.basic.up[0],
      },
      {
        score: 200,
        countTanks: 2,
        spriteTank: gameUI.images.tanks.silver.fast.up[0],
      },
      {
        score: 300,
        countTanks: 3,
        spriteTank: gameUI.images.tanks.silver.powerful.up[0],
      },
      {
        score: 200,
        countTanks: 1,
        spriteTank: gameUI.images.tanks.silver.armored.up[0],
      },
    ]

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

    // Подсчитываем общее количество уничтоженных таноков
    this.totalNumberOfDestroyedTanks = 0
    this.totalNumberOfDestroyedTanks += this.tanksInfo.reduce(
      (total, { countTanks }) => total + countTanks,
      0
    )

    // Подсчитываем общий счёт игрока он будет находится под I-PLAYER
    this.totalScoreIPlayer = 0
    this.totalScoreIPlayer += this.tanksInfo.reduce(
      (total, { score, countTanks }) => total + score * countTanks,
      0
    )
  }

  // Проверяем showScoreGameOver нужно ли показывать счёт игрока
  public draw() {
    if (this.showScoreGameOver) {
      this.drawGameOverScore()
    } else {
      this.drawGameOver()
    }
  }

  private drawGameOver() {
    if (this.positionY > canvasHeight / 2) {
      this.positionY -= 6
    } else {
      setTimeout(() => {
        // Данная переменная будет true, только, когда анимация надписи game over закончится,
        // я поместил setTimeout, чтобы еще 1 секунду надпись не двигалась, резко не исчезала.
        this.showScoreGameOver = true
      }, 1000)
    }

    // Отрисовываем надпись Game Over
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: gameUI.images.stage.gameOver,
      canvasPosition: {
        x: canvasWidth / 2 - 55,
        y: this.positionY,
      },
      sW: 100,
      sH: 100,
    })
  }

  // Отрисовываем счёт игрока
  private drawGameOverScore() {
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
    // `STAGE ${1}`, 22, '#fff', null, 147
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

    setTimeout(() => {
      document.location.reload()
    }, 1000)
  }

  // Тут мы получает переменную isGameOver, которая будет показывать нам, нужно ли показывать GAME OVER
  public getGameOver() {
    return this.isGameOver
  }
}
