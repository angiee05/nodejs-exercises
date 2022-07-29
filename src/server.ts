import "dotenv/config";

import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server Is Running At http:/localhost:${port}`);
});
