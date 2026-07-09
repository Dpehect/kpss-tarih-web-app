import type { EncyclopediaEntry } from "./types";
import { islamiyetOncesiData } from "./data/01-islamiyet-oncesi";
import { osmanliSiyasiData } from "./data/02-osmanli-siyasi";
import { osmanliKulturMedeniyetData } from "./data/03-osmanli-kultur-medeniyet";
import { inkilapTarihiData } from "./data/04-inkilap-tarihi";
import { cagdasTarihData } from "./data/05-cagdas-turk-dunya-tarihi";
import { anlasmalarSavaslarData } from "./data/06-onemli-anlasmalar-ve-savaslar";
import { turkIslamData } from "./data/07-turk-islam";

let encyclopediaCache: EncyclopediaEntry[] | null = null;

export function loadEncyclopedia(): EncyclopediaEntry[] {
  if (encyclopediaCache) return encyclopediaCache;

  const entries: EncyclopediaEntry[] = [
    ...islamiyetOncesiData,
    ...osmanliSiyasiData,
    ...osmanliKulturMedeniyetData,
    ...inkilapTarihiData,
    ...cagdasTarihData,
    ...anlasmalarSavaslarData,
    ...turkIslamData,
  ];

  encyclopediaCache = entries;
  return entries;
}
