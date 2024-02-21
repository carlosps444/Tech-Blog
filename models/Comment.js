const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('comment', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Comment;