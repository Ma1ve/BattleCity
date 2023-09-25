export class KeyPressSubscription {
  private keyPressSubscription: (event: KeyboardEvent) => void

  constructor(private callback: (keyCode: string) => void) {
    this.keyPressSubscription = (event: KeyboardEvent) => {
      const keyCode = event.code

      // Вызываем обратный вызов с кодом клавиши, когда происходит событие keydown
      this.callback(keyCode)
    }
  }

  // Метод для подписки на события нажатия клавиш клавиатуры
  public subscribe() {
    document.addEventListener('keydown', this.keyPressSubscription)
  }

  // Отписываемся от события
  public unsubscribe() {
    if (!this.keyPressSubscription) {
      return
    }
    document.removeEventListener('keydown', this.keyPressSubscription)
  }
}
