import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import Button from "@/components/ui/Button";

export const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <LogoIcon className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8">
              <a className=" text-white/70 hover:text-white transition" href="http://">Features</a>
              <a className=" text-white/70 hover:text-white transition" href="http://">Developers</a>
              <a className=" text-white/70 hover:text-white transition" href="http://">Pricing</a>
              <a className=" text-white/70 hover:text-white transition" href="http://">Changelog</a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <Button>Get Started</Button>
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};


