const handleSignin = (req, res, Login, User, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
		return res.status(400).json('incorrect form submission')
	}
        Login.findOne({email})
        .then(data => {
            const isValid = bcrypt.compareSync(password, data.hash);
            if(isValid) {
                return	User.findOne({email})
                .then(user => {
                    res.json(user)
                })	
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('Wrong Credentials');
            }
        })
        .catch(err => {
            res.status(400).json('wrong credentials')
        });
}

module.exports = {
    handleSignin: handleSignin
};