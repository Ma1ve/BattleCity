import { Table, Model, Column, DataType, HasOne } from "sequelize-typescript";
import Themes from "./Themes";

@Table({
  tableName: "users"
} as Record<string, string>)

class Users extends Model {
  @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
  })
  override id!: number;

  @HasOne(() => {
    return Themes;
  })
  theme!: Themes;
}

export default Users;