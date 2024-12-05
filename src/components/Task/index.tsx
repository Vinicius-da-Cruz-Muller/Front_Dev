/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import { TimeOutline } from "react-ionicons";
import FavModal from "../Modals/FavModal";

interface TaskProps {
	favorite: any;
	setAtt: Dispatch<SetStateAction<number>>;
}

const Task = ({ favorite, setAtt }: TaskProps) => {

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
		<div
			className="w-full bg-[#fff] flex flex-col mr-3 justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
			onClick={() => setModalOpen(true)}
		>
			{favorite.url_image && (
				<img
					src={favorite.url_image}
					alt={"uma imagem"}
					className="w-full h-[170px] rounded-lg"
				/>
			)}
			<div className="flex overflow-hidden w-full items-center gap-2">
				{favorite.tags.map((tag: any) => (
					<span
						key={tag.tag_id}
						className="px-[10px] py-[2px] text-[13px] whitespace-nowrap font-medium rounded-md bg-green-300"
					>
						{tag.tag_name}
					</span>
				))}
			</div>
			<div className="w-full flex items-start flex-col gap-0">
				<p className="text-sm w-full text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{favorite.url}</p>
				<p className="text-sm w-full text-gray-500 mt-2 overflow-hidden text-ellipsis text-nowrap">"{favorite.excerpts[0]?.excerpt_text}"</p>
			</div>
			<div className="w-full border border-dashed"></div>
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-1">
					<TimeOutline
						color={"#666"}
						width="19px"
						height="19px"
					/>
					{/* <span className="text-[13px] text-gray-700">{deadline} mins</span> */}
				</div>
				{/* <div
					className={`w-[60px] rounded-full h-[5px] ${
						priority === "high"
							? "bg-red-500"
							: priority === "medium"
							? "bg-orange-500"
							: "bg-blue-500"
					}`}
				></div> */}
			</div>
		</div>
		
		{
			modalOpen && (
				<FavModal isOpen={modalOpen} closeModal={()=> setModalOpen(false)} favorite={favorite} setAdd={setAtt}/>
			)
		}
		
		</>
	);
};

export default Task;
