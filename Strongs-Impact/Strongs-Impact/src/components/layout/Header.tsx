import { useState, useContext } from "react";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { navigate } from "../../hooks/useLocation";
import { ThemeContext } from "../../context/ThemeProvider";
import Logo from "../../assets/Strongs.png";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-slate-900/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Resources", path: "/resources" },
              { label: "Articles", path: "/article" },
              { label: "Events", path: "/events" },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavigation("/search")}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Resources", path: "/resources" },
              { label: "Articles", path: "/article" },
              { label: "Events", path: "/events" },
              { label: "Search", path: "/search" },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-white/10">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {theme === "light" ? (
                <><Moon className="h-4 w-4" /> Dark Mode</>
              ) : (
                <><Sun className="h-4 w-4" /> Light Mode</>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
