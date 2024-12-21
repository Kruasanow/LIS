from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    fname = db.Column(db.String(150))
    sname = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True, nullable=False)
    passwd = db.Column(db.String(150), nullable=False)
    tg = db.Column(db.String(150), unique=True)
    permission = db.Column(db.String(100), nullable=False)

    def __init__(self, username, fname, sname, email, passwd, tg, permission):
        self.username = username
        self.fname = fname
        self.sname = sname
        self.email = email
        self.passwd = passwd
        self.tg = tg
        self.permission = permission
    def __repr__(self):
        return f"<Events {self.username}>"

class Events(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(150), nullable=False)
    latitude = db.Column(db.String(150), nullable=False)
    longitude = db.Column(db.String(150), nullable=False)
    img_ways = db.Column(db.String(1050))
    description = db.Column(db.String(500))
    short_description = db.Column(db.String(550))
    story = db.Column(db.String(150), nullable=False)
    permission = db.Column(db.String(150), nullable=False)
    
    def __init__(self, location, latitude, longitude, img_ways, description, short_description, story, permission):
        self.location = location
        self.latitude = latitude
        self.longitude = longitude
        self.img_ways = img_ways
        self.description = description
        self.short_description = short_description
        self.story = story
        self.permission = permission
    def __repr__(self):
        return f"<Events {self.description}>"