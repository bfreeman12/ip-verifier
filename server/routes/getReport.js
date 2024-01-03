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

    client.release();
    res.json(rows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
    client.release();
  }
}

export default getReport;
