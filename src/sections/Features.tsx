"use client"
import { DotLottiePlayer } from "@dotlottie/react-player";
import productsImage from "@/assets/product-image.png";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "Intuitive project dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "Real-time team collaboration",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

const FeatureTab = (props: typeof tabs[number] & ComponentPropsWithoutRef<'div'> & { selected: boolean }) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef(null);
  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  const maskImage = useMotionTemplate`
  radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)
`;

  useEffect(() => {
    if (!tabRef.current || !props.selected) return;

    xPercentage.set(0);
    yPercentage.set(0);
    

    const { height, width } = tabRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;

    const times = [0, width / circumference, (width + height) / circumference, (width * 2 + height * 2) / circumference, 1];
    const options: ValueAnimationTransition = {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    }

    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [props.selected]);
  const handleTabHover = () => {
    if (dotLottieRef.current === null) {
      // @ts-ignore
      dotLottieRef.current.play();
    }
  };
  return (
    <div
      ref={tabRef}
      onClick={props.onClick}
      onMouseEnter={handleTabHover} key={props.title} className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative">
      {props.selected && (
        <motion.div
          style={{
            maskImage,
          }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl"></motion.div>
      )}

      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer ref={dotLottieRef} src={props.icon} className="h-5 w-5" autoplay loop />
      </div>
      <div className="font-medium">{props.title}</div>
      {props.isNew && <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">new</div>}
    </div>
  );

}

export const Features = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;
  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
    const tab = tabs[index];
    animate(backgroundPositionX, tab.backgroundPositionX, { duration: 0.8 });
    animate(backgroundPositionY, tab.backgroundPositionY, { duration: 0.8 });
    animate(backgroundSizeX, tab.backgroundSizeX, { duration: 0.8 });
  }

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">Manage projects smarter, not harder.</h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">From startups to enterprises, our all-in-one project management platform helps teams plan, collaborate, and deliver work efficiently—on time and on budget.</p>
        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab, tabIndex) => (
            <FeatureTab {...tab} selected={selectedTab === tabIndex} onClick={() => handleSelectTab(tabIndex)} key={tab.title} />
          ))}
        </div>
        <div className="border border-white/20 p-2.5 rounded-xl mt-3">
          <motion.div className="aspect-video bg-cover border-white/20 rounded-lg" style={{
            backgroundPosition,
            backgroundSize,
            backgroundImage: `url(${productsImage.src})`,
          }}></motion.div>
        </div>
      </div>
    </section>
  );
};
