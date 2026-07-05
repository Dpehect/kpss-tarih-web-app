/**
 * Landing sayfasında kullanılan feature kartı modeli.
 */
export type LandingFeature = {
  id: string;
  title: string;
  description: string;
  stat: string;
  tone: "gold" | "turquoise" | "crimson";
};

/**
 * Zaman akışı/ribbon üzerinde gösterilen kısa tarihsel vurgu modeli.
 */
export type TimelineTeaser = {
  id: string;
  date: string;
  label: string;
};
