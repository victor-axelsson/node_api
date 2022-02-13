import { DataTypes, Model } from 'sequelize';
import constants from '../constants';

class Country extends Model {

    static doInit(sequelize) {
        Country.init({
            countryId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            name: DataTypes.STRING,
            codeISO2: DataTypes.STRING,
            codeISO3: DataTypes.STRING,
            enabled: DataTypes.BOOLEAN,
            defaultLanguageId: DataTypes.INTEGER,
            createdAt: constants.DATA_TYPES.TIMESTAMP,
            updatedAt: constants.DATA_TYPES.TIMESTAMP
        }, {
            sequelize
        });
        return Country;
    }

    static associate(models) {
        this.belongsToMany(models.Language, {
            through: constants.sequelize.TABLES.COUNTRY_LANGUAGES,
            as: constants.sequelize.ALIASES.LANGUAGES,
            foreignKey: constants.sequelize.PRIMARY_KEYS.COUNTRIES,
            otherKey: constants.sequelize.PRIMARY_KEYS.LANGUAGES
        });

        this.belongsTo(models.Language, {
            as: constants.sequelize.ALIASES.DEFAULT_LANGUAGE,
            foreignKey: constants.sequelize.FOREIGN_KEY.DEFAULT_LANGUAGE_ID,
            targetKey: constants.sequelize.PRIMARY_KEYS.LANGUAGES
        });
    }
}

export default Country;
