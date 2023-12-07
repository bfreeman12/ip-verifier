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

    // console.log(rows);
    client.release();
    return rows;
  } catch (error) {
    console.log(error);
    client.release();
  }
};

// console.log(await getIp("8.8.8.8"));

export default getIpFromDatabase;
