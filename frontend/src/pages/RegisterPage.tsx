import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";

function RegisterPage() {
    return(
        <div className="bg-zinc-800 min-w-screen min-h-screen">
            <Navbar isLoggedIn={false}/>
            <h1 className="bg-blue-400">Hello, world!</h1>
            <AuthForm/>
        </div>
    );
}

export default RegisterPage;