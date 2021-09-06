from main import db


# user_task = db.Table('user_task',
#                 db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#                 db.Column('tasks_id', db.Integer, db.ForeignKey('tasks.id'))
#                 )
# user_meeting = db.Table('user_meeting',
#                 db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#                 db.Column('meeting_id', db.Integer, db.ForeignKey('meeting.id'))
#                 )

class User(db.Model):
    # name of the table in MySQL
    __tablename__ = 'user'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(64), nullable=False)
    lastName = db.Column(db.String(64), nullable=False)
    password = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=False, unique=True)
    role = db.Column(db.String(64), nullable=False)

    # meeting = db.relationship('Meeting', secondary=user_meeting,
    #                         backref=db.backref('user'))
    #
    # tasks = db.relationship('Tasks', secondary=user_task,
    #                        backref=db.backref('user'))


class Meeting(db.Model):
    # name of the table in MySQL
    __tablename__ = 'meeting'
    id = db.Column(db.BIGINT, autoincrement=True, primary_key=True)
    topic = db.Column(db.String(256))
    start_time = db.Column(db.String(256))
    duration = db.Column(db.Integer)
    user_id = db.Column(db.String(1024))
    agenda = db.Column(db.String(1000))
    type = db.Column(db.Integer)
    settings = db.Column(db.String(256))
    recurrence = db.Column(db.String(1024))
    attendees = db.Column(db.String(1024))
    notattend = db.Column(db.String(1024))
    join_url = db.Column(db.String(1024))
    recording_url = db.Column(db.String(512))
    notes = db.Column(db.String(5000))


class Recordings(db.Model):
    # name of the table in MySQL
    __tablename__ = 'recordings'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    subtitles = db.Column(db.String(1000), nullable=False)
    # meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.meeting_ID'))


class Notes(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    task_id = db.Column(db.Integer)
    meeting_id = db.Column(db.BIGINT)
    user_id = db.Column(db.String(256))
    user_email = db.Column(db.String(64))
    task_title = db.Column(db.String(256))
    content = db.Column(db.String(1000), nullable=False)


class Tasks(db.Model):
    __tablename__ = 'tasks'
    Task_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    User_email = db.Column(db.String(64))
    Task_title = db.Column(db.String(256))
    StartTime = db.Column(db.String(256))
    EndTime = db.Column(db.String(256))
    Creator_email = db.Column(db.String(64))
    Creator_name = db.Column(db.String(64))
    Recv_email = db.Column(db.String(1024))
    Task_status = db.Column(db.Integer)  # 0 "Not Started", 1 "In Progress", 2 "Completed"
    Description = db.Column(db.String(256))








