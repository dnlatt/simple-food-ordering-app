'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.changeColumn( 'Users', 'userRole', Sequelize.INTEGER );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn( 'Users', 'userRole', Sequelize.STRING );
  }
};
