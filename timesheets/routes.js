import admin from "firebase-admin"
import serviceAccount from '../firebase-admin-service-account.json' assert { type: "json" };

function TimesheetRoutes(app) {

    // init

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    let db = admin.firestore();
    let dbUsers = db.collection('timesheets')

    // routes
    app.post('/data', async (req, res) => {
        await dbUsers.add({
            userId: req.body.userId,
            rate: req.body.rate,
            lineItems: req.body.lineItems,
        });
        res.json({
            userId: req.body.userId,
            rate: req.body.rate,
            lineItems: req.body.lineItems,
        });
    })


}

export default TimesheetRoutes;