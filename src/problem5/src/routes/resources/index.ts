import express from "express";
import resourceController from "../../controllers/resource.controller";
const resourceRouter = express.Router();

resourceRouter.get("/resource", resourceController.getAllResources);

resourceRouter.get("/resource/:id", resourceController.getResource);

resourceRouter.post("/resource", resourceController.createResource);

resourceRouter.put("/resource/:id", resourceController.updateResource);

resourceRouter.delete("/resource/:id", resourceController.deleteResource);

export default resourceRouter;
