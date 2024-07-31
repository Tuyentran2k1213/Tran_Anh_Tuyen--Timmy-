import { Request, Response } from "express";
import Resource, { IResource } from "../models/resource";
import { buildQueryOptions } from "../utils/filterQuery";

class ResourceController {
  async createResource(req: Request, res: Response) {
    try {
      const resource: IResource = new Resource(req.body);
      await resource.save();
      res.status(201).json(resource);
    } catch (err) {
      res.status(500).json({ error: "Forbiden" });
    }
  }

  async updateResource(req: Request, res: Response) {
    try {
      const resource: IResource | null = await Resource.findById(req.params.id);
      if (!resource)
        return res.status(404).json({ error: "Resource not found" });
      await resource.updateOne(req.body);
      res.status(200).json(resource);
    } catch (err) {
      res.status(500).json({ error: "Forbiden" });
    }
  }

  async getAllResources(req: Request, res: Response) {
    const { page, perPage, filter, sort } = buildQueryOptions(req);

    try {
      const resources: IResource[] = await Resource.find({ ...filter })
        .sort(sort)
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.status(200).json(resources);
    } catch (err) {
      res.status(500).json({ error: "Forbiden" });
    }
  }

  async getResource(req: Request, res: Response) {
    try {
      const resource: IResource | null = await Resource.findById(req.params.id);
      if (!resource)
        return res.status(404).json({ error: "Resource not found" });
      res.status(200).json(resource);
    } catch (err) {
      res.status(500).json({ error: "Forbiden" });
    }
  }

  async deleteResource(req: Request, res: Response) {
    try {
      const resource: IResource | null = await Resource.findById(req.params.id);
      if (!resource)
        return res.status(404).json({ error: "Resource not found" });
      await resource.deleteOne();
      res.status(204).json({ message: "Resource deleted" });
    } catch (err) {
      res.status(500).json({ error: "Forbiden" });
    }
  }
}

export default new ResourceController();
