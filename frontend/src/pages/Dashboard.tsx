import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function HomePage() {
  const { user } = useContext(AuthContext);
  return (
   <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={!!user} centerText={"oi"} />
      
      <div className="flex flex-1 overflow-hidden">
        <div id="left" className="bg-zinc-500 flex-[2]">
          <h1>Esquerda</h1>
        </div>
        <div id="right" className="bg-zinc-300 flex-[8]">
          <h1>Direita</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;