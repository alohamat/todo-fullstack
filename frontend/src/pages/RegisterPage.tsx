import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    return(
        <div className="bg-zinc-800 min-w-screen min-h-screen">
            <Navbar isLoggedIn={false}/>
            <h1 className="bg-blue-400">Hello, world!</h1>
            <RegisterForm/>
        </div>
    );
}

export default RegisterPage;