import postgreSQLClient from "../postgres.js";

const saveReportToDatabase = async (report) => {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
      INSERT INTO reports
         (uid,
          dateofreport,
          reportname,
          expirationdate,
          highestlevelofthreat,
          noofipsscanned,
          scannedips
          ) 
        values($1,$2,$3,$4,$5,$6,$7)
      RETURNING uid;
      `;

    const { rows } = await client.query(query, [
      report.uid,
      report.dateOfReport,
      report.reportName,
      report.expirationDate,
      report.highestLevelOfThreat,
      report.noOfIpsScanned,
      report.scannedIps,
    ]);
    client.release();
    return rows[0];
    // }
  } catch (error) {
    console.log(error);
    client.release();
  }
};

export default saveReportToDatabase;
