import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const miningPools = [
  {
    id: 1,
    name: "F2Pool",
    hashrateTHs: 15420.5,
    activeWorkers: 12847,
    rejectRate: 0.8,
    status: "online",
    last24hRevenueBTC: 2.456,
    uptimePercent: 99.9,
    location: "China",
    feePercent: 2.5
  },
  {
    id: 2,
    name: "Antpool",
    hashrateTHs: 18750.2,
    activeWorkers: 15923,
    rejectRate: 1.2,
    status: "online",
    last24hRevenueBTC: 3.127,
    uptimePercent: 99.8,
    location: "Singapore",
    feePercent: 2.0
  },
  {
    id: 3,
    name: "ViaBTC",
    hashrateTHs: 8340.7,
    activeWorkers: 7651,
    rejectRate: 2.1,
    status: "degraded",
    last24hRevenueBTC: 1.892,
    uptimePercent: 97.5,
    location: "USA",
    feePercent: 4.0
  },
  {
    id: 4,
    name: "SlushPool",
    hashrateTHs: 6120.3,
    activeWorkers: 5234,
    rejectRate: 0.6,
    status: "online",
    last24hRevenueBTC: 1.345,
    uptimePercent: 99.7,
    location: "Czech Republic",
    feePercent: 2.0
  },
  {
    id: 5,
    name: "BTC.com",
    hashrateTHs: 2890.1,
    activeWorkers: 2156,
    rejectRate: 5.2,
    status: "offline",
    last24hRevenueBTC: 0.0,
    uptimePercent: 45.2,
    location: "Hong Kong",
    feePercent: 1.5
  }
];

app.get('/api/mining-pools', (req, res) => {
  const poolsList = [
    ...miningPools.map(({ id, name, hashrateTHs, activeWorkers, rejectRate, status }) => ({
      id,
      name,
      hashrateTHs,
      activeWorkers,
      rejectRate,
      status
    })),
    {
      id: 999,
      name: "TestPool (404 Error)",
      hashrateTHs: 1000.0,
      activeWorkers: 500,
      rejectRate: 1.0,
      status: "online"
    }
  ];
  
  setTimeout(() => {
    res.json(poolsList);
  }, 800);
});

app.get('/api/mining-pools/:id', (req, res) => {
  const poolId = parseInt(req.params.id);
  
  if (poolId === 999) {
    return res.status(404).json({ 
      error: 'Pool not found',
      message: 'Этот пул больше не существует'
    });
  }
  
  const pool = miningPools.find(p => p.id === poolId);
  
  if (!pool) {
    return res.status(404).json({ 
      error: 'Pool not found',
      message: 'Пул  не найден'
    });
  }
  
  const { last24hRevenueBTC, uptimePercent, location, feePercent } = pool;
  
  setTimeout(() => {
    res.json({
      last24hRevenueBTC,
      uptimePercent,
      location,
      feePercent
    });
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 