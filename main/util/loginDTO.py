from flask_restplus import fields, Namespace

login_namespace = Namespace("login", description="Login Apis")

class LoginDto:
    # student_data_model models
    user_data_model = login_namespace.model("user_data", {
        'id': fields.Integer,
        'firstName': fields.String,
        'lastName': fields.String,
        'email': fields.String,
        'role':fields.String
    })

    user_login_required = login_namespace.model('user_login_required', {
        'email': fields.String(required=True),
        'password': fields.String(required=True)
    })

    user_login_returned = login_namespace.model("user_login_returned", {
        'status': fields.Integer,
        'success': fields.Boolean,
        'msg': fields.String,
        'data': fields.List(fields.Nested(user_data_model))
    })

    user_login_failed = login_namespace.model("user_login_failed", {
        'status': fields.Integer,
        'success': fields.Boolean,
        'msg': fields.String
    })


