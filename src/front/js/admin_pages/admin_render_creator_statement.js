import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Badge, Table, Alert } from "reactstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import MathJax from "react-mathjax";
import "../../styles/index.css";
export function RenderCreatorStatement(props) {
	const { statementToRender, statementTypesToRender, optionsToRender, optionsTypesToRender, answers } = props;
	const [convertedComponent, setConvertedComponent] = useState("");
	console.log(statementToRender, statementTypesToRender);

	// let array_aux = statementToRender;
	// statementTypesToRender.map(function(element, index) {
	// 	if (element === "l") {
	// 		let element_aux = array_aux[index];
	// 		//array_aux[index] = element_aux.join(" ");
	// 		console.log(array_aux);
	// 	} else if (element === "m2") {
	// 		let element_aux = array_aux[index];
	// 		//let internal_array = element_aux[0].concat(element_aux[1]);
	// 		//array_aux[index] = internal_array.join(" ");
	// 	}
	// });
	// console.log(array_aux);

	function refreshCreator() {
		let auxCreator = [];
		statementTypesToRender.map(function(element, index) {
			let aux = "";
			if (element === "t") {
				aux = (
					<span className="m-0 p-0" key={index}>
						{statementToRender[index]}
						&nbsp;
					</span>
				);
				auxCreator.push(aux);
			} else if (element === "f") {
				aux = (
					<MathJax.Provider key={index}>
						<span>
							<MathJax.Node inline formula={statementToRender[index]} />
						</span>
						<span>&nbsp;</span>
					</MathJax.Provider>
				);
				auxCreator.push(aux);
			} else if (element === "s") {
				aux = <br />;

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
						<Input type="file" name="file" id="exampleFile" accept=".jpg,.png,.jpeg,.gif" />
					</div>
				);

				auxCreator.push(aux);
			} else if (element === "l") {
				const list_inputs = statementToRender[index].map((list_element, list_index) => (
					<li key={list_index}>{statementToRender[index][list_index]}</li>
				));

				aux = <ul key={index}>{list_inputs}</ul>;

				auxCreator.push(aux);
			} else if (element === "m2") {
				let aux_inputs = [];

				statementToRender[index].map(function(table_element, row_index) {
					let table_aux = "";
					if (row_index === 0) {
						table_aux = (
							<thead key={row_index}>
								<tr>
									<th>{statementToRender[index][row_index][0]}</th>
									<th>{statementToRender[index][row_index][1]}</th>
								</tr>
							</thead>
						);
					} else if (row_index > 0) {
						table_aux = (
							<tr key={row_index}>
								<td>{statementToRender[index][row_index][0]}</td>
								<td>{statementToRender[index][row_index][1]}</td>
							</tr>
						);
					}

					aux_inputs.push(table_aux);
				});

				aux = (
					<Table responsive bordered key={index} size="sm" className="text-center">
						{aux_inputs}
					</Table>
				);
				auxCreator.push(aux);
			} else if (element === "m3") {
				let aux_inputs = [];

				statementToRender[index].map(function(table_element, row_index) {
					let table_aux = "";
					if (row_index === 0) {
						table_aux = (
							<thead key={row_index}>
								<tr>
									<th>{statementToRender[index][row_index][0]}</th>
									<th>{statementToRender[index][row_index][1]}</th>
									<th>{statementToRender[index][row_index][2]}</th>
								</tr>
							</thead>
						);
					} else if (row_index > 0) {
						table_aux = (
							<tr key={row_index}>
								<td>{statementToRender[index][row_index][0]}</td>
								<td>{statementToRender[index][row_index][1]}</td>
								<td>{statementToRender[index][row_index][2]}</td>
							</tr>
						);
					}

					aux_inputs.push(table_aux);
				});

				aux = (
					<Table responsive bordered key={index} size="sm" className="text-center">
						{aux_inputs}
					</Table>
				);
				auxCreator.push(aux);
			} else if (element === "m4") {
				let aux_inputs = [];

				statementToRender[index].map(function(table_element, row_index) {
					let table_aux = "";
					if (row_index === 0) {
						table_aux = (
							<thead key={row_index}>
								<tr>
									<th>{statementToRender[index][row_index][0]}</th>
									<th>{statementToRender[index][row_index][1]}</th>
									<th>{statementToRender[index][row_index][2]}</th>
									<th>{statementToRender[index][row_index][3]}</th>
								</tr>
							</thead>
						);
					} else if (row_index > 0) {
						table_aux = (
							<tr key={row_index}>
								<td>{statementToRender[index][row_index][0]}</td>
								<td>{statementToRender[index][row_index][1]}</td>
								<td>{statementToRender[index][row_index][2]}</td>
								<td>{statementToRender[index][row_index][3]}</td>
							</tr>
						);
					}
					aux_inputs.push(table_aux);
				});

				aux = (
					<Table responsive bordered key={index} size="sm" className="text-center">
						{aux_inputs}
					</Table>
				);
				auxCreator.push(aux);
			}
			return auxCreator;
		});

		optionsTypesToRender.map(function(element, index) {
			let aux = "";
			let color = "danger";

			if (answers[index] === true) {
				color = "success";
			}

			if (element === "t") {
				aux = (
					<Alert color={color}>
						<span className="m-0 p-0" key={index}>
							{optionsToRender[index]}
							&nbsp;
						</span>
					</Alert>
				);
				auxCreator.push(aux);
			} else if (element === "f") {
				aux = (
					<Alert color={color}>
						<span>
							<MathJax.Provider key={index}>
								<span>
									<MathJax.Node inline formula={optionsToRender[index]} />
								</span>
								<span>&nbsp;</span>
							</MathJax.Provider>
						</span>
					</Alert>
				);
				auxCreator.push(aux);
			}
		});

		setConvertedComponent(auxCreator);
	}
	useEffect(() => {
		refreshCreator();
	}, []);

	return <div>{convertedComponent}</div>;
}

RenderCreatorStatement.propTypes = {
	statementToRender: PropTypes.array,
	statementTypesToRender: PropTypes.array,
	optionsToRender: PropTypes.array,
	optionsTypesToRender: PropTypes.array,
	answers: PropTypes.array
};
