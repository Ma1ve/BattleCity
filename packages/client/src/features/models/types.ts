export enum ScreenSize {
  SMALL = 'small',
  LARGE = 'large',
}

export interface Document {
  fullscreenElement?: Element | null
  exitFullscreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
  webkitExitFullscreen?: () => Promise<void>
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
  documentElement: HTMLElement
}

export interface HTMLElement {
  msRequestFullscreen?: () => Promise<void>
  mozRequestFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: (value: unknown) => Promise<void>
  requestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
}
