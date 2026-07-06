export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 8
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: premiumEase
    }
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.2,
      ease: premiumEase
    }
  }
};

export const fadeUp = {
  initial: {
    opacity: 0,
    y: 16
  },
  animate: {
    opacity: 1,
    y: 0,
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
