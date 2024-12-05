/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { createFavorite, createTag, createTagToFavorite, createTrecho, deleteTag, updateFavorite, updateTrecho } from "../../api/services/favoritesService";

interface Tag {
	tag_id?: number;
	tag_name: string;
}

interface AddModalProps {
	isOpen: boolean;
	onClose: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	categoryId: number;
	setAtt: React.Dispatch<React.SetStateAction<number>>;
	edit?: boolean
	favorite?: any
}

const AddModal = ({ isOpen, onClose, setOpen, categoryId, setAtt, edit, favorite }: AddModalProps) => {

	const userID = 1

	const initialTaskData = {
		favoriteId: null,
		urlContent: edit ? favorite?.url : "",
		urlImage: edit ? favorite?.url_image : "",
		usuId: userID,
		categoryId: edit ? favorite?.category.category_id : categoryId,
	};

	const [taskData, setTaskData] = useState(initialTaskData);
	const [tagTitle, setTagTitle] = useState("");
	const [excerpt, setExcerpt] = useState(edit ? favorite?.excerpts[0]?.excerpt_text : "");
	const [tags, setTags] = useState<Tag[]>(edit ? favorite?.tags : []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTaskData({ ...taskData, [name]: value });
	};

	const closeModal = () => {
		setOpen(false);
		onClose();
		setTaskData(initialTaskData);
	};

	const handleSubmit = async () => {
		let favId = null
		if(edit){
			favId = favorite.favorite_id
			taskData["favoriteId"] = favorite.favorite_id
			await updateFavorite(taskData)
			await updateTrecho({ ExcerptContent: excerpt, idExcerpt: favorite.excerpts[0].excerpt_id });
			favorite?.tags.forEach(async (tag: any) => {
				await deleteTag(tag.tag_id);
			})
		}else{
			const data = await createFavorite(taskData)
			favId = data.favorite_id
			await createTrecho({ ExcerptContent: excerpt, idFavorito: data.favorite_id });
		}
		
		tags.forEach(async (tag) => {
			const resp = await createTag({ tagName: tag.tag_name, tagIdUser: userID });
			await createTagToFavorite(resp.tag_id, favId);
		});

		setExcerpt("");
		setTags([]);

		closeModal();

		setTimeout(() => {
			setAtt((att) => att + 1);
		}, 400);
	};

	const tirarTag = (tagName: string) => {
		const newTags = tags.filter((tag) => tagName !== tag.tag_name);
		setTags(newTags);
	}

	const handleAddTag = () => {
		setTags([...tags, { tag_name: tagTitle }]);
		setTagTitle("");
	}

	return (
		<div
			className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"
				}`}
		>
			<div
				className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
				onClick={closeModal}
			></div>
			<div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
				<input
					type="text"
					name="urlContent"
					value={taskData.urlContent}
					onChange={handleChange}
					placeholder="Link"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				<input
					type="text"
					name="excerpt"
					value={excerpt}
					onChange={(e) => setExcerpt(e.target.value)}
					placeholder="Trecho"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				<input
					type="text"
					name="urlImage"
					value={taskData.urlImage}
					onChange={handleChange}
					placeholder="Caminho da imagem"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				{/* <select
					name="priority"
					onChange={handleChange}
					value={taskData.priority}
					className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				>
					<option value="">Priority</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select> */}
				{/* <input
					type="number"
					name="deadline"
					value={taskData.deadline}
					onChange={handleChange}
					placeholder="Deadline"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/> */}
				<input
					type="text"
					value={tagTitle}
					onChange={(e) => setTagTitle(e.target.value)}
					placeholder="Nome da Tag"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/>
				<button
					className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
					onClick={handleAddTag}
				>
					Adicionar Tag
				</button>
				<div className="w-full">
					{tags && <span>Tags:</span>}
					{tags.map((tag, index) => (
						<div
							key={index}
							className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md bg-green-300"
						>
							{tag.tag_name}
							<label className="ml-2 cursor-pointer" onClick={()=>tirarTag(tag.tag_name)}>X</label>
						</div>
					))}
				</div>
				<button
					className="w-full mt-3 rounded-md h-9 bg-green-400 text-blue-50 font-medium"
					onClick={handleSubmit}
				>
					{edit ? "Editar" : "Adicionar"} Favorito
				</button>
			</div>
		</div>
	);
};

export default AddModal;
