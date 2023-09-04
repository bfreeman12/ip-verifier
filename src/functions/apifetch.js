import axios from "axios";

const postUrl = `http://10.0.0.248:8420/api/`;
const endpoint = [
    "post-ip",
];

async function postIpAddresses(e) {
    console.log(e)
    const file = e;
    const response = await axios
        .post(postUrl + endpoint[0], e)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log('error');
        });
}


export { postIpAddresses };