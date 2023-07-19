'use strict';
const { queryInterface, Sequelize } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rounds', [
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 1, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 2, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 3, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {room_id: 4, word_id: null, picture_url: null, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rounds', null, {});
  }
};