import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/index.css";
//import nodemailer from "nodemailer";
import { Button } from "reactstrap";

export const Recover = () => {
	const [email, setEmail] = useState("");
	const History = useHistory();

	return (
		// <div className="mx-auto pt-5">
		<div className="pt-5 mt-5">
			<div className="row d-flex justify-content-center p-1 m-1 ">
				<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary m-1 border-5 rounded-pill shadow">
					<div className="row m-1">
						<p className="h3 col-12  d-flex justify-content-center">RECUPERAR CONTRASEÑA</p>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center p-1 m-1 ">
				<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary m-1 border-5 rounded-pill shadow">
					<div className="row m-1">
						<p className="h5 col-12  d-flex justify-content-center">CORREO ELECTRÓNICO</p>
						<div className="col-12  d-flex justify-content-center float-end align-items-center mb-1">
							<input
								onChange={e => setEmail(e.target.value)}
								type="email"
								className="form-control rounded-pill"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="ejemplo@correo.com"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center m-1">
				<Button
					color="secondary"
					className="col-xl-6 col-lg-8 col-md-10 col-sm-12 m-2 border border-5 border-dark rounded-pill bg-secondary shadow">
					<p className="h3 text-dark">Recuperar contraseña</p>
				</Button>
			</div>
		</div>
	);
};
