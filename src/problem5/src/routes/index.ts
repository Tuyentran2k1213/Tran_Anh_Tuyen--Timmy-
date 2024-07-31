import { Express } from "express";
import resourceRouter from "./resources";

function router(app: Express) {
  app.use("/api/v1", resourceRouter);
}

export default router;
