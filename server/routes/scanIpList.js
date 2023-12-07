import getIpFromApivoid from "../api/getIpFromApivoid.js";
import getIpFromDatabase from "../api/getIpFromDatabase.js";

export default async function scanIpList(iplist) {
  let apikey = process.env.APIKEY;
  let scannedIpList = [];
  for (const ip of iplist) {
    let queriedIp = await getIpFromDatabase(ip);
    // console.log(queriedIp);
    if (queriedIp.length == 0) {
      const apiVoidIp = await getIpFromApivoid(ip, apikey);
      // console.log(apiVoidIp);
      scannedIpList.push(apiVoidIp);
    } else {
      scannedIpList.push(queriedIp);
    }
  }
  return scannedIpList;
}

// console.log(await scanIpList(["69.69.69.69"]));
