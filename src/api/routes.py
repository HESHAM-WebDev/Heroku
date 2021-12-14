"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Test, Answers, Statement
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/test', methods=['POST'])
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