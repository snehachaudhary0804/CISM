const Domain = require("../models/Domain");
exports.createDomain = async (req, res) => {
  try {
    const { domainName } = req.body;

    if (!domainName) {
      return res.status(400).json({
        success: false,
        message: "Domain name is required.",
      });
    }

    const existingDomain = await Domain.findOne({ domainName });

    if (existingDomain) {
      return res.status(400).json({
        success: false,
        message: "Domain already exists.",
      });
    }

    const domain = await Domain.create({
      domainName,
    });

    return res.status(201).json({
      success: true,
      message: "Domain created successfully.",
      data: domain,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getAllDomains = async (req, res) => {
  try {

    const domains = await Domain.find().sort({ domainName: 1 });

    return res.status(200).json({
      success: true,
      count: domains.length,
      data: domains,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getDomainById = async (req, res) => {
  try {

    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: "Domain not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: domain,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.updateDomain = async (req, res) => {
  try {

    const { domainName } = req.body;

    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: "Domain not found.",
      });
    }

    if (domainName) {
      const existingDomain = await Domain.findOne({
        domainName,
        _id: { $ne: req.params.id },
      });

      if (existingDomain) {
        return res.status(400).json({
          success: false,
          message: "Domain already exists.",
        });
      }

      domain.domainName = domainName;
    }

    await domain.save();

    return res.status(200).json({
      success: true,
      message: "Domain updated successfully.",
      data: domain,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.deleteDomain = async (req, res) => {
  try {

    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: "Domain not found.",
      });
    }

    await domain.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Domain deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};