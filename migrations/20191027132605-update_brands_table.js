'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn("brands","shortName",{
        
      type : Sequelize.STRING,
      allowNull:true,
      
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("brands","shortName",{
        
      type : Sequelize.STRING,
      allowNull:false,
      
   })
  }
};
