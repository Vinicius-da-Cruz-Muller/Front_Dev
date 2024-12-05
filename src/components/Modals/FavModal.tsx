'use client'
import { LinkOutline, PencilSharp, TrashSharp } from "react-ionicons";
import { deleteFavorite, deleteTag } from "../../api/services/favoritesService";
import { Dispatch, SetStateAction, useState } from "react";
import AddModal from "./AddModal";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FavModalProps {
    isOpen: boolean;
    closeModal: () => void;
    favorite: any;
    setAdd: Dispatch<SetStateAction<number>>;
}

const FavModal = ({ isOpen, closeModal, favorite, setAdd }: FavModalProps) => {

    const [openEdit, setOpenEdit] = useState(false);

    const excludeFavorite = async () => {

        await deleteFavorite(favorite.favorite_id);
        favorite.tags.forEach(async (tag: any) => {
            await deleteTag(tag.tag_id);
        });
        setAdd((prev) => prev + 1);

        closeModal();
    }

    const openEditModal = () => {
        setOpenEdit(true);
    }

    return (
        <>
            <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}>
                <div
                    className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
                    onClick={closeModal}
                ></div>
                <div className="md:w-[30vw] w-[90%] bg-white relative rounded-lg shadow-md z-50 flex flex-col gap-3 px-5 py-6">
                    <div className="absolute flex gap-2 top-1 right-1">
                        <div className="p-1 border border-black rounded cursor-pointer" onClick={openEditModal}>
                            <PencilSharp
                                color={'#00000'}
                                title={"Editar"}
                                height="25px"
                                width="25px"
                            />
                        </div>
                        <div className="p-1 border border-black rounded cursor-pointer" onClick={excludeFavorite}>
                            <TrashSharp
                                color={'red'}
                                title={"Excluir"}
                                height="25px"
                                width="25px"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/3">
                            {favorite.url_image && (
                                <img
                                    src={favorite.url_image}
                                    alt={"uma imagem"}
                                    className="w-full h-[170px] rounded-lg"
                                />
                            )}
                        </div>
                        <div className="w-2/3">
                            <div className="">
                                <strong>Trecho: </strong>
                                <p>{favorite.excerpts[0]?.excerpt_text}</p>
                            </div>
                            <div>
                                <strong>Tags</strong>
                                <div className="flex items-center flex-wrap gap-2">
                                    {favorite.tags.map((tag: any) => (
                                        <span
                                            key={tag.tag_id}
                                            className="px-[10px] py-[2px] text-[13px] font-medium whitespace-nowrap text-nowrap rounded-md bg-green-300"
                                        >
                                            {tag.tag_name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="flex gap-1 w-full" target="_blank" href={favorite.url}>
                        <strong>Url: </strong>
                        <div className="flex items-center w-full">
                            <p className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap" >{favorite.url}</p>
                            <LinkOutline
                                color={'#00000'}
                                title={"Acessar url"}
                                height="25px"
                                width="25px"
                            />
                        </div>
                    </a>
                </div>
            </div>

            {
                openEdit && (
                    <AddModal 
                        isOpen={openEdit} 
                        onClose={() => {
                            setOpenEdit(false)
                            closeModal()
                        }} 
                        favorite={favorite} 
                        setAtt={setAdd} 
                        categoryId={favorite.category.category_id}
                        setOpen={setOpenEdit}
                        edit
                    />
                )
            }

        </>
    );
};

export default FavModal;
