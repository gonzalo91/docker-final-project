const config = {
    port: process.env.PORT || 5000,

    env: process.env.APP_ENV || 'production',


    redis_host: process.env.REDIS_HOST || 'localhost',
    redis_port: process.env.REDIS_PORT || '6379',
    redis_user: process.env.REDIS_USER || 'default',
    redis_pass: process.env.REDIS_PASS || '',
    redis_db: process.env.REDIS_DB || '0',

    jwt_secret: process.env.JWT_SECRET || '',
}

export default config