import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useSmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const sections = gsap.utils.toArray("section");
    
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
}