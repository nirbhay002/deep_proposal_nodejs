import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const classes = [".reveal", ".reveal-left", ".reveal-right"];
    const elements = document.querySelectorAll(classes.join(","));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}