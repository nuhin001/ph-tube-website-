const express = require('express');
const cors = require('cors');
const db = require('./data.json');
const app = express();
const PORT = process.env.PORT || 5001;
const BASE = '/api/phero-tube';
app.use(cors());
app.use(express.json());

const success = (message, data) => ({ status: true, message, data });
const error = (message) => ({ status: false, message, data: null });

function viewNumber(video) {
  const value = String(video.others?.views || '0').toLowerCase().replace(/\s*views?/, '').trim();
  const match = value.match(/^([\d,.]+)\s*([kmb])?$/);
  if (!match) return Number(value.replace(/[^\d]/g, '')) || 0;
  return Number(match[1].replace(/,/g, '')) * ({ k: 1e3, m: 1e6, b: 1e9 }[match[2]] || 1);
}
function getVideos(query) {
  let result = [...db.videos];
  const search = String(query.title || query.search || query.q || '').trim().toLowerCase();
  if (search) result = result.filter(v => v.title.toLowerCase().includes(search));
  const categoryId = query.category_id || query.categoryId;
  if (categoryId) result = result.filter(v => v.category_id === String(categoryId));
  const sort = String(query.sort || query.sortBy || query.sort_by || '').toLowerCase();
  const order = String(query.order || 'desc').toLowerCase();
  if (['views', 'view', 'most-viewed', 'most_viewed'].includes(sort)) {
    result.sort((a, b) => order === 'asc' ? viewNumber(a) - viewNumber(b) : viewNumber(b) - viewNumber(a));
  } else if (sort === 'title') {
    result.sort((a, b) => order === 'desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
  }
  return result;
}

app.get('/', (req, res) => res.json(success('PH-Tube Mock API v2 is running', { baseUrl: BASE })));
app.get(`${BASE}/categories`, (req, res) => res.json(success('successfully fetched categories', db.categories)));
app.get(`${BASE}/videos`, (req, res) => res.json(success('successfully fetched videos', getVideos(req.query))));
app.get(`${BASE}/category/:categoryId`, (req, res) => {
  const id = String(req.params.categoryId);
  if (!db.categories.some(c => c.category_id === id)) return res.status(404).json(error('Category not found'));
  return res.json(success('successfully fetched category videos', db.videos.filter(v => v.category_id === id)));
});
app.get(`${BASE}/video/:videoId`, (req, res) => {
  const video = db.videos.find(v => v.video_id === req.params.videoId);
  if (!video) return res.status(404).json(error('Video not found'));
  return res.json(success('successfully fetched video details', video));
});
app.use((req, res) => res.status(404).json(error(`Route not found: ${req.method} ${req.originalUrl}`)));
app.listen(PORT, "127.0.0.1", () => {
    console.log(`PH-Tube Mock API v2 running at http://localhost:${PORT}${BASE}`);
});
