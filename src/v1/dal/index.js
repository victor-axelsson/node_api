const { Sequelize, Model, DataTypes } = require('sequelize');
import User from './models/user';
import Role from './models/role';
import Country from './models/country';
import Language from './models/language';

export default class DAL {

    constructor(dbType) {
        this._sequelize = new Sequelize(dbType);
    }

    setup() {
        this._models = {
            User: User.doInit(this._sequelize),
            Role: Role.doInit(this._sequelize),
            Country: Country.doInit(this._sequelize),
            Language: Language.doInit(this._sequelize)
        }
    }

    get User() {
        return this._models.User;
    }
}