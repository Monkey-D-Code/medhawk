'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("appointments",{
      id:{
          type : Sequelize.INTEGER,
          autoIncrement  :true,
          allowNull : false,
          primaryKey : true,
      },
      fullName :{
          type:Sequelize.STRING,
      },
      email:Sequelize.STRING,
      phoneNumber : Sequelize.INTEGER,
      problem:Sequelize.TEXT,
      address :Sequelize.TEXT,
      createdAt : Sequelize.TIME,
      updatedAt:Sequelize.TIME,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("appointments");
  }
};
