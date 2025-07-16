import FeatureCard from "./FeatureCard";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type FeatureCarouselProps = {
  features: Feature[];
};

function FeatureCarousel({ features }: FeatureCarouselProps) {
    // Repeat features enough times to fill the marquee and make it feel infinite
    const repeatCount = 12;
    const repeatedFeatures = Array.from({ length: repeatCount }, () => features).flat();

    return (
        <div className="overflow-hidden w-full bg-amber-100 py-4">
            <div className="animate-marquee flex w-max gap-4">
                {repeatedFeatures.map((f, i) => (
                    <div key={i} className="w-[300px] shrink-0">
                        <FeatureCard
                            icon={f.icon}
                            title={f.title}
                            description={f.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeatureCarousel;
