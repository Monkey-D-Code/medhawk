'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("departments",{
      id:{
            type : Sequelize.INTEGER,
            autoIncrement  :true,
            allowNull : false,
            primaryKey : true,
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
        },
        about:{
            type:Sequelize.TEXT,
            allowNull:false,
            
        },
        imageUrl:{
            type:Sequelize.STRING,
            isUrl:true,
            max:500,
            allowNull:false,
        },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("departments");
  }
};
