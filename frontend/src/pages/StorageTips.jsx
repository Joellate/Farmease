import React from 'react';

const tips = [
  {
    crop: 'Potatoes',
    tip: 'Store in a cool, dark, well-ventilated place. Do not refrigerate.',
  },
  {
    crop: 'Tomatoes',
    tip: 'Keep at room temperature away from direct sunlight.',
  },
  {
    crop: 'Maize',
    tip: 'Dry properly and store in airtight bags in a dry place.',
  },
  {
    crop: 'Bananas',
    tip: 'Store at room temperature away from other fruits to slow ripening.',
  },
];

const StorageTips = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Storage Tips</h2>
      {tips.map((t, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <h3>{t.crop}</h3>
          <p>{t.tip}</p>
        </div>
      ))}
    </div>
  );
};

export default StorageTips;
