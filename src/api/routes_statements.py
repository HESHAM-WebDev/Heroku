import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from api.models import db, StatementCreation
from api.utils import generate_sitemap, APIException

routes_statements= flask.Blueprint('routes_statements', __name__)


@routes_statements.route('/statement/create', methods=['POST'])
def handle_statement_creation():

    data_request = request.get_json()

    title = request.json.get("title", None)
    statement = request.json.get("statement", None)
    options = request.json.get("options", None)
    statement_types=request.json.get("statement_types", None)
    options_types = request.json.get("options_types", None)
    answer = request.json.get("answer", None)
    source = request.json.get("source", None)
    area = request.json.get("area", None)
    institution = request.json.get("institution", None)
    is_difficult = request.json.get("is_difficult", None)
    is_active = request.json.get("is_active", None)
    is_explained = request.json.get("is_explained", None)
    created_by = request.json.get("created_by", None)
    modified_by = request.json.get("modified_by", None)
    #creation_date= request.json.get("creation_date", None)
    #update_date = request.json.get("update_date", None)

    new_statement= StatementCreation()
    new_statement.title=title
    new_statement.statement=statement
    new_statement.options=options
    new_statement.statement_types=statement_types
    new_statement.options_types=options_types
    new_statement.answer=answer
    new_statement.source=source
    new_statement.area=area
    new_statement.institution=institution
    new_statement.is_difficult=is_difficult
    new_statement.is_active=is_active
    new_statement.is_explained=is_explained
    new_statement.created_by=created_by
    new_statement.modified_by=modified_by


    try:
        db.session.add(new_statement)
        db.session.commit()

        return jsonify(StatementCreation.serialize(new_statement)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400


    return jsonify({"msg": "Enunciado creado correctamente"}), 200


@routes_statements.route('/statement/update', methods=['POST'])
def handle_statement_update():

    data_request = request.get_json()

    id=request.json.get("id",None)

    statement_update = StatementCreation.query.filter_by(id=data_request["id"]).first()

    if statement_update is None:
        return jsonify(msg='Error: {}. '.format(exception_message)), 400


    statement_update.title=data_request["title"]
    statement_update.statement=data_request["statement"]
    statement_update.options=data_request["options"] 
    statement_update.statement_types=data_request["statement_types"]
    statement_update.options_types=data_request["options_types"]
    statement_update.answer=data_request["answer"]
    statement_update.source=data_request["source"]
    statement_update.area=data_request["area"]
    statement_update.institution=data_request["institution"]
    statement_update.is_difficult=data_request["is_difficult"]
    statement_update.is_active=data_request["is_active"]
    statement_update.is_explained=data_request["is_explained"]
    statement_update.created_by=data_request["created_by"]
    statement_update.modified_by=data_request["modified_by"]

    try:
        db.session.commit()

        return jsonify({"msg":"El enunciado se ha guardado correctamente"}), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400


    return jsonify({"msg": "Enunciado guardado correctamente"}), 200
