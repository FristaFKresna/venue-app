import {Sequelize} from 'sequelize'

const {MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME} = process.env

const sequelize = new Sequelize(MYSQL_DBNAME, MYSQL_USER, MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    port: process.env.DB_PORT,
    define: {
        timestamps: false,
    }
  })

  
export default sequelize