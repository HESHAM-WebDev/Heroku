import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { ParseToApiStructure } from "../functions/parse_to_api_structure.js";
import { Link, useHistory } from "react-router-dom";
import "../../styles/index.css";
import classnames from "classnames";
import {
	Button,
	Input,
	Badge,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Row,
	Col
} from "reactstrap";
import { RenderCreatorStatement } from "./admin_render_creator_statement.js";

export const AdminCreate = () => {
	const [statement, setStatement] = useState([]);
	const [statementTypes, setStatementTypes] = useState([]);
	//t=>text f=>formula fb=> block formula s=>space i=>image l=>list m2=>table 2 col m3=>table 3 col m4=>table 4 col
	const [options, setOptions] = useState([]);
	const [optionsTypes, setOptionsTypes] = useState([]);
	const [answers, setAnswers] = useState([]); //"t","f","f","f"
	const [renderedCreator, setRenderedCreator] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [final_statement, setFinalStatement] = useState(<h1>Aquí aparecerá el enunciado resultante.</h1>);
	const [final_options, setFinalOptions] = useState("");
	const [api_message, setApiMessage] = useState("");
	const [statement_info, setStatementInfo] = useState(["", "", "", ""]);

	const { store, actions } = useContext(Context);
	//const statement = ["Hola!", "(a^2+3)/56", "prueba", "\\dfrac{a^2+3}{56}", "x^2-56"];

	//<--------------------------[START - FUNCTIONS TO SAVE STATEMENT INTO API|| FINISH STATEMENT || SEND INFO]------------------->

	function sendToApi() {
		setApiMessage(
			<ParseToApiStructure
				statement_api={statement}
				statementTypes_api={statementTypes}
				options_api={options}
				optionsTypes_api={optionsTypes}
				answers_api={answers}
				statement_info_api={statement_info}
				statement_id={store.statement_content.id}
			/>
		);
	}

	//<--------------------------[END - FUNCTIONS TO SAVE STATEMENT INTO API|| FINISH STATEMENT || SEND INFO]------------------->

	//<--------------------------[START - FUNCTION TO MODIFY STATEMENT INFORMATION]--------------------------------------------->

	function modifyStatementInfo(e, index) {
		let aux_info = statement_info;
		aux_info[index] = e.target.value;
		setStatementInfo(aux_info);
	}

	//<--------------------------[END - FUNCTION TO MODIFY STATEMENT INFORMATION]----------------------------------------------->

	//<--------------------------[START - FUNCTION THAT CALLS THE STATEMENT CREATOR || OPTION CREATOR || INFO]------------------->

	const [activeTab, setActiveTab] = useState("1");

	const toggle_tab = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	useEffect(() => {
		//
	}, [store.statement_content]);

	//<--------------------------[END - FUNCTION THAT CALLS THE STATEMENT CREATOR OR OPTION CREATOR]----------------------------->

	//<--------------------------[START - FUNCTION TO EDIT BUTTON LABELS AND ACTIONS]-------------------------------------------->

	function responsiveButtons() {
		if (activeTab === "1") {
			return <p>Aquí estarán los botones al modificar el enunciado u opciones.</p>;
		} else if (activeTab === "2") {
			return (
				<div className="d-flex justify-content-start bg-light">
					<Button size="sm" onClick={() => addToStatement("t")}>
						<i className="far fa-file-alt" />
						&nbsp; Texto
					</Button>
					&nbsp;
					<Button size="sm" onClick={() => addToStatement("f")}>
						<i className="fas fa-calculator" />
						&nbsp; Fórmula
					</Button>
					&nbsp;
					<Button size="sm" onClick={() => addToStatement("i")}>
						<i className="far fa-images" /> &nbsp; Imagen
					</Button>
					&nbsp;
					<Button size="sm" onClick={() => addToStatement("s")}>
						<i className="fas fa-ruler-horizontal" />
						&nbsp; Separador
					</Button>
					&nbsp;
					<Button size="sm" onClick={() => addToStatement("l")}>
						<i className="fas fa-list" />
						&nbsp; Lista
					</Button>
					&nbsp;
					<Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm">
						<DropdownToggle caret>
							{" "}
							<i className="fas fa-th" />
							&nbsp; Tabla
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={() => addToStatement("m2")}>2 Columnas</DropdownItem>
							<DropdownItem onClick={() => addToStatement("m3")}>3 Columnas</DropdownItem>
							<DropdownItem onClick={() => addToStatement("m4")}>4 Columnas</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			);
		} else if (activeTab === "3") {
			return (
				<div className="d-flex justify-content-start bg-light">
					<Button size="sm" onClick={() => addToOptions("t")}>
						<i className="far fa-file-alt" />
						&nbsp; Texto
					</Button>
					&nbsp;
					<Button size="sm" onClick={() => addToOptions("f")}>
						<i className="fas fa-calculator" />
						&nbsp; Fórmula
					</Button>
					&nbsp;
					<Button size="sm" onClick={() => addToOptions("i")}>
						<i className="far fa-images" /> &nbsp; Imagen
					</Button>
					&nbsp;
				</div>
			);
		} else if (activeTab === "4") {
			return (
				<div className="d-flex justify-content-start bg-light">
					<span className="h6">La información permite categorizar los enunciados.</span>
				</div>
			);
		}
	}

	//<--------------------------[END - FUNCTION TO EDIT BUTTON LABELS AND ACTIONS]---------------------------------------------->

	//<--------------------------[START - FUNCTION TO SET CORRECT ANSWER]-------------------------------------------------------->

	function updateCorrectAnswer(index) {
		let aux_answer = answers;

		aux_answer.fill(false);
		aux_answer[index] = true;

		setAnswers(aux_answer);
		refreshOptionsCreator();
	}

	//<--------------------------[END - FUNCTION TO SET CORRECT ANSWER]---------------------------------------------------------->

	//<--------------------------[START - FUNCTION ADD TYPES/OPTIONS ARRAYS]----------------------------------------------------->

	function addToOptions(type) {
		let aux_options = options;
		let aux_options_types = optionsTypes;
		let aux_answers = answers;

		aux_options.push("");
		aux_options_types.push(type);
		aux_answers.push(false);

		setOptions(aux_options);
		setOptionsTypes(aux_options_types);
		setAnswers(aux_answers);

		refreshOptionsCreator();
	}

	//<--------------------------[CREATOR EDITOR FUNCTIONS]--------------------------------------------------------------------->

	function deleteOptionsElement(index) {
		let aux_options = options;
		let aux_options_types = optionsTypes;
		let aux_answers = answers;

		aux_options.splice(index, 1);
		aux_options_types.splice(index, 1);
		aux_answers.splice(index, 1);

		setOptionsTypes(aux_options_types);
		setOptions(aux_options);
		setAnswers(aux_answers);

		refreshOptionsCreator();
	}

	function editOptionsCreatorElement(e, index) {
		let aux_options = options;
		aux_options[index] = e.target.value;

		setOptions(aux_options);
		refreshOptionsCreator();
	}

	//<--------------------------[END - FUNCTION ADD TYPES/OPTIONS ARRAYS]------           -------------------------------------->

	//<--------------------------[START - FUNCTION TO CALL STATEMENT CREATOR // RIGHT SIDE OF THE SCREEN]------------------------>
	//This calls a component declared on the file admin_render_creator_statement.js

	function setPreview() {
		setFinalStatement(
			<RenderCreatorStatement
				statementToRender={statement}
				statementTypesToRender={statementTypes}
				optionsToRender={options}
				optionsTypesToRender={optionsTypes}
				answers={answers}
			/>
		);
	}

	//<--------------------------[END - FUNCTION TO CALL STATEMENT CREATOR // RIGT SIDE OF THE SCREEN]--------------------------->

	//<--------------------------[START - FUNCTION THAT CREATE THE EDITOR LABELS FOR OPTIONS]------------------------------------>

	function saveOptionsValues(e, index) {
		let aux_options = options;

		aux_options[index] = e.target.value;

		setOptions(aux_options);
	}

	function refreshOptionsCreator() {
		let aux_options_creator = [];
		optionsTypes.map(function(element, index) {
			let aux = "";

			let badge_color = "danger";
			let badge_label = "Incorrecta";

			if (answers[index] === true) {
				badge_color = "success";
				badge_label = "Correcta";
			}

			if (element === "t") {
				aux = (
					<div
						key={index.toString() + options[index].toString() + "opt"}
						className="row p-1 pt-0 border rounded-1 shadow mt-1">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0 ">
								<Badge color={badge_color} onClick={() => updateCorrectAnswer(index)}>
									{badge_label}
								</Badge>
								<Badge color="info"> Texto</Badge>
							</div>
							<div className="float-end">
								<Badge
									onClick={() => {
										deleteOptionsElement(index);
									}}
									color="danger">
									X
								</Badge>
							</div>
						</div>
						<Input
							type="textarea"
							name="text"
							id={index.toString() + element + "opt"}
							onBlur={() => {
								editOptionsCreatorElement(event, index);
							}}
							onChange={() => {
								saveOptionsValues(event, index);
							}}
							defaultValue={options[index]}
						/>
					</div>
				);
				aux_options_creator.push(aux);
			} else if (element === "f") {
				aux = (
					<div
						key={index.toString() + options[index].toString() + "opt"}
						className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color={badge_color} onClick={() => updateCorrectAnswer(index)}>
									{badge_label}
								</Badge>
								<Badge color="info"> Fórmula</Badge>
							</div>
							<div className="float-end">
								<Badge
									onClick={() => {
										deleteOptionsElement(index);
									}}
									color="danger">
									X
								</Badge>
							</div>
						</div>
						<Input
							type="text"
							name="text"
							id={index.toString() + element + "opt"}
							className="mb-1"
							onBlur={() => {
								editOptionsCreatorElement(event, index);
							}}
							onChange={() => {
								saveOptionsValues(event, index);
							}}
							defaultValue={options[index]}
						/>
					</div>
				);
				aux_options_creator.push(aux);
			} else if (element === "i") {
				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge
									key={element + badge_label}
									color={badge_color}
									onClick={() => updateCorrectAnswer(index)}>
									{badge_label}
								</Badge>
								<Badge color="info"> Imagen</Badge>
							</div>
							<div className="float-end">
								<Badge
									onClick={() => {
										deleteOptionsElement(index);
									}}
									color="danger">
									X
								</Badge>
							</div>
						</div>
						<Input type="file" name="file" id={index.toString() + element} accept=".jpg,.png,.jpeg,.gif" />
					</div>
				);

				aux_options_creator.push(aux);
			}
		});
		setFinalOptions(aux_options_creator);
	}

	//<--------------------------[END - FUNCTION THAT CREATE THE EDITOR LABELS FOR OPTIONS]------------------------------------>
	//<--------------------------[START - FUNCTION THAT CREATE THE EDITOR LABELS]------------------------------------------------>

	function refreshCreator() {
		let auxCreator = [];
		statementTypes.map(function(element, index) {
			let aux = "";
			if (element === "t") {
				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-1">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Texto</Badge>
							</div>
							<div className="float-end">
								<Badge
									onClick={() => {
										deleteCreatorElement(index);
									}}
									color="danger">
									X
								</Badge>
							</div>
						</div>
						<Input
							type="textarea"
							name="text"
							id={index.toString() + element}
							onBlur={() => {
								editCreatorElement(event, index);
							}}
						/>
					</div>
				);
				auxCreator.push(aux);
			} else if (element === "f") {
				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Fórmula</Badge>
							</div>
							<div className="float-end">
								<Badge
									onClick={() => {
										deleteCreatorElement(index);
									}}
									color="danger">
									X
								</Badge>
							</div>
						</div>
						<Input
							type="text"
							name="text"
							id={index.toString() + element}
							className="mb-1"
							onBlur={() => {
								editCreatorElement(event, index);
							}}
						/>
					</div>
				);
				auxCreator.push(aux);
			} else if (element === "s") {
				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3 bg-secondary">
						<Badge
							color="secondary"
							className="col-12 d-flex justify-content-between bg-secondary text-dark">
							SEPARADOR
							<Badge
								onClick={() => {
									deleteCreatorElement(index);
								}}
								color="danger">
								X
							</Badge>
						</Badge>
					</div>
				);

				auxCreator.push(aux);
			} else if (element === "i") {
				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Imagen</Badge>
							</div>
							<div className="float-end">
								<Badge
									onClick={() => {
										deleteCreatorElement(index);
									}}
									color="danger">
									X
								</Badge>
							</div>
						</div>
						<Input type="file" name="file" id={index.toString() + element} accept=".jpg,.png,.jpeg,.gif" />
					</div>
				);

				auxCreator.push(aux);
			} else if (element === "l") {
				const list_inputs = statement[index].map((list_element, list_index) => (
					<Input
						key={list_index}
						type="text"
						name="text"
						id={index.toString() + list_index.toString() + element}
						className="mb-1"
						onBlur={() => {
							editListElement(event, index, list_index);
						}}
					/>
				));

				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Lista</Badge>
							</div>
							<div className="float-end">
								<Badge
									color="danger"
									onClick={() => {
										deleteCreatorElement(index);
									}}>
									X
								</Badge>
							</div>
						</div>
						{list_inputs}
						<div className="col-12 d-flex justify-content-end">
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteListInput(index, true);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-plus" />
									&nbsp;
								</p>
							</Button>
							&nbsp;
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteListInput(index, false);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-minus" />
									&nbsp;
								</p>
							</Button>
						</div>
					</div>
				);

				auxCreator.push(aux);
			} else if (element === "m2") {
				let aux_inputs = [];

				statement[index].map(function(table_element, row_index) {
					let table_aux = "";
					if (row_index === 0) {
						table_aux = (
							<div key={row_index} className="row container-fluid m-1 mt-0 d-flex justify-content-center">
								<div className="col-6">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "0"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 0);
										}}
									/>
								</div>
								<div className="col-6">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "1"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 1);
										}}
									/>
								</div>
							</div>
						);
					} else if (row_index > 0) {
						table_aux = (
							<div key={row_index} className="row container-fluid m-1 mt-0 d-flex justify-content-center">
								<div className="col-6">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "0"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 0);
										}}
									/>
								</div>
								<div className="col-6">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "1"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 1);
										}}
									/>
								</div>
							</div>
						);
					}

					aux_inputs.push(table_aux);
				});

				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Tabla</Badge>
								<small className="text-muted">
									&nbsp; En las tablas solo es posible agregar texto, no expresiones matemáticas.
								</small>
							</div>
							<div className="float-end">
								<Badge
									color="danger"
									onClick={() => {
										deleteCreatorElement(index);
									}}>
									X
								</Badge>
							</div>
						</div>

						{aux_inputs}

						<div className="col-12 d-flex justify-content-end">
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteTableInput(index, element, true);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-plus" />
									&nbsp;
								</p>
							</Button>
							&nbsp;
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteTableInput(index, element, false);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-minus" />
									&nbsp;
								</p>
							</Button>
						</div>
					</div>
				);
				auxCreator.push(aux);
			} else if (element === "m3") {
				let aux_inputs = [];

				statement[index].map(function(table_element, row_index) {
					let table_aux = "";
					if (row_index === 0) {
						table_aux = (
							<div key={row_index} className="row container-fluid m-1 mt-0 d-flex justify-content-center">
								<div className="col-4">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "0"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 0);
										}}
									/>
								</div>
								<div className="col-4">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "1"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 1);
										}}
									/>
								</div>
								<div className="col-4">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "2"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 2);
										}}
									/>
								</div>
							</div>
						);
					} else if (row_index > 0) {
						table_aux = (
							<div key={row_index} className="row container-fluid m-1 mt-0 d-flex justify-content-center">
								<div className="col-4">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "0"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 0);
										}}
									/>
								</div>
								<div className="col-4">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "1"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 1);
										}}
									/>
								</div>
								<div className="col-4">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "2"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 2);
										}}
									/>
								</div>
							</div>
						);
					}

					aux_inputs.push(table_aux);
				});

				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Tabla</Badge>
								<small className="text-muted">
									&nbsp; En las tablas solo es posible agregar texto, no expresiones matemáticas.
								</small>
							</div>
							<div className="float-end">
								<Badge
									color="danger"
									onClick={() => {
										deleteCreatorElement(index);
									}}>
									X
								</Badge>
							</div>
						</div>

						{aux_inputs}

						<div className="col-12 d-flex justify-content-end">
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteTableInput(index, element, true);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-plus" />
									&nbsp;
								</p>
							</Button>
							&nbsp;
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteTableInput(index, element, false);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-minus" />
									&nbsp;
								</p>
							</Button>
						</div>
					</div>
				);
				auxCreator.push(aux);
			} else if (element === "m4") {
				let aux_inputs = [];

				statement[index].map(function(table_element, row_index) {
					let table_aux = "";
					if (row_index === 0) {
						table_aux = (
							<div key={row_index} className="row container-fluid m-1 mt-0 d-flex justify-content-center">
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "0"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 0);
										}}
									/>
								</div>
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "1"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 1);
										}}
									/>
								</div>
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "2"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 2);
										}}
									/>
								</div>
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "3"}
										placeholder="Título de la columna"
										className="m-1 border-dark"
										onBlur={() => {
											editTableElement(event, index, row_index, 3);
										}}
									/>
								</div>
							</div>
						);
					} else if (row_index > 0) {
						table_aux = (
							<div key={row_index} className="row container-fluid m-1 mt-0 d-flex justify-content-center">
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "0"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 0);
										}}
									/>
								</div>
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "1"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 1);
										}}
									/>
								</div>
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "2"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 2);
										}}
									/>
								</div>
								<div className="col-3">
									<Input
										type="text"
										name="text"
										id={index.toString() + row_index.toString() + "3"}
										className="m-1"
										onBlur={() => {
											editTableElement(event, index, row_index, 3);
										}}
									/>
								</div>
							</div>
						);
					}

					aux_inputs.push(table_aux);
				});

				aux = (
					<div key={index} className="row p-1 pt-0 border rounded-1 shadow mt-3">
						<div className="col-12 m-0 p-0 d-flex justify-content-between">
							<div className="m-0 p-0">
								<Badge color="secondary"> Tabla</Badge>
								<small className="text-muted">
									&nbsp; En las tablas solo es posible agregar texto, no expresiones matemáticas.
								</small>
							</div>
							<div className="float-end">
								<Badge
									color="danger"
									onClick={() => {
										deleteCreatorElement(index);
									}}>
									X
								</Badge>
							</div>
						</div>

						{aux_inputs}

						<div className="col-12 d-flex justify-content-end">
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteTableInput(index, element, true);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-plus" />
									&nbsp;
								</p>
							</Button>
							&nbsp;
							<Button
								color="secondary"
								size="sm"
								className="p-0"
								onClick={() => {
									addOrDeleteTableInput(index, element, false);
								}}>
								<p className="m-0 p-0">
									&nbsp;
									<i className="fas fa-minus" />
									&nbsp;
								</p>
							</Button>
						</div>
					</div>
				);
				auxCreator.push(aux);
			}
		});
		setRenderedCreator(auxCreator);
	}
	//<--------------------------[FINISH - FUNCTION THAT CREATES THE EDITOR LABELS]------------------------->

	//<--------------------------[START - FUNCTIONS FOR CREATOR ELEMENTS]---------------------->

	function addToStatement(type) {
		let aux_statement = statement;
		let aux_statement_types = statementTypes;

		if (type === "t" || type === "f" || type === "s" || type === "i") {
			aux_statement.push("");
		} else if (type === "l") {
			aux_statement.push([""]);
		} else if (type === "m2") {
			aux_statement.push([
				["", ""],
				["", ""]
			]);
		} else if (type === "m3") {
			aux_statement.push([
				["", "", ""],
				["", "", ""]
			]);
		} else if (type === "m4") {
			aux_statement.push([
				["", "", "", ""],
				["", "", "", ""]
			]);
		}
		aux_statement_types.push(type);

		setStatement(aux_statement);
		setStatementTypes(aux_statement_types);

		refreshCreator();
	}

	//<--------------------------[=> START LIST EDITOR FUNCTIONS]---------------------->

	function editListElement(e, statement_index, list_index) {
		let aux_statement = statement;

		aux_statement[statement_index][list_index] = e.target.value;

		setStatement(aux_statement);

		refreshCreator();
	}

	function addOrDeleteListInput(statement_index, addInput) {
		let aux_statement = statement;

		let min_list_input_validation = aux_statement[statement_index].length;

		if (addInput) {
			aux_statement[statement_index].push("");
		} else {
			if (min_list_input_validation > 1) {
				aux_statement[statement_index].pop();
			}
		}

		setStatement(aux_statement);

		refreshCreator();
	}
	//<--------------------------[=> FINISH LIST EDITOR FUNCTIONS]---------------------->

	//<--------------------------[=> START TABLE EDITOR FUNCTIONS]---------------------->

	const toggle = () => setDropdownOpen(prevState => !prevState);

	function addOrDeleteTableInput(statement_index, input_type, addInput) {
		let aux_statement = statement;

		let min_list_input_validation = aux_statement[statement_index].length;

		let push_item = ["", ""];

		if (input_type === "m3") {
			push_item = ["", "", ""];
		} else if (input_type === "m4") {
			push_item = ["", "", "", ""];
		}

		if (addInput) {
			aux_statement[statement_index].push(push_item);
		} else {
			if (min_list_input_validation > 2) {
				aux_statement[statement_index].pop();
			}
		}

		setStatement(aux_statement);

		refreshCreator();
	}

	function editTableElement(e, statement_index, row_index, input_index) {
		let aux_statement = statement;

		aux_statement[statement_index][row_index][input_index] = e.target.value;

		setStatement(aux_statement);

		refreshCreator();
	}

	//<--------------------------[=> FINISH TABLE EDITOR FUNCTIONS]---------------------->
	//<--------------------------[CREATOR EDITOR FUNCTIONS]---------------------->

	function deleteCreatorElement(index) {
		let aux_statement = statement;
		let aux_statement_types = statementTypes;

		aux_statement.splice(index, 1);
		aux_statement_types.splice(index, 1);

		setStatement(aux_statement);
		setStatementTypes(aux_statement_types);

		refreshCreator();
	}

	function editCreatorElement(e, index) {
		let aux_statement = statement;
		aux_statement[index] = e.target.value;

		setStatement(aux_statement);
	}

	//<----------------------------------[FINISH - FUNCTION FOR CREATOR ELEMENTS]---------------------------------->
	let text = (
		<div className="row p-1 pt-0 border rounded-1 shadow mt-1">
			<div className="col-12 m-0 p-0 d-flex justify-content-between">
				<div className="m-0 p-0">
					<Badge color="secondary"> Texto</Badge>
				</div>
				<div className="float-end">
					<Badge color="danger">X</Badge>
				</div>
			</div>
			<Input type="textarea" name="text" id="exampleText" />
		</div>
	);
	let list = (
		<div className="row p-1 pt-0 border rounded-1 shadow mt-3">
			<div className="col-12 m-0 p-0 d-flex justify-content-between">
				<div className="m-0 p-0">
					<Badge color="secondary"> Lista</Badge>
				</div>
				<div className="float-end">
					<Badge color="danger">X</Badge>
				</div>
			</div>
			<Input type="text" name="text" id="exampleText" className="mb-1" />
			<Input type="text" name="text" id="exampleText" className="mb-1" />
			<Input type="text" name="text" id="exampleText" className="mb-1" />
			<div className="col-12 d-flex justify-content-end">
				<Button color="secondary" size="sm" className="p-0">
					<p className="m-0 p-0">
						&nbsp;
						<i className="fas fa-plus" />
						&nbsp;
					</p>
				</Button>
				&nbsp;
				<Button color="secondary" size="sm" className="p-0">
					<p className="m-0 p-0">
						&nbsp;
						<i className="fas fa-minus" />
						&nbsp;
					</p>
				</Button>
			</div>
		</div>
	);

	return (
		<div className="container-fluid mt-5 pt-5">
			<div className="container-fluid fixed-top  bg-light" style={{ "margin-top": "59.7px" }}>
				<div className="row pt-1">
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">{responsiveButtons()}</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
						<div className="d-flex justify-content-between bg-light ms-1">
							<Button size="sm" onClick={() => setPreview()}>
								<i className="fas fa-sync" />
								&nbsp; Actualizar
							</Button>
							&nbsp;
							<div className="row d-flex align-items-center">
								&nbsp;
								<span>{api_message}</span>
								&nbsp;
								<Button
									size="sm"
									onClick={() => {
										sendToApi();
									}}>
									<i className="far fa-save" />
									&nbsp; Guardar
								</Button>
								&nbsp;
								<Button size="sm">
									<i className="far fa-paper-plane" /> &nbsp; Finalizar
								</Button>
								&nbsp;
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row m-2 mt-4 ">
				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
					<div>
						<Nav tabs className="m-0 p-0">
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === "1" })}
									onClick={() => {
										toggle_tab("1");
									}}>
									Inicio
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === "2" })}
									onClick={() => {
										toggle_tab("2");
									}}>
									Enunciado
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === "3" })}
									onClick={() => {
										toggle_tab("3");
									}}>
									Opciones
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === "4" })}
									onClick={() => {
										toggle_tab("4");
									}}>
									Información
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								<Row>
									<Col sm="12">
										<p>¡Bienvenido al creador de enunciados!</p>
										<p>
											Esta herramienta consta de tres secciones, la primera permite llenar el
											contenido del enunciado, la segunda permite llenar las opciones, la sección
											de información permite clasificar los enunciados dentro de la plataforma, su
											origen, entre otros.
										</p>
									</Col>
								</Row>
							</TabPane>
							<TabPane tabId="2">
								<Row>
									<Col sm="12">{renderedCreator}</Col>
								</Row>
							</TabPane>
							<TabPane tabId="3">
								<Row>
									<Col sm="12">{final_options}</Col>
								</Row>
							</TabPane>
							<TabPane tabId="4">
								<Row className="d-flex justify-content-center">
									<h2>Información general del enunciado</h2>
									<div className="row w-75">
										<small>Título:</small>
										<Input
											type="textarea"
											placeholder={
												"Debe ser algo representativo, con el fin de identificarlo más fácilmente para el desarrollador/profesor. Ejemplo: Lectura de inferencia, Serie numérica con objetos. El título no aparecerá para el usuario final."
											}
											onBlur={() => modifyStatementInfo(event, 0)}
										/>
										<small>Universidad de origen:</small>
										<Input
											type="select"
											name="select"
											id="institution_form"
											onChange={() => modifyStatementInfo(event, 1)}>
											<option disabled selected value>
												Seleccione una universidad
											</option>

											<option>UCR</option>
											<option>TEC</option>
											<option>UNA</option>
											<option>OTRO</option>
											<option>N/A</option>
										</Input>
										<small>Área:</small>
										<Input
											type="select"
											name="select"
											id="area_form"
											onChange={() => modifyStatementInfo(event, 2)}>
											<option disabled selected value>
												Seleccione un área
											</option>
											<option value="m">Razonamiento Matemático</option>
											<option value="v">Razonamiento Verbal</option>
										</Input>
										<small>Fuente {"(Formato APA):"}</small>
										<Input
											onBlur={() => modifyStatementInfo(event, 3)}
											type="textarea"
											placeholder={
												"TEC. 2021. Práctica Prueba Aptitud Académica 2020. Enunciado Número 23"
											}
										/>
									</div>
								</Row>
							</TabPane>
						</TabContent>
					</div>
				</div>
				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 container-fluid">
					<div className="bg-light border border-info rounded rounded-4 shadow shadow-sm p-1">
						<div className="m-1" key={[statement, answers]}>
							{final_statement}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
