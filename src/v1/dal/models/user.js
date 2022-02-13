import { DataTypes, Model } from 'sequelize';
import constants from '../constants';
import crypto from '../../lib/crypto';

class User extends Model {
    static doInit(sequelize) {
        User.init({
            userId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                get() {
                    try {
                        const encryptedEmail = this.getDataValue(`email`);
                        if (encryptedEmail) {
                            return crypto.decrypt(encryptedEmail);
                        }

                        return null;
                    } catch (error) {
                        console.log(`Could not decrypt user email`, error);
                        return null;
                    }
                },
                set(value) {
                    const email = value ? crypto.encrypt(String(value)) : null;
                    this.setDataValue(`email`, email);
                }
            },
            blocked: DataTypes.BOOLEAN,
            countryId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            languageId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            createdAt: constants.DATA_TYPES.TIMESTAMP,
            updatedAt: constants.DATA_TYPES.TIMESTAMP
        }, {
            sequelize
        });
        return User;
    }

    static associate(models) {
        this.belongsToMany(models.Role, {
            through: constants.TABLES.USER_ROLES,
            as: constants.ALIASES.ROLES,
            foreignKey: constants.PRIMARY_KEYS.USERS,
            otherKey: constants.PRIMARY_KEYS.ROLES
        });
        this.belongsTo(models.Language, {
            as: constants.sequelize.ALIASES.LANGUAGE,
            foreignKey: constants.sequelize.PRIMARY_KEYS.LANGUAGES
        });
        this.belongsTo(models.Country, {
            as: constants.sequelize.ALIASES.COUNTRY,
            foreignKey: constants.sequelize.PRIMARY_KEYS.COUNTRIES
        });
    }
}

export default User;
