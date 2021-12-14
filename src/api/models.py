from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    highschool_score = db.Column(db.Integer, unique=False, nullable=True)
    cut_UCR = db.Column(db.Integer, unique=False, nullable=True)
    cut_UNA = db.Column(db.Integer, unique=False, nullable=True)
    cut_TEC = db.Column(db.Integer, unique=False, nullable=True)
    cut_GBL= db.Column(db.Integer, unique=False, nullable=True)
    is_UCR = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
    is_TEC = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
    is_UNA = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_problematic = db.Column(db.Boolean(), unique=False, nullable=False)
    creation_date=db.Column(db.DateTime,nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)
    country=db.Column(db.String(10), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname":self.lastname,
            "email": self.email,
            "highschool_score": self.highschool_score,
            "cut_UCR":self.cut_UCR,
            "cut_UNA":self.cut_UNA,
            "cut_TEC": self.cut_TEC,
            "cut_GBL": self.cut_GBL,
            "is_UCR": self.is_UCR,
            "is_TEC": self.is_TEC,
            "is_UNA": self.is_UNA,
            "is_active":self.is_active,
            "is_problematic": self.is_problematic,
            "creation_date": self.creation_date,
            "update_date": self.update_date,
            "country":self.country
        }

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=False, nullable=False)
    security_code= db.Column(db.Integer, unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin_of_everything = db.Column(db.Boolean(), unique=False, nullable=False)
    creation_date=db.Column(db.DateTime,nullable=False)

    def __repr__(self):
        return '<Administrator %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname":self.lastname,
            "email": self.email,
            "username": self.username,
            "security_code": self.security_code,
            "is_active": self.is_active,
            "is_admin_of_everything": self.is_admin_of_everything,
            "creation_date":self.creation_date
        }


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text_array = db.Column(db.ARRAY(db.String(20000)))

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "test": self.text_array,
            # do not serialize the password, its a security breach
        }

class Statement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=True)
    statement = db.Column(db.ARRAY(db.String(20000)),nullable=False)
    options = db.Column(db.ARRAY(db.String(2000)),nullable=False)
    statement_types = db.Column(db.ARRAY(db.String(150)),nullable=False)
    options_types=db.Column(db.ARRAY(db.String(150)),nullable=False)
    answer= db.Column(db.ARRAY(db.String(150)),nullable=False)
    source = db.Column(db.String(120), nullable=False)
    area=db.Column(db.String(120), nullable=True)
    institution=db.Column(db.String(120), nullable=True)
    is_difficult=db.Column(db.Boolean(),nullable=False)
    is_active=db.Column(db.Boolean(), nullable=False)
    is_explained=db.Column(db.Boolean(),nullable=False)
    created_by= db.Column(db.String(120), nullable=False)
    modified_by= db.Column(db.String(120), nullable=False)
    creation_date=db.Column(db.DateTime,nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<Statement %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "statement": self.statement,
            "statement_types": self.statement_types,
            "options":self.options,
            "options_types":self.options_types,
            "answer" : self.correct,
            "is_explained": self.is_explained,
            "source": self.source,
            "is_difficult": self.is_difficult,
            "is_active":self.is_active,
            "area":self.area,
            "institution":self.institution,
            "created_by": self.created_by,
            "modified_by": self.modified_by,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }

class StatementCreation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=True)
    statement = db.Column(db.ARRAY(db.String(20000)),nullable=True)
    options = db.Column(db.ARRAY(db.String(2000)),nullable=True)
    statement_types = db.Column(db.ARRAY(db.String(150)),nullable=True)
    options_types=db.Column(db.ARRAY(db.String(150)),nullable=True)
    answer= db.Column(db.ARRAY(db.String(150)),nullable=True)
    source = db.Column(db.String(120), nullable=True)
    area=db.Column(db.String(120), nullable=True)
    institution=db.Column(db.String(120), nullable=True)
    is_difficult=db.Column(db.Boolean(),nullable=True)
    is_active=db.Column(db.Boolean(), nullable=True)
    is_explained=db.Column(db.Boolean(),nullable=True)
    created_by= db.Column(db.String(120), nullable=True)
    modified_by= db.Column(db.String(120), nullable=True)
    creation_date=db.Column(db.DateTime,nullable=True)
    update_date = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return '<StatementCreator %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "statement": self.statement,
            "statement_types": self.statement_types,
            "options":self.options,
            "options_types":self.options_types,
            "answer" : self.answer,
            "is_explained": self.is_explained,
            "source": self.source,
            "is_difficult": self.is_difficult,
            "is_active":self.is_active,
            "area":self.area,
            "institution":self.institution,
            "created_by": self.created_by,
            "modified_by": self.modified_by,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }

class Answers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer,nullable=False)
    is_correct=db.Column(db.Boolean(),nullable=False)
    option=db.Column(db.String(500),nullable=False)
    seconds= db.Column(db.Integer)
    creation_date=db.Column(db.DateTime,nullable=False)

    def __repr__(self):
        return '<Answer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "is_correct": self.is_correct,
            "option": self.option,
            "time":self.time,
            "seconds":self.seconds,
            "creation_date": self.creation_date
        }

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer,db.ForeignKey('user.id'))
    id_statement = db.Column(db.Integer)
    message= db.Column(db.String(500), nullable=False)
    is_solved=db.Column(db.Boolean())
    show_to_all_admins=db.Column(db.Boolean())
    creation_date=db.Column(db.DateTime,nullable=False)

    def _repr_(self):
        return '<Answer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_statement": self.id_statement,
            "message":self.message,
            "is_solved": self.is_solved,
            "show_to_all_admins": self.show_to_all_admins,
            "creation_date": self.creation_date
        }

