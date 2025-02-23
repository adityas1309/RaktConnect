import { Router } from "express";
import BloodRequest from "../models/bloodRequest.js";
import Hospital from "../models/hospital.js"

const hospitalRouter = Router()

import jwt from "jsonwebtoken"

const hospitalAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find hospital with matching ID and token
    const hospital = await Hospital.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!hospital) {
      throw new Error('Hospital not found');
    }

    // Attach hospital and token to request
    req.hospital = hospital;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      message: 'Please authenticate as a hospital'
    });
  }
};

hospitalRouter.get('/', hospitalAuth, async (req, res) => {
    try {
      const requests = await BloodRequest.find({ 
        hospitalId: req.hospital._id,
        status: 'active'
      });
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  hospitalRouter.put('/:id/status', hospitalAuth, async (req, res) => {
    try {
      const request = await BloodRequest.findOneAndUpdate(
        { _id: req.params.id, hospitalId: req.hospital._id },
        { status: req.body.status },
        { new: true }
      );
  
      if (!request) return res.status(404).json({ message: 'Request not found' });
      
      res.json(request);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

export default hospitalRouter