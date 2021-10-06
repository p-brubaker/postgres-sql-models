import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import campsiteRoutes from './controllers/campsites.js';
import recareaRoutes from './controllers/recareas.js';
import eventRoutes from './controllers/events.js';
import facilitiesRoutes from './controllers/facilities.js';
const app = express();

app.use(express.json());

app.use('/api/campsites', campsiteRoutes);
app.use('/api/recareas', recareaRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/facilities', facilitiesRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
