const constants = require("../constants");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(constants.TABLES.COUNTRIES, {
    countryId: {
      field: constants.PRIMARY_KEYS.COUNTRIES,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    codeISO2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    codeISO3: {
      type: Sequelize.STRING,
      allowNull: false
    },
    enabled: {
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
    .query(`ALTER TABLE \`${constants.TABLES.COUNTRIES}\` CONVERT TO CHARACTER SET \`utf8\` COLLATE \`utf8_unicode_ci\`;`)),
  down: queryInterface => queryInterface.dropTable(constants.TABLES.COUNTRIES)
};
