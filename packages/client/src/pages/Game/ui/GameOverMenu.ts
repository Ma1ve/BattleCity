import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { gameUI } from './GameUI'

import sprite from '../../../shared/images/sprite.png'

export class GameOverMenu {
  public ctx
  public positionY
  public spriteImage
  public isGameOver
  public showScoreGameOver
  private canvasTextDrawer
  private tanksInfo
  private lastY
  private totalNumberOfDestroyedTanks
  private totalScoreIPlayer

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    // Получаем спрайт (в дальнейшем нужно создавть отдельный класс, который будет это все делать, чтобы не дублировать код)
    const spriteImage = new Image()
    spriteImage.src = sprite
    this.spriteImage = spriteImage

    this.showScoreGameOver = false // showScoreGameOver, когда true показывает canvas счёта
    this.isGameOver = true // isGameOver проверяем завершена ли игра, будет true, когда флаг сломали

    this.canvasTextDrawer = new CanvasTextDrawer(this.ctx)

    // В дальнейшем будем получать массив всех танков, которые уничтожил пользователь
    this.tanksInfo = [
      {
        score: 100,
        countTanks: 3,
        spriteTank: gameUI.images.tanks['silver']['basic']['up'][0],
      },
      {
        score: 200,
        countTanks: 2,
        spriteTank: gameUI.images.tanks['silver']['fast']['up'][0],
      },
      {
        score: 300,
        countTanks: 3,
        spriteTank: gameUI.images.tanks['silver']['powerful']['up'][0],
      },
      {
        score: 200,
        countTanks: 1,
        spriteTank: gameUI.images.tanks['silver']['armored']['up'][0],
      },
    ]

    // Задаем начальный отступ первого объекта в массиве tanksInfo, в дальнейшем,
    // чтобы каждый следующий объект имел отступ на 70 больше предыдущего
    this.lastY = 0

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
      spritePosition: { x: 16 * 32, y: 5.2 * 32, w: 62, h: 62 },
      canvasPosition: {
        x: canvasWidth / 2 - 55,
        y: this.positionY,
      },
      Sw: 100,
      Sh: 100,
    })
  }

  // Отрисовываем счёт игрока
  private drawGameOverScore() {
    // Очищаем canvas
    this.ctx.fillStyle = '#020202'
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Отрисовываем самую верзнюю надпить 'HI-SCORE 20000'
    this.canvasTextDrawer.drawTextCentered('HI-SCORE', 22, '#ff0000', 147, 100)
    this.canvasTextDrawer.drawTextCentered('20000', 22, '#fdb750', 367, 100)

    // Отрисовываем надпись `STAGE (номер уровня)`
    this.canvasTextDrawer.drawTextCentered(`STAGE ${1}`, 22, '#fff', null, 147)

    // Отрисовываем `I-PLAYER` и его общий счёт (игрока)
    this.canvasTextDrawer.drawTextCentered(`I-PLAYER`, 20, '#ff0000', 100, 200)
    this.canvasTextDrawer.drawTextCentered(
      `${this.totalScoreIPlayer}`,
      20,
      '#fdb750',
      180,
      250
    )

    // Перебираем массив this.tanksInfo и отображаем информацию, какие танки были уничтожены
    this.tanksInfo.map(({ score, countTanks, spriteTank }, index) => {
      const yOffset = 70 // Разница по Y между элементами
      const overallScore = countTanks * score // Подсчет общего score одного типа убитых танков

      this.lastY = 300 + index * yOffset // Вычисляем Y на основе индекса

      this.canvasTextDrawer.drawScorePts({
        overallScore,
        x: 180, // Отступ слева
        y: this.lastY,
        countTanks,
        spriteTank,
      })
    })

    // Отрисовываем линию
    this.canvasTextDrawer.drawLine({
      color: '#fff',
      width: 3,
      moveToX: 270,
      moveToY: this.lastY + 20,
      lineToX: 450,
      lineToY: this.lastY + 20,
    })

    // Измеряем measureText для того, чтобы смещать totalNumberOfDestroyedTanks если, кол-во танков превышвет 9
    const textWidthScorePts = this.ctx.measureText(
      `${this.totalNumberOfDestroyedTanks}`
    ).width

    // Отрисовываем общий счёт уничтоженых танков  `TOTAL (кол-во)`
    this.canvasTextDrawer.drawTextCentered(
      `TOTAL  ${this.totalNumberOfDestroyedTanks}`,
      20,
      '#fff',
      180 - textWidthScorePts,
      this.lastY + 50
    )

    setTimeout(() => {
      document.location.reload()
    }, 1000)
  }

  // Тут мы получает переменную isGameOver, которая будет показывать нам, нужно ли показывать GAME OVER
  public getGameOver() {
    return this.isGameOver
  }
}
