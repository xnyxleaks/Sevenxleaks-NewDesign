module.exports = (sequelize, DataTypes) => {
  const WesternContent = sequelize.define("WesternContent", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mega: { // Mega
      type: DataTypes.STRING,
      allowNull: false,
    },
      mega2:{ // Mega 2
      type: DataTypes.STRING,
      allowNull: true,
    },
    pixeldrain:{ // Pixeldrain
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdmavenMega:{ // AdmavenMega
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdmavenMega2:{ // AdmavenMega2
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdmavenPixeldrain:{ // AdmavenPixeldrain
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

  return WesternContent;
};
