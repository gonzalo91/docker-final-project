import os

class Config:

    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_NAME = os.environ.get('DB_DATABASE', 'loans')
    DB_USER = os.environ.get('DB_USERNAME', 'user')
    DB_PASS = os.environ.get('DB_PASSWORD', 'pass_user')