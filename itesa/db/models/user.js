"use strict";
const bc = require("bcrypt");
const { Model } = require("sequelize");
const speakeasy = require("speakeasy");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Invitation);
      // define association here
    }
    createHash(string, salt) {
      //Esta función crea el hash que se almacena en el campo "password" del usuario en la base de datos. Parámetros: password ingresado por usuario y "salt" que se genera de forma aleatoria.
      return bc.hash(string, salt);
    }
    validatePassword(password) {
      //función para validar el password ingresado en el login
      return bc
        .hash(password, this.salt)
        .then((hash) => hash === this.password);
    }
  }
  User.init(
    {
      nick_name: { type: DataTypes.STRING, unique: true },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      unique_code: DataTypes.STRING,
      secret: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  //Reemplaza el password en texto plano por su versión hasheada
  User.addHook("beforeCreate", (user) => {
    var temp_secret = speakeasy.generateSecret({
      length: 30,
    });
    user.salt = bc.genSaltSync();
    user.unique_code = `${user.nick_name}.ITESA`;
    user.secret = temp_secret.base32;
    return user
      .createHash(user.password, user.salt)
      .then((result) => {
        user.password = result;
      })
      .catch((err) => console.log(err));
  });

  return User;
};
