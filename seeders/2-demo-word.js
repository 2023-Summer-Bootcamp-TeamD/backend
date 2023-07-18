'use strict';

const { queryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Words', [
      {category_id: 1, word: "사과", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "바나나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "고양이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "개", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "경찰관", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "이순신", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "사과", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "이순신", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};