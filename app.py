from flask_script import Manager
from main import *
from main.model.db_model import *
from main.api import blueprint



# get the flask app instance
app = create_app()

# register the API blueprint
app.register_blueprint(blueprint)


## Use flask_script to generalize command line running
manager = Manager(app)


# run the app
@manager.command
def run():
    app.run(debug=True)


# drop all tables in the db
@manager.command
def db_drop_all():
    db.drop_all()


# create all the models(tables) defined to db
@manager.command
def db_create_all():
    db.create_all()



if __name__ == '__main__':
    manager.run()

