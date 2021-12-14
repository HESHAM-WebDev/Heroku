  
import os
from flask_admin import Admin
from .models import db, User, Test, Answers, Statement, Administrator, Report, StatementCreation
from flask_admin.contrib.sqla import ModelView
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from api.routes_user import routes_user
from api.routes_administrator import routes_administrator
from api.routes_statements import routes_statements

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    app.config["JWT_SECRET_KEY"] = "whatever"
    admin = Admin(app, name='UTÚ Admin', template_mode='bootstrap3')
    jwt = JWTManager(app)


    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Test, db.session))
    admin.add_view(ModelView(Answers, db.session))
    admin.add_view(ModelView(Statement, db.session))
    admin.add_view(ModelView(Administrator, db.session))
    admin.add_view(ModelView(Report, db.session))
    admin.add_view(ModelView(StatementCreation, db.session))

    app.register_blueprint(routes_user)
    app.register_blueprint(routes_administrator)
    app.register_blueprint(routes_statements)
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
