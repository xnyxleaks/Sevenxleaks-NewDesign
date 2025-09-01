module.exports = (sequelize, DataTypes) => {
  const VipWesternContent = sequelize.define("VipWesternContent", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mega: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mega2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pixeldrain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdmavenMega: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdmavenMega2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdmavenPixeldrain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail: {
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

  return VipWesternContent;
};