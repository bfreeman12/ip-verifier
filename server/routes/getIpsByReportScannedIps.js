import postgreSQLClient from "../postgres.js";

// function parseIpString(ipString) {
//   // Remove the curly braces and split the string by comma
//   return ipString.replace(/{|}/g, "").replace(/"|"/g, "").split(",");
// }

const getIpsByReportScannedIps = async (req, res) => {
  const client = await postgreSQLClient.connect();
  const { reportuid } = req.query;

  try {
    const query = `
    SELECT scannedips
    FROM reports
    WHERE uid = $1
    ORDER BY scannedips ASC;
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

export default getIpsByReportScannedIps;
