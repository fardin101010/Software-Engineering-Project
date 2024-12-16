const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://job-flnder.web.app',
        'https://job-flnder.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB URI from environment
const uri = process.env.MONGO_URI;

// Create MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middlewares
const logger = (req, res, next) => {
    console.log('Log:', req.method, req.url);
    next();
};

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    });
};

async function run() {
    try {
        await client.connect();
        const JobsCollection = client.db('jobmanagedb').collection('jobInformation');
        const bookingsCollection = client.db('jobmanagedb').collection('bookings');
        const userCollection = client.db('jobmanagedb').collection('users');

        // JWT Auth Route
        app.post('/jwt', logger, async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none'
            }).send({ success: true });
        });

        app.post('/logout', async (req, res) => {
            const user = req.body;
            console.log('logging out', user);
            res.clearCookie('token', { maxAge: 0 }).send({ success: true })
        });

        // Users-related APIs
        app.get('/users', verifyToken, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'User already exists', insertedId: null });
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.delete('/users/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // Job-related APIs
        app.post('/jobs', async (req, res) => {
            const newJobs = req.body;
            const result = await JobsCollection.insertOne(newJobs);
            res.send(result);
        });

        app.get('/jobs', async (req, res) => {
            const category = req.query.category;
            const query = category ? { category } : {};
            const result = await JobsCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/JobByEmail', async (req, res) => {
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email };
            }
            const result = await JobsCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/JobByEmail/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await JobsCollection.findOne(query);
            res.send(result);
        });

        app.put('/JobByEmail/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedJob = req.body;
            console.log('updated job ', updatedJob);
            const jobUpdate = {
                $set: {
                    title: updatedJob.title,
                    dateline: updatedJob.dateline,
                    company: updatedJob.company,
                    posting: updatedJob.posting,
                    minPrice: updatedJob.minPrice,
                    maximum: updatedJob.maximum,
                    description: updatedJob.description,
                    short: updatedJob.short,
                    category: updatedJob.category
                }
            };
            console.log(jobUpdate);
            const result = await JobsCollection.updateOne(filter, jobUpdate, options);
            res.send(result);
        });

        app.delete('/JobByEmail/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await JobsCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/Jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = {
                projection: {
                    title: 1, maximum: 1, minPrice: 1, email: 1, description: 1, dateline: 1
                },
            };
            const result = await JobsCollection.findOne(query, options);
            res.send(result);
        });

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/bookings', logger, async (req, res) => {
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email };
            }
            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/BidRequest', async (req, res) => {
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email };
            }
            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        });

        // Update your Express server to handle the accept and reject actions.
        app.put('/bookings/:id/accept', async (req, res) => {
            const id = req.params.id;
            try {
                const query = { _id: new ObjectId(id) };
                const booking = await bookingsCollection.findOne(query);

                if (!booking) {
                    return res.status(404).json({ message: "Booking not found" });
                }

                // Update the booking status to 'Accepted'.
                const result = await bookingsCollection.updateOne(query, { $set: { Status: "Accepted" } });
                if (result.modifiedCount === 1) {
                    return res.json({ message: "Accepted" });
                } else {
                    return res.status(500).json({ message: "Failed to update booking" });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }
        });

        app.put('/bookings/:id/reject', async (req, res) => {
            const id = req.params.id;
            try {
                const query = { _id: new ObjectId(id) };
                const booking = await bookingsCollection.findOne(query);

                if (!booking) {
                    return res.status(404).json({ message: "Booking not found" });
                }

                // Update the booking status to 'Cancel'.
                const result = await bookingsCollection.updateOne(query, { $set: { Status: "Cancel" } });
                if (result.modifiedCount === 1) {
                    return res.json({ message: "Rejected" });
                } else {
                    return res.status(500).json({ message: "Failed to update booking" });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error(error);
    }
}

run().catch(console.dir);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Chakri Bakri server is running');
});

app.listen(port, () => {
    console.log(`Chakri Bakri server is running on port ${port}`);
});
