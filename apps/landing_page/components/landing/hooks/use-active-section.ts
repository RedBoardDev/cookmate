"use client";

import { useEffect, useState } from "react";

const sections = ["features", "pricing", "faq"] as const;

export type ActiveSection = (typeof sections)[number] | "home";

export function useActiveSection(): ActiveSection {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const featuresElement = document.getElementById("features");
      const faqElement = document.getElementById("faq");

      if (
        window.scrollY < 200 ||
        (featuresElement && featuresElement.getBoundingClientRect().top > window.innerHeight * 0.3)
      ) {
        setActiveSection("home");
        return;
      }

      if (faqElement) {
        const faqRect = faqElement.getBoundingClientRect();
        const distanceToBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

        if (distanceToBottom < 400) {
          setActiveSection("faq");
          return;
        }

        if (faqRect.top < window.innerHeight * 0.5 && faqRect.bottom > 0) {
          if (faqRect.top < window.innerHeight * 0.3) {
            setActiveSection("faq");
            return;
          }
        }
      }

      let closestSection: ActiveSection = "home";
      let closestDistance = Infinity;

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const distance = Math.abs(scrollPosition - elementTop);

        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0 && distance < closestDistance) {
          closestDistance = distance;
          closestSection = sectionId;
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}
