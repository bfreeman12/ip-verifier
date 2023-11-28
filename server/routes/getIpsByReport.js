import postgreSQLClient from "../postgres.js";

const getIpsByReport = async (req, res) => {
  const client = await postgreSQLClient.connect();
  const { reportuid } = req.query;

  try {
    const query = `
    SELECT *
    FROM ips
    WHERE reportuid = $1
    ORDER BY ip ASC;
  `;

    const { rows } = await client.query(query, [reportuid]);

    client.release();
    res.json(rows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
    client.release();
  }
};

export default getIpsByReport;
