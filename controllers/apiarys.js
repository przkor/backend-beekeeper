const {checkIsLogged} = require('./checkIsLogged')
const apiarys = require("../database/apiarys");

module.exports = {

getApiarys: function (req, res, next) {
  const username = req.session.username;
  //let apiaryID= req.query.apiaryID
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
 // if (apiaryID===null || apiaryID===undefined) {apiaryID=''}
  try {
    apiarys.getApiarys(username, function (result) {
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie GET w endpointcie /apiarys',
    });
  }
},

addApiary: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {
    const data = req.body.data;
    apiarys.addApiary(username, data, 
      function (result) {
        res.status(200).send(result);
      })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie POST w endpointcie /apiarys',
    });
  }
},

updateApiary: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {
    const data = req.body.data;
    apiarys.updateApiary(username, data, 
      function (result) {
        res.status(200).send(result);
      })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie PUT w endpointcie /apiarys',
    });
  }
},

deleteApiary: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {
    const id = req.query.id;
    apiarys.deleteApiary(username, id, 
      function (result) {
        res.status(200).send(result);
      })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie DELETE w endpointcie /apiarys',
    });
  }
},




}