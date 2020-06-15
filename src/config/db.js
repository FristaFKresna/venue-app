import {Sequelize} from 'sequelize'

const {MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME} = process.env

const sequelize = new Sequelize(MYSQL_DBNAME, MYSQL_USER, MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
    define: {
        timestamps: false,
    }
  })

  
export default sequelize