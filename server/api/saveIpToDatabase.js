import postgreSQLClient from "../postgres.js";
import { v4 as uuidv4 } from "uuid";

const saveIpToDatabase = async (scannedIp, reportUID) => {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
    INSERT INTO ips
       (uid,
        reportUID,
        dateofscan,
        expirationdate,
        ip,
        blacklists,
        information,
        anonymity,
        risk_score
        ) 
      values($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING uid;
    `;

    const { rows } = await client.query(query, [
      uuidv4(),
      reportUID,
      scannedIp.dateofscan,
      scannedIp.expirationdate,
      scannedIp.ip,
      scannedIp.blacklists,
      scannedIp.information,
      scannedIp.anonymity,
      scannedIp.risk_score,
    ]);
    client.release();
    return rows[0];
    // }
  } catch (error) {
    console.log(error);
    client.release();
  }
};

export default saveIpToDatabase;
