import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/index.css";
export function ModalExample() {
	const [modal, setModal] = useState(false);
	const [counter, setCounter] = useState(2);
	const { store, actions } = useContext(Context);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="secondary" onClick={toggle} size="sm" className="m-0">
				<i className="fas fa-th" />
				&nbsp; Tabla
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>¿De cuántas columnas será la tabla?</ModalHeader>
				<ModalBody>
					<small>Puedes seleccionar hasta un máximo de 4 columnas.</small>
					<div className="container-fluid d-flex align-items-center justify-content-center m-1" />
					<Button
						color="secondary"
						size="sm"
						className="p-0"
						onClick={() => {
							if (counter > 2) {
								setCounter(counter - 1);
							}
						}}>
						<p className="m-0 p-0">
							&nbsp;
							<i className="fas fa-minus" />
							&nbsp;
						</p>
					</Button>
					&nbsp;
					<Button color="secondary" size="sm" className="p-0" disabled>
						<p className="m-0 p-0">
							&nbsp;
							{counter}
							&nbsp;
						</p>
					</Button>
					&nbsp;
					<Button
						color="secondary"
						size="sm"
						className="p-0"
						onClick={() => {
							if (counter < 4) {
								setCounter(counter + 1);
							}
						}}>
						<p className="m-0 p-0">
							&nbsp;
							<i className="fas fa-plus" />
							&nbsp;
						</p>
					</Button>
				</ModalBody>
				<ModalFooter>
					<Button
						color="success"
						className="bg-success border-success"
						onClick={() => {
							actions.defineTableColumns(counter);
							toggle();
						}}>
						Agregar
					</Button>{" "}
					<Button color="danger" onClick={toggle}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
