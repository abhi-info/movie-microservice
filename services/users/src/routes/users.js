const express = require('express');
const localAuth = require('../auth/local');
const authHelpers = require('../auth/_helpers');

const router = express.Router();

router.get('/ping', (req, res) => {
	res.send('pong');
});

router.post('/register', (req, res) => {
	const username = req.body.username;
	if (username || !req.body.name || !req.body.password || !req.body.company) {
		return res.status(500).json({
			status: 'error',
			message: "Please fill all the required fields",
		});
	}	
	return authHelpers.getUser(username)
		.then((user) => {
			if (user) { throw new Error('User already exists'); }
			return authHelpers.createUser(req, res)
				.then((user) => { return localAuth.encodeToken(user[0]); })
				.then((token) => {
					res.status(200).json({
						status: 'success',
						token,
					});
				})
				.catch(() => {
					res.status(500).json({
						status: 'error',
					});
				});
		})
		.catch((err) => {
			res.status(500).json({
				status: 'error',
				message: err.message,
			});
		});
});

router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || password) {
		return res.status(500).json({
			status: 'error',
			message: "Please fill all the required fields",
		});
	}
	console.log(username, password)
	return authHelpers.getUser(username)
		.then((response) => {
			if (!authHelpers.comparePass(password, response.password)) {
				throw new Error('Incorrect password');
			}
			return response;
		})
		.then((response) => { return localAuth.encodeToken(response); })
		.then((token) => {
			res.status(200).json({
				status: 'success',
				token,
			});
		})
		.catch((err) => {
			console.error(err)
			res.status(500).json({
				status: 'error',
				message: err,
			});
		});
});

router.get('/user', authHelpers.ensureAuthenticated, (req, res) => {
	res.status(200).json({
		status: 'success',
		user: req.user,
	});
});

module.exports = router;
