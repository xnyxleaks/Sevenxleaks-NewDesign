// models/Vip.js
module.exports = (sequelize, DataTypes) => {
    const Vip = sequelize.define('Vip', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mega: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mega2:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      pixeldrain:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      admavenmega:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      admavenmega2:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      admavenpixeldrain:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      thumbnail:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return Vip;
  };
  