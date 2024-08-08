import dotenv from 'dotenv';

dotenv.config();
const mainConfig = {
   port: process.env.PORT || 5000,
   jwtSecret: process.env.JWT_SECRET || 'JSON_WEB_TOKEN',
   WEB_LINK: process.env.WEB_LINK,
}

export default mainConfig;