import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from "reactstrap";

export const Nav_bar = () => {
	const { store, actions } = useContext(Context);

	const [isOpen, setIsOpen] = useState(false);
	//const [navItems, setNavItems] = useState(""); //REVISAR PARA BORRAR
	const toggle = () => setIsOpen(!isOpen);

	const closeIfOpen = () => {
		if (isOpen) {
			toggle();
		}
	};
	function conditionalNavItems() {
		if (!store.token) {
			return (
				<Nav className="mr-auto" navbar>
					<NavItem>
						<Link to="/practice" className="nav-link text-light h3" onClick={closeIfOpen}>
							Práctica
						</Link>
					</NavItem>
					<Link to="/login" className="nav-link text-light h3" onClick={closeIfOpen}>
						Ingresar
					</Link>
					<NavItem>
						<Link to="/register" className="nav-link text-light h3" onClick={closeIfOpen}>
							Registro
						</Link>
					</NavItem>
				</Nav>
			);
		} else if (store.token) {
			if (store.isUser) {
				return (
					<Nav className="mr-auto" navbar>
						<NavItem>
							<Link to="/practice" className="nav-link text-light h3" onClick={closeIfOpen}>
								Práctica
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/profile" className="nav-link text-light h3" onClick={closeIfOpen}>
								Perfil
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/"
								className="nav-link text-light h3"
								onClick={() => {
									closeIfOpen();
									actions.signOff();
								}}>
								Salir
							</Link>
						</NavItem>
					</Nav>
				);
			} else if (store.isAdmin) {
				return (
					<Nav className="mr-auto" navbar>
						<NavItem>
							<Link to="/practice" className="nav-link text-light h3" onClick={closeIfOpen}>
								Crear
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/dashboard" className="nav-link text-light h3" onClick={closeIfOpen}>
								Dashboard
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/"
								className="nav-link text-light h3"
								onClick={() => {
									closeIfOpen();
									actions.signOff();
								}}>
								Salir
							</Link>
						</NavItem>
					</Nav>
				);
			} else if (store.isBoss) {
				return (
					<Nav className="mr-auto" navbar>
						<NavItem>
							<Link to="/practice" className="nav-link text-light h3" onClick={closeIfOpen}>
								Crear
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/dashboard" className="nav-link text-light h3" onClick={closeIfOpen}>
								Dashboard
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/practice" className="nav-link text-light h3" onClick={closeIfOpen}>
								Revisar
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/"
								className="nav-link text-light h3"
								onClick={() => {
									closeIfOpen();
									actions.signOff();
								}}>
								Salir
							</Link>
						</NavItem>
					</Nav>
				);
			}
		}
	}

	// useEffect(//REVISAR PARA BORRAR POSTERIOR
	// 	() => {
	// 		setNavItems(conditionalNavItems());
	// 	},
	// 	[store.token, store.isUser, store.isAdmin, store.isBoss]
	// );

	return (
		<Navbar color="success" light expand="md" className="py-1 fixed-top">
			<NavbarBrand onClick={closeIfOpen}>
				{" "}
				<Link to="/">
					<span className="h2 d-flex align-items-center text-light ">
						<img
							height="auto "
							src="https://res.cloudinary.com/dubb4luoi/image/upload/v1622926480/android-icon-36x36_elru6i.png"
						/>
						UTÚ
					</span>
				</Link>
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				{conditionalNavItems()}
			</Collapse>
		</Navbar>
	);
};
