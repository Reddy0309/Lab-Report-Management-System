//server.js code
import express from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(express.json());
// Enable CORS for all routes
app.use(cors());


const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'teju 222',
    database: 'teju'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM login WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
        return res.status(200).json({ success: true, message: 'Login successful' });
    });
});

// Endpoint to handle registration
app.post('/api/register', (req, res) => {
    const { name, phoneNumber, address, age, sex, doctorInCharge, testToBePerformed, appointmentDate, appointmentTime } = req.body;
    const sql = 'INSERT INTO register (name, phone_number, address, age, sex, doctor_in_charge, test_to_be_performed, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, phoneNumber, address, age, sex, doctorInCharge, testToBePerformed, appointmentDate, appointmentTime], (err, result) => {
      if (err) {
        console.error('Error inserting into register table:', err);
        return res.status(500).json({ success: false, error: 'Error inserting data into database' });
      }
      console.log('Data inserted into register table:', result);
      return res.status(200).json({ success: true, message: 'Appointment registered successfully' });
    });
  });

// Endpoint to fetch doctors
app.post('/api/doctors', (req, res) => {
    const { password } = req.body; // Assuming the password is sent in the request body
    const sql = 'SELECT * FROM doctors WHERE password = ?';
    db.query(sql, [password], (err, result) => {
        if (err) {
            // Log SQL query execution error
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            // Log invalid password
            console.error('Invalid password:', password);
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }
        // Log successful retrieval of doctor information
        console.log('Doctor information retrieved:', result[0]);
        return res.status(200).json({ success: true, doctor: result[0] });
    });
});
app.get('/api/doctor/specs/:DOCID', (req, res) => {
    const { DOCID } = req.params;
    const sql = 'SELECT * FROM specs WHERE DOCID = ?';
    db.query(sql, [DOCID], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            console.error('No specializations found for DOCID:', DOCID);
            return res.status(404).json({ success: false, error: 'No specializations found' });
        }
        console.log('Specializations retrieved for DOCID', DOCID, ':', results);
        return res.status(200).json({ success: true, specializations: results });
    });
});

app.post('/api/patients/login', async (req, res) => {
    const { password } = req.body;
    const sql = 'SELECT * FROM patients WHERE PASSWORD = ?';
    db.query(sql, [password], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      if (result.length === 0) {
        console.error('Invalid password:', password);
        return res.status(401).json({ success: false, error: 'Invalid password' });
      }
      console.log('Patient information retrieved:', result[0]);
      return res.status(200).json({ success: true, patient: result[0] });
    });
  });

// Endpoint to fetch patient details based on password
app.post('/api/patients/details', async(req, res) => {
    const { password } = req.body;
    const sql = 'SELECT PID, PNAME, AGE, PHONE, EMAIL, SEX, DOCID FROM patients WHERE PASSWORD = ?';
    db.query(sql, [password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            console.error('No patient found for the provided password:', password);
            return res.status(404).json({ success: false, error: 'Patient not found' });
        }
        console.log('Patient details retrieved:', result[0]);
        return res.status(200).json({ success: true, patient: result[0] });
    });
});

// Endpoint to fetch patient reports based on password
app.post('/api/patients/:password/reports', async (req, res) => {
    try {
        const { password } = req.params;
        const sql = 'SELECT * FROM reports WHERE PID = (SELECT PID FROM patients WHERE PASSWORD = ?)';
        db.query(sql, [password], async (err, reportsResult) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
            if (reportsResult.length === 0) {
                console.error('No reports found for patient password:', password);
                return res.status(404).json({ success: false, error: 'No reports found' });
            }
            console.log('Reports retrieved for patient password:', password);

            // Extract all RESULT IDs from the reports
            const resultIDs = reportsResult.map(report => report.RESULTS);

            // Fetch additional information from the results table based on the extracted IDs
            const resultPromises = resultIDs.map(resultID => {
                return new Promise((resolve, reject) => {
                    const resultSql = 'SELECT * FROM results WHERE ID = ?';
                    db.query(resultSql, [resultID], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result[0]); // Resolve with the first result, assuming only one result per ID
                        }
                    });
                });
            });

            // Wait for all promises to resolve
            const additionalResultDetails = await Promise.all(resultPromises);

            // Combine report and result data
            const combinedData = reportsResult.map((report, index) => ({
                ...report,
                additionalResultDetails: additionalResultDetails[index]
            }));

            // Always return an array, even if there's only one report
            return res.status(200).json({ success: true, reports: combinedData });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

  
app.get('/api/patients/:PID', (req, res) => {
    const PID = req.params.PID;
    const sql = 'SELECT * FROM patients WHERE PID = ?';
    db.query(sql, [PID], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            console.error('Patient not found for ID:', PID);
            return res.status(404).json({ success: false, error: 'Patient not found' });
        }
        console.log('Patient details retrieved:', result[0]);
        return res.status(200).json({ success: true, patient: result[0] });
    });
});

 // Add this route definition in your server.js file

