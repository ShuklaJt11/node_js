'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('playlists', [
      {
        name: 'Shoot to Thrill'
      },
      {
        name: 'Back in Black'
      },
      {
        name: 'Stiff Upper Lip'
      },
      {
        name: 'Dirty Deeds'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('playlists', null, {});
  }
};
