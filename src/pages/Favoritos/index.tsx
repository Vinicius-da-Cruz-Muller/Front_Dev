/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { useSearchParams } from "react-router-dom";
import { listCategory } from "../../api/services/categoryService";
import { Category } from "../Boards";
import { listFavoritesByCategory } from "../../api/services/favoritesService";


const Home = () => {

    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoria");

    const [favorites, setFavorites] = useState([] as any);
    const [category, setCategory] = useState<Category>();
    const [modalOpen, setModalOpen] = useState(false);
    const [att, setAtt] = useState(0);

    useEffect(() => {
        const func = async () => {
            const categoria = await getCategory();
            setCategory(categoria.Data);
            await listFavorites(+categoria.Data.category_id);
        }
        func();
    }, []);

    useEffect(() => {
        const listAsync = async () => {
            if (category) {
                await listFavorites(+category.category_id);
            }
        }
        setTimeout(() => {
            listAsync();
        }, 400);
    }, [att]);

    const getCategory = async () => {
        try {
            if (categoryId) {
                const data = await listCategory(+categoryId);
                console.log(data);
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const listFavorites = async (id: number) => {
        try {
            const data = await listFavoritesByCategory(id);
            console.log(data);
            setFavorites(data.Data);

        } catch (error) {
            console.log(error);
        }
    }

    const openModal = () => {
        // setSelectedColumn(columnId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between w-full items-center pl-5">
                <h1 className="mt-8 text-3xl font-bold " >{category?.category_name}</h1>
                <div
                    onClick={() => openModal()}
                    className="flex cursor-pointer items-center justify-center gap-1 h-10 py-[5px] md:w-[20%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                >
                    <AddOutline color={"#555"} />
                    Adicionar Favorito
                </div>
            </div>
            <div className="w-full flex items-start px-5 pb-8 md:gap-0 gap-10">

                <div
                    className="w-full flex flex-col gap-0"
                >
                    <div
                        className="flex flex-row flex-wrap w-full items-center py-5 gap-4" 
                    >
                        {favorites.map((favorite: any, index: any) => (

                            <div key={index} className="w-[15%]">
                                <Task
                                    favorite={favorite}
                                    setAtt={setAtt}
                                />
                            </div>

                        ))}
                    </div>

                </div>
            </div>

            <AddModal
                isOpen={modalOpen}
                onClose={closeModal}
                categoryId={+categoryId!}
                setOpen={setModalOpen}
                setAtt={setAtt}
            />
        </>
    );
};

export default Home;
