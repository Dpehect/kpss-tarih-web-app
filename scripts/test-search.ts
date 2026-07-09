import { searchLocalEncyclopedia } from "../src/lib/search";

const res1 = searchLocalEncyclopedia("Tlas savasi");
console.log("Tlas savasi:", res1?.matchedTitle);

const res2 = searchLocalEncyclopedia("talas savasi ne zaman oldu");
console.log("talas savasi ne zaman oldu:", res2?.matchedTitle);

const res3 = searchLocalEncyclopedia("maniheizm yerlesik hayata gecen ilk devlet hangisi");
console.log("maniheizm:", res3?.matchedTitle);
