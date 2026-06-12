import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { navigate } from "../../hooks/useLocation";

interface FeaturedItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  path: string;
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    title: "Understanding God's Grace in Everyday Life",
    description:
      "Discover how God's grace manifests in our daily experiences and challenges.",
    image:
      "https://images.pexels.com/photos/8383656/pexels-photo-8383656.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Article",
    path: "/article",
  },
  {
    id: 2,
    title: "The Biblical Framework of Faith and Works",
    description:
      "Examining the relationship between faith and works in Christian theology.",
    image:
      "https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Study",
    path: "/resources",
  },
  {
    id: 3,
    title: "Principles of Faithful Biblical Interpretation",
    description:
      "Learn the key principles for interpreting scripture faithfully and accurately.",
    image:
      "https://images.pexels.com/photos/2574619/pexels-photo-2574619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Resource",
    path: "/resources",
  },
];

const FeaturedContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const next = () => goTo((currentIndex + 1) % featuredItems.length);
  const prev = () => goTo((currentIndex - 1 + featuredItems.length) % featuredItems.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const item = featuredItems[currentIndex];

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <div
          className={`relative w-full h-96 md:h-[460px] transition-opacity duration-300 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay — consistent bottom-heavy dark scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10 text-white">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white mb-4">
              {item.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
              {item.title}
            </h3>
            <p className="text-slate-300 text-sm md:text-base mb-5 max-w-2xl">
              {item.description}
            </p>
            <button
              onClick={() => navigate(item.path)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/25 px-5 py-2.5 rounded-lg transition-all"
            >
              Read More <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {featuredItems.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 h-2 bg-blue-600"
                : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;
