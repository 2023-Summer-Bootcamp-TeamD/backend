'use strict';

const { queryInterface, Sequelize } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Words', [
      {category_id: 1, word: "사과", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "바나나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "아이스크림", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "케이크", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "초밥", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "피자", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "계란후라이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "김치", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "고양이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "개", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "기린", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "얼룩말", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "소", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "오리", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "판다", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "사자", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "경찰관", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "이순신", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "김구", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "선생님", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "학생", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "개발자", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "카레이서", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "안중근", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "사과", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "이순신", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "오리", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "케이크", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "고양이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "바나나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "경찰관", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "기린", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};