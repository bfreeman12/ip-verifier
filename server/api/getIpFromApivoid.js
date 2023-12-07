import axios from "axios";

export default function getIpFromApivoid(ip, apikey) {
  return (
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
