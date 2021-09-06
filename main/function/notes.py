from flask_restplus import Resource, marshal
from flask import request

from main.helper import *
from main.util.NotesDTO import *
from main.model.db_model import *
import json
import datetime

notes_ns = notes_namespace


@notes_ns.route('/addNotes')
class notes(Resource):
    @notes_ns.expect(NotesDto.notes_required)
    def post(self):
        user_id = request.json.get('User_email')
        notes = request.json.get('notes')
        meeting_id = request.json.get('meeting_id')
        task_id = request.json.get('task_id')
        task_title = request.json.get('task_title')

        notes_db_insert = Notes(user_id=user_id, content=notes, meeting_id=meeting_id,
                                task_id=task_id, task_title=task_title)

        db.session.add(notes_db_insert)
        db.session.commit()
        return {'status': 200,
                'msg': 'success',
                'data': []}


@notes_ns.route('/getNotes')
class getNotes(Resource):
    @notes_ns.param('meetingid', 'The meetingid.')
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('meeting_id', type=str, required=True, location='args')
        meeting_id = parser.parse_args().get('meeting_id')

        meeting_id = int(meeting_id)

        res = (db.session.query(Notes).all())
        note_list = []
        msg = 'do not have record'
        status = 500
        # if cannot find meeting id return msg
        result = 'do not have record return failed'

        for i in res:
            if meeting_id == i.meeting_id:
                tmp = {'noteId': i.id,
                       'taskId': i.task_id,
                       'user_id': i.user_id,
                       'user_email': i.user_email,
                       'content': i.content,
                       'taskTitle': i.task_title
                       }
                note_list.append(tmp)
        msg = 'successfully returned'
        status = 200

        return {'status': status,
                'msg': msg,
                'data': note_list}


@notes_ns.route('/deleteNotes')
class deleteNotes(Resource):
    @notes_ns.param('notesid', 'The notesid.')
    def post(self):
        Note_ID = request.json.get('Note_ID')

        status = 200
        msg = 'success'
        temp_res = db.session.query(Notes).filter(Notes.id == Note_ID)
        task_ID = temp_res.scalar().task_id

        res = temp_res.delete()
        if (res == 0):
            status = 500
            msg = 'can not find the note id'
        db.session.commit()
        db.session.close()
        return {'status': status,
                'msg': msg,
                'data': [],
                'task_ID': task_ID
                },200

@notes_ns.route('/updateTaskNotes')
class updateTaskNotes(Resource):
    @notes_ns.expect(NotesDto.notes_required)
    def post(self):
        note_id = request.json.get('note_id')
        # user_id = request.json.get('User_email')
        # notes = request.json.get('notes')
        # meeting_id = request.json.get('meeting_id')
        task_id = request.json.get('task_id')
        task_title = request.json.get('task_title')

        res = db.session.query(Notes).filter(Notes.id == note_id).update({
            "task_id": task_id, "task_title":task_title
        })
        db.session.commit()
        db.session.close()

        return {'status': 200,
                'msg': 'success',
                'data': []}