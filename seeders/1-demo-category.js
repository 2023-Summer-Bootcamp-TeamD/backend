'use strict';

const { queryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {category: '음식', createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category: '동물', createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category: '인물', createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category: '랜덤', createdAt: new Date(), updatedAt: new Date(), is_deleted: null}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};