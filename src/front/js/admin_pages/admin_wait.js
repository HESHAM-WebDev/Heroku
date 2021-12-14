import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/index.css";
import { Spinner } from "reactstrap";

export const AdminWait = () => {
	const { store, actions } = useContext(Context);
	const History = useHistory();

	useEffect(() => {
		if (store.statement_content != undefined) {
			History.push("/admin/create");
		}
	});

	return (
		<div className="pt-5 mt-5 container-fluid">
			<div className="row d-flex align-items-center justify-content-center">
				<Spinner type="grow" color="success" />
				<span className="h2">Cargando, estamos obteniendo la información.</span>
			</div>
			<div className="row d-flex align-items-center justify-content-center">
				<span className="h2">En breve será redireccionado.</span>
			</div>
		</div>
	);
};
