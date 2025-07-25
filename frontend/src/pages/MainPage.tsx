import FeatureCarousel from "../components/FeatureCarousel";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

function click() {
  console.log("clicked");
}


const features = [
  {icon:"🏎️", title:"Fast", description:"Add tasks and notes in real time"},
  {icon:"🎯", title:"Focused", description:"Minimalist design and no distractions"},
  {icon:"🔒", title:"Safe", description:"No one in earth will have acess to your notes"},
  {icon:"🤖", title:"AI", description:"Our powerful AI can be your creativity copilot"},
  {icon:"☁️", title:"Cloud", description:"You can acess your notes from anywhere"},
  {icon:"⬇️", title:"Imports", description:"You can import and export your notes"},
  {icon:"😄", title:"Friendly", description:"Simple and easy to use"}
]

function MainPage() {
  return (
    <div className="bg-zinc-800 min-h-screen min-w-screen">
      <Navbar isLoggedIn={false} centerText=""/>
      <HeroSection
        title="Organize your life like a monk"
        description="Simple, fast and beautiful."
        buttonLabel="Start NOW. 100% free."
        onButtonClick={click}
      />
      <FeatureCarousel features={features}/>
      <Footer/>
    </div>
  );
}

export default MainPage;
