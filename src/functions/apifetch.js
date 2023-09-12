import axios from "axios";

const postUrl = `http://172.16.220.110:8420/api/`;
const endpoint = ["post-ip"];

async function postIpAddresses(e) {
  const file = e;
  const response = await axios
    .post(postUrl + endpoint[0], e)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("error " + JSON.stringify(error.message));
    });
}

export { postIpAddresses };
