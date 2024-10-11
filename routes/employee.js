const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const { body, validationResult } = require('express-validator');

// Create Employee
router.post('/', [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('date_of_joining').isISO8601().toDate().withMessage('Valid date is required'),
    body('department').notEmpty().withMessage('Department is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const employee = new Employee({ ...req.body, created_at: new Date(), updated_at: new Date() });
    try {
        const savedEmployee = await employee.save();
        res.status(201).json({ message: "Employee created successfully.", employee_id: savedEmployee._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Employee by ID
router.get('/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Employee
router.put('/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json({ message: "Employee details updated successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Employee
router.delete('/', async (req, res) => {
    const { eid } = req.query;  // Ensure `eid` is extracted correctly
    if (!eid || eid.length !== 24) {  // Validate the ID length
        return res.status(400).json({ message: "Invalid Employee ID." });
    }
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(204).json({ message: "Employee deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

