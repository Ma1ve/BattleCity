import { Document, ScreenSize } from '../../features/models/types'

export const toggleFullscreen = (
  setScreenSize?: React.Dispatch<React.SetStateAction<ScreenSize>>
) => {
  const document = window.document as Document
  const elem = document.documentElement

  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement &&
    !document.webkitFullscreenElement
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT)
    }
    if (setScreenSize) {
      setScreenSize(ScreenSize.LARGE)
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    if (setScreenSize) {
      setScreenSize(ScreenSize.SMALL)
    }
  }
}
