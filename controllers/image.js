 const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '236cbec626424396b619acea8905eeac'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, User) => {
    const { id } = req.body;
   User.findByIdAndUpdate(id, { $inc: { 'entries': 1 } })
        .then(user => {
           return res.json(user.entries);
           
       })
       .catch(err => {
           res.status(400).json('Error getting entries');
           console.log(err);
       })
    }

    module.exports = {
        handleImage: handleImage,
        handleApiCall: handleApiCall
    };