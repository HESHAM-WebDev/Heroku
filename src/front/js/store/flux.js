const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			api_url: process.env.BACKEND_URL,
			columns: 2, //This is for the modal used to create tables
			token: null,
			isUser: false, //While signing up permissions like User, Admin, or boss are defined
			isAdmin: false,
			isBoss: false,
			internal_email: ["@", "pass"],
			//STATEMENT CREATION VARS
			statement_content: undefined
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			//ACTIONS RELATED TO LOGIN/LOGOFF
			setToken: (token, type) => {
				const store = getStore();
				if (type === "user") {
					setStore({
						isUser: true,
						isAdmin: false,
						isBoss: false,
						token: token
					});
				} else if (type === "admin") {
					setStore({
						isUser: false,
						isAdmin: true,
						isBoss: false,
						token: token
					});
				} else if (type === "boss") {
					setStore({
						isUser: false,
						isAdmin: false,
						isBoss: true,
						token: token
					});
				}
			},
			signOff: () => {
				setStore({ isUser: false, isAdmin: false, isBoss: false, token: null });
			},
			//ACTIONS RELATED WITH THE CREATION PAGE
			defineTableColumns: number => {
				setStore({ columns: number });
			},
			//ACTION TO START A NEW STATEMENT
			startNewStatement: async () => {
				const store = getStore();
				let body = {
					title: "",
					statement: [""],
					options: [""],
					statement_types: [""],
					options_types: [""],
					answer: [""],
					source: "",
					area: "",
					institution: "",
					is_difficult: false,
					is_active: false,
					is_explained: false,
					created_by: "fabito",
					modified_by: "leyo"
				};

				let url = store.api_url + "/statement/create";
				fetch(url, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						setStore({ statement_content: data });
					})
					.catch(err => console.log(err));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
