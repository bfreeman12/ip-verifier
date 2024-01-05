import getIpFromApivoid from "../api/getIpFromApivoid.js";
import getIpFromDatabase from "../api/getIpFromDatabase.js";

export default async function scanIpList(iplist) {
  let apikey = process.env.API_KEY;
  let scannedIpList = [];
  for (const ip of iplist) {
    let queriedIp = await getIpFromDatabase(ip);
    if (queriedIp.length == 0) {
      const apiVoidIp = await getIpFromApivoid(ip, apikey);
      scannedIpList.push(apiVoidIp);
    } else {
      scannedIpList.push(queriedIp);
    }
  }
  return scannedIpList;
}

// console.log(await scanIpList(["69.69.69.69"]));
