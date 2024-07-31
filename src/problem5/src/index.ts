import express, { Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { enviroments } from "./configs/enviroments.config";
import { errorHandle } from "./middlewares/errorhandle.middleware";
import router from "./routes";
import Database from "./services/database";

// Initialize the database connection
Database.getInstance();

const app = express();
const port = enviroments.PORT;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(errorHandle);

app.get("/", (_, res: Response) => {
  res.json({ message: "Hello word !!!" });
});

router(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
