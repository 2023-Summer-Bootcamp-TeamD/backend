'use strict';

const { queryInterface, Sequelize } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Words', [
      //  1 : 음식 2 : 동물, 3: 인물, 4 : 랜덤  it 앤드류 멘토이름
      {category_id: 1, word: "도토리묵", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "바나나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "오이무침", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "케이크", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "회전초밥", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "곰국", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "계란후라이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "부대찌개", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "홍삼", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 1, word: "닭꼬치", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},

      {category_id: 2, word: "철갑상어", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "북극곰", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "기린", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "얼룩말", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "소", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "달팽이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "판다", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "사자", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "북극곰", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 2, word: "대머리독수리", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},

      {category_id: 3, word: "해리포터", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "앤드류", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "켈리", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "준", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "우디", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "루나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "샘", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "아이언맨", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "아바타", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "마동석", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 3, word: "이병헌", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},


      {category_id: 4, word: "도토리묵", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "바나나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "오이무침", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "케이크", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "회전초밥", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "곰국", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "계란후라이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "부대찌개", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "홍삼", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "닭꼬치", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "철갑상어", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "북극곰", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "기린", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "얼룩말", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "소", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "달팽이", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "판다", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "사자", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "북극곰", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "대머리독수리", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "해리포터", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "앤드류", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "켈리", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "준", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "우디", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "루나", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "샘", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "아이언맨", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "아바타", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "마동석", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
      {category_id: 4, word: "이병헌", createdAt: new Date(), updatedAt: new Date(), is_deleted: null},
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};