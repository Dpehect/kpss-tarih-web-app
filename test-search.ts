import { searchLocalEncyclopedia } from "./src/lib/search";

const res1 = searchLocalEncyclopedia("Tlas savasi");
console.log("Tlas savasi:", res1?.matchedTitle, res1?.score);

const res2 = searchLocalEncyclopedia("Mani dini yerlesik hayata gecen ilk turk kim");
console.log("Mani dini:", res2?.matchedTitle, res2?.score);

const res3 = searchLocalEncyclopedia("put kirici");
console.log("Put kirici:", res3?.matchedTitle, res3?.score);
