import Dal from './';

class DbBuilder {
    inMemoryDB() {
        return new Dal('sqlite::memory:');
    }

    mysqlDB() {
        const dbCOnfig = {
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            dialect: process.env.DB_CONNECTION || `mysql`,
            seederStorage: `sequelize`,
            dialectOptions: {
                charset: `utf8mb4`
            },
            logging: (str) => {
                if (process.env.DB_LOGGING && process.env.DB_LOGGING !== `false`) {
                    console.log(str);
                }
            }
        };

        return new Dal(dbCOnfig);
    }
}

const dbBuilder = new DbBuilder();
export default dbBuilder; 