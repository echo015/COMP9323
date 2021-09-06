from flask import request
from flask_restplus import Resource, marshal
from main.helper import *

from main.util.MeetingDTO import *
from main.model.db_model import *
from zoomus import ZoomClient
from copy import deepcopy

from datetime import datetime,timedelta
import json

client = ZoomClient('IUxBbrknQWWOjIJ5_vAy7w','da55rUcI7MupU7v2ICmRQBxencpP3P1omTjm',version=2)
client.config["token"] = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IklVeEJicmtuUVdXT2pJSjVfdkF5N3ciLCJleHAiOjE3MzU2NTAwMDAsImlhdCI6MTYyODI1OTU4OH0.NWaq4mWWcH4bWK-lCwTmxIByPyEXKr_fRpM_9MaVGXE'


meeting_ns = meeting_namespace


# add meeting
@meeting_ns.route('/user/add_meeting')
class AddMeeting(Resource):
    @meeting_ns.expect(MeetingDto.add_meeting_model)
    def post(self):
        user_id = request.json.get('user_id')
        topic = request.json.get('topic')
        start_time = request.json.get('start_time')
        duration = request.json.get('duration')
        settings = request.json.get('settings')
        type = request.json.get('type')
        agenda = request.json.get('agenda')
        recurrence = request.json.get('recurrence')
        attendees = request.json.get('attendees')

        creating_json = deepcopy(request.json)
        creating_json['start_time'] = datetime.strptime(creating_json['start_time'], "%Y-%m-%dT%H:%M:%S.%fZ")
                                      # - timedelta(hours=10)
        creating_json['user_id'] = "a7212341@gmail.com"  # 会员账号
        create_meeting = client.meeting.create(**creating_json)
        if create_meeting.status_code != 201:
            print(create_meeting.content)
            return {"status": 400, "success": False, "msg": "zoom error"}
        result = json.loads(create_meeting.content)
        if "join_url" and "id" in result:
            join_url = result['join_url']
            id = result['id']
            Meeting_db_insert = Meeting(id=id, user_id=user_id, topic=topic, start_time=start_time,
                                        duration=duration, settings=str(settings), recurrence=str(recurrence),
                                        type=type, agenda=agenda, attendees=attendees+"\n"+user_id, join_url=join_url)
            db.session.add(Meeting_db_insert)
            db.session.commit()
            return {"status":200, "success":True, "msg":"OK"}
        else:
            return {"status":400, "success":False, "msg":"zoom error"}

@meeting_ns.route('/user/not_attend')
class Not_attend(Resource):
    @meeting_ns.expect(MeetingDto.not_attend_model)
    def post(self):
        id = request.json.get('id')
        email = request.json.get('email')

        res = db.session.query(Meeting).filter(Meeting.id == id).first()
        if email in res.attendees:
            if res.notattend is None or email not in res.notattend:
                temp = str(res.notattend) + "\n" + email
                db.session.query(Meeting).filter(Meeting.id == id).update({
                    'notattend': temp,
                })
                db.session.commit()
                return {"status": 200, "success": True, "msg": "OK"}
            else:
                return {"status": 400, "success": False, "msg": "No"}



