const config = {
    development: {
        database: {
            host: process.env.DB_DEV_HOST,
            db: process.env.DB_DEV
        },
    },
    production: {
        database: {
            host: process.env.DB_PROD_HOST,
            db: process.env.DB_PROD
        },
    },
    test: {
        database: {
            host: process.env.DB_TEST_HOST,
            db: process.env.DB_TEST
        }
    }
};
module.exports = config;