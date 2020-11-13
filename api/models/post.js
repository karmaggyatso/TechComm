'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init({
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 250],
        notEmpty: true,
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 100],
        notEmpty: true,
        unique: true,
      }
    },
    postType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['rent','job']],
        notEmpty: true,
      }
    },
  }, {
    sequelize,
    modelName: 'post'
  });

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {through: 'User_Posts'});
  };

  return Post;
};