import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/index.css";
import { Button } from "reactstrap";

export const AdminLogin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useState(false);
	const { store, actions } = useContext(Context);
	const History = useHistory();

	const handleSubmit = e => {
		e.preventDefault();

		const body = {
			username: username,
			password: password
		};
		let url = store.api_url + "/administrator/login";
		fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				if (res.status === 200) {
					alert("Ha iniciado sesión exitosamente");

					// Se logró registrar correctamente, se llama inmediatamente a que se loguee de una vez
					History.push("/profile");
					return res.json();
				} else {
					alert("Ha ocurrido un error");
				}
			})
			.then(data => {
				console.log(data);
				if (data.is_admin_of_everything) {
					actions.setToken(data.token, "boss");
				} else {
					actions.setToken(data.token, "admin");
				}
			})
			.catch(err => console.log(err));
	};

	return (
		// <div className="mx-auto pt-5">
		<div className="pt-5 mt-5">
			<div className="row d-flex justify-content-center p-1 m-1 ">
				<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary m-1 border-5 rounded-pill shadow">
					<div className="row m-1">
						<h1 className="h1 col-12  d-flex justify-content-center">INGRESO ADMIN</h1>
						<p className="col-12  d-flex justify-content-center float-end align-items-center">
							Si olvidó usuario o contraseña por favor contacte al administrador.
						</p>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center p-1 m-1 ">
				<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary m-1 border-5 rounded-pill shadow">
					<div className="row m-1">
						<p className="h5 col-12  d-flex justify-content-center">USUARIO</p>
						<div className="col-12  d-flex justify-content-center float-end align-items-center mb-1">
							<input
								onChange={e => setUsername(e.target.value)}
								type="email"
								className="form-control rounded-pill"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Usuario"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center p-1 m-1 ">
				<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary m-1 border-5 rounded-pill shadow">
					<div className="row m-1">
						<p className="h5 col-12  d-flex justify-content-center">CONTRASEÑA</p>
						<div className="col-12  d-flex justify-content-center float-end align-items-center mb-1">
							<input
								onChange={e => setPassword(e.target.value)}
								type="password"
								className="form-control rounded-pill"
								id="exampleInputPassword1"
								placeholder="Tu contraseña"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center m-1">
				<Button
					onClick={handleSubmit}
					color="secondary"
					className="col-xl-6 col-lg-8 col-md-10 col-sm-12 m-2 border border-5 border-dark rounded-pill bg-secondary shadow">
					<p className="h3 text-dark">Ingresar</p>
				</Button>
			</div>
		</div>
	);
};
