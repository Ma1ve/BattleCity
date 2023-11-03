import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'emoji',
  timestamps: false,
} as Record<string, any>)
class Emoji extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  override id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string
}

export default Emoji
