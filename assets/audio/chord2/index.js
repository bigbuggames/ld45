import chord2Webm from "./chord2.webm";
import chord2Mp3 from "./chord2.mp3";

import Bar1Webm from "./chord2_bar1.webm";
import Bar1Mp3 from "./chord2_bar1.mp3";
import Bar2Webm from "./chord2_bar2.webm";
import Bar2Mp3 from "./chord2_bar2.mp3";
import Bar3Webm from "./chord2_bar3.webm";
import Bar3Mp3 from "./chord2_bar3.mp3";
import Bar4Webm from "./chord2_bar4.webm";
import Bar4Mp3 from "./chord2_bar4.mp3";
import Bar5Webm from "./chord2_bar5.webm";
import Bar5Mp3 from "./chord2_bar5.mp3";
import Bar6Webm from "./chord2_bar6.webm";
import Bar6Mp3 from "./chord2_bar6.mp3";

export default {
  id: "II",
  chord: [chord2Webm, chord2Mp3],
  bars: [
    { howl: [Bar1Webm, Bar1Mp3], notes: ["L", "M", "H", "H"] },
    { howl: [Bar2Webm, Bar2Mp3], notes: ["L", "S", "H", "H"] },
    { howl: [Bar3Webm, Bar3Mp3], notes: ["M", "H", "S", "S"] },
    { howl: [Bar4Webm, Bar4Mp3], notes: ["H", "M", "L", "L"] },
    { howl: [Bar5Webm, Bar5Mp3], notes: ["M", "H", "M", "M"] },
    { howl: [Bar6Webm, Bar6Mp3], notes: ["L", "S", "L", "L"] }
  ]
};
