'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users",{
      id:{
          type : Sequelize.INTEGER,
          autoIncrement  :true,
          allowNull : false,
          primaryKey : true,
      },
      firstName : {
          type : Sequelize.STRING,
          max : 40,
          allowNull : false,

      },
      middleName : {
          type : Sequelize.STRING,
          max:40,
          allowNull : true,
      },
      lastName :{
          type : Sequelize.STRING,
          max:40,
          allowNull:false,
      },
      email:{
          type:Sequelize.STRING,
          isEmail:true,
          allowNull:false,
          max : 100,
          unique:true,
      },
      contactNumber : {
          type:Sequelize.INTEGER,
          max:10,
          min:10,
      },
      displayImageUrl : {
          type : Sequelize.STRING,
          isUrl : true,
          max : 500,
          allowNull:true,
      },
      password : {
          type : Sequelize.STRING,
          min : 8,
          max: 30,
          allowNull:false,
      },
      createdAt:Sequelize.TIME,
      updatedAt:Sequelize.TIME,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
