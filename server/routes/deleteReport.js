import postgreSQLClient from "../postgres.js";

const deleteReport = async (req, res) => {
  const client = await postgreSQLClient.connect();
  const { uid } = req.body;

  try {
    const query = `
    DELETE FROM reports
    WHERE uid = $1
  `;

    const { rows } = await client.query(query, [uid]);

    client.release();
    res.json(rows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
    client.release();
  }
};

export default deleteReport;