@meeting_ns.route('/user/meeting_list')
class Meeting_List(Resource):
    @meeting_ns.param('email', 'The email of user who login.')
    @meeting_ns.param('scope', 'all, previous or upcoming scope.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, location='args')
        parser.add_argument('scope', type=str, required=True, location='args')
        email_addr = parser.parse_args().get('email')
        scope = parser.parse_args().get('scope')
        rec = client.recording.list(user_id="a7212341@gmail.com")
        recording_list = []
        # id_list, recording_list = list(), list()
        if rec.status_code == 200:
            recording_list = json.loads(rec.content)['meetings']
        else:
            return {"status": 400, "success": False, "msg": "get zoom recording error"}
        for r in recording_list:
            res = db.session.query(Meeting).filter(Meeting.id == r['id']).update({
                "recording_url": r['share_url'],
            })
        db.session.commit()
        if scope == 'all':
            Meeting_Query = db.session.query(Meeting).all()
        elif scope == 'upcoming':
            Meeting_Query = db.session.query(Meeting).filter(Meeting.recording_url == None)
        elif scope == 'previous':
            Meeting_Query = db.session.query(Meeting).filter(Meeting.recording_url != None)
        data = []
        for meeting_record in Meeting_Query:
            if email_addr in meeting_record.__dict__['attendees'].split('\n'):
                temp_result = {'id': meeting_record.__dict__['id'],
                               'user_id': meeting_record.__dict__['user_id'],
                               'attendees': meeting_record.__dict__['attendees'],
                               'notattend': False if meeting_record.__dict__['notattend'] is None or email_addr not in
                                                     meeting_record.__dict__['notattend'] else True,
                               'topic': meeting_record.__dict__['topic'],
                               'start_time': meeting_record.__dict__['start_time'],
                               'duration': meeting_record.__dict__['duration'],
                               'settings': json.loads(meeting_record.__dict__['settings'].replace("\'", "\"")),
                               'type': meeting_record.__dict__['type'],
                               'agenda': meeting_record.__dict__['agenda'],
                               'recurrence': 'None' if meeting_record.__dict__['recurrence'] == 'None' else json.loads(
                                   meeting_record.__dict__['recurrence'].replace("\'", "\"")),
                               'recording_url': meeting_record.__dict__['recording_url'],
                               'join_url': meeting_record.__dict__['join_url']
                               }
                data.append(temp_result)
                data.sort(key=lambda x: datetime.strptime(x['start_time'], "%Y-%m-%dT%H:%M:%S.%fZ"))
        # print(type({'My_Meeting_list': My_Meeting_list}))
        return {'data': data}, 200


@meeting_ns.route('/user/edit_meeting')
class EditMeeting(Resource):
    @meeting_ns.expect(MeetingDto.add_meeting_model)
    def post(self):
        id = request.json.get('id')
        user_id = request.json.get('user_id')
        topic = request.json.get('topic')
        start_time = request.json.get('start_time')
        duration = request.json.get('duration')
        settings = request.json.get('settings')
        type = request.json.get('type')
        agenda = request.json.get('agenda')
        recurrence = request.json.get('recurrence')
        attendees = request.json.get('attendees')

        update_json = deepcopy(request.json)
        update_json['start_time'] = datetime.strptime(update_json['start_time'], "%Y-%m-%dT%H:%M:%S.%fZ")
                                      # - timedelta(hours=10)
        update_json['user_id'] = "a7212341@gmail.com"  # 会员账号
        update_json['id'] = id
        edit_meeting = client.meeting.update(**update_json)
        result = edit_meeting.status_code
        if result == 204:
            # join_url = result['join_url']
            # id = result['id']
            res = db.session.query(Meeting).filter(Meeting.id == id).update({
                "id": id,
                "user_id": user_id,
                "topic": topic,
                "start_time": start_time,
                "duration": duration,
                "settings": str(settings),
                "recurrence": str(recurrence),
                "type": type,
                "agenda": agenda,
                "attendees": attendees,
                # "join_url": join_url
            })
            db.session.commit()
            return {"status": 200, "success": True, "msg": "OK"}
        else:
            print(edit_meeting.content)
            return {"status": 400, "success": False, "msg": "zoom error"}



# delete_meeting
@meeting_ns.route('/user/delete_meeting')
class DeleteMeeting(Resource):
    @meeting_ns.expect(MeetingDto.delete_meeting_model)
    def delete(self):
        id = request.json.get('id')
        result = client.meeting.delete(id=id)
        if result.status_code == 204:
            res = db.session.query(Meeting).filter(Meeting.id == id).delete()
            print(res)
            db.session.commit()
            db.session.close()
            return {"status": 200, "success": True, "msg": "OK"}
        else:
            print("zoom return:", result.content)
            return {"status": 400, "success": False, "msg": "zoom error"}


@meeting_ns.route('/user/get_meeting')
class get_meeting(Resource):
    @meeting_ns.param('id', 'The meeting id')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, required=True, location='args')
        id = parser.parse_args().get('id')
        Meeting_Query = db.session.query(Meeting).filter(Meeting.id == id).first()
        # My_Meeting_list = []
        # for meeting_record in Meeting_Query:
        if Meeting_Query:
            temp_result = {'id': Meeting_Query.id,
                           'user_id': Meeting_Query.__dict__['user_id'],
                           'attendees': Meeting_Query.__dict__['attendees'],
                           'topic': Meeting_Query.__dict__['topic'],
                           'start_time': Meeting_Query.__dict__['start_time'],
                           'duration': Meeting_Query.__dict__['duration'],
                           'settings': json.loads(Meeting_Query.__dict__['settings'].replace("\'", "\"")),
                           'type': Meeting_Query.__dict__['type'],
                           'agenda': Meeting_Query.__dict__['agenda'],
                           'recurrence': 'None' if Meeting_Query.__dict__['recurrence'] == 'None' else json.loads(
                               Meeting_Query.__dict__['recurrence'].replace("\'", "\"")),
                           'join_url': Meeting_Query.__dict__['join_url']
                           }
            # My_Meeting_list.append(temp_result)
        # print(type({'My_Meeting_list': My_Meeting_list}))
        return {'status':200, 'meeting': temp_result}, 200


@meeting_ns.route('/user/get_meeting_bydate')
class get_meeting(Resource):
    @meeting_ns.param('date', 'The date')
    @meeting_ns.param('user_id', 'The email of user who login.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=str, required=True, location='args')
        parser.add_argument('date', type=str, required=True, location='args')
        user_id = parser.parse_args().get('user_id')
        date = parser.parse_args().get('date')
        date0 = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
        date1 = date0+timedelta(days=1)
        Meeting_Query = db.session.query(Meeting).all()
        My_Meeting_list = []
        for meeting_record in Meeting_Query:
            if user_id in meeting_record.__dict__['attendees'].split('\n') \
                    and (
                    date0 <= datetime.strptime(meeting_record.__dict__['start_time'], "%Y-%m-%dT%H:%M:%S.%fZ") < date1):
                temp_result = {'id': meeting_record.id,
                           'user_id': meeting_record.__dict__['user_id'],
                           'attendees': meeting_record.__dict__['attendees'],
                           'topic': meeting_record.__dict__['topic'],
                           'start_time': meeting_record.__dict__['start_time'],
                           'duration': meeting_record.__dict__['duration'],
                           'settings': json.loads(meeting_record.__dict__['settings'].replace("\'", "\"")),
                           'type': meeting_record.__dict__['type'],
                           'agenda': meeting_record.__dict__['agenda'],
                           'recurrence': 'None' if meeting_record.__dict__['recurrence'] == 'None' else json.loads(
                               meeting_record.__dict__['recurrence'].replace("\'", "\"")),
                           'join_url': meeting_record.__dict__['join_url']
                           }
                My_Meeting_list.append(temp_result)
        # print(type({'My_Meeting_list': My_Meeting_list}))
        return {'status':200, 'meeting': My_Meeting_list}