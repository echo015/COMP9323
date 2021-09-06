from flask import request
from flask_restplus import Resource, marshal
from main.helper import *

from main.util.TaskDTO import *
from main.model.db_model import *

task_ns = task_namespace

# add task
@task_ns.route('/user/add_task')
class AddTask(Resource):
    @task_ns.expect(TaskDto.add_task_data_model)
    def post(self):
        User_email = request.json.get('User_email')
        Task_title = request.json.get('Task_title')
        StartTime = request.json.get('StartTime')
        EndTime = request.json.get('EndTime')
        Creator_email = request.json.get('Creator_email')
        Creator_name = request.json.get('Creator_name')
        Recv_email = request.json.get('Recv_email')
        Task_status = request.json.get('Task_status')
        Description = request.json.get('Description')

        task_db_insert = Tasks(User_email=User_email, Task_title=Task_title, StartTime=StartTime, EndTime=EndTime,
                               Creator_email=Creator_email, Creator_name=Creator_name, Recv_email=Recv_email,
                               Task_status=Task_status,
                               Description=Description)
        db.session.add(task_db_insert)
        db.session.commit()
        return {'message': 'success','status': 200, 'task_ID': task_db_insert.Task_ID}, 200

    """@task_ns.param('User_email', 'The email of The user who login')
    @task_ns.param('Task_title', 'Task title.')
    @task_ns.param('StartTime', 'The start time of Task.')
    @task_ns.param('EndTime', 'The End time of Task.')
    @task_ns.param('Creator_email', 'The Creator_email of Task.')
    @task_ns.param('Creator_name', 'The Creator_name of Task.')
    @task_ns.param('Recv_email', 'The participates of Task. Split by ","')
    @task_ns.param('Task_status', 'The Task_status of Task.')
    @task_ns.param('Description', 'The description of Task.')
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('User_email', type=str, required=True, location='args')
        parser.add_argument('Task_title', type=str, required=True, location='args')
        parser.add_argument('StartTime', type=str, required=True, location='args')
        parser.add_argument('EndTime', type=str, required=True, location='args')
        parser.add_argument('Creator_email', type=str, required=True, location='args')
        parser.add_argument('Creator_name', type=str, required=True, location='args')
        parser.add_argument('Recv_email', type=str, required=True, location='args')
        parser.add_argument('Task_status', type=str, required=True, location='args')
        parser.add_argument('Description', type=str, required=True, location='args')

        User_email = parser.parse_args().get('User_email')
        Task_title = parser.parse_args().get('Task_title')
        StartTime = parser.parse_args().get('StartTime')
        EndTime = parser.parse_args().get('EndTime')
        Creator_email = parser.parse_args().get('Creator_email')
        Creator_name = parser.parse_args().get('Creator_name')
        Recv_email = parser.parse_args().get('Recv_email')
        Task_status = parser.parse_args().get('Task_status')
        Description = parser.parse_args().get('description')

        # A push the task to B,C,D in the Database is like:
        # A -> B, C, D
        # todo check the format of start time and end time
        task = Task(title=task_title, description=description, start_time=datetime.now(), end_time=datetime.now(),
                    completed_time=None, task_status=0, publisher=username, receiver_list=participates)
        db.session.add(task)
        db.session.commit()
        print(User_email)
        print(Task_title)
        print(StartTime)
        print(EndTime)
        print(Creator_email)
        print(Creator_name)
        print(Recv_email)
        print(Task_status)
        print(Description)

        return {'message': 'success'}, 200"""


