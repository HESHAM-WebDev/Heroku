import React, { Component, useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import MathJax from "react-mathjax";
export const Practice = () => {
	const [finished, setFinished] = useState(true);
	const { store, actions } = useContext(Context);
	const statement = ["Hola!", "(a^2+3)/56", "prueba", "\\dfrac{a^2+3}{56}", "x^2-56"];
	const types = ["t", "f", "t", "f", "f"];

	const inlineFormula = `k_{n + 1} = n^2 + k_n^2 - k_{n - 1}`;
	const blockFormula = `\\int_0^\\infty x^2 dx`;
	let final = [];

	types.map(function(element, index) {
		let temporal = "";
		if (element === "t") {
			temporal = (
				<p key={index}>
					&nbsp;
					{statement[index]}
					&nbsp;
				</p>
			);
			final.push(temporal);
		} else if (element === "f") {
			temporal = (
				<MathJax.Provider key={index}>
					<div>
						<p>
							<MathJax.Node inline formula={statement[index]} />
						</p>
					</div>
				</MathJax.Provider>
			);
			final.push(temporal);
		} else if (element === "i") {
			temporal = <img key={index} src={statement[index]} />;
			final.push(temporal);
		}
	});

	function rendered() {
		if (finished) {
			return final;
		} else {
			return <div>Cargando</div>;
		}
	}

	return (
		// <div className="mx-auto pt-5">
		<div className="mx-auto pt-5 m-5">
			<div className="row mt-5">{rendered()}</div>
		</div>
	);
};
