import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/index.css";

export const RegisterAdmin = () => {
	const { store, actions } = useContext(Context);
	const History = useHistory();

	const [name, setName] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [adminType, setAdminType] = useState("Admin");
	const [conditions, setConditions] = useState([false, false, false, false, false, false, false]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function handleTypeAdmin() {
		if (adminType === "Admin") {
			setAdminType("Admin+");
		} else {
			setAdminType("Admin");
		}
	}

	const showValidation = (tag, show, index) => {
		if (!show) {
			tag.classList.remove("is-valid");
			tag.classList.add("is-invalid");
			let temporal = conditions;
			temporal[index] = false;
			setConditions(temporal);
		} else {
			tag.classList.remove("is-invalid");
			tag.classList.add("is-valid");
			let temporal = conditions;
			temporal[index] = true;
			setConditions(temporal);
		}
	};

	const validateNameInput = e => {
		//Expresion regular para la validacion
		const nameregex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g; // Solo letras

		const tag = e.target;

		showValidation(tag, nameregex.test(tag.value), 0);
	};
	const validateLastNameInput = e => {
		//Expresion regular para la validacion
		const nameregex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g; // Solo letras

		const tag = e.target;

		showValidation(tag, nameregex.test(tag.value), 1);
	};
	const validateEmailInput = e => {
		//Expresion regular para la validacion de email
		const emailregex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

		const tag = e.target;

		showValidation(tag, emailregex.test(tag.value), 2);
	};
	const validatePassword = e => {
		var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
		const tag = e.target;
		showValidation(tag, passRegex.test(tag.value), 3);
	};

	const samePassword = e => {
		const tag = e.target;
		if (password != tag.value) {
			showValidation(tag, false, 4);
		} else {
			showValidation(tag, true, 4);
		}
	};
	const validateUsernameInput = e => {
		//Expresion regular para la validacion
		const textregex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g; // Solo letras

		const tag = e.target;

		showValidation(tag, textregex.test(tag.value), 5);
	};
	const validateSecurityCode = e => {
		//Expresion regular para la validacion
		const coderegex = /^[0-9]{6,10}$/;

		const tag = e.target;

		showValidation(tag, coderegex.test(tag.value), 6);
	};

	const handleSubmit = e => {
		let isBoss = false;

		if (adminType === "Admin") {
			isBoss = false;
		} else if (adminType === "Admin+") {
			isBoss = true;
		}
		e.preventDefault();
		const body = {
			name: name,
			last_name: last_name,
			email: email,
			username: username,
			security_code: code,
			is_admin_of_everything: isBoss,
			password: password
		};

		let formValid = false;

		if (conditions.every(element => element === true)) {
			//If all inputs are correct then continue with register
			formValid = true;
		} else {
			alert("Lo sentimos, debe llenar correctamente los espacios");
		}

		if (formValid) {
			let url = store.api_url + "/administrator/register";

			fetch(url, {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => {
					if (res.status === 201) {
						alert("Cuenta registrada exitosamente");

						// Se logró registrar correctamente, se llama inmediatamente a que se loguee de una vez
						History.push("/admin");
						return res.json();
					} else {
						alert("Ha ocurrido un error");
					}
				})
				.then(data => {
					console.log(data);
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<div className="pt-5 m-5">
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">REGISTRO ADMIN</p>
					</Badge>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Nombre</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									onChange={e => setName(e.target.value)}
									onBlur={validateNameInput}
									type="text"
									className="form-control"
									id="inputName"
									placeholder="Tu nombre"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Apellido</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									onChange={e => setLast_name(e.target.value)}
									type="text"
									className="form-control"
									id="inputLastName"
									onBlur={validateLastNameInput}
									placeholder="Tu apellido"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Correo electrónico</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									onChange={e => setEmail(e.target.value)}
									type="email"
									className="form-control rounded m-1"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="ejemplo@correo.com"
									onBlur={validateEmailInput}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Nombre de usuario</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									onChange={e => setUsername(e.target.value)}
									onBlur={validateUsernameInput}
									type="text"
									className="form-control"
									id="inputName"
									placeholder="Username"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Código de seguridad</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									onChange={e => setCode(e.target.value)}
									onBlur={validateSecurityCode}
									type="text"
									className="form-control"
									id="inputName"
									placeholder="Código de seguridad"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Contraseña</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									type="password"
									onChange={e => setPassword(e.target.value)}
									onBlur={validatePassword}
									className="form-control"
									id="inputPassword1"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<Badge className="col-xl-6 col-lg-8 col-md 10 col-sm-12 rounded-top rounded-5 shadow" color="dark">
						<p className="h6 m-0">Confirmar contraseña</p>
					</Badge>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col-xl-6 col-lg-8 col-md 10 col-sm-12 bg-secondary border-5  shadow">
						<div className="row">
							<div className="col-12  d-flex justify-content-center float-end align-items-center m-1">
								<input
									type="password"
									onChange={(e => setConfPassword(e.target.value), samePassword)}
									className="form-control"
									id="inputPassword2"
									onBlur={samePassword}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-3">
				<div className="row d-flex justify-content-center">
					<button
						onClick={handleTypeAdmin}
						className="btn  col-xl-3 col-lg-4 col-md-5 col-sm-6  border border-5 shadow bg-dark">
						<p className="h3 text-light">{adminType}</p>
					</button>
					<button
						type="submit"
						onClick={handleSubmit}
						className="btn  col-xl-3 col-lg-4 col-md-5 col-sm-6  border border-5 shadow bg-success">
						<p className="h3 text-light">Registrar</p>
					</button>
				</div>
			</div>
		</div>
	);
};
