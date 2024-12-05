'use client'
import { useNavigate } from "react-router"

export default function Home() {

    const navigate = useNavigate();

    const sendToLogin = () => {
        navigate('/login');
    }

    const sendToCadastro = () => {
        navigate('/cadastro');
    }

    return (
        <div className="p-8 w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold">Bem Vindo ao sistema de gerenciador de favoritos!</h1>
            <h2 className="text-2xl mt-2">Faça login ou Cadastre-se agora mesmo</h2>
            <div className="mt-2 flex gap-4">
                <button className="bg-green-300 rounded px-6 py-2" onClick={sendToLogin}>Login</button>
                <button className="bg-green-300 rounded px-6 py-2" onClick={sendToCadastro}>Cadastro</button>
            </div>
        </div>
    )
}
