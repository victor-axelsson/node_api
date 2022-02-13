import { DataTypes, Model } from 'sequelize';
import constants from '../constants';

class Language extends Model {

    static doInit(sequelize) {
        Language.init({
            languageId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            name: DataTypes.STRING,
            codeISO2: DataTypes.STRING,
            codeISO3: DataTypes.STRING,
            enabled: DataTypes.BOOLEAN,
            createdAt: constants.DATA_TYPES.TIMESTAMP,
            updatedAt: constants.DATA_TYPES.TIMESTAMP
        }, { sequelize });
        return Language;
    }
}

export default Language;
