'use strict';
const { queryInterface, Sequelize } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rounds', [
      {room_id: 1, word_id: 1, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 2, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 3, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 4, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 5, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 6, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 7, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: 8, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: 9, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: 10, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: 11, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: 12, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: 13, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 13, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 14, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 15, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 16, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 17, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 18, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 19, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: 20, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: 21, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: 22, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: 23, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: 24, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: 25, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: 26, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rounds', null, {});
  }
};