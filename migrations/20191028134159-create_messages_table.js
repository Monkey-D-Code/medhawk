'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("messages",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    name : {
        type : Sequelize.STRING,
        allowNull:false,
    },
    email : {
        type : Sequelize.STRING,
        isEmail : true,
        allowNull:false,
    },
    subject:{
        type : Sequelize.STRING,
        allowNull:false,
    },
    message : {
        type:Sequelize.TEXT,
        allowNull:false,
    },
    createdAt : Sequelize.DATE,
    updatedAt : Sequelize.DATE,
    creationDate : Sequelize.DATE,

   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("messages");
  }
};
