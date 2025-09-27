import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.02,
      duration: 1.2,
      // smooth: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value as any) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    gsap.fromTo(
      '.box',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.box',
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
          scroller: document.body,
        },
      }
    );

    gsap.to('.parallax', {
      y: -100,
      scrollTrigger: {
        trigger: '.parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        scroller: document.body,
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="space-y-40 p-10">
      <section className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl">Scroll Down 🚀</h1>
      </section>

      <section className="h-screen flex items-center justify-center bg-blue-500">
        <div className="box text-3xl text-white font-bold">
          Fade in + Move Up
        </div>
      </section>

      <section className="parallax-section h-screen bg-green-600 relative overflow-hidden">
        <img
          src="https://picsum.photos/1200/800"
          className="parallax absolute w-full h-full object-cover"
          alt="parallax"
        />
        <div className="relative z-10 text-white text-4xl p-10">
          Parallax Effect 🌄
        </div>
      </section>
    </main>
  );
}
