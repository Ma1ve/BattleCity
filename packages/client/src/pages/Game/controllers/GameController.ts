class GameController {
  public isGameStart
  public isGameOver
  public isGameLoaded
  public isShowGameScore
  public isLoadingLevel

  constructor() {
    this.isGameStart = false
    //! Пока всегда getGameOver() будет true, нужно потом как то соединить это с уничтожением флага
    this.isGameOver = true
    this.isGameLoaded = false
    this.isShowGameScore = false
    this.isLoadingLevel = false
  }

  // Перезагрузка страницы
  public reload() {
    setTimeout(() => {
      document.location.reload()
    }, 1000)
  }

  //Тут будет загрузка игры, сделал setTimeout в 1 секунду, чтобы после анимации,
  // соединяющихся прямоугольников, показывалась на секунду надпись stage 1

  public setGameStart(value: boolean) {
    setTimeout(() => {
      this.isGameStart = value
    }, 1000)
  }

  // Метод для установки значения isGameOver
  public setGameOver(value: boolean) {
    this.isGameOver = value
  }

  public setShowScoreGameOver(value: boolean) {
    setTimeout(() => {
      this.isShowGameScore = value
    }, 1000)
  }

  public setLoadingLevel(value: boolean) {
    this.isLoadingLevel = value
  }

  get gameOver() {
    return this.isGameOver
  }

  get gameStart() {
    return this.isGameStart
  }

  get showScoreGameOver() {
    return this.isShowGameScore
  }

  get loadingLevel() {
    return this.isLoadingLevel
  }
}

export const gameController = new GameController()
