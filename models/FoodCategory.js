'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FoodCategory.init({
    categoryName: DataTypes.STRING
  }, {
    tableName: 'foodcategories',
    sequelize,
    modelName: 'FoodCategory',
    timestamps: true,
    freezeTableName: true,
  });
  return FoodCategory;
};