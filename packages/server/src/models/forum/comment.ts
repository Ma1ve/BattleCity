import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import { Topic } from './topic'

@Table
export class Comment extends Model<Comment> {
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
  content: string

  // отношение многие к одному с моделью Topic
  @ForeignKey(() => Topic)
  @Column
  topicId: number

  @BelongsTo(() => Topic)
  topic: Topic
}
