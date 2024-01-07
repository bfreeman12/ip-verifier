import axios from "axios";

export default async function getRemainingCreditsFromApivoid() {
  let apikey = process.env.API_KEY;
  return (
    axios
      .get(
        `https://endpoint.apivoid.com/iprep/v1/pay-as-you-go/?key=${apikey}&stats=`
      )
      // .then((response) => {
      //   console.log(response);
      //   response.json();
      // })
      .then((data) => {
        // console.log(data.data);
        return data.data;
      })
  );
}

// console.log(await getRemainingCreditsFromApivoid());
