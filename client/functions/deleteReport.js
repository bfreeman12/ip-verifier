import axios from "axios";

export default async function deleteReport(reportId) {
  if (confirm("Are you sure you would like to delete this report?")) {
    return axios
      .post(`http://${ip_address}:${client_port}/deleteReport`, {
        uid: reportId,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  } else {
    return;
  }
}
