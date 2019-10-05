/**
 * Legend:
 *   - H: High
 *   - M: Medium
 *   - L: Low
 *   - S: Silence
 */

module.exports = {
  1: [
    { id: "chord1_bar1", notes: ["H", "S", "L", "M"] },
    { id: "chord1_bar2", notes: ["M", "S", "H", "L"] },
    { id: "chord1_bar3", notes: ["L", "S", "H", "H"] }
  ],
  2: [
    { id: "chord2_bar1", notes: ["L", "L", "S", "M"] },
    { id: "chord2_bar2", notes: ["L", "M", "S", "M"] },
    { id: "chord2_bar3", notes: ["M", "H", "S", "M"] }
  ],
  5: [
    { id: "chord5_bar1", notes: ["H", "L", "H", "S"] },
    { id: "chord5_bar2", notes: ["H", "M", "L", "S"] },
    { id: "chord5_bar3", notes: ["L", "M", "H", "S"] }
  ]
};
