from flask_restplus import fields, Namespace, reqparse

notes_namespace = Namespace("Notes", description="Notes Apis")



class NotesDto:
    # student_data_model models
    

    notes_required = notes_namespace.model('notes_required', {
        'User_email': fields.String(required=True),
        'meeting_id': fields.String(required=True),
        'notes': fields.String(required=True)
    })



    
