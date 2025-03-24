import { Sequelize } from "sequelize";

import configDatabase from "../config/database";

import User from "../app/models/User"; // Importe seus models aqui

const models = [User]; // Defina o array de models

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(configDatabase);
        for (const model of models) {
            model.init(this.connection);
        }
    }
}

export default new Database();
