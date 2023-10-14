import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Comment } from './comment'
import { Reply } from './reply'

@Table
export class Topic extends Model<Topic> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  override id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string

  // Отношение один ко многим с моделью Comment
  @HasMany(() => Comment)
  comments: Comment[]

  // Отношение один ко многим с моделью Reply
  @HasMany(() => Reply)
  replies: Reply[]
}
