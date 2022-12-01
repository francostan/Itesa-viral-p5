"use strict";
const bc = require("bcrypt");
const { Model } = require("sequelize");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const SECRET = "prueba";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.award);
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
    async signAddress(address) {
      return (this.address = signedAddress);
    }
  }
  User.init(
    {
      nick_name: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      secret: DataTypes.STRING,
      address: { type: DataTypes.STRING, unique: true },
      viral_code: { type: DataTypes.STRING, unique: true },


      admin: DataTypes.BOOLEAN,

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
    user.secret = temp_secret.base32;
    user.viral_code = `viral.${user.nick_name}`;
    return user
      .createHash(user.password, user.salt)
      .then((result) => {
        user.password = result;
      })
      .then()
      .catch((err) => console.log(err));
  });

  User.addHook("beforeUpdate", (user) => {
    const token = jwt.sign(user.address, SECRET, {});
    user.address = token;
    return user;
  });

  return User;
};
