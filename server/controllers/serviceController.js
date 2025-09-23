import asyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// @desc    Fetch single service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, packages } = req.body;

  const service = new Service({
    name,
    description,
    imageUrl,
    packages: packages || [], // Accept packages from the request body
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, packages } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = name || service.name;
    service.description = description || service.description;
    service.imageUrl = imageUrl || service.imageUrl;
    service.packages = packages || service.packages; // Update packages

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await service.deleteOne({ _id: service._id });
    res.json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});


export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};