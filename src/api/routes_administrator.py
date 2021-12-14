import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from api.models import db, Administrator, Test
from api.utils import generate_sitemap, APIException


routes_administrator = flask.Blueprint('routes_administrator', __name__)

@routes_administrator.route('/administrator/login', methods=['POST'])
def handle_login(): 

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if username is None:
        return jsonify({"message": "El nombre de usuario es requerido."}), 400

    if password is None:
        return jsonify({"message": "La contraseña es requerida"}), 400
    
    user = Administrator.query.filter_by(username=username, password=password).first()
    
    if user is None:
        # the user was not found on the database
        return jsonify({"message": "Error. Nombre de usuario o contraseña incorrectos."}), 401
    else:
        expiration_time = datetime.timedelta(days=1)
        access_token = create_access_token(identity=user.id,expires_delta=expiration_time)
        return jsonify({ "token": access_token, "user_id": user.id ,"is_admin_of_everything":user.is_admin_of_everything}), 200

@routes_administrator.route('/administrator/register', methods=['POST'])
def handle_register():

    data_request = request.get_json()

    email_search = Administrator.query.filter_by(email=data_request["email"]).first()
    username_search=Administrator.query.filter_by( username=data_request["username"]).first()

    if email_search or username_search:
        return jsonify({"message": "Lo sentimos, esta dirección de correo o usuario ya se encuentra registrado."}), 401
    else:

        name = request.json.get("name", None)
        last_name = request.json.get("last_name", None)
        email= request.json.get("email", None)
        username= request.json.get("username", None)
        security_code= request.json.get("security_code", None)
        is_admin_of_everything= request.json.get("is_admin_of_everything",None)
        password= request.json.get("password", None)
        creation_date = datetime.datetime.now()
        update_date = datetime.datetime.now()

        new_administrator = Administrator()
        new_administrator.name = name
        new_administrator.lastname = last_name
        new_administrator.email = email
        new_administrator.username= username
        new_administrator.security_code= security_code
        new_administrator.is_admin_of_everything=is_admin_of_everything
        new_administrator.password = password
        new_administrator.is_active= True
        new_administrator.creation_date= creation_date
        new_administrator.update_date=update_date

        try:
            db.session.add(new_administrator)
            db.session.commit()

            return jsonify(Administrator.serialize(new_administrator)), 201
    
        except AssertionError as exception_message: 
            return jsonify(msg='Error: {}. '.format(exception_message)), 400


        return jsonify({"msg": "User created successfully"}), 200
    


