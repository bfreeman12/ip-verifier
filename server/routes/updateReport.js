import updateReportInDatabase from "../api/updateReportInDatabase.js";

export default async function updateReport(req, res) {
  //reportUpdates supposed to be object containing desired changes.
  const reportUpdates = req.params.reportUpdates;
  const reportuid = req.body.params.uid;
  const reportname = req.body.params.reportName;
  //   console.log("req params", req.body.params);

  try {
    console.log("updateReport", reportuid, reportname);
    await updateReportInDatabase({
      uid: reportuid,
      reportName: reportname,
    });
  } catch (error) {
    console.log(error);
  }
}
