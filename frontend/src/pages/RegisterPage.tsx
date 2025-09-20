import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthForm from "../components/AuthForm";

function RegisterPage() {
    return(
        <div className="bg-zinc-800 min-w-screen min-h-screen">
            <Navbar isLoggedIn={false} />
            <h1 className="mb-4 bg-zinc-300 text-2xl font-bold"></h1>
            <AuthForm/>
            <Footer/>
        </div>
    );
}

export default RegisterPage;