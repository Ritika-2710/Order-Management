import 'dotenv/config';
import app from './app.js';

const PORT = Number(process.env.PORT) || 3002;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});