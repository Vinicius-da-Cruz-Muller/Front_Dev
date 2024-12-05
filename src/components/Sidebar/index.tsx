import { useState } from "react";
import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	NotificationsOutline,
	PieChartOutline,
} from "react-ionicons";
import { useLocation, useNavigate } from "react-router";

const Sidebar = () => {

	const location = useLocation();
	const currentPath = location.pathname;
	console.log(currentPath);

	const navLinks = [
		{
			title: "Home",
			icon: (
				<HomeOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: currentPath === "/",
		},
		{
			title: "Categorias",
			icon: (
				<AppsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: currentPath === "/categorias" || currentPath.includes("/favoritos"),
			childrens: [
				{
					title: "Padrão",
				},
				{
					title: "Personalizado",
				},
			]
		},
		{
			title: "Projetos",
			icon: (
				<GridOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Análise",
			icon: (
				<PieChartOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		// {
		// 	title: "Workflows",
		// 	icon: (
		// 		<PeopleOutline
		// 			color="#555"
		// 			width="22px"
		// 			height="22px"
		// 		/>
		// 	),
		// 	active: false,
		// },
		{
			title: "Notificações",
			icon: (
				<NotificationsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		// {
		// 	title: "Newsletter",
		// 	icon: (
		// 		<NewspaperOutline
		// 			color="#555"
		// 			width="22px"
		// 			height="22px"
		// 		/>
		// 	),
		// 	active: false,
		// },
	];

	const [selected, setSelected] = useState("Categorias");
	
	const navigate = useNavigate();
	
	const handleClick = (title: string) => {
		setSelected(selected === title ? "" : title);
		navigate("/" + title.toLowerCase());
	};


	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
			<div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
				<span className="text-green-400 font-semibold text-2xl md:block hidden">FavHub</span>
				<span className="text-green-400 font-semibold text-2xl md:hidden block">FH</span>
			</div>
			<div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
				{navLinks.map((link) => {
					return (
						<div className="flex flex-col w-full justify-end" key={link.title}> 
							<div
								
								className={`flex flex-row items-center w-full rounded-lg py-1 cursor-pointer
									}`}
								onClick={() => handleClick(link.title)}
							>
								<div className="flex justify-between items-center w-full px-6 group">
									<div className={`group-hover:bg-green-300 p-3 rounded-lg ${link.active ? "bg-green-300" : ""}`}>{link.icon}</div>
									<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
								</div>

							</div>

						</div>
					);
				})}
				<div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-green-300 px-2 py-3 cursor-pointer bg-gray-200">
					<LogOutOutline />
					<span className="font-medium text-[15px] md:block hidden">Sair</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
