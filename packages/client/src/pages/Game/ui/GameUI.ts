import sprite from '../../../shared/images/sprite.png'
import {
  Bullet,
  Images,
  MovementDirection,
  Coords,
  CoordsWithSizeCoords,
  Stage,
  Tank,
  TankColor,
  TankType,
} from '../shared/types'
import {
  blockHeight,
  blockWidth,
  canvasItemScale,
  spriteHeight,
  spriteWidth,
} from '../shared/config/gameConstants'

const getSpriteItemPosition = ({
  x,
  y,
  w = spriteWidth, //item width on sprite
  h = spriteHeight, //item height on sprite
}: {
  x: number
  y: number
  w?: number
  h?: number
}): CoordsWithSizeCoords => {
  return { x: x * w, y: y * h, w, h }
}

const getTankSpritePosition = (
  firstCoords: Coords,
  secondCoords: Coords
): [CoordsWithSizeCoords, CoordsWithSizeCoords] => {
  return [
    getSpriteItemPosition(firstCoords),
    getSpriteItemPosition(secondCoords),
  ]
}

class GameUI {
  images: Images

  frame: number

  spriteImage: HTMLImageElement

  constructor() {
    this.frame = 0

    this.images = this.getSprites()

    const spriteImage = new Image()
    spriteImage.src = sprite
    this.spriteImage = spriteImage
  }

  createImage(path: string) {
    const img = new Image()
    img.src = path
    return img
  }

