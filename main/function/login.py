from flask_restplus import  Resource,marshal
from flask import  request
from main.helper import *
from main.util.loginDTO import *
from main.model.db_model import *
import jwt
import time

login_ns =  login_namespace

SECRET = 'comp932333'

def generateToken(email, password):
    global SECRET
    payload = {
        'email': email,
        'password': password,
        'timestamp': time.time()
    }
    #print(payload)
    encoded = jwt.encode(payload, SECRET, algorithm = 'HS256').decode('utf-8')
    return encoded # return token in utf-8 string format

def getUserFromToken(token):
    global SECRET
    try:
        payload = jwt.decode(bytes(token, 'utf-8'), SECRET,
                             algorithms = 'HS256')
    except Exception:
        # FIXME
        raise Exception("Error occurs when decoding token")

    return payload # dictionary


@login_ns.route("/user")
# /login/user
class UserLogin(Resource):
    @login_ns.expect(LoginDto.user_login_required)
    @login_ns.response(201, "Success", model=LoginDto.user_login_returned)
    @login_ns.response(400, 'Invalid Request', model=LoginDto.user_login_failed)
    @login_ns.response(422, 'Unprocessable to Database', model=LoginDto.user_login_failed)

    def post(self):
        # get data from POST request
        email = request.json.get('email')
        password = request.json.get('password')

        # check information
        if not email:
            result = dict(status=400, success=False, msg='Please enter email', data=[])
            return marshal(result, LoginDto.user_login_failed)
        else:
            if not is_valid_email(email):
                result = dict(status=400, success=False, msg='Wrong email type', data=[])
                return marshal(result, LoginDto.user_login_failed)
        if not password:
            result = dict(status=400, success=False, msg='Please enter password.', data=[])
            return marshal(result, LoginDto.user_login_failed)

        # select data by employee_id from db

        user = User.query.filter_by(email=email).first()

        # if not data
        if user is None:
            result = dict(status=204, success=False, msg='user is not exit.', data=[])
            return marshal(result, LoginDto.user_login_failed)

        # password is incorrect
        elif user.password != password:
            result = dict(status=400, success=False, msg='Password is incorrect.', data=[])
            return marshal(result, LoginDto.user_login_failed)

        # correct information
        else:
            try:

                instance = User.query.filter_by(email=email).first()
                data_d = data_to_dict(instance, User)

                result = dict(status=200, success=True, msg='Successfully Login', data=[data_d])
                return marshal(result, LoginDto.user_login_returned)
            except:
                result = dict(status=422, success=False, msg='Cannot Login.', data=[])
                return marshal(result, LoginDto.user_login_failed)



