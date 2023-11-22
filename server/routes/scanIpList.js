import getIpReputation from "../api/getIpReputation.js";

export default async function scanIpList(iplist) {
  let scannedIpList = [];
  for (const ip of iplist) {
    try {
      let scannedIp = await getIpReputation(ip, process.env.APIKEY);
      scannedIpList.push(scannedIp);
    } catch (error) {
      console.error(error);
    }
  }
  return scannedIpList;
}
