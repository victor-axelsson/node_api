import { DataTypes, Model } from 'sequelize';

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
            createdAt: `TIMESTAMP`,
            updatedAt: `TIMESTAMP`
        }, { sequelize });
        return Role;
    }
}

export default Role;
