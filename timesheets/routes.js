import admin from "firebase-admin"
import serviceAccount from '../firebase-admin-service-account.json' assert { type: "json" };

function TimesheetRoutes(app) {

    // init
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    let db = admin.firestore();
    let dbUsers = db.collection('timesheets');

    // add timesheet
    const createTimesheet = async (req, res) => {
        const newTimesheetDoc = dbUsers.doc();
        await newTimesheetDoc.set({
            userId: req.body.userId,
            rate: req.body.rate,
            lineItems: req.body.lineItems,
            id: newTimesheetDoc.id
        });
        // return id
        res.json(newTimesheetDoc.id);
    }

    // update timesheet by id
    // request body should be a JSON object of the timesheet
    const updateTimesheet = async (req, res) => {
        const newTimesheetDoc = dbUsers.doc(req.body.id);
        await newTimesheetDoc.update(req.body);
        // return id
        res.json(newTimesheetDoc.id);
    }

    // delete timesheet by id
    // request body should be a JSON object with 1 field:
    // @timesheetId: firebase id of the timesheet to be updated
    const deleteTimesheet = async (req, res) => {
        const newTimesheetDoc = dbUsers.doc(req.body.id);
        await newTimesheetDoc.delete();
        // return id
        res.json(newTimesheetDoc.id);
    }

    // find all timesheets
    const findAllTimesheets = async (req, res) => {
        const snapshot = await dbUsers.get();
        const docs = snapshot.docs.map(doc => doc.data());
        res.json(docs);
    }

    // find timesheet by id
    const findTimesheetById = async (req, res) => {
        const newTimesheetDoc = dbUsers.doc(req.params.timesheetId);
        const doc = await newTimesheetDoc.get();
        if (!doc.exists) {
            res.sendStatus(404);
        } else {
            res.json(doc.data());
        }
    }

    // routes
    app.post('/api/timesheets', createTimesheet);
    app.put('/api/timesheets', updateTimesheet);
    app.delete('/api/timesheets', deleteTimesheet);
    app.get('/api/timesheets/:timesheetId', findTimesheetById);
    app.get('/api/timesheets', findAllTimesheets);


    // TODO: find timesheets by user, optional
}

export default TimesheetRoutes;

// TODO: validate requests for required fields