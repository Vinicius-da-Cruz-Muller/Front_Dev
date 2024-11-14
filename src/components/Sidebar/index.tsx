import { useState } from "react";
import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	NewspaperOutline,
	NotificationsOutline,
	PeopleOutline,
	PieChartOutline,
} from "react-ionicons";

const Sidebar = () => {
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
			active: false,
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
			active: true,
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
	const [selectedChild, setSelectedChild] = useState("Padrão");

	const handleClick = (title: string) => {
		setSelected(selected === title ? "" : title);
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
						<div className="flex flex-col w-full justify-end"> 
							<div
								key={link.title}
								className={`flex flex-row items-center w-full rounded-lg py-1 cursor-pointer
									}`}
								onClick={() => handleClick(link.title)}
							>
								<div className="flex justify-between items-center w-full px-6 group">
									<div className={`group-hover:bg-green-300 p-3 rounded-lg ${selected == link.title ? "bg-green-300" : ""}`}>{link.icon}</div>
									<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
								</div>

							</div>
							{
								link.title === selected && link.childrens && (
									<div className="flex flex-col items-end gap-2 mt-2 w-full">
										{link.childrens.map((child) => (
											<div
												key={child.title}
												className={`flex flex-row items-center group w-[70%] justify-start gap-2 rounded-lg px-2 py-3 cursor-pointer `} 
												onClick={() => setSelectedChild(child.title)}
											>
												<div className={`w-5 h-10 rounded-s-lg group-hover:bg-green-300 ${child.title == selectedChild ? "bg-green-300" : "bg-transparent"}`}>

												</div>
												<span className="font-medium text-[15px] md:block hidden text-sm">{child.title}</span>
											</div>
										))}
									</div>
								)
							}

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
