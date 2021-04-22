const {checkIsLogged} = require('./checkIsLogged')
const inspection = require("../database/inspection");

module.exports = {

    getInspection: function (req, res, next) {
    const username = req.session.username;
    const hiveID= req.query.hiveID
    if (!checkIsLogged(username)) {res.send('access denied') ;return}
    try {
        inspection.getInspection(username, hiveID, function (result) {
        res.status(200).send(result);
        })
    } catch (error) {
        res.status(500).json({
        error,
        message: 'Błąd ! Coś poszło nie tak, przy metodzie GET w endpointcie /inspection',
        });
    }
    },

    addInspection: function (req, res, next) {
        const username = req.session.username;
        if (!checkIsLogged(username)) {res.send('access denied') ;return}
        try {
          const data = req.body.data.inspection
          inspection.addInspection(username, data, 
            function (result) {
            res.send(result);
          });  
        } catch (error) {
          res.status(500).json({
            error,
            message: 'Błąd ! Coś poszło nie tak, przy metodzie POST w endpointcie /hives',
          });
        }
      },

}
