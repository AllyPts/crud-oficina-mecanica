'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdemServico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdemServico.init({
    veiculo_id: DataTypes.INTEGER,
    funcionario_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    data_abertura: DataTypes.DATE,
    data_conclusao: DataTypes.DATE,
    valor_total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrdemServico',
  });
  return OrdemServico;
};