import express from 'express';
import cors from "cors";
import TimesheetRoutes from './timesheets/routes.js';
import "dotenv/config";

// express
const app = express()
app.use(express.json());
app.use(
    cors({
        credentials: true, // support cookies
        origin: process.env.FRONTEND_URL
    })
);

app.get('/testresponse', (req, res) => {
    res.send("hello");
});

TimesheetRoutes(app);
app.listen(process.env.PORT || 4000);