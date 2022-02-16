const Clarifai = require ('clarifai');


const app = new Clarifai.App({
    apiKey: '07357f32c88d40a99ff41de7d61f3f88'
   });
  const handleApiCall = (req,res)=>{
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }
const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to count entries'))
}
module.exports = {
    handleImage,
    handleApiCall
  }