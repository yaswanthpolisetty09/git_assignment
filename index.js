const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const bigquery = new BigQuery();

app.use(cors());
app.use(bodyParser.json());

const datasetId = 'your_dataset';
const tableId = 'your_table';

app.post('/submit', async (req, res) => {
  const { name, age } = req.body;

  try {
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert([{ name, age }]);

    res.status(200).json({ message: 'Data inserted successfully!' });
  } catch (err) {
    console.error('BigQuery Insert Error:', err);
    res.status(500).json({ message: 'Error inserting data.' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
