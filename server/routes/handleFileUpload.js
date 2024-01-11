import scanIpList from "./scanIpList.js";
import saveReport from "./saveReport.js";

const handleFileUpload = async (req, res) => {
  const ipAddresses = req.body.ips;
  console.log("Received IP Addresses:", ipAddresses);
  let ipData = await scanIpList(ipAddresses);

  saveReport(ipData);

  res.send({
    message: "IP Addresses processed successfully.",
    data: ipData,
  });
};

export default handleFileUpload;
