import axios from "axios";

export default async function deleteReport(reportId) {
  if (confirm("Are you sure you would like to delete this report?")) {
    return axios
      .post("http://172.16.220.218:3200/deleteReport", {
        uid: reportId,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  } else {
    return;
  }
}
