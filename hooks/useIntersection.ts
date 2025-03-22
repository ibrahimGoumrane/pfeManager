"use client";
import { useEffect, useState } from "react";

interface IntersectionObserverProps {
  element: React.RefObject<HTMLElement | null>;
  rootMargin: string;
  threshold?: number;
}

export const useIntersection = ({
  element,
  rootMargin,
  threshold = 0,
}: IntersectionObserverProps) => {
  const [isVisible, setState] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  useEffect(() => {
    const current = element?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );
    setObserver(observer);
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [element, rootMargin, threshold]);

  const connect = () => {
    if (element.current) {
      observer?.observe(element.current);
    }
  };
  const disconnect = () => {
    if (element.current) {
      observer?.disconnect();
    }
  };

  return {
    isVisible,
    observer,
    connect,
    disconnect,
  };
};
