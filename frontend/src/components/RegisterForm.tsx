import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  useremail: string;
};

const onSubmit = (data: FormData) => {
  console.log(data.username);
};

function RegisterForm() {
  const { register, handleSubmit } = useForm<FormData>();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 bg-blue-400 w-fit mx-auto">
      <div className="flex items-center gap-2">
        <label className="bg-amber-300 rounded p-2">Name</label>
        <input
          type="text"
          placeholder="Your name"
          className="bg-amber-300"
          {...register("username")}
        />
      </div>
      <div>
        <label className="bg-amber-300">E-mail</label>
        <input
          type="text"
          placeholder="Your e-mail"
          className="bg-amber-300"
          {...register("useremail")}
        />
        <button type="submit" className="bg-amber-300">
          Send
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
