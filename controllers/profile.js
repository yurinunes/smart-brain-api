const handleProfile = (req, res, User) => {
	const { id } = req.params;
		User.findById(id)
		.then(user => {
			if(user.length) {
			 res.json(user);
			} else {
				res.status(400).json('not found');	
			}	
		})
		.catch(err => {
			res.status(400).json('error getting user');
        })
    }

    module.exports = {
        handleProfile: handleProfile
    };