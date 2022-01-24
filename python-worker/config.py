import os

class Config:
    ENV     = os.environ.get('APP_ENV', 'production')

    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_NAME = os.environ.get('DB_DATABASE', 'loans')
    DB_USER = os.environ.get('DB_USERNAME', 'user')
    DB_PASS = os.environ.get('DB_PASSWORD', 'pass_user')


    REDIS_HOST = os.environ.get('REDIS_HOST', 'localhost')
    REDIS_PORT = os.environ.get('REDIS_PORT', '6379')
    REDIS_PASS = os.environ.get('REDIS_PASS', '')
    REDIS_DB = os.environ.get('REDIS_DB', '0')    