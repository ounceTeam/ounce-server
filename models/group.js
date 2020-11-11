module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      groupCategory: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      authTime: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      peopleSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxPeopleSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      monday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      tuesday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      wednesday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      thursday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      friday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      saturday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      sunday: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      charset: "utf8", //  한글+이모티콘
      collate: "utf8_general_ci",
      timestamps: true,
    }
  );
  Group.associate = (db) => {
    db.Group.hasMany(db.Post); // 테이블에 UserId 컬럼이 생겨요
    db.Group.hasMany(db.Image);
    db.Group.hasMany(db.Group_User);
    db.Group.hasMany(db.Group_Notice);
    //db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Group;
};
