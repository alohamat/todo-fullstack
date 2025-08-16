type FeatureCardProps = {
    icon: string;
    title: string;
    description: string;
}

function FeatureCard({icon, title, description}:FeatureCardProps) {
    return (
        <div className="bg-white, rounded-2xl, p-6, shadow-md, hover:shadow-lg, transition ">
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-zinc-500">{description}</p>
        </div>
    );
}
export default FeatureCard;