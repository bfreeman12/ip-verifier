import postgreSQLClient from "../postgres.js";

async function getIps(req, res) {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
    SELECT *
    FROM ips
  `;

    const { rows } = await client.query(query);

    res.json(rows);
    client.release();
  } catch (error) {
    console.log(error);
    client.release();
  }
}

export default getIps;
