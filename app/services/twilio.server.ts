import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const phoneNumber = process.env.TWILIO_VIRTUAL_NUMBER as string;

export async function sendSMS(to: string, message: string) {
  const client = new twilio.Twilio(accountSid, authToken);

  await client.messages.create({
    body: message,
    from: phoneNumber,
    to,
  });
}
