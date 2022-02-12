const constants = require("../constants");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(constants.TABLES.USERS, {
    userId: {
      field: constants.PRIMARY_KEYS.USERS,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    blocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: {
      type: constants.DATA_TYPES.TIMESTAMP,
      defaultValue: Sequelize.literal(constants.LITERALS.CURRENT_TIMESTAMP),
      allowNull: false
    },
    updatedAt: {
      type: constants.DATA_TYPES.TIMESTAMP,
      defaultValue: Sequelize.literal(constants.LITERALS.CURRENT_TIMESTAMP),
      allowNull: false
    }
  }).then(() => queryInterface.sequelize
    .query(`ALTER TABLE \`${constants.TABLES.USERS}\` CONVERT TO CHARACTER SET \`utf8\` COLLATE \`utf8_unicode_ci\`;`)),
  down: queryInterface => queryInterface.dropTable(constants.TABLES.USERS)
};
