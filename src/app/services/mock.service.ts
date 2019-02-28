import { Injectable } from '@angular/core';
import Sequelize from "sequelize";

@Injectable()
export class MockService {
  constructor() { }

  initSequelize(){
    const sequelize = new Sequelize('mockin', 'postgres', '4627Dsru@', {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      operatorsAliases: false
    });
  }
}
