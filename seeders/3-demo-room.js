'use strict';

const { queryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', [
      {category_id: 1, time: 60, player_num: 8, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, time: 80, player_num: 5, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, time: 50, player_num: 8, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, time: 40, player_num: 6, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};