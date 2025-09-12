import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";

const testimonials = [
  {
    text: "“This platform has completely transformed how I organize my projects, track tasks, and meet deadlines.”",
    name: "Sophia Perez",
    title: "Director @ Quantum",
    avatarImg: avatar1,
  },
  {
    text: "“Our entire workflow has been streamlined—this project management app has reshaped the way our team collaborates.”",
    name: "Jamie Lee",
    title: "Founder @ Pulse",
    avatarImg: avatar2,
  },
  {
    text: "“The dashboard and task management features are so intuitive—it has saved our team countless hours of work.”",
    name: "Alisa Hester",
    title: "Product @ Innovate",
    avatarImg: avatar3,
  },
  {
    text: "“Since adopting this tool, our team's productivity and project delivery speed have improved significantly.”",
    name: "Alec Whitten",
    title: "CTO @ Tech Solutions",
    avatarImg: avatar4,
  },
];


export const Testimonials = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">Beyond Expectations.</h2>
        <p className="text-center text-white/70 text-lg md:text-xl mt-5 tracking-tighter max-w-sm mx-auto">Our revolutionary ProOpsX tools have transformed project management for teams worldwide.</p>
        <div className="overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div className="flex gap-5 ">
            {testimonials.map((testimonials) => (
              <div key={testimonials.name} className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs md:max-w-md flex-none">
                <div className="text-lg tracking-tight md:text-2xl">{testimonials.text}</div>
                <div className="flex items-center gap-3 mt-5">
                  <div className="relative after:content-[''] after:absolute after:insert-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border-white/30 before:z-10 before:rounded-lg">
                    <Image src={testimonials.avatarImg} alt={testimonials.name} className="h-11 w-11 rounded-lg grayscale" />
                  </div>
                  <div className="">
                    <div>{testimonials.name}</div>
                    <div className="text-white/50 text-sm">{testimonials.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
