import { Document, ScreenSize } from '../../features/models/types'

export const toggleFullscreen = (
  setScreenSize?: React.Dispatch<React.SetStateAction<ScreenSize>>
) => {
  const document = window.document as Document
  const element = document.documentElement

  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement &&
    !document.webkitFullscreenElement
  ) {
    if (setScreenSize) {
      setScreenSize(ScreenSize.LARGE)
    }

    if (element.requestFullscreen) {
      return element.requestFullscreen()
    }
    if (element.msRequestFullscreen) {
      return element.msRequestFullscreen()
    }
    if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen()
    }
    if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen(
        (Element as any).ALLOW_KEYBOARD_INPUT
      )
    }
  } else {
    if (setScreenSize) {
      setScreenSize(ScreenSize.SMALL)
    }

    if (document.exitFullscreen) {
      return document.exitFullscreen()
    }
    if (document.msExitFullscreen) {
      return document.msExitFullscreen()
    }
    if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen()
    }
    if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen()
    }
  }
}
