export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 22,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.48,
      ease: premiumEase
    }
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(8px)",
    transition: {
      duration: 0.25,
      ease: premiumEase
    }
  }
};

export const fadeUp = {
  initial: {
    opacity: 0,
    y: 22,
    filter: "blur(8px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: premiumEase
    }
  }
};

export const listContainer = {
  animate: {
    transition: {
      staggerChildren: 0.07
    }
  }
};
