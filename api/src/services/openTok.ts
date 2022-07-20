import dotenv from 'dotenv';
import OpenTok from 'opentok';

dotenv.config();

const opentok = new OpenTok(
  process.env.VONAGE_API_KEY,
  process.env.VONAGE_SECRET,
);

export default opentok;
