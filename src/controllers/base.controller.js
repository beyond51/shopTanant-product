const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

class baseController {
  constructor(service) {
    this.service = service;
  }
  getAll = AsyncHandler(async (req, res) => {
    const data = await this.service.getAll(req.tenantId, req.query);
    res.status(200).json({ success: true, results: data.length, data });
  });
  getOne = AsyncHandler(async (req, res) => {
    const data = await this.service.getOne(req.params.id, req.tenantId);
    res.status(200).json({ success: true, data });
  });
  create = AsyncHandler(async (req, res) => {
    const data = await this.service.create({
      ...req.body,
      tenantId: req.tenantId,
    });
    res.status(201).json({ success: true,message:"record created", data });
  });
  update = AsyncHandler(async (req, res) => {
    const data = await this.service.update(
      req.params.id,
      req.tenantId,
      req.body,
    );
    res.status(200).json({ success: true, data });
  });
  delete = AsyncHandler(async (req, res) => {
    await this.service.delete(req.params.id, req.tenantId);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  });
  search = (searchableFields = [], filterableFields = []) => {
    return AsyncHandler(async (req, res) => {
      const result = await this.service.search(
        req.tenantId,
        req.query,
        searchableFields,
        { filterableFields },
      );
      res.status(200).json({ success: true, ...result });
    });
  };
}
module.exports = baseController;
