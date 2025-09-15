type HeroProps = {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
}


function HeroSection({title, description, buttonLabel, onButtonClick}: HeroProps) {
    return (
        <section className="flex items-center flex-col bg-zinc-400 pb-5 pt-3 text-center">
            <h1 className="text-6xl md:text-7xl font-bold">{title}</h1>
            <p className="text-3xl font-medium m-4">{description}</p>
            <button 
                onClick={onButtonClick}
                className="bg-amber-300 px-2 y-4 h-15 w-75 font-medium text-2xl rounded-2xl hover:cursor-pointer hover:bg-amber-500 transition ease-in-out"
            >{buttonLabel}</button>
        </section>
    );
}

export default HeroSection;