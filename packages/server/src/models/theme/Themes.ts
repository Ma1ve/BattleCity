import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'

import Users from '../user/Users'

export enum ETheme {
  DARK = 'dark',
  LIGHT = 'light',
}

@Table({
  tableName: 'themes',
} as Record<string, string>)
class Themes extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  override id!: number

  @Column(DataType.ENUM(ETheme.DARK, ETheme.LIGHT))
  theme!: ETheme

  @ForeignKey(() => {
    return Users
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId!: number

  @BelongsTo(() => {
    return Users
  })
  user!: Users
}

export default Themes
