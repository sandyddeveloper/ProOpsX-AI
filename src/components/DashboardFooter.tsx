import Logo from "@/assets/logo.svg";
import XSocial from "@/assets/social-x.svg";
import InstaSocial from "@/assets/social-instagram.svg";
import YTSocial from "@/assets/social-youtube.svg";

export const DashboardFooter = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 text-sm">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <Logo />
          <span className="font-semibold text-gray-900 dark:text-gray-100">ProOpsX</span>
        </div>

        {/* Navigation (hidden on mobile) */}
        <nav className="hidden md:flex flex-wrap justify-center gap-6">
          <a href="" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">Features</a>
          <a href="" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">Developers</a>
          <a href="" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">Company</a>
          <a href="" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">Blog</a>
          <a href="" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">Changelog</a>
          <a href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">Dashboard</a>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4 shrink-0">
          <XSocial className=" text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" />
          <InstaSocial className=" text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" />
          <YTSocial className=" text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" />
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 dark:text-gray-400 shrink-0 text-right">
          © {new Date().getFullYear()} ProOpsX
        </div>
      </div>
    </footer>
  );
};
