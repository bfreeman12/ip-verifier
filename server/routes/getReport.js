import postgreSQLClient from "../postgres.js";

async function getReport(req, res) {
  const client = await postgreSQLClient.connect();
  const { uid } = req.query;

  try {
    const query = `
      SELECT *
      FROM reports
      WHERE uid = $1
    `;

    const { rows } = await client.query(query, [uid]); // Pass 'uid' as a parameter

    if (rows.length > 0) {
      res.json(rows[0]); // Send the first (and presumably only) row
    } else {
      res.status(404).send("Report not found");
    }
    client.release();
  } catch (error) {
    console.log(error);
    client.release();
  }
}

export default getReport;
