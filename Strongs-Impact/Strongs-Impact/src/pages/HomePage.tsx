import { useState, useEffect } from "react";
import { ArrowRight, Book, Video, Headphones, Calendar, MapPin } from "lucide-react";
import { navigate } from "../hooks/useLocation";
import FeaturedContent from "../components/home/FeaturedContent";
import LatestArticles from "../components/home/LatestArticles";
import ScriptureWidget from "../components/home/ScriptureWidget";
import smcflyer from "../../assets/smc.png";

const useCountdown = (target: string) => {
  const calc = () => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-3">
    {children}
  </p>
);

const CountUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-1 border border-white/20">
      <span className="text-xl md:text-2xl font-bold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50">
      {label}
    </span>
  </div>
);

const UpcomingEventBanner = () => {
  const t = useCountdown("2026-07-08T00:00:00");
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Don't Miss It</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Upcoming Event
          </h2>
        </div>

        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Flyer Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
              {!imageError ? (
                <img
                  src={smcflyer}
                  alt="Student Mission Conference 2026 Flyer"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
                  <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
                    SMC
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-white mb-2">
                    Student Mission Conference
                  </p>
                  <p className="text-sm md:text-base text-slate-400">
                    July 8–12, 2026
                  </p>
                </div>
              )}
            </div>

            {/* Details Panel */}
            <div className="bg-slate-900 flex flex-col justify-between p-6 sm:p-8 md:p-10">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-300 mb-5">
                  Conference
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-snug">
                  Student Mission Conference 2026
                </h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-300 text-sm md:text-base">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-400 flex-shrink-0" />
                    <span>July 8–12, 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-sm md:text-base">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-400 flex-shrink-0" />
                    <span>Lautech Inter-dominational Chapel</span>
                  </div>
                </div>

                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
                  Starts in
                </p>
                <div className="flex items-end gap-2 md:gap-3 mb-8 flex-wrap">
                  <CountUnit value={t.days} label="Days" />
                  <span className="text-white/30 text-lg md:text-xl font-bold mb-4">:</span>
                  <CountUnit value={t.hours} label="Hours" />
                  <span className="text-white/30 text-lg md:text-xl font-bold mb-4">:</span>
                  <CountUnit value={t.minutes} label="Min" />
                  <span className="text-white/30 text-lg md:text-xl font-bold mb-4">:</span>
                  <CountUnit value={t.seconds} label="Sec" />
                </div>
              </div>

              <button
                onClick={() => navigate("/SmcRegistrationPage")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Register Now <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeUp = (delay: string) =>
    `transform transition-all duration-1000 ${delay} ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`;

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center py-32 md:py-44 bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-slate-900/75" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className={`text-xs font-semibold tracking-[0.25em] uppercase text-blue-400 mb-4 ${fadeUp("delay-100")}`}>
            The Spiritual Intellectuals
          </p>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 ${fadeUp("delay-200")}`}>
            Discover The Depth<br className="hidden sm:block" /> of God's Word
          </h1>
          <p className={`text-lg md:text-xl text-slate-300 mb-10 leading-relaxed ${fadeUp("delay-300")}`}>
            Explore biblical resources, mission training, evangelism tools, and discipleship materials designed to help you grow spiritually, strengthen your faith, convert sinners, and impact your world.
          </p>
          <div className={`flex flex-col sm:flex-row justify-center gap-4 ${fadeUp("delay-500")}`}>
            <button
              onClick={() => navigate("/resources")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Explore Resources <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/article")}
              className="border border-white/30 text-white hover:bg-white/10 px-7 py-3.5 rounded-lg font-medium transition-all"
            >
              Read Articles
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured Content ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Highlighted</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Content
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Our most impactful resources and articles, curated to deepen your faith.
            </p>
          </div>
          <FeaturedContent />
        </div>
      </section>

      {/* ── Latest Articles ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Fresh Reading</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Thought-provoking pieces on faith, theology, and the Christian life.
            </p>
          </div>
          <LatestArticles />
        </div>
      </section>

      {/* ── Upcoming Event Spotlight ── */}
      <UpcomingEventBanner />

      {/* ── Daily Scripture ── */}
      <ScriptureWidget />

      {/* ── Browse by Category ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Explore</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Find exactly what you need — study materials, sermons, events, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              icon={<Book className="h-7 w-7" />}
              title="Articles & Studies"
              description="In-depth analysis and study of scripture"
              onClick={() => navigate("/article")}
            />
            <CategoryCard
              icon={<Video className="h-7 w-7" />}
              title="Video Sermons"
              description="Visual teachings and sermons"
              onClick={() => navigate("/resources")}
            />
            <CategoryCard
              icon={<Headphones className="h-7 w-7" />}
              title="Audio Content"
              description="Podcasts and audio resources"
              onClick={() => navigate("/resources")}
            />
            <CategoryCard
              icon={<Calendar className="h-7 w-7" />}
              title="Events"
              description="Upcoming conferences and events"
              onClick={() => navigate("/events")}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <SectionLabel>Stay Connected</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-slate-300 mb-8">
              Subscribe to receive the latest articles, resources, and updates
              directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const CategoryCard = ({ icon, title, description, onClick }: CategoryCardProps) => (
  <div
    className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-7 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
    onClick={onClick}
  >
    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-base font-semibold mb-2 text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
  </div>
);

export default HomePage;
