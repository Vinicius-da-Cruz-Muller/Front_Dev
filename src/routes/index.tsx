import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Login from "../pages/Login/login";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				children: [
					{
						path: "",
						element: <Boards />,
					}
					
				],
			},
		],
	},
	{
		path: "/login",
		element: <Login/>
	}
];

export default routes;
