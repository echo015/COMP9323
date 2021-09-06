from flask_restplus import  Resource,marshal
from flask import  request

from main.helper import *

from main.util.DashboardDTO import *
from main.model.db_model import *
import json
import datetime

dashboard_ns =  dashboard_namespace



@dashboard_ns.route("/meeting")
class getMeeting(Resource):
    @dashboard_ns.param('email', 'The email of user who login.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, location='args')
        email_addr = parser.parse_args().get('email')
    

    # meeting_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    #time = db.Column(db.String(64), nullable=False)
    #status = db.Column(db.String(64), nullable=False)
    #User_email = db.Column(db.String(64))
    #Meeting_title = db.Column(db.String(64))
    #Description = db.Column(db.String(10000))
    #Recv_email = db.Column(db.String(1024))
    #Notes = db.Column(db.String(100000))
        #Meeting_Query = [{'Meeting_ID':'12', 'User_email':['123@qq.com', '23'], 'Meeting_title':'12', 'Description':'12', 'Status':'12', 'Notes':'12',
        #'Time':'12'}]
        Meeting_Query = db.session.query(Meeting).all()
        My_Meeting_list = []

        for meeting_record in Meeting_Query:
            if meeting_record.attendees is None:
                return "Meeting has no attendees currently"
            
            if email_addr in meeting_record.attendees:
            
                temp_result = {'id': meeting_record.id,
                            'user_id': meeting_record.user_id,
                            'topic': meeting_record.topic,
                            'start_time': meeting_record.start_time,
                            'notes': meeting_record.notes,
                            'agenda': meeting_record.agenda,
                            'type':meeting_record.type,
                            'settings':meeting_record.settings,
                            'recurrence':meeting_record.recurrence,
                            'attendees':meeting_record.attendees,
                            'join_url':meeting_record.join_url
                            }
                My_Meeting_list.append(temp_result)
        
        return {'My_Meeting_list': My_Meeting_list}, 200

'''
@dashboard_ns.route("/tasks")
class getTasks(Resource):
    @dashboard_ns.param('email', 'The email of user who login.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, location='args')
        email_addr = parser.parse_args().get('email')
    
        Task_Query = db.session.query(Tasks).all()
        My_Task_list = []
        for task_record in Task_Query:
            for user in task_record['User_email']:
                if email_addr in user:
                    temp_result = {'Task_ID': task_record['Task_ID'],
                                'User_email': task_record['User_email'],
                                'Task_title': task_record['Task_title'],
                                'StartTime': task_record['StartTime'],
                                'EndTime': task_record['EndTime'],
                                'Creator_email': task_record['Creator_email'],
                                'Creator_name': task_record['Creator_name'],
                                'Recv_email': task_record['Recv_email'],
                                'Task_status': task_record['Task_status'],
                                'Description': task_record['Description'],
                                }
                    My_Task_list.append(temp_result)
        return {'My_Task_list': My_Task_list}, 200
'''
