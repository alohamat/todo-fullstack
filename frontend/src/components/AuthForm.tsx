import { useForm } from "react-hook-form";
import { useState } from "react";
import InputForm from "./InputForm";
import LabelForm from "./LabelForm";

type FormData = {
  username: string;
  useremail: string;
  userpassword: string;
  userconfirmpass: string;
};

function AuthForm() {
  function onSubmit(data: object) {
    if (isRegistering) {
    } else {
    }
  }

  const [isRegistering, setRegistering] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="transition-all duration-300 ease-out  shadow-md p-4 bg-blue-300 rounded-3xl mx-auto flex flex-col gap-4 items-center w-[25vw]"
        style={{
          height: isRegistering ? "320px" : "180px", // valores grandes o suficiente
        }}
      >
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="useremail">E-mail</LabelForm>
          <InputForm
            id="useremail"
            {...register("useremail", { required: "Please input an e-mail" })}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="userpassword">Password</LabelForm>
          <InputForm
            id="userpassword"
            {...register("userpassword", {
              required: "Please input a password",
            })}
          />
        </div>
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="userconfirmpass">Confirm password</LabelForm>
            <InputForm
              id="userconfirmpass"
              {...register("userconfirmpass", {
                required: "Please confirm your password",
              })}
            />
          </div>
        ) : null}
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="username">Name</LabelForm>
            <InputForm
              id="username"
              {...register("username", {
                required: "Please input an username",
              })}
            />
          </div>
        ) : null}
        <button className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setRegistering(!isRegistering)}
        className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
