const jwt = require('jsonwebtoken');
const User = require('../models/userShcema');

async function authenticate(req, res, next) {
	try {
		let token = req.headers.cookie;

		if (!token) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		token = token.split('=')[1];


		const decoded = jwt.verify(token, process.env.JWT_KEY);

        

		const user = await User.findById(decoded._id);

		if (!user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

        const { _id, name, email, phone, work } = user

		req.user = { _id, name, email, phone, work }
        
		next();
	} catch (e) {
		return res.status(400).json({ message: 'Invalid token' });
	}
}

module.exports = authenticate;