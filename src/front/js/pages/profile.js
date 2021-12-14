import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Profile = () => {
	const [finished, setFinished] = useState(true);

	return (
		// <div className="mx-auto pt-5">
		<div className=" pt-5 mt-5">
			<div className="row d-flex justify-content-center">
				<div className="col-xl-9 col-lg-10 col-md-11 col-sm-12 bg-secondary m-1 border-5 rounded-pill shadow">
					<div className="row m-1">
						<span className="h2">Hola usuario!</span>
					</div>
					<div className="row m-1">
						<span className="h2">Haz resuelto un total de 50 preguntas</span>
					</div>
				</div>
			</div>
		</div>
	);
};
