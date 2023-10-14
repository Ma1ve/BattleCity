import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import { Topic } from './topic'
import { Comment } from './comment'

@Table
export class Reply extends Model<Reply> {
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

  // Отношение многие к одному с моделью Topic
  @ForeignKey(() => Topic)
  @Column
  topicId: number

  @BelongsTo(() => Topic)
  topic: Topic

  // Отношение многие к одному с моделью Comment
  @ForeignKey(() => Comment)
  @Column
  commentId: number

  @BelongsTo(() => Comment)
  comment: Comment
}
