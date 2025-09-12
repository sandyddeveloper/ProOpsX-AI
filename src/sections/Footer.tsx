import Logo from "@/assets/logo.svg";
import XSocial from "@/assets/social-x.svg";
import InstaSocial from "@/assets/social-instagram.svg";
import YTSocial from "@/assets/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/15 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3 lg:flex-1">
            <Logo className="w-8 h-8" />
            <span className="font-semibold text-lg">ProOpsX</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 lg:flex-1 lg:justify-center">
            <a href="" className="text-white/70 hover:text-white text-sm transition">
              Features
            </a>
            <a href="" className="text-white/70 hover:text-white text-sm transition">
              Developers
            </a>
            <a href="" className="text-white/70 hover:text-white text-sm transition">
              Company
            </a>
            <a href="" className="text-white/70 hover:text-white text-sm transition">
              Blog
            </a>
            <a href="" className="text-white/70 hover:text-white text-sm transition">
              Changelog
            </a>
            <a href="" className="text-white/70 hover:text-white text-sm transition">
              dashboard
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-6 lg:flex-1 justify-center lg:justify-end">
            <XSocial className="w-5 h-5 text-white/40 hover:text-white transition" />
            <InstaSocial className="w-5 h-5 text-white/40 hover:text-white transition" />
            <YTSocial className="w-5 h-5 text-white/40 hover:text-white transition" />
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-8 border-t border-white/10"></div>

        {/* Bottom Copy */}
        <div className="mt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} ProOpsX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
