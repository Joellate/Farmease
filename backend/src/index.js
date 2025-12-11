const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crops');
const userRoutes = require('./routes/users');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Farmeasee API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
