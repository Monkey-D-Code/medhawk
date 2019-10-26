'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("doctors",{
      id:{
          type : Sequelize.INTEGER,
          autoIncrement  :true,
          allowNull : false,
          primaryKey : true,
      },
      name : {
          type :Sequelize.STRING,
          allowNull:false,
      },
      role :{
          type:Sequelize.STRING,
          allowNull:false,
      },
      imageUrl:{
          type : Sequelize.STRING,
          allowNull:false,
          isUrl:true,
      },
      facebookLink:{
          type : Sequelize.STRING,
          allowNull:false,
          isUrl:true,
      },
      twitterLink:{
          type : Sequelize.STRING,
          allowNull:false,
          isUrl:true,
      },
      instagramLink:{
          type : Sequelize.STRING,
          allowNull:false,
          isUrl:true,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("doctors");
  }
};
