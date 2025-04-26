import { QueryInterface, DataTypes } from "sequelize";

export default async function updatePlanIdColumn(queryInterface: QueryInterface) {
  await queryInterface.changeColumn('Plans', 'plan_id', {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  });
}
