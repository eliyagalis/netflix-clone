import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

export const changeSubIdToString=async (queryInterface:QueryInterface) => {
    await queryInterface.changeColumn('subscription', 'subscription_id', {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    });
}
