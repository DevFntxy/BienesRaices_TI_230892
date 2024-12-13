import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Garantiza que no haya emails duplicados
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto, las cuentas no están confirmadas
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "default.jpg", // Imagen predeterminada
    },
  },
  {
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
    },
    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: ["password", "token", "confirmado", "createdAt", "updatedAt"],
        },
      },
    },
  }
);

Usuario.prototype.verificarPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default Usuario;
