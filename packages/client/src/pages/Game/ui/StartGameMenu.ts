import { canvasHeight, canvasWidth } from '../shared/config/gameConstants'
import { CanvasTextDrawer } from './CanvasTextDrawer'
import { LevelLoadingStage } from './LevelLoadingStage'
import { gameUI } from './GameUI'

import sprite from '../../../shared/images/sprite.png'

export class StartGameMenu {
  public ctx
  public positionY
  public spriteImage
  private isLoadingLevel
  private canvasTextDrawer
  private levelLoadingStage: LevelLoadingStage
  private keyPressSubscription?: (event: KeyboardEvent) => void

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.positionY = canvasHeight // Позиция по Y, убираем надпись за canvas, назначая ей позицию canvasHeight

    // Получаем спрайт (в дальнейшем нужно создавть отдельный класс, который будет это все делать, чтобы не дублировать код)
    const spriteImage = new Image()
    spriteImage.src = sprite
    this.spriteImage = spriteImage

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
    this.canvasTextDrawer.drawTextCentered(
      'I- 00     HI- 20000',
      20,
      '#fff',
      this.positionY,
      50
    )

    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: { x: 8.5 * 32, y: 9.5 * 32, w: 420, h: 144 },
      canvasPosition: {
        x: 110,
        y: this.positionY + 40,
      },
      Sw: 450,
      Sh: 144,
    })

    // Отображаем танчик
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition:
        gameUI.images.tanks['yellow']['basic']['right'][
          gameUI.changeSpriteIndex({ frameCount: 2 })
        ],
      canvasPosition: {
        x: 200,
        y: this.positionY + 250 - 25,
      },
      Sh: 32,
      Sw: 32,
    })

    // Отрисовываем текст Press Enter
    this.canvasTextDrawer.drawTextCentered(
      'Player 1',
      20,
      '#fff',
      255,
      this.positionY + 250
    )

    // Отрисовываем текст в самом низу
    this.canvasTextDrawer.drawTextCentered(
      '© 2023 V.E.I.S.A LTD.',
      10,
      '#fff',
      null,
      this.positionY + 500
    )
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
