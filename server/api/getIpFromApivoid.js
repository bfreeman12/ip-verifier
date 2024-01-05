import axios from "axios";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});

export default function getIpFromApivoid(ip, apikey) {
  console.log("working on ", ip);
  return limiter.schedule(() =>
    axios
      .get(
        "https://endpoint.apivoid.com/iprep/v1/pay-as-you-go/?key=" +
          apikey +
          "&ip=" +
          ip
      )
      // .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        return data.data;
      })
  );
}
