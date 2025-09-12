import { useState, useEffect } from "react";
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
  async function onSubmit(data: FormData) {
    console.log("called submit");
    if (isRegistering) {
      console.log("sent to backend: ", data);
      const res = await axios.post("http://localhost:8080/api/register", data);
      console.log("backend response: ", res);
    } else {
      const res = await axios
        .post("http://localhost:8080/api/login", data)
        .catch((error) => {
          setError(error.response.data.error);
          console.log(isError);
        });
      console.log("backend response: ", res);
    }
  }

  const [isRegistering, setRegistering] = useState(false);
  const [isError, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <div className="">
      <form
        className="transition-all duration-300 ease-out  shadow-md p-4 bg-zinc-400 rounded-3xl mx-auto flex flex-col gap-4 items-center max-w-[400px]"
        style={{
          height: isRegistering ? "320px" : "180px", // big enough values
        }}
      >
        {isError && (
          <p
            className={
              "animate-wrong-input font-bold bg-amber-300 px-3 rounded-2xl"
            }
          >
            {isError}
          </p>
        )}
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="useremail">
            <img src="src/assets/emailform.png" alt="icon" className="size-5" />{" "}
            E-mail
          </LabelForm>
          <InputForm
            id="useremail"
            type="text"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="userpassword">
            <img src="src/assets/lockform.png" alt="icon" className="size-5" />{" "}
            Password
          </LabelForm>
          <InputForm
            id="userpassword"
            type={showPwd ? "text" : "password"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        <button className="bg-amber-300 w-fit px-2 rounded-2xl hover:cursor-pointer" type="button" onClick={() => {
            setShowPwd(!showPwd);
          }}>
            {showPwd ? (
              <img src="src/assets/openeye.png" alt="Showing password" />
            ):
            <img src="src/assets/closedeye.png" alt="Hiding password" />
            }
          </button>
        </div>
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="userconfirmpass">
              <img
                src="src/assets/lockform.png"
                alt="icon"
                className="size-5"
              />{" "}
              Confirm
            </LabelForm>
            <InputForm
              id="userconfirmpass"
              type="password"
              onChange={(e) =>
                setForm({ ...form, confirmpassword: e.target.value })
              }
            />
          </div>
        ) : null}
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="username">
              <img
                src="src/assets/userform.png"
                alt="icon"
                className="size-5"
              />{" "}
              Name
            </LabelForm>
            <InputForm
              id="username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        ) : null}
        <div className="flex gap-2">
          <button
            className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out font-medium"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(form);
            }}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          
        </div>
      </form>
      <button
        onClick={() => setRegistering(!isRegistering)}
        className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out mt-10 font-medium"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
