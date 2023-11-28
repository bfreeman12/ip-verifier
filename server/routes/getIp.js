import postgreSQLClient from "../postgres.js";

const getIp = async (req, res) => {
  const client = await postgreSQLClient.connect();
  const { ip } = req.query;

  try {
    const query = `
    SELECT *
    FROM ips
    WHERE ip = $1
  `;

    const { rows } = await client.query(query, [ip]);

    client.release();
    res.json(rows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
    client.release();
  }
};

export default getIp;
