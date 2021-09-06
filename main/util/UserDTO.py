from flask_restplus import fields, Namespace,reqparse


user_namespace = Namespace("User", description="User Apis")


class UserDto:
    # mentor models
    user_data_model = user_namespace.model("user_data", {
        'id': fields.Integer,
        'firstName': fields.String,
        'lastName': fields.String,
        'email': fields.String,
    })

    user_returned = user_namespace.model("user_returned", {
        'status': fields.Integer,
        'success': fields.Boolean,
        'msg': fields.String,
        'data': fields.List(fields.Nested(user_data_model))
    })

    user_failed = user_namespace.model("user_failed", {
        'status': fields.Integer,
        'success': fields.Boolean,
        'msg': fields.String
    })

    user_required = user_namespace.model("user_required", {
        'firstName': fields.String,
        'lastName': fields.String,
        'password':fields.String

    })

