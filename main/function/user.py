from flask import  request
from flask_restplus import  Resource,  marshal
from main.helper import *


from main.util.UserDTO import *
from main.model.db_model import *

user_ns = user_namespace


# /user/<u_id>
@user_ns.route("/<u_id>")
class EateryId(Resource):
    @user_ns.response(200, "OK", model=UserDto.user_returned)
    @user_ns.response(404, "Eatery Not Found", model=UserDto.user_failed)
    def get(self, u_id):

        user = User.query.filter_by(id=u_id).first()
        # If eatery is None
        if not user:
            result = dict(status=404, success=False, msg=f"u_id:{u_id} doesn't exist.")
            return marshal(result, UserDto.user_failed)
        result = dict(status=200, success=True, msg="OK", data=[user])
        return marshal(result, UserDto.user_returned)


    # PUT request
    @user_ns.expect(UserDto.user_required)
    @user_ns.response(201, "Success", model=UserDto.user_returned)
    @user_ns.response(400, 'Invalid Request', model=UserDto.user_failed)
    @user_ns.response(422, 'Unprocessable to Database', model=UserDto.user_failed)
    def put(self, u_id):
        firstName = request.json.get('firstName')
        lastName = request.json.get('lastName')
        password = request.json.get('password')

        if not all([firstName, lastName, password]):
            result = dict(status=400, success=False, msg="Invalid request, missing required param.")
            return marshal(result, UserDto.user_failed)

        user = User.query.filter_by(id=u_id).first()

        if not user:
            result = dict(status=404, success=False, msg=f"u_id:{u_id}  doesn't exist.")
            return marshal(result, UserDto.user_failed)


        try:
            user.firstName=firstName
            user.lastName=lastName
            user.password = password
            db.session.add(user)
            db.session.commit()

            result = dict(status=201, success=True, msg='Successfully updated', data=[user])
            return marshal(result, UserDto.user_returned)
        except:
            result = dict(status=422, success=False, msg='Cannot update this student in database.')
            return marshal(result, UserDto.user_failed)

    # DELETE request
    @user_ns.response(404, "Mentor is not found", UserDto.user_failed)
    @user_ns.response(500, "Server error", UserDto.user_failed)
    @user_ns.response(204, "NO CONTENT (DELETE Success)", UserDto.user_failed)
    def delete(self, u_id):
        user_inst = User.query.get(u_id)
        # If student is None
        if not user_inst:
            result = dict(status=404, success=False, msg=f"u_id:{u_id} doesn't exist.")
            return marshal(result, UserDto.user_failed)


        # delete the student instance
        try:
            db.session.delete(user_inst)
            db.session.commit()
            result = dict(status=204, success=True, msg='Successfully deleted.')
            return marshal(result, UserDto.user_failed)
        except:
            result = dict(status=500, success=False, msg='Failed to delete this user in database.')
            return marshal(result, UserDto.user_failed)

@user_ns.route('/student_list')
class student_list(Resource):
    def get(self):
        students = User.query.filter_by(role='student').all()
        student_list = []
        for student in students:
            temp_result = {'id': student.id,
                           'email': student.__dict__['email'],
                           'firstname': student.__dict__['firstName'],
                           'lastname': student.__dict__['lastName'],
                           'role': student.__dict__['role'],
                           }
            student_list.append(temp_result)
        return {'status': 200, 'data': student_list}






