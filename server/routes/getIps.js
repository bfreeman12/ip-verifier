import postgreSQLClient from "../postgres.js";

async function getIps() {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
    SELECT *
    FROM ips
  `;

    const { rows } = await client.query(query);
    console.log(rows);
    client.release();
  } catch (error) {
    console.log(error);
    client.release();
  }
}

export default getIps;

await getIps();
