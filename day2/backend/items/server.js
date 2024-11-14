const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes')

dotenv.config();
const app = express();
		app.use(express.json());
        app.use(express.urlencoded());
		mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
			.then(() => console.log('Connected to MongoDB'))
			.catch((error) => console.error('MongoDB connection error:', error));
		app.use('/api/items', itemRoutes);
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});