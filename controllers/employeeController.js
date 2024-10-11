const Employee = require('../models/employee');
const { validationResult } = require('express-validator');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });

        await newEmployee.save();
        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: newEmployee._id,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;

    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    try {
        const employee = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.query;

    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
};
