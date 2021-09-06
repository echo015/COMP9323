from flask import Blueprint
from flask_restplus import Api
from main.function import login,user,task, dashboard, meeting,notes


blueprint = Blueprint("api", __name__)

api = Api(
    blueprint,
    title='9323',
    version='1.0',
    description='The back-end apis for 9323'
)


api.add_namespace(login.login_ns, "/login")



api.add_namespace(user.user_ns, "/user")

api.add_namespace(task.task_ns, "/task")

api.add_namespace(meeting.meeting_ns, "/meeting")

api.add_namespace(dashboard.dashboard_ns, "/dashboard")

api.add_namespace(notes.notes_ns, "/notes")


