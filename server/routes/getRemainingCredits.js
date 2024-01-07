import getRemainingCreditsFromApivoid from "../api/getRemainingCreditsFromApivoid.js";

async function getRemainingCredits(req, res) {
  try {
    const remainingCredits = await getRemainingCreditsFromApivoid();
    res.json(remainingCredits);
  } catch (error) {
    console.log(error);
  }
}

export default getRemainingCredits;
