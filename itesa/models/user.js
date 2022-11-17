"use strict";
const { Model } = require("sequelize");
const bc = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    createHash(string, salt) {
      return bc.hash(string, salt);
    }
    validatePassword(password) {
      return bc
        .hash(password, this.salt)
        .then((hash) => hash === this.password);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      // password: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: { len: [8, 20] },
      // },
      // salt: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  // User.addHook("beforeCreate", (User) => {
  //   User.salt = bc.genSaltSync();
  //   return User.createHash(User.password, User.salt)
  //     .then((result) => {
  //       User.password = result;
  //     })
  //     .catch((err) => console.log(err));
  // });

  return User;
};
