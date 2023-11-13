import { CoordsWithSize } from '../shared/types'

export class SpriteAnimator {
  activeSpriteIndex = 0
  spriteMaxIndex?: number
  currentFrame = 0

  animate({
    sprites,
    frameCount,
    disabled,
    onAnimationEnd,
  }: {
    sprites: CoordsWithSize[]
    frameCount: number
    disabled?: boolean
    onAnimationEnd?: () => void
  }) {
    if (disabled) {
      return sprites[0]
    }

    if (!this.spriteMaxIndex) {
      this.spriteMaxIndex = sprites.length - 1
    }

    this.currentFrame++

    if (this.currentFrame === frameCount) {
      if (this.activeSpriteIndex === this.spriteMaxIndex && !!onAnimationEnd) {
        onAnimationEnd()
        return sprites[0]
      }

      this.activeSpriteIndex =
        this.activeSpriteIndex === this.spriteMaxIndex
          ? 0
          : this.activeSpriteIndex + 1
      this.currentFrame = 0
    }

    return sprites[this.activeSpriteIndex]
  }
}
