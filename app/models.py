from datetime import datetime
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from hashids import Hashids
hashids = Hashids()


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    links = db.relationship('Link', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_link = db.Column(db.String(140))
    shortened_link = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    clicks = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def set_shortened_link(self):
        self.shortened_link = hashids.encode(100 + self.id)

    def set_author(self, author):
        self.user_id = author.id

    def add_click(self):
        self.clicks += 1

    def serialized(self):
        return {
            "original_link": self.original_link,
            "shortened_link": self.shortened_link,
            "clicks": self.clicks
        }

    def __repr__(self):
        return '<Post {}>'.format(self.original_link)

