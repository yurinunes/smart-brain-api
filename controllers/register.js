const handleRegister = (req, res, Login, User, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
		Login.create({
			hash: hash,
			email: email
		})
		.then(loginEmail => {
			User.create({
				email: loginEmail.email,
				name: name, 
			})
			.then(user => {
				return res.json(user); 
			})
		})
		.catch(err => {
            res.status(400).json("Unable to register");
        });
    }

    module.exports = {
        handleRegister: handleRegister
    };