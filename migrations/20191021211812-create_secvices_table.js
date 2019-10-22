'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("services",{
      id:{
          type : Sequelize.INTEGER,
          autoIncrement  :true,
          allowNull : false,
          primaryKey : true,
      },
      heading : {
          type : Sequelize.STRING,
          unique : true,
          max : 100,

      },
      description : {
          type : Sequelize.TEXT,
      },
      imageUrl:{
          type:Sequelize.STRING,
          isUrl : true,
          allowNull : true,
          unique : true,
          notEmpty:false,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("services")
  }
};
