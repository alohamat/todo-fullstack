import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import LabelForm from "./LabelForm";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
};

function AuthForm() {
  function onSubmit(data: object) {
    console.log("called submit");
    if (isRegistering) {
      axios.post("http://localhost:8080/api/register", data);
      console.log("sent to backend: ", data);
      
    } else {
    }
  }

  const [isRegistering, setRegistering] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="transition-all duration-300 ease-out  shadow-md p-4 bg-zinc-400 rounded-3xl mx-auto flex flex-col gap-4 items-center max-w-[400px]"
        style={{
          height: isRegistering ? "320px" : "180px", // valores grandes o suficiente
        }}
      >
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="useremail"><img src="src/assets/emailform.png" alt="icon" className="size-5" /> E-mail</LabelForm>
          <InputForm
            id="useremail"
            type="text"
            {...register("email", { required: "Please input an e-mail" })}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="userpassword"><img src="src/assets/lockform.png" alt="icon" className="size-5" /> Password</LabelForm>
          <InputForm
            id="userpassword"
            type="password"
            {...register("password", {
              required: "Please input a password",
            })}
          />
        </div>
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="userconfirmpass"><img src="src/assets/lockform.png" alt="icon" className="size-5"/> Confirm password</LabelForm>
            <InputForm
              id="userconfirmpass"
              {...register("confirmpassword", {
                required: "Please confirm your password",
              })}
            />
          </div>
        ) : null}
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="username"><img src="src/assets/userform.png" alt="icon" className="size-5" /> Name</LabelForm>
            <InputForm
              id="username"
              {...register("username", {
                required: "Please input an username",
              })}
            />
          </div>
        ) : null}
        <button className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out font-medium">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setRegistering(!isRegistering)}
        className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out mt-4 font-medium"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
