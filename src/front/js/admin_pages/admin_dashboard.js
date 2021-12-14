import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/index.css";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";

export const AdminDashboard = () => {
	const { store, actions } = useContext(Context);
	const History = useHistory();

	async function startNew() {
		actions.startNewStatement();
		History.push("/admin/wait");
	}

	return (
		<div className="pt-5 mt-5 container-fluid">
			<div className="row d-flex justify-content-center ">
				<div className="col-11 bg-secondary p-1 rounded border">
					<div className="row d-flex justify-content-between align-items-center m-1">
						<span className="h1">Hola! Fabián Chacón</span>
						<Button onClick={() => startNew()}>Crear Enunciado</Button>
					</div>

					<hr />
					<h3>Enunciados en el taller:</h3>
					<div className="row flex-row flex-nowrap overflow-auto m-1">
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
					</div>

					<hr />
					<h3>Enunciados publicados:</h3>
					<div className="row flex-row flex-nowrap overflow-auto m-1">
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
					</div>

					<hr />
					<h3>Enunciados en revisión:</h3>
					<div className="row flex-row flex-nowrap overflow-auto m-1">
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
						<div className="m-1">
							<Toast className="text-center" id="toasts_height">
								<ToastHeader>Pruebita</ToastHeader>
								<ToastBody>Contenido de la pregunta y así</ToastBody>
								<Button size="sm">Modificar</Button>
							</Toast>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
