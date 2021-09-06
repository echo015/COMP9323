from flask_restplus import fields, Namespace,reqparse


task_namespace = Namespace("Task", description="Task Apis")


class TaskDto:
    # Task models
    add_task_data_model = task_namespace.model("add_task_data", {
        'User_email': fields.String,
        'Task_title': fields.String,
        'StartTime': fields.String,
        'EndTime': fields.String,
        'Creator_email': fields.String,
        'Creator_name': fields.String,
        'Recv_email': fields.String,  # split by ,
        'Task_status': fields.String,
        'Description': fields.String,
    })

    edit_task_data_model = task_namespace.model("edit_task_data", {
        'Task_ID': fields.String,
        'Task_title': fields.String,
        'StartTime': fields.String,
        'EndTime': fields.String,
        'Recv_email': fields.String,
        'Task_status': fields.String,
        'Description': fields.String,
    })

    delete_task_data_model = task_namespace.model("delete_task_data", {
        'Task_ID': fields.String,
    })

    modify_task_data_model = task_namespace.model("modify_task_data", {
        'Task_ID': fields.String,
        'Task_status': fields.String,
    })

