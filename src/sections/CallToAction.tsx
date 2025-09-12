import Button from "@/components/ui/Button";
import startBg from "@/assets/stars.png"
import gridLines from "@/assets/grid-lines.png"

export const CallToAction = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-6">
        <div className="border border-white/15 py-24 rounded-xl overflow-hidden relative" style={{ backgroundImage: `url(${startBg.src})` }}>
          <div className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)]" style={{ backgroundImage: `url(${gridLines.src})` }}></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">AI-driven SEO for everyone.</h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">Join thousands of businesses using our AI-powered SEO tool to boost their online presence and drive more traffic.</p>
            <div className="flex justify-center mt-8">
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
