import chord5Webm from "./chord5.webm";
import chord5Mp3 from "./chord5.mp3";

import Bar1Webm from "./chord5_bar1.webm";
import Bar1Mp3 from "./chord5_bar1.mp3";
import Bar2Webm from "./chord5_bar2.webm";
import Bar2Mp3 from "./chord5_bar2.mp3";
import Bar3Webm from "./chord5_bar3.webm";
import Bar3Mp3 from "./chord5_bar3.mp3";
import Bar4Webm from "./chord5_bar4.webm";
import Bar4Mp3 from "./chord5_bar4.mp3";
import Bar5Webm from "./chord5_bar5.webm";
import Bar5Mp3 from "./chord5_bar5.mp3";
import Bar6Webm from "./chord5_bar6.webm";
import Bar6Mp3 from "./chord5_bar6.mp3";

export default {
  id: "V",
  chord: [chord5Webm, chord5Mp3],
  bars: [
    { howl: [Bar1Webm, Bar1Mp3], notes: ["L", "M", "H", "H"] },
    { howl: [Bar2Webm, Bar2Mp3], notes: ["L", "S", "M", "M"] },
    { howl: [Bar3Webm, Bar3Mp3], notes: ["M", "H", "S", "S"] },
    { howl: [Bar4Webm, Bar4Mp3], notes: ["H", "M", "L", "L"] },
    { howl: [Bar5Webm, Bar5Mp3], notes: ["M", "H", "L", "L"] },
    { howl: [Bar6Webm, Bar6Mp3], notes: ["L", "S", "L", "L"] }
  ]
};
