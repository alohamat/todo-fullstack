import React, { useState } from "react";
import InputForm from "./InputForm";
import AuthService from "../services/AuthService";
import LabelForm from "./LabelForm";

function incorrectPassword() {}

const [isRegistering, setRegistering] = useState(false);
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirm, setConfirm] = useState("");

function AuthForm() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (password != confirm) {
          incorrectPassword();
          return;
        }
        const res = await AuthService.RegisterService({ username, email, password });
        if (res.sucess) {
          alert("registered");
        }
      } else {
        const res = await AuthService.LoginService({ email, password });
        if (res.sucess) {
          alert("logged");
        }
      }
    } catch (err) {
      console.error(`submit error: ${err}`);
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="transition-all duration-300 ease-out  shadow-md p-4 bg-zinc-400 rounded-3xl mx-auto flex flex-col gap-4 items-center max-w-[400px]"
        style={{
          height: isRegistering ? "320px" : "180px",
        }}
      >
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="useremail">
            <img src="src/assets/emailform.png" alt="icon" className="size-5" />{" "}
            E-mail
          </LabelForm>
          <InputForm
            id="useremail"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <LabelForm htmlFor="userpassword">
            <img src="src/assets/lockform.png" alt="icon" className="size-5" />{" "}
            Password
          </LabelForm>
          <InputForm
            id="userpassword"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isRegistering ? (
          <div className="flex items-center gap-2 w-full">
            <LabelForm htmlFor="userconfirmpass">
              <img
                src="src/assets/lockform.png"
                alt="icon"
                className="size-5"
              />{" "}
              Confirm password
            </LabelForm>
            <InputForm
              id="userconfirmpass"
              type="password"
              onChange={(e) => setConfirm(e.target.value)}
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
              type="text"
              onChange={(e) => setUsername(e.target.value)}
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
