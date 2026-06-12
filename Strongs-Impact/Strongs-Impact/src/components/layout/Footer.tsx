import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { navigate } from '../../hooks/useLocation';
import Logo from '../ui/Logo';

const Footer = () => {
  const go = (path: string) => navigate(path);

  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-14 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Equipping Christians with biblical knowledge and resources to grow in their faith.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, href: "https://facebook.com" },
                { icon: <Twitter size={16} />, href: "https://twitter.com" },
                { icon: <Instagram size={16} />, href: "https://instagram.com" },
                { icon: <Youtube size={16} />, href: "https://youtube.com" },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Resources", path: "/resources" },
                { label: "Articles", path: "/article" },
                { label: "Events", path: "/events" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => go(path)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">Resources</h3>
            <ul className="space-y-3">
              {["Bible Study", "Concordance", "Devotionals", "Sermons"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => go("/resources")}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Stay updated with our latest resources and articles.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                aria-label="Subscribe"
              >
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Strongs. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
