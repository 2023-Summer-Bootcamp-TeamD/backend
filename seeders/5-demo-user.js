'use strict';

const { queryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {round_id: null, room_id: 3, nickname: "노드노드다", score: 0, is_host: 1, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "nodes", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "안녕하세요", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "hello", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "teamD", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "hihih", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "고양양양이", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 3, nickname: "강아지이이", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 4, nickname: "asfdk", score: 0, is_host: 1, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 4, nickname: "antjo", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 4, nickname: "snbki", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 4, nickname: "kbndk", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 4, nickname: "vmkml", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "닉네임이다", score: 0, is_host: 1, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "bnekn", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "wpsld", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "nvjks", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "bmslm", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "qwert", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "asdfg", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 5, nickname: "lkjhg", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 6, nickname: "zxcvb", score: 0, is_host: 1, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 6, nickname: "mnn", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 6, nickname: "sbcw", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 6, nickname: "wtbcx", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 6, nickname: "bhefc", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {round_id: null, room_id: 6, nickname: "ys5rh", score: 0, is_host: 0, createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};