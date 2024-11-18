import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../../api/services/userService";
import TextInput from "../../components/TextInput/textInput";

//Essa página de login segue um sistema de grid de 12 colunas para desktop, 6 colunas para tablet e 2 colunas para mobile.
//O padrão de desenvolvimento é mobile first, ou seja, começa estilizando e fazendo tudo primeiro para mobile, depois vai responsivando para as demais dimensões
//Para estilizar mobile, basta aplicar o css normalmente, se quiser estilizar para tablet, todos os comandos devem começar com tablet:, se for desktop começa com lg:
//Caso necessite configurar o sistema de grid ou remover, vá no arquivo "tailwind.config.js, mas sugiro que mantenha ao longo do desenvolvimento pois o grid te dá muito mais liberdade de desenvolvimento, posicionamento e responsividade"
//sugiro que baixe também a extensão "tailwind intelisense que mostrará todos os comandos do tailwind e até com exemplos"
const Login = () => {
    const [email, setEmail] = useState('');//No input é atribuido esse estado de variável, onde toda vez que for digitado chamará a função set que atualizará o valor do estado
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    //quando o botão for clicado chamará essa função do onSubmit passando esse parâmetro automaticamente com essa tipagem estranha, mas dai é só transformar em formData que fica tudo de boa
    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {//validando email
            alert("Email inválido")
            return;
        }

        if(senha.length<6){//Faça sua regra de negócio aqui
            alert("Senha inválida")
            return;
        }
        const formData = new FormData();
        formData.set("email", email)
        formData.set("senha", senha)
        login(formData).then((response : any)=>{
            if(response){
                alert("Login feito com sucesso");
                navigate('/')

            }
        })
    }
    const redirect = ()=>{
        navigate('/Cadastro')
    }
    return (
        <>
            {/* grid define para todos os filhos da div que será um grid,
             grid-cols-mobile define que terá duas colunas,
              gap-x-24 define que no eixo x terá um gap de 6rem (no tailwind 1 vale 4px, 4 vale 1rem),
              w-full diz que irá preencher toda a tela
              justify-center coloca todos os elementos centralizados no eixo x
              tablet:grid-cols-tablet define que terá 6 colunas
              lg:grid-cols-desktop: define que terá 12 colunas 
              col-span no form define quantas colunas irá ocupar o elemento, se for full irá ocupar o grid todo
              w-3/5 ou w-1/2 são widths calculadas em frações
              */}
            <div className="grid grid-cols-mobile gap-x-24 w-full h-full justify-center tablet:grid-cols-tablets tablet:gap-x-12 lg:grid-cols-desktop lg:gap-x-8 ">
                <form onSubmit={handleForm} className=" bg-white rounded-lg p-5 grid col-span-2 w-full justify-self-center h-full gap-4 tablet:w-3/5 tablet:col-span-full lg:col-span-full lg:w-1/3 lg:h-96 mt-32 lg:gap-4">
                    <h2 className="text-2xl font-bold text-center">Faça login</h2>
                    <TextInput idInput="email" label="Digite seu email:" typeInput="text" name="email" placeholder="Email:" className="flex flex-col gap-2" value={email} // O valor é controlado pelo state
                            textChanged={(e) => setEmail(e)} />
                    <TextInput idInput="senha" label="Digite sua senha:" typeInput="text" name="senha" placeholder="Senha:" className="flex flex-col gap-2" value={senha}
                    textChanged={(e)=>setSenha(e)}/>
                    <p>Não tem login? <a onClick={redirect} className="text-cyan-500 cursor-pointer">Cadastre-se aqui</a></p>
                    <input type="submit" value="Confirmar" className="bg-green-400 h-12 rounded-lg cursor-pointer"/>
                </form>
            </div>
        </>
    )
}
export default Login;