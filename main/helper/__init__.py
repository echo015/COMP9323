import re

# helper function to check if email address is valid
def is_valid_email(email):
    return re.match(r"^\w+[-_.]*[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$", email)

# helper function to convert SQLAlchemy query instance to a dict
def data_to_dict(instance, cls):
    d = dict()
    for c in cls.__table__.columns:
        if c.name != "password":
            v = getattr(instance, c.name)
            d[c.name] = v
    return d
