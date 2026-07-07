import type { Topic } from "@/types/study";

const visuals = [
  {
    label: "Bozkır",
    symbol: "𐱅",
    gradient: "from-[#f97316]/24 via-[#fef3c7]/80 to-[#0f172a]/12",
    accent: "#f97316",
    line: "atlı kültür • töre • kurultay"
  },
  {
    label: "Karahanlı",
    symbol: "◆",
    gradient: "from-[#0f766e]/18 via-[#ecfeff]/80 to-[#92400e]/14",
    accent: "#0f766e",
    line: "ilk Türk-İslam eserleri"
  },
  {
    label: "Selçuklu",
    symbol: "✦",
    gradient: "from-[#2563eb]/16 via-[#eff6ff]/80 to-[#7c2d12]/12",
    accent: "#2563eb",
    line: "ikta • medrese • kervansaray"
  },
  {
    label: "Beylik",
    symbol: "◈",
    gradient: "from-[#7c3aed]/16 via-[#faf5ff]/80 to-[#991b1b]/10",
    accent: "#7c3aed",
    line: "uç kültürü • denizcilik"
  },
  {
    label: "Osmanlı",
    symbol: "☾",
    gradient: "from-[#b4232a]/18 via-[#fff7ed]/80 to-[#334155]/12",
    accent: "#b4232a",
    line: "merkez • tımar • divan"
  },
  {
    label: "Klasik",
    symbol: "▣",
    gradient: "from-[#0f172a]/16 via-[#f8fafc]/80 to-[#d97706]/12",
    accent: "#0f172a",
    line: "devlet düzeni • hukuk"
  },
  {
    label: "Islahat",
    symbol: "⌁",
    gradient: "from-[#be123c]/16 via-[#fff1f2]/80 to-[#1d4ed8]/12",
    accent: "#be123c",
    line: "yenileşme • meşrutiyet"
  },
  {
    label: "Cephe",
    symbol: "★",
    gradient: "from-[#dc2626]/18 via-[#fef2f2]/80 to-[#064e3b]/12",
    accent: "#dc2626",
    line: "kongreler • bağımsızlık"
  },
  {
    label: "Meclis",
    symbol: "▲",
    gradient: "from-[#0891b2]/16 via-[#ecfeff]/80 to-[#991b1b]/10",
    accent: "#0891b2",
    line: "TBMM • egemenlik"
  },
  {
    label: "Cumhuriyet",
    symbol: "●",
    gradient: "from-[#b91c1c]/18 via-[#fff7ed]/80 to-[#475569]/10",
    accent: "#b91c1c",
    line: "inkılaplar • laiklik"
  },
  {
    label: "Atatürkçülük",
    symbol: "✺",
    gradient: "from-[#ea580c]/16 via-[#fff7ed]/80 to-[#1e40af]/12",
    accent: "#ea580c",
    line: "ilkeler • bütünlük"
  },
  {
    label: "Çağdaş",
    symbol: "◇",
    gradient: "from-[#1d4ed8]/16 via-[#eff6ff]/80 to-[#0f766e]/12",
    accent: "#1d4ed8",
    line: "dış politika • dünya"
  }
];

export function getTopicVisual(topic: Topic, index = 0) {
  return visuals[index % visuals.length] ?? visuals[0];
}