@task_ns.route('/user/task_list')
class TaskList(Resource):
    @task_ns.param('email', 'The email of user who login.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, location='args')
        email_addr = parser.parse_args().get('email')
        Task_Query = db.session.query(Tasks).all()
        My_Task_list = []

        for task_record in Task_Query:
            if email_addr in task_record.__dict__['Recv_email'].split('\n') or email_addr==task_record.Creator_email:
                temp_result = {'Task_ID': task_record.__dict__['Task_ID'],
                               'User_email': task_record.__dict__['User_email'],
                               'Task_title': task_record.__dict__['Task_title'],
                               'StartTime': task_record.__dict__['StartTime'],
                               'EndTime': task_record.__dict__['EndTime'],
                               'Creator_email': task_record.__dict__['Creator_email'],
                               'Creator_name': task_record.__dict__['Creator_name'],
                               'Recv_email': task_record.__dict__['Recv_email'],
                               'Task_status': task_record.__dict__['Task_status'],
                               'Description': task_record.__dict__['Description'],
                               }
                My_Task_list.append(temp_result)
        print(type({'My_Task_list': My_Task_list}))
        return {'My_Task_list': My_Task_list, 'status':200}, 200

# edit task
@task_ns.route('/user/edit_task')
class EditTask(Resource):
    @task_ns.expect(TaskDto.edit_task_data_model)
    def post(self):
        Task_ID = request.json.get('Task_ID')
        Task_title = request.json.get('Task_title')
        StartTime = request.json.get('StartTime')
        EndTime = request.json.get('EndTime')
        Recv_email = request.json.get('Recv_email')
        Task_status = request.json.get('Task_status')
        Description = request.json.get('Description')
        # A push the task to B,C,D in the Database is like:
        # A -> B, C, D
        res = db.session.query(Tasks).filter(Tasks.Task_ID == Task_ID).update({
            "Task_title": Task_title,
            "StartTime": StartTime,
            "EndTime": EndTime,
            "Recv_email": Recv_email,
            "Task_status": Task_status,
            "Description": Description,
        })
        print(res)
        db.session.commit()
        db.session.close()
        return {'message': 'success', 'status':200}, 200

# delete_task
@task_ns.route('/user/delete_task')
class DeleteTask(Resource):
    @task_ns.param('Task_ID', 'The ID of task.')
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Task_ID', type=str, required=False, location='args')
        Task_ID = parser.parse_args().get('Task_ID')
        print(Task_ID)
        print(Task_ID is None)
        if Task_ID is None:
            return {'message': 'success', 'status':200}
        res = db.session.query(Tasks).filter(Tasks.Task_ID == Task_ID).delete()
        db.session.commit()
        db.session.close()
        return {'message': 'success', 'status':200}, 200


# modified_task
@task_ns.route('/user/modify_task')
class ModifiedTask(Resource):
    @task_ns.expect(TaskDto.edit_task_data_model)
    def post(self):
        Task_ID = request.json.get('Task_ID')
        Task_status = request.json.get('Task_status')
        # A push the task to B,C,D in the Database is like:
        # A -> B, C, D
        res = db.session.query(Tasks).filter(Tasks.Task_ID == Task_ID).update({
            "Task_status": Task_status,
        })
        db.session.commit()
        db.session.close()
        return {'message': 'success', 'status': 200}

@task_ns.route('/user/get_task')
class GetTask(Resource):
    @task_ns.param('Task_ID', 'The ID of task.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Task_ID', type=str, required=True, location='args')
        Task_ID = parser.parse_args().get('Task_ID')
        res = db.session.query(Tasks).filter(Tasks.Task_ID == Task_ID).scalar()
        return_map = {'Task_ID': res.__dict__['Task_ID'],
                       'User_email': res.__dict__['User_email'],
                       'Task_title': res.__dict__['Task_title'],
                       'StartTime': res.__dict__['StartTime'],
                       'EndTime': res.__dict__['EndTime'],
                       'Creator_email': res.__dict__['Creator_email'],
                       'Creator_name': res.__dict__['Creator_name'],
                       'Recv_email': res.__dict__['Recv_email'],
                       'Task_status': res.__dict__['Task_status'],
                       'Description': res.__dict__['Description'],
                       }
        return {'data': return_map, 'status': 200}

