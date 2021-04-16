const {checkIsLogged} = require('./checkIsLogged')
const quens = require("../database/quens");

module.exports = {

getQuens: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {
    quens.getQuens(username, function (result) {
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie GET w endpointcie /quens',
    });
  }
},

addQuen: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {
    const data = req.body.data
    quens.addQuen(username, data, 
      function (result) {
      res.send(result);
    });  
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie POST w endpointcie /quens',
    });
  }
},

deleteQuen: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try { 
    const id= req.query.id
    quens.deleteQuen(username, id, 
      function (result) {
      res.send(result);
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie DELETE w endpointcie /quens',
    });
  }
},

}