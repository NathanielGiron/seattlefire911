'use strict';
module.exports = function(sequelize, DataTypes) {
  var flag = sequelize.define('flag', {
    address: DataTypes.TEXT,
    type: DataTypes.TEXT,
    datetime: DataTypes.DATE,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    incident_number: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return flag;
};