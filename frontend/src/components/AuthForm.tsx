import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputForm from "./InputForm";
import LabelForm from "./LabelForm";
import { AuthContext } from "../context/AuthContext";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
};

function AuthForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isRegistering, setRegistering] = useState(false);
  const [isError, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
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

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError("");
    try {
      if (isRegistering) {
        if (
          !data.username ||
          !data.email ||
          !data.password ||
          !data.confirmpassword
        ) {
          setError("Please fill all fields.");
          setLoading(false);
          return;
        }
        if (data.password !== data.confirmpassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        await axios.post("http://localhost:8080/api/register", data);
        setRegistering(false);
        setError("Registered sucessfully! Please login.");
      } else {
        const res = await axios.post("http://localhost:8080/api/login", data);
        console.log(res.data);
        if (res.data.access_token && res.data.refresh_token) {
          login(res.data.access_token, res.data.refresh_token);
          navigate("/dashboard");
        } else {
          setError("Invalid server response.");
        }
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form
        className="transition-all duration-300 ease-out shadow-md p-4 bg-zinc-400 rounded-3xl mx-auto flex flex-col gap-4 items-center max-w-[400px]"
        style={{
          height: isRegistering ? "320px" : "180px",
        }}
      >
        {isError && (
          <p className="animate-wrong-input font-bold bg-amber-300 px-3 rounded-2xl">
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
            value={form.email}
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="bg-amber-300 w-fit px-2 rounded-2xl hover:cursor-pointer"
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            tabIndex={-1}
          >
            {showPwd ? (
              <img src="src/assets/openeye.png" alt="Showing password" />
            ) : (
              <img src="src/assets/closedeye.png" alt="Hiding password" />
            )}
          </button>
        </div>
        {isRegistering && (
          <>
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
                value={form.confirmpassword}
                onChange={(e) =>
                  setForm({ ...form, confirmpassword: e.target.value })
                }
              />
            </div>
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
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
          </>
        )}
        <div className="flex gap-2">
          <button
            className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out font-medium"
            onClick={(e) => {
              e.preventDefault();
              if (!loading) onSubmit(form);
            }}
            disabled={loading}
          >
            {loading ? "Please wait..." : isRegistering ? "Register" : "Login"}
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          setRegistering(!isRegistering);
          setError("");
        }}
        className="bg-amber-300 hover:cursor-pointer hover:bg-amber-600 p-2 rounded-2xl transition ease-in-out mt-10 font-medium"
        disabled={loading}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
