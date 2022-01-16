const config = {
    port: process.env.PORT || 5000,



    redis_host: process.env.REDIS_HOST || 'localhost',
    redis_port: process.env.REDIS_PORT || '6379',
}

export default config