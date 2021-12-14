"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from api.models import db, User,Test
from api.utils import generate_sitemap, APIException


routes_user = flask.Blueprint('routes_user', __name__)


@routes_user.route('/user/login', methods=['POST'])
def handle_login(): 

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"message": "El email es requerido."}), 400

    if password is None:
        return jsonify({"message": "El password es requerido."}), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        # the user was not found on the database
        return jsonify({"message": "Error. Correo electrónico o contraseña incorrectos."}), 401
    else:
        expiration_time = datetime.timedelta(days=1)
        access_token = create_access_token(identity=user.id,expires_delta=expiration_time)
        return jsonify({ "token": access_token, "user_id": user.id }), 200


@routes_user.route('/user/register', methods=['POST'])
def handle_register():

    data_request = request.get_json()

    user = User.query.filter_by(email=data_request["email"]).first()
    

    

    # Se valida que el email no haya sido registrado.s
    if user:
        return jsonify({"message": "Lo sentimos, esta dirección de correo ya se encuentra registrada."}), 401

    else:

        name = request.json.get("name", None)
        last_name = request.json.get("last_name", None)
        email= request.json.get("email", None)
        password= request.json.get("password", None)
        creation_date = datetime.datetime.now()
        update_date = datetime.datetime.now()
        country=request.json.get("country", None)


        if name=="" or last_name=="" or email=="" or password=="":
            return jsonify({"message": "Lo sentimos, debe llenar correctamente todos los espacios."}), 401

        new_user = User()
        new_user.name = name
        new_user.lastname = last_name
        new_user.email = email
        new_user.password = password
        new_user.is_active= True
        new_user.is_problematic= False
        new_user.creation_date= creation_date
        new_user.update_date=update_date
        new_user.country=country

        try:
            db.session.add(new_user)
            db.session.commit()

            return jsonify(User.serialize(new_user)), 201
    
        except AssertionError as exception_message: 
            return jsonify(msg='Error: {}. '.format(exception_message)), 400


        return jsonify({"msg": "User created successfully"}), 200


@routes_user.route('/user/recover', methods=['POST'])
def handle_recover():

    response_body = {
        "message": "hello"
    }

    return jsonify(response_body), 200
    

@routes_user.route('/api/usertest', methods=['POST'])
def handle_test():
    test = request.json.get("test", None)
    new_test= Test()
    new_test.text_array=test
    db.session.add(new_test)
    db.session.commit()

    response_body = {
        "message": new_test.text_array
    }

    return jsonify(response_body), 200