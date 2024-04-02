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
        origin: function (origin, callback) {
            // callback to set origin dynamically. for supporting multiple endpoints
            if (!origin) return callback(null, true);
            // split env var into multiple endpoints and check each
            if (process.env.FRONTEND_URLS.split(" ").indexOf(origin) === -1) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.get('/testresponse', (req, res) => {
    res.send("hello");
});

TimesheetRoutes(app);
app.listen(process.env.PORT || 4000);