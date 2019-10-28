'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("brands",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    fullName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    shortName :{
        type : Sequelize.STRING,
        allowNull:false,
    },
    contactNumber :{
        type : Sequelize.BIGINT,
    },
    email:{
        type : Sequelize.STRING,
        allowNull:false,
    },
    address:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    openHours:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    facebookLink:{
        type:Sequelize.STRING,
        allowNull:true,
        isUrl:true,
    },
    twitterLink:{
        type:Sequelize.STRING,
        allowNull:true,
        isUrl:true,
    },
    instagramLink:{
        type:Sequelize.STRING,
        allowNull:true,
        isUrl:true,
    },
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("brands");
  }
};
