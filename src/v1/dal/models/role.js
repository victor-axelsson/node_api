import { DataTypes, Model } from 'sequelize';
import constants from '../constants';

class Role extends Model {
    static doInit(sequelize) {
        Role.init({
            roleId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            bit: DataTypes.INTEGER,
            createdAt: constants.DATA_TYPES.TIMESTAMP,
            updatedAt: constants.DATA_TYPES.TIMESTAMP
        }, { sequelize });
        return Role;
    }
}

export default Role;
