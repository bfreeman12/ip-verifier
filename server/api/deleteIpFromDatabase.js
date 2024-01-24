import postgreSQLClient from "../postgres.js";

const deleteIpFromDatabase = async (uid) => {
  const client = await postgreSQLClient.connect();

  console.log("ip being deleted");

  try {
    const query = `
    DELETE FROM ips
    WHERE uid = $1
  `;

    const { rows } = await client.query(query, [uid]);

    client.release();
  } catch (error) {
    client.release();
  }
};

export default deleteIpFromDatabase;
