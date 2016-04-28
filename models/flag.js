'use strict';
module.exports = function(sequelize, DataTypes) {
  var flag = sequelize.define('flag', {
    address: DataTypes.TEXT,
    type: DataTypes.TEXT,
    datetime: DataTypes.TEXT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    incident_number: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.flag.belongsTo(models.user);
      }
    }
  });
  return flag;
};