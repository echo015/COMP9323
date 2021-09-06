from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

# database ORM instance
db = SQLAlchemy()
# database connection URI
# db_URI = 'mysql+pymysql://root:z5231438@127.0.0.1:3306/9323'
# db_URI = 'mysql+pymysql://root:@127.0.0.1:3306/9323'
# db_URI = 'mysql+pymysql://root:z5231438@127.0.0.1:3306/9900'
db_URI = 'mysql+pymysql://root:123456@127.0.0.1:3306/test_db'
def create_app():
    app = Flask(__name__)
    # Configuration for flask app and database connection
    app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['DEBUG'] = True
    # initialize the database instance with this app
    db.init_app(app)
    CORS(app)
    return app
