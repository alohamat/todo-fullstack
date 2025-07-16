import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

function click() {
  console.log("clicked");
}

function MainPage() {
  return (
    <div className="bg-zinc-800 min-h-screen min-w-screen">
      <Navbar />
      <HeroSection
        title="Organize your life like a monk"
        description="Simple, fast and beautiful"
        buttonLabel="Faça seu login"
        onButtonClick={click}
      />
    </div>
  );
}

export default MainPage;
