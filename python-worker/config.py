import os

class Config:

    DB_HOST = os.environ.get('DB_HOST', 'python_host')
    DB_NAME = os.environ.get('DB_DATABASE', 'python_db')
    DB_USER = os.environ.get('DB_USERNAME', 'python_user')
    DB_PASS = os.environ.get('DB_PASSWORD', 'python_pass')