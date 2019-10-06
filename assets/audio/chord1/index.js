import chord1Webm from "./chord1.webm";
import chord1Mp3 from "./chord1.mp3";

import Bar1Webm from "./chord1_bar1.webm";
import Bar1Mp3 from "./chord1_bar1.mp3";
import Bar2Webm from "./chord1_bar2.webm";
import Bar2Mp3 from "./chord1_bar2.mp3";
import Bar3Webm from "./chord1_bar3.webm";
import Bar3Mp3 from "./chord1_bar3.mp3";
import Bar4Webm from "./chord1_bar4.webm";
import Bar4Mp3 from "./chord1_bar4.mp3";
import Bar5Webm from "./chord1_bar5.webm";
import Bar5Mp3 from "./chord1_bar5.mp3";
import Bar6Webm from "./chord1_bar6.webm";
import Bar6Mp3 from "./chord1_bar6.mp3";

export default {
  id: "I",
  chord: [chord1Webm, chord1Mp3],
  bars: [
    { howl: [Bar1Webm, Bar1Mp3], notes: ["L", "M", "L", "L"] },
    { howl: [Bar2Webm, Bar2Mp3], notes: ["H", "M", "H", "M"] },
    { howl: [Bar3Webm, Bar3Mp3], notes: ["L", "L", "S", "M"] },
    { howl: [Bar4Webm, Bar4Mp3], notes: ["L", "L", "M", "M"] },
    { howl: [Bar5Webm, Bar5Mp3], notes: ["L", "H", "M", "L"] },
    { howl: [Bar6Webm, Bar6Mp3], notes: ["L", "L", "L", "L"] }
  ]
};
