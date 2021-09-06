from flask_restplus import fields, Namespace,reqparse


meeting_namespace = Namespace("Meeting", description="Meeting Apis")


class MeetingDto:
    # Task models
    add_meeting_model = meeting_namespace.model("add_meeting", {
        'id': fields.Integer,
        'user_id': fields.String,
        'topic': fields.String,
        'start_time': fields.String,
        'duration': fields.Integer,
        'settings': fields.String,
        'type': fields.Integer,
        'agenda': fields.String,
        'recurrence': fields.String,
        'attendees': fields.String,
        'join_url': fields.String,
        'recording_url': fields.String,
    })

    edit_meeting_model = meeting_namespace.model("edit_meeting", {
        'user_id': fields.String,
        'topic': fields.String,
        'start_time': fields.String,
        'duration': fields.Integer,
        'settings': fields.String,
        'type': fields.Integer,
        'agenda': fields.String,
        'recurrence': fields.String,
        'attendees': fields.String,
        'join_url': fields.String,
    })

    delete_meeting_model = meeting_namespace.model("delete_meeting", {
        'Meeting_ID': fields.String,
    })

    not_attend_model = meeting_namespace.model("not_attend", {
        'id': fields.String,
        'email': fields.String,
    })

