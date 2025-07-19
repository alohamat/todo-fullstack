import { useForm } from "react-hook-form";

const onSubmit = (data:object) => {
    console.log(data);
}

function RegisterForm() {
    const { register, handleSubmit } = useForm();
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="bg-amber-300">Name</label>
                <input type="text" 
                placeholder="Your name"
                className="bg-amber-300"
                {...register("username")}
                />
                <button type="submit"
                className="bg-amber-300"
                >Send</button>
            </form>
        </div>
    );
}

export default RegisterForm;