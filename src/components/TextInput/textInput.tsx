export type TextInputProps = {
    label: string,
    name?: string,
    idInput: string,
    value?: string,
    placeholder?:string,
    typeInput:string,
    className:string,
    textChanged?: (text: any) => void;
}
export default function TextInput({label, name, idInput, value, placeholder, typeInput, className, textChanged} : TextInputProps){
    const handleInputChange = (e: any) => {
        if (textChanged) {
            textChanged(e.target.value);
        }
    };
    return(
        <div className={className}>
            <label htmlFor={name} className="">{label}</label>
            <input type={typeInput} name={name} id={idInput} placeholder={placeholder} value={value} className="p-2 border-2 border-black rounded-lg" onChange={handleInputChange}/>
        </div>
    )
}