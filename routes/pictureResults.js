import express from 'express';
import mysql from 'mysql2';

const router = express.Router();

const CategoryRouter = (db) => {
    // API endpoint
    router.get('/api/v1/results/category/:category_id', (req, res) => {
        const categoryId = req.params.category_id;
        const wordToFilter = req.query.word; // Get the word filter parameter value

        // Build the query to filter by category_id and word (if provided)
        let query = `
            SELECT Words.word, Rounds.picture_url
            FROM Words
            INNER JOIN Rounds ON Words.id = Rounds.word_id
            WHERE Words.category_id = ?
        `;
        const queryParams = [categoryId];

        if (wordToFilter) {
            query += ' AND Words.word = ?';
            queryParams.push(wordToFilter);
        }

        db.query(query, queryParams, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'An error occurred', specificError: error.message });
            } else {
                res.status(200).json(results);
            }
        });
    });

    return router;
};

export default CategoryRouter;