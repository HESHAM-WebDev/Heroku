import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
//[START] IMPORTS THAT HAVE RELATION WITH USER
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Practice } from "./pages/practice";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Recover } from "./pages/recover";
import { Profile } from "./pages/profile";
import injectContext from "./store/appContext";
//[END]IMPORTS THAT HAVE RELATION WITH USER

//[START] IMPORTS THAT HAVE RELATION WITH ADMIN
import { AdminLogin } from "./admin_pages/admin_login";
import { AdminCreate } from "./admin_pages/admin_create";
import { AdminDashboard } from "./admin_pages/admin_dashboard";
import { AdminWait } from "./admin_pages/admin_wait";

import { ModalExample } from "./admin_pages/modal";

//[START] IMPORTS THAT HAVE RELATION WITH THE BOSS
import { RegisterAdmin } from "./boss_pages/register_admin";

//[START] GLOBAL IMPORTS
import { Nav_bar } from "./component/navbar";
import { Footer } from "./component/footer";
//[END] GLOBAL IMPORTS

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Nav_bar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/recover">
							<Recover />
						</Route>
						<Route exact path="/practice">
							<Practice />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/admin">
							<AdminLogin />
						</Route>
						<Route exact path="/admin/register">
							<RegisterAdmin />
						</Route>
						<Route exact path="/admin/create">
							<AdminCreate />
						</Route>
						<Route exact path="/admin/dashboard">
							<AdminDashboard />
						</Route>
						<Route exact path="/admin/wait">
							<AdminWait />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1 className="m-5">Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
