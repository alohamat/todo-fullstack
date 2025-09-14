import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";



function HomePage() {
    const { user, logout, loading } = useContext(AuthContext);
    return (
        <div>
            <Navbar isLoggedIn={!!user} centerText={"oi"}/>
            <div id="left">
                
            </div>
            <div id="right">

            </div>
            <Footer />
        </div>
    );
}

export default HomePage;