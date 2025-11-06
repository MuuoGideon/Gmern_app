const express = require('express');
const goals = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/goals', goals);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
