// React import removed

const brands = [
    "TechDaily", "CreatorPro", "ViralLabs", "Streamline", "FutureCast"
];

const TrustedBy = () => {
    return (
        <div className="py-10 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500 mb-8 font-medium">USADO POR MAIS DE 10.000 CRIADORES</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand) => (
                        <h3 key={brand} className="text-xl font-bold text-white/40">{brand}</h3>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
