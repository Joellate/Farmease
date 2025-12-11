import React from 'react';

const info = [
  {
    crop: 'Potatoes',
    calories_per_100g: 77,
    notes: 'Good source of vitamin C and potassium.',
  },
  {
    crop: 'Tomatoes',
    calories_per_100g: 18,
    notes: 'Rich in vitamin C and lycopene.',
  },
  {
    crop: 'Maize',
    calories_per_100g: 86,
    notes: 'Provides carbohydrates and some fiber.',
  },
];

const NutritionInfo = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Nutrition Information</h2>
      {info.map((i, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <h3>{i.crop}</h3>
          <p>{i.calories_per_100g} kcal / 100g</p>
          <p>{i.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default NutritionInfo;
