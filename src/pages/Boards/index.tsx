import { useEffect, useState } from "react";
import AddOutline from "react-ionicons/lib/AddOutline";
import { useNavigate } from "react-router";
import { createCategory, getCategories } from "../../api/services/categoryService";

export interface Category {
	category_id: string;
	category_name: string;

}

/* eslint-disable @typescript-eslint/no-explicit-any */
const Home = () => {

	const initialCategoryData = {
		categoryName: ''
	};

	const [categoryData, setCategoryData] = useState(initialCategoryData);

	const navigate = useNavigate();

	const [categories, setCategorias] = useState<Category[]>([]);
	const [att, setAtt] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		fetchCategories();
	}, [att]);

	const fetchCategories = async () => {
		try {
			const data = await getCategories();
			setCategorias(data.Data);
		} catch (error) {
			console.log(error);
			alert('Erro ao buscar categorias');
			// navigate('/login');

		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCategoryData({ ...categoryData, [name]: value });
	};


	const sendToFavs = (id: string) => {
		navigate('/favoritos?categoria=' + id);
	}

	const handleSubmit = async () => {

		try {
			setCategoryData(initialCategoryData);
			await createCategory(categoryData);
			setAtt(att + 1);
			setOpenModal(false);

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="p-8 ">
			<div className="flex justify-between w-full mb-5 items-center">
				<h1 className="mt-8 text-3xl font-bold " >Categorias</h1>
				<div
					onClick={() => setOpenModal(true)}
					className="flex cursor-pointer items-center justify-center gap-1 h-10 py-[5px] md:w-[20%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
				>
					<AddOutline color={"#555"} />
					Adicionar Categoria
				</div>
			</div>
			<div className="flex flex-row flex-wrap gap-2">
				{
					categories.map((categoria) => (
						<div key={categoria.category_id} className="ag-courses_item" onClick={() => sendToFavs(categoria.category_id)}>
							<a href="#" className="ag-courses-item_link">
								<div className="ag-courses-item_bg"></div>

								<div className="ag-courses-item_title">
									{categoria.category_name}
								</div>
							</a>
						</div>

					))
				}
			</div>

			{
				openModal && (
					<div
						className={`w-screen h-screen place-items-center fixed top-0 left-0 ${openModal ? "grid" : "hidden"
							}`}
					>
						<div
							className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
							onClick={() => setOpenModal(false)}
						></div>
						<div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
							<h1 className="font-semibold text-2xl">Adicionar Categoria</h1>
							<input
								type="text"
								name="categoryName"
								value={categoryData.categoryName}
								onChange={handleChange}
								placeholder="Nome da Categoria"
								className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
							/>
							<button
								className="w-full mt-3 rounded-md h-9 bg-green-400 text-blue-50 font-medium"
								onClick={handleSubmit}
							>
								Adicionar
							</button>
						</div>
					</div>
				)
			}
		</div>

	)

};

export default Home;
