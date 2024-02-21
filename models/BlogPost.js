const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('blogPost', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = BlogPost;