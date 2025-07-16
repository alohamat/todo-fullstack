type HeroProps = {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
}


function HeroSection({title, description, buttonLabel, onButtonClick}: HeroProps) {
    return (
        <section>
            <h1 className="">{title}</h1>
            <p className="">{description}</p>
            <button 
                onClick={onButtonClick}
                className=""
            >{buttonLabel}</button>
        </section>
    );
}

export default HeroSection;