app.post('/api/result', (req, res) => {
    const { resultIds } = req.body;
    const sql = 'SELECT * FROM results WHERE ID IN (?)';
    db.query(sql, [resultIds], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            console.error('No additional result details found for the given IDs:', resultIds);
            return res.status(404).json({ success: false, error: 'No additional result details found' });
        }
        console.log('Additional result details retrieved:', results);
        return res.status(200).json({ success: true, results });
    });
});
app.get('/api/patients/:password/reports', async (req, res) => {
    try {
      const { password } = req.params;
      // Query your database to find the patient based on the password
      const patient = await Patient.findOne({ password });
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
      }
      // Assuming reports are stored in a separate collection/table
      const reports = await Report.find({ PID: patient.PID });
      return res.status(200).json({ success: true, reports });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
// server.js
app.get('/api/reports/:PID', async (req, res) => {
    const PID = req.params.PID;
    const sql = 'SELECT * FROM reports WHERE PID = ?';
    db.query(sql, [PID], async (err, reportsResult) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (reportsResult.length === 0) {
            console.error('No reports found for patient ID:', PID);
            return res.status(404).json({ success: false, error: 'No reports found' });
        }
        console.log('Reports retrieved for patient ID:', PID);
        
        try {
            // Extract all RESULT IDs from the reports
            const resultIDs = reportsResult.map(report => report.RESULTS);

            // Fetch additional information from the results table based on the extracted IDs
            const resultPromises = resultIDs.map(resultID => {
                return new Promise((resolve, reject) => {
                    const resultSql = 'SELECT * FROM results WHERE ID = ?';
                    db.query(resultSql, [resultID], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result[0]); // Resolve with the first result, assuming only one result per ID
                        }
                    });
                });
            });

            // Wait for all promises to resolve
            const additionalResultDetails = await Promise.all(resultPromises);

            // Combine report and result data
            const combinedData = reportsResult.map((report, index) => ({
                ...report,
                additionalResultDetails: additionalResultDetails[index]
            }));

            // Always return an array, even if there's only one report
            return res.status(200).json({ success: true, reports: combinedData });
        } catch (error) {
            console.error('Error fetching additional result details:', error);
            return res.status(500).json({ success: false, error: 'Error fetching additional result details' });
        }
    });
});

// Define the /api/technicians route to handle POST requests
app.post('/api/technicians', (req, res) => {
    const { password } = req.body;
    const sql = 'SELECT TID, TNAME, PHONE, EMAIL, TESTID FROM technicians WHERE PASSWORD = ?';
    db.query(sql, [password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            console.error('Technician not found for password:', password);
            return res.status(404).json({ success: false, error: 'Technician not found' });
        }
        console.log('Technician details retrieved for password:', password);
        return res.status(200).json({ success: true, technician: result[0] });
    });
});



// Route to handle POST request from frontend to add a report
app.post('/api/reports', async (req, res) => {
    const { RID, PID, TESTID, DOCID, NID, RESULTS, DATEREPORTED } = req.body;
    console.log('Received report data:', req); // Log received data
    const sql = 'INSERT INTO reports (RID, PID, TESTID, DOCID, NID, RESULTS, DATEREPORTED) VALUES (?, ?, ?, ?, ?, ?, ?)';
    console.log(sql); // Log SQL query
  
    try {
        // Execute the INSERT query using callbacks
        db.query(sql, [RID, PID, TESTID, DOCID, NID, RESULTS, DATEREPORTED], (err, result) => {
            if (err) {
                console.error('Error inserting report into database:', err); // Corrected variable name
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
            console.log('Report added successfully');
            return res.status(200).json({ success: true, message: 'Report added successfully' });
        });
    } catch (error) {
        console.error('Error inserting report into database:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Endpoint to update results
app.post('/api/results', async (req, res) => {
    const { ID, RBC, PCV, MCV, MCH, RDW, TLC, PLT_PER_MM3, HGB, gravity, ph, osmo, cond, urea, calc, O2SAT, Glucose, BloodPressure, SkinThickness, Insulin, BMI } = req.body;
    console.log('Received result data:', req);
    const sql = 'INSERT INTO results (ID, RBC, PCV, MCV, MCH, RDW, TLC, PLT_PER_MM3, HGB, gravity, ph, osmo, cond, urea, calc, O2SAT, Glucose, BloodPressure, SkinThickness, Insulin, BMI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(sql);
    try {
        // Execute the INSERT query
        db.query(sql, [ID, RBC, PCV, MCV, MCH, RDW, TLC, PLT_PER_MM3, HGB, gravity, ph, osmo, cond, urea, calc, O2SAT, Glucose, BloodPressure, SkinThickness, Insulin, BMI], (err, result) => {
             if (err) {
                 console.error('Error inserting results into database:', err);
                 return res.status(500).json({ success: false, error: 'Internal Server Error' });
             }
             console.log('Results added successfully');
             return res.status(200).json({ success: true, message: 'Results added successfully' });
         });
     } catch (error) {
         console.error('Error inserting result into database:', error);
         return res.status(500).json({ success: false, error: 'Internal Server Error' });
     }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:3000`);
});