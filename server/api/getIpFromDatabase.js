import postgreSQLClient from "../postgres.js";

const getIpFromDatabase = async (ip) => {
  const client = await postgreSQLClient.connect();

  try {
    const query = `
    SELECT *
    FROM ips
    WHERE ip = $1
  `;

    const { rows } = await client.query(query, [ip]);

    client.release();
    return rows;
  } catch (error) {
    console.log(error);
    client.release();
  }
};

export default getIpFromDatabase;
