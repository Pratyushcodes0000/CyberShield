const express = require('express');
const connectDB = require('./config/db')
const http = require('http');
const LoginRoutes = require('./Routes/LoginRoute')
const EmailScanRoutes = require('./Routes/EmailScanRoutes');
const cors = require('cors');

const app = express();
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api',LoginRoutes);
app.use('/api',EmailScanRoutes);

//create http server
const server = http.createServer(app);
const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});