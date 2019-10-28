'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn("appointments", "creationDate" , {
      type : Sequelize.DATE,
      allowNull : false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("appointments","creationDate");
  }
};
