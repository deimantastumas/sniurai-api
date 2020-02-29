import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { failure, success } from "./libs/response-lib";

export async function main(event, context) {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Šniūrai charge";

    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

    try {
        await stripe.charges.create({
            source,
            amount,
            description,
            currency: "usd"
        });
        return success({ status: true });
    } catch (e) {
        return failure({ message: e.message });
    }
}