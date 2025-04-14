import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb",
    title: "Order groceries for delivery or pickup today",
    subtitle: "Sale up to 30% OFF",
    cta: "Shop now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1613145998851-85fda3e851e7",
    title: "Fresh produce, right to your door",
    subtitle: "Organic & local favourites",
    cta: "Explore Deals",
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] bg-gray-100 relative overflow-hidden rounded-xl mb-10">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-lg mb-4">{slide.subtitle}</p>
            <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full text-white text-sm font-medium transition">
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === activeIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;