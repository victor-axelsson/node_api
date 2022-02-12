const { Sequelize, Model, DataTypes } = require('sequelize');
import User from '../models/user';
import Role from '../models/role';

export default class DAL {

    constructor(dbType) {
        this._sequelize = new Sequelize(dbType);
    }

    setup() {
        this._models = {
            User: User.doInit(this._sequelize),
            Role: Role.doInit(this._sequelize),
        }
    }
}