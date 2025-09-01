module.exports = (sequelize, DataTypes) => {
  const VipUnknownContent = sequelize.define("VipUnknownContent", {
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
      defaultValue: 'VIP Unknown',
    },
    region: {
      type: DataTypes.ENUM('asian', 'western'),
      allowNull: false,
      defaultValue: 'asian',
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return VipUnknownContent;
};