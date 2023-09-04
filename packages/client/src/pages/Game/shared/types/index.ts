export type TankOwner = 'player' | 'enemy'
export type Coords = { x: number; y: number }
export type Size = { h: number; w: number }
export type CoordsWithSizeCoords = Coords & Size

export enum Animations {
  explosionSmall = 'explosionSmall',
  reborn = 'reborn',
}

export type Animation = Record<Animations, CoordsWithSizeCoords[]>

export type Bullet = Record<
  keyof typeof MovementDirection,
  CoordsWithSizeCoords
>

enum StageKeys {
  brick,
  steel,
  forest,
  river,
  eagle,
  eagleDamaged,
}

export type Stage = Record<keyof typeof StageKeys, CoordsWithSizeCoords>

export type Tank = Record<
  TankColor,
  Record<
    TankType,
    Record<MovementDirection, [CoordsWithSizeCoords, CoordsWithSizeCoords]>
  >
>

export type Images = {
  tanks: Tank
  bullet: Bullet
  animations: Animation
  stage: Stage
}

export enum TankColor {
  yellow = 'yellow',
  green = 'green',
  silver = 'silver',
  red = 'red',
}

export type PlayerTankColor = TankColor.yellow | TankColor.green
export type EnemyTankColor = TankColor.silver | TankColor.red

export enum TankType {
  basic = 'basic',
  fast = 'fast',
  powerful = 'powerful',
  armored = 'armored',
}

export enum MovementDirection {
  up = 'up',
  left = 'left',
  down = 'down',
  right = 'right',
}

export type DirectionKey = keyof typeof MovementDirection

export type SceneBlockPositions = {
  brick: Coords[]
  eagle: Coords
}

export type ControlKeys = Record<MovementDirection, string>
