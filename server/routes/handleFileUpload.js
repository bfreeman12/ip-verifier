import scanIpList from "./scanIpList.js";
import saveReport from "./saveReport.js";

const handleFileUpload = async (req, res) => {
  const ipAddresses = req.body.ips;
  console.log("Received IP Addresses:", ipAddresses);

  saveReport(await scanIpList(ipAddresses));

  res.send("IP Addresses processed successfully.");
};

export default handleFileUpload;
