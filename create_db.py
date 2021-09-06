from flask import Flask
from flask_restx import Resource, Api
from flask_sqlalchemy import SQLAlchemy
# 从空的database 建表
db_URI = 'mysql+pymysql://root:123456@127.0.0.1:3306/test_db'

# student_task = db.Table('student_task',
#                 db.Column('student_id', db.Integer, db.ForeignKey('student.id')),
#                 db.Column('tasks_id', db.Integer, db.ForeignKey('tasks.id'))
#                 )
app = Flask(__name__)
api = Api(app,
          default='Task',
          title='Task',
          description='This provides several apis for Task database. ')

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

HOST = '127.0.0.1'
port = 5000

class Student(db.Model):
    # name of the table in MySQL
    __tablename__ = 'student'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64),  nullable=False)
    last_name = db.Column(db.String(64),  nullable=False)
    password = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=False, unique=True)
    role=db.Column(db.String(64), nullable=False)
    # contains_meeting = db.relationship("Meeting", backref='student')
    booking_meeting = db.Column(db.Integer, db.ForeignKey('meeting.id'))

    # tasks = db.relationship('tasks', secondary=student_task,
    #                        backref=db.backref('student'))

class Mentor(db.Model):
    # name of the table in MySQL
    __tablename__ = 'mentor'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64),  nullable=False)
    last_name = db.Column(db.String(64),  nullable=False)
    password = db.Column(db.String(64), nullable=False)
    employee_id = db.Column(db.String(64), unique=True, nullable=False)
    # role = db.Column(db.String(64), nullable=False)
    # contains_meeting = db.relationship("Meeting", backref='mentor')
    # manage_meeting = db.Column(db.Integer, db.ForeignKey('meeting.id'))


class Meeting(db.Model):
    # name of the table in MySQL
    __tablename__ = 'meeting'
    id = db.Column(db.BIGINT, autoincrement=True, primary_key=True)
    topic = db.Column(db.String(256))
    start_time = db.Column(db.String(256))
    duration = db.Column(db.Integer)
    user_id = db.Column(db.String(64))
    agenda = db.Column(db.String(1000))
    type = db.Column(db.Integer)
    settings = db.Column(db.String(256))
    recurrence = db.Column(db.String(1024))
    attendees = db.Column(db.String(1024))
    join_url = db.Column(db.String(1024))
    notes = db.Column(db.String(10024))

class Recordings(db.Model):
    # name of the table in MySQL
    __tablename__ = 'recordings'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    subtitles = db.Column(db.String(1000), nullable=False)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.id'))

class Notes(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    task_id = db.Column(db.Integer)
    meeting_id = db.Column(db.BIGINT)
    user_id = db.Column(db.String(256))
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

db.create_all()


