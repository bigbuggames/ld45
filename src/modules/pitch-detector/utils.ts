export function addValueToFrequencyRange(
  rangeArray: number[],
  frequency: number,
  value: number
) {
  const frequencyRanges = [
    { min: 0, max: 250 },
    { min: 251, max: 1500 },
    { min: 1500, max: 22000 }
  ];

  frequencyRanges.forEach((range, index) => {
    if (frequency >= range.min && frequency <= range.max) {
      rangeArray[index] += value;
    }
  });

  return rangeArray;
}

// TODO: Improve frequency detection
export function getOctaveFrequencyArray(frequencyData) {
  const frequencyStep = 23.4;
  let frequenciesByRange = [0, 0, 0];

  frequencyData.slice(15, 200).forEach((item, index) => {
    const currentFrequency = frequencyStep * index;
    frequenciesByRange = addValueToFrequencyRange(
      frequenciesByRange,
      currentFrequency,
      item
    );
  });

  console.log(frequenciesByRange);
}

export function detectVoice(frequencyData, thereshold) {
  const mean = frequencyData.slice(15, 200).reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0);

  console.log("mean", mean);

  return mean >= thereshold;
}
