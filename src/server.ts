import app from './app';
import { APP_PORT } from "./utilities/secrets";

app
  .listen(APP_PORT, () => {
    console.log(`server running on port : ${APP_PORT}`);
  })
  .on('error', (e) => console.error(e));