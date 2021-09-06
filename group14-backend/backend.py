# -*- coding: utf-8 -*-
import json

from flask import Flask
from flask import request
from flask_restx import Resource, Api
from flask_restx import fields
from flask_restx import inputs
from flask_restx import reqparse
from flask import send_file

# 连接数据库 SQLAlchemy + PyMySQL
# import SQLAlchemy
import math
import time
from datetime import datetime

# set the Hostname and Port Number
HOST_NAME = '127.0.0.1'
PORT = '5000'

# database initial
def initial_db():
    pass


app = Flask(__name__)
api = Api(app)


@api.route('/user_profile/')
@api.response(200, 'OK')
@api.response(201, 'Created')
@api.response(400, 'Bad Request')
@api.response(404, 'Not Found')
class UserProfile(Resource):
    @api.doc(params={'id': 'desc'})
    def get(self, id):
        return {"msg": "return message"
                }, 200

    @api.doc(params={'id': 'desc'})
    def delete(self, id):
        pass

    @api.doc(params={'id': 'desc'})
    def patch(self, id):
        return {"msg": "return message"
                }, 200


if __name__ == '__main__':
    initial_db()
    app.run(host=HOST_NAME, port=PORT, debug=True)
