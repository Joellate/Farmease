// Sample test data for the application

export const sampleCrops = [
  {
    id: 1,
    farmerId: 1,
    farmerName: 'John Doe',
    farmer_phone: '+250 788 123 456',
    farmer_email: 'john@farm.com',
    name: 'Fresh Tomatoes',
    description: 'Organic, locally-grown red tomatoes. Perfect for cooking or salads.',
    price: 5.99,
    quantity: '50 lbs',
    unit: 'lb',
    image: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Tomatoes',
    category: 'Vegetables',
    harvested: '2025-12-08',
    daysOld: 1,
  },
  {
    id: 2,
    farmerId: 2,
    farmerName: 'Sarah Smith',
    farmer_phone: '+250 788 234 567',
    farmer_email: 'sarah@farm.com',
    name: 'Organic Lettuce',
    description: 'Fresh, crisp lettuce harvested this morning. Great for salads.',
    price: 3.49,
    quantity: '30 heads',
    unit: 'head',
    image: 'https://via.placeholder.com/300x200/90ee90/ffffff?text=Lettuce',
    category: 'Vegetables',
    harvested: '2025-12-09',
    daysOld: 0,
  },
  {
    id: 3,
    farmerId: 1,
    farmerName: 'John Doe',
    farmer_phone: '+250 788 123 456',
    farmer_email: 'john@farm.com',
    name: 'Sweet Corn',
    description: 'Golden, sweet corn ready to cook. Peak freshness guaranteed.',
    price: 4.99,
    quantity: '40 ears',
    unit: 'ear',
    image: 'https://via.placeholder.com/300x200/ffd700/ffffff?text=Corn',
    category: 'Vegetables',
    harvested: '2025-12-07',
    daysOld: 2,
  },
  {
    id: 4,
    farmerId: 3,
    farmerName: 'Mike Johnson',
    farmer_phone: '+250 788 345 678',
    farmer_email: 'mike@farm.com',
    name: 'Organic Carrots',
    description: 'Sweet, crunchy carrots. No pesticides, naturally grown.',
    price: 2.99,
    quantity: '25 lbs',
    unit: 'lb',
    image: 'https://via.placeholder.com/300x200/ff8c00/ffffff?text=Carrots',
    category: 'Vegetables',
    harvested: '2025-12-06',
    daysOld: 3,
  },
  {
    id: 5,
    farmerId: 2,
    farmerName: 'Sarah Smith',
    farmer_phone: '+250 788 234 567',
    farmer_email: 'sarah@farm.com',
    name: 'Fresh Strawberries',
    description: 'Sweet, juicy strawberries. Perfect for desserts and smoothies.',
    price: 6.99,
    quantity: '15 lbs',
    unit: 'lb',
    image: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=Strawberries',
    category: 'Fruits',
    harvested: '2025-12-08',
    daysOld: 1,
  },
  {
    id: 6,
    farmerId: 4,
    farmerName: 'Emily Brown',
    farmer_phone: '+250 788 456 789',
    farmer_email: 'emily@farm.com',
    name: 'Bell Peppers',
    description: 'Colorful bell peppers in red, yellow, and green. Crisp and delicious.',
    price: 4.49,
    quantity: '35 pieces',
    unit: 'piece',
    image: 'https://via.placeholder.com/300x200/ff4500/ffffff?text=Peppers',
    category: 'Vegetables',
    harvested: '2025-12-08',
    daysOld: 1,
  },
  {
    id: 7,
    farmerId: 3,
    farmerName: 'Mike Johnson',
    farmer_phone: '+250 788 345 678',
    farmer_email: 'mike@farm.com',
    name: 'Cucumbers',
    description: 'Crisp, refreshing cucumbers. Great for pickling or salads.',
    price: 3.99,
    quantity: '45 pieces',
    unit: 'piece',
    image: 'https://via.placeholder.com/300x200/228b22/ffffff?text=Cucumbers',
    category: 'Vegetables',
    harvested: '2025-12-09',
    daysOld: 0,
  },
  {
    id: 8,
    farmerId: 4,
    farmerName: 'Emily Brown',
    farmer_phone: '+250 788 456 789',
    farmer_email: 'emily@farm.com',
    name: 'Blueberries',
    description: 'Plump, sweet blueberries. Rich in antioxidants and delicious.',
    price: 7.99,
    quantity: '10 lbs',
    unit: 'lb',
    image: 'https://via.placeholder.com/300x200/4169e1/ffffff?text=Blueberries',
    category: 'Fruits',
    harvested: '2025-12-07',
    daysOld: 2,
  },
];

export const sampleFarmers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@farm.com',
    phone: '+250 788 123 456',
    password: 'password123',
    userType: 'farmer',
    farmName: 'Doe Family Farm',
    location: 'California, USA',
    crops: [1, 3],
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@farm.com',
    phone: '+250 788 234 567',
    password: 'password123',
    userType: 'farmer',
    farmName: 'Smith Organic Farm',
    location: 'Oregon, USA',
    crops: [2, 5],
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@farm.com',
    phone: '+250 788 345 678',
    password: 'password123',
    userType: 'farmer',
    farmName: 'Johnson Farm',
    location: 'Iowa, USA',
    crops: [4, 7],
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@farm.com',
    phone: '+250 788 456 789',
    password: 'password123',
    userType: 'farmer',
    farmName: 'Brown Berry Farm',
    location: 'Washington, USA',
    crops: [6, 8],
  },
];

export const sampleBuyers = [
  {
    id: 101,
    name: 'Alice Chen',
    email: 'alice@email.com',
    password: 'password123',
    userType: 'buyer',
    location: 'San Francisco, CA',
  },
  {
    id: 102,
    name: 'Bob Wilson',
    email: 'bob@email.com',
    password: 'password123',
    userType: 'buyer',
    location: 'Portland, OR',
  },
  {
    id: 103,
    name: 'Carol Davis',
    email: 'carol@email.com',
    password: 'password123',
    userType: 'buyer',
    location: 'Seattle, WA',
  },
];

// Utility function to get crops by farmer ID
export const getCropsByFarmerId = (farmerId) => {
  return sampleCrops.filter((crop) => crop.farmerId === farmerId);
};

// Utility function to get all farmers
export const getAllFarmers = () => {
  return sampleFarmers;
};

// Utility function to get all crops
export const getAllCrops = () => {
  return sampleCrops;
};

// Utility function to find farmer by ID
export const getFarmerById = (id) => {
  return sampleFarmers.find((farmer) => farmer.id === id);
};

// Utility function to find buyer by ID
export const getBuyerById = (id) => {
  return sampleBuyers.find((buyer) => buyer.id === id);
};
