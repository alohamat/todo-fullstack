import FeatureCarousel from "../components/FeatureCarousel";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

function click() {
  console.log("clicked");
}


const features = [
  {icon:"🏎️", title:"Fast", description:"Add tasks and notes in real time"},
  {icon:"🎯", title:"Focused", description:"Minimalist design and no distractions"},
  {icon:"🔒", title:"Safe", description:"No one in earth will have acess to your notes"}
]

function MainPage() {
  return (
    <div className="bg-zinc-800 min-h-screen min-w-screen">
      <Navbar />
      <HeroSection
        title="Organize your life like a monk"
        description="Simple, fast and beautiful."
        buttonLabel="Start NOW. 100% free."
        onButtonClick={click}
      />
      <FeatureCarousel features={features}/>
    </div>
  );
}

export default MainPage;
