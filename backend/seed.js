// backend/seed.js
// Run this script once to populate test data: node seed.js

const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'false'
      ? false
      : { rejectUnauthorized: false },
});

const testUsers = [
  {
    name: 'John Doe',
    email: 'john@farm.com',
    password: 'password123',
    userType: 'farmer',
  },
  {
    name: 'Sarah Smith',
    email: 'sarah@farm.com',
    password: 'password123',
    userType: 'farmer',
  },
  {
    name: 'Mike Johnson',
    email: 'mike@farm.com',
    password: 'password123',
    userType: 'farmer',
  },
  {
    name: 'Emily Brown',
    email: 'emily@farm.com',
    password: 'password123',
    userType: 'farmer',
  },
  {
    name: 'Alice Chen',
    email: 'alice@email.com',
    password: 'password123',
    userType: 'buyer',
  },
  {
    name: 'Bob Wilson',
    email: 'bob@email.com',
    password: 'password123',
    userType: 'buyer',
  },
  {
    name: 'Carol Davis',
    email: 'carol@email.com',
    password: 'password123',
    userType: 'buyer',
  },
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with test users...');

    for (const user of testUsers) {
      // Check if user already exists
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [user.email]);
      if (existing.rows.length) {
        console.log(`⏭️  User ${user.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(user.password, 10);

      // Insert user
      const result = await pool.query(
        'INSERT INTO users (name, email, password_hash, user_type) VALUES ($1, $2, $3, $4) RETURNING id, email',
        [user.name, user.email, passwordHash, user.userType]
      );

      console.log(`✅ Created user: ${result.rows[0].email} (${user.userType})`);
    }

    console.log('\n✨ Seeding complete!');
    console.log('\n📋 Test Credentials:');
    console.log('Farmers:');
    console.log('  john@farm.com / password123');
    console.log('  sarah@farm.com / password123');
    console.log('  mike@farm.com / password123');
    console.log('  emily@farm.com / password123');
    console.log('\nBuyers:');
    console.log('  alice@email.com / password123');
    console.log('  bob@email.com / password123');
    console.log('  carol@email.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