  getSprites(): Images {
    const tanks: Tank = {
      [TankColor.yellow]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 0 },
            { x: 1, y: 0 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 0 },
            { x: 3, y: 0 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 0 },
            { x: 5, y: 0 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 0 },
            { x: 7, y: 0 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 1 },
            { x: 3, y: 1 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 1 },
            { x: 5, y: 1 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 1 },
            { x: 7, y: 1 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 2 },
            { x: 1, y: 2 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 2 },
            { x: 3, y: 2 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 2 },
            { x: 5, y: 2 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 2 },
            { x: 7, y: 2 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 3 },
            { x: 1, y: 3 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 3 },
            { x: 3, y: 3 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 3 },
            { x: 5, y: 3 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 3 },
            { x: 7, y: 3 }
          ),
        },
      },

      [TankColor.green]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 8 },
            { x: 1, y: 8 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 8 },
            { x: 3, y: 8 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 8 },
            { x: 5, y: 8 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 8 },
            { x: 7, y: 8 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 9 },
            { x: 1, y: 9 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 9 },
            { x: 3, y: 9 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 9 },
            { x: 5, y: 9 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 9 },
            { x: 7, y: 9 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 10 },
            { x: 1, y: 10 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 10 },
            { x: 3, y: 10 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 10 },
            { x: 5, y: 10 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 10 },
            { x: 7, y: 10 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 11 },
            { x: 1, y: 11 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 11 },
            { x: 3, y: 11 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 11 },
            { x: 5, y: 11 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 11 },
            { x: 7, y: 11 }
          ),
        },
      },
      //enemy
      [TankColor.silver]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 4 },
            { x: 1, y: 4 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 4 },
            { x: 3, y: 4 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 4 },
            { x: 5, y: 4 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 4 },
            { x: 7, y: 4 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 6 },
            { x: 1, y: 6 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 6 },
            { x: 3, y: 6 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 6 },
            { x: 5, y: 6 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 6 },
            { x: 7, y: 6 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 8 },
            { x: 1, y: 8 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 8 },
            { x: 3, y: 8 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 8 },
            { x: 5, y: 8 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 8 },
            { x: 7, y: 8 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 10 },
            { x: 1, y: 10 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 10 },
            { x: 3, y: 10 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 10 },
            { x: 5, y: 10 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 10 },
            { x: 7, y: 10 }
          ),
        },
      },
      [TankColor.red]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 5 },
            { x: 1, y: 5 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 5 },
            { x: 3, y: 5 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 5 },
            { x: 5, y: 5 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 5 },
            { x: 7, y: 5 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 7 },
            { x: 1, y: 7 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 7 },
            { x: 3, y: 7 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 7 },
            { x: 5, y: 7 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 7 },
            { x: 7, y: 7 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 9 },
            { x: 1, y: 9 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 9 },
            { x: 3, y: 9 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 9 },
            { x: 5, y: 9 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 9 },
            { x: 7, y: 9 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 11 },
            { x: 1, y: 11 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 11 },
            { x: 3, y: 11 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 11 },
            { x: 5, y: 11 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 11 },
            { x: 7, y: 11 }
          ),
        },
      },
    }

    const animations: Record<
      'explosion-small' | 'explosion-big' | 'reborn',
      CoordsWithSizeCoords[]
    > = {
      'explosion-small': [
        getSpriteItemPosition({ x: 16, y: 8 }), //start
        getSpriteItemPosition({ x: 17, y: 8 }),
        getSpriteItemPosition({ x: 18, y: 8 }), //end
      ],
      'explosion-big': [
        getSpriteItemPosition({
          x: 19,
          y: 8,
          w: spriteWidth * 2,
          h: spriteHeight * 2,
        }), //start
        getSpriteItemPosition({
          x: 21,
          y: 8,
          w: spriteWidth * 2,
          h: spriteHeight * 2,
        }), //end
      ],
      reborn: [
        getSpriteItemPosition({ x: 16, y: 6 }), //start
        getSpriteItemPosition({ x: 17, y: 6 }),
        getSpriteItemPosition({ x: 18, y: 6 }),
        getSpriteItemPosition({ x: 19, y: 6 }), //end
      ],
    }

    const bullet: Bullet = [
      getSpriteItemPosition({
        x: 20,
        y: 6,
        w: spriteWidth / 2,
        h: spriteHeight / 2,
      }), //up
      getSpriteItemPosition({
        x: 20,
        y: 6,
        w: spriteWidth / 2,
        h: spriteHeight / 2,
      }), //left
      getSpriteItemPosition({
        x: 20,
        y: 6,
        w: spriteWidth / 2,
        h: spriteHeight / 2,
      }), //down
      getSpriteItemPosition({
        x: 20,
        y: 6,
        w: spriteWidth / 2,
        h: spriteHeight / 2,
      }), //right
    ]

    const stage: Stage = {
      brick: getSpriteItemPosition({ x: 8, y: 5.5 }),
      steel: getSpriteItemPosition({ x: 6, y: 6.5 }),
      forest: getSpriteItemPosition({ x: 9, y: 7.5 }),
      river: getSpriteItemPosition({ x: 8, y: 7.5 }),
      eagle: getSpriteItemPosition({ x: 11, y: 7.5 }),
      eagleDamaged: getSpriteItemPosition({ x: 12, y: 7.5 }),
    }

    return { tanks, bullet, animations, stage }
  }

  drawImage({
    ctx,
    spritePosition,
    canvasPosition,
  }: {
    ctx: CanvasRenderingContext2D
    spritePosition: CoordsWithSizeCoords
    canvasPosition: Coords
  }) {
    const { x: sx, y: sy, w: sw, h: sh } = spritePosition
    const { x: cx, y: cy } = canvasPosition

    ctx.drawImage(
      this.spriteImage,
      sx,
      sy,
      sw,
      sh,
      cx,
      cy,
      sw * canvasItemScale,
      sh * canvasItemScale
    )
  }

  checkIntersection = ({
    movedItemCoords,
    blockCoords,
    movementDirection,
  }: {
    movedItemCoords: Coords
    blockCoords: Coords
    movementDirection: keyof typeof MovementDirection
  }) => {
    switch (movementDirection) {
      case MovementDirection.up:
        return (
          movedItemCoords.y > blockCoords.y * blockHeight && // intersection by x coord
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight && // intersection by y coord
          movedItemCoords.x + blockWidth > blockCoords.x * blockWidth && // intersection by right y coord
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth // intersection by left y coord
        )
      case MovementDirection.down:
        return (
          movedItemCoords.y < blockCoords.y * blockHeight && // intersection by x coord
          movedItemCoords.y + blockHeight > blockCoords.y * blockHeight && // intersection by y coord
          movedItemCoords.x + blockWidth > blockCoords.x * blockWidth && // intersection by right y coord
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth // intersection by left y coord
        )
      case MovementDirection.left:
        return (
          movedItemCoords.x > blockCoords.x * blockWidth && // intersection by x coord
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth && // intersection by x coord
          movedItemCoords.y + blockHeight > blockCoords.y * blockHeight && // intersection by bottom y coord
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight // intersection by top y coord
        )
      case MovementDirection.right:
        return (
          movedItemCoords.x < blockCoords.x * blockWidth && // intersection by x coord
          movedItemCoords.x + blockWidth > blockCoords.x * blockWidth && // intersection by x coord
          movedItemCoords.y + blockHeight > blockCoords.y * blockHeight && // intersection by bottom y coord
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight // intersection by top y coord
        )
    }
  }
}

export const gameUI = new GameUI()
