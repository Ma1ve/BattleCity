import { ScreenSize } from '../../features/models/types'

export const toggleFullscreen = (
  seScreenSize?: React.Dispatch<React.SetStateAction<ScreenSize>>
) => {
  const elem = document.documentElement as any

  if (
    !document.fullscreenElement &&
    !(document as any).mozFullScreenElement &&
    !(document as any).msFullscreenElement
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    }
    if (seScreenSize) {
      seScreenSize(ScreenSize.LARGE)
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).msExitFullscreen) {
      ;(document as any).msExitFullscreen()
    } else if ((document as any).mozCancelFullScreen) {
      ;(document as any).mozCancelFullScreen()
    }
    if (seScreenSize) {
      seScreenSize(ScreenSize.SMALL)
    }
  }
}
