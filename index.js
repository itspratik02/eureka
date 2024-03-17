const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'EJ_event',
  password: '99@#77',
  port: 5432, // Default PostgreSQL port
});

// Route to handle form submission
app.post('/upload', async (req, res) => {
  try {
    const {
      SelectEvent,
      'Select Event':deptname,
      topic,
      leadername,
      college,
      mobileno,
      email,
      numMembers,
      member2,
      member3,
      member4
    } = req.body;
    console.log(req.body);

    // Insert data into PostgreSQL database
    if(SelectEvent==="eureka"){

      var tablename = SelectEvent+"_"+deptname;
    const query = `
      INSERT INTO `+tablename+`(event_name, topic_name, group_leader_name, college_name, mobile_no, email, member2_name, member3_name)
      VALUES ($1,$2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [SelectEvent,topic,leadername, college, mobileno, email, member2, member3];
    await pool.query(query, values);
    }
    else{
      var tablename = SelectEvent+"_"+deptname;
    const query = `
      INSERT INTO `+tablename+`(event_name, group_leader_name, college_name, mobile_no, email, member2_name, member3_name,member4_name)
      VALUES ($1,$2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [SelectEvent,leadername, college, mobileno, email, member2, member3,member4];
    await pool.query(query, values);
    }
    res.status(200).send('Form data stored successfully');
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).send('An error occurred while processing the form');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
