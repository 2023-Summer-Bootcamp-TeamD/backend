import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
const router = express.Router();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,  
      dialect: 'mysql',
      logging: false
    }
);

const Rounds = sequelize.define('Rounds', {
    room_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    word_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {});



const Words = sequelize.define('Words', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    word: {
      type: DataTypes.STRING,
      allowNull: true 
    }
}, {});

Words.hasOne(Rounds, { foreignKey: 'word_id' });
Rounds.belongsTo(Words, { foreignKey: 'word_id' });


const CategoryRouter = () => {
    router.get('/api/v1/results/categories/:category_id/words', async (req, res) => {
        const categoryId = req.params.category_id;
        const wordToFilter = req.query.word;

        try {
            const whereOptions = { category_id: categoryId };
            if (wordToFilter) {
                whereOptions.word = wordToFilter;
            }

            const wordsWithPictures = await Words.findAll({
                where: whereOptions,
                attributes: ['id', 'category_id', 'word'],
                include: [{
                    model: Rounds,
                    as: 'Round',
                    attributes: ['picture_url']
                }],
                raw: true
            });

            res.status(200).json(wordsWithPictures);
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred', specificError: error.message });
        }
    });

    return router;
};

export default CategoryRouter;