const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register User
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'fail', errors: errors.array() });
    }

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Please provide all required fields: name, email, password, and role.' 
            });
        }

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ status: 'fail', message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const normalizedRole = role.toLowerCase();
        user = await User.create({ name, email, password: hashedPassword, role: normalizedRole });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ status: 'success', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'fail', errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ status: 'success', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};