import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login, register } from "../../api/services/userService";
import TextInput from "../../components/TextInput/textInput";
const Cadastro = ()=>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const navigate = useNavigate();

    const handleForm = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {//validando email
            alert("Email inválido")
            return;
        }

        if(senha.length<6){//Faça sua regra de negócio aqui
            alert("Senha inválida")
            return;
        }
        if(senha !== confirmar){
            alert("Confirmar a senha está diferente da senha");
            return;
        }
        const formData = new FormData();
        formData.set("email", email)
        formData.set("senha", senha)
        register(formData).then((response : any)=>{
            if(response){
                alert("Cadastrado com sucesso");
                navigate('/')

            }
        })

    }
    return (<>
        <div className="grid grid-cols-mobile gap-x-24 w-full h-full justify-center tablet:grid-cols-tablets tablet:gap-x-12 lg:grid-cols-desktop lg:gap-x-8 ">
                <form onSubmit={handleForm} className=" bg-white rounded-lg p-5 grid col-span-2 w-full justify-self-center h-full gap-4 tablet:w-3/5 tablet:col-span-full lg:col-span-full lg:w-1/3 mt-12 lg:gap-4">
                    <h2 className="text-2xl font-bold text-center">Faça seu cadastro</h2>
                    <TextInput idInput="email" label="Digite seu email:" typeInput="text" name="email" placeholder="Email:" className="flex flex-col gap-2" value={email} // O valor é controlado pelo state
                            textChanged={(e) => setEmail(e)} />
                    <TextInput idInput="senha" label="Digite sua senha:" typeInput="text" name="senha" placeholder="Senha:" className="flex flex-col gap-2" value={senha}
                    textChanged={(e)=>setSenha(e)}/>
                    <TextInput idInput="confirmarSenha" label="Confirme sua senha:" typeInput="text" name="confirmarSenha" placeholder="Senha:" className="flex flex-col gap-2" value={confirmar}
                    textChanged={(e)=>setConfirmar(e)}/>
                    <input type="submit" value="Confirmar" className="bg-green-400 h-12 rounded-lg cursor-pointer"/>
                </form>
            </div>
    </>)
}

export default Cadastro;