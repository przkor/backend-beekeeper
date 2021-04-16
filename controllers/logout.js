
exports.logout = (req, res, next) => {
  try {
    const session = req.session
    session.destroy(function (err) {
        if (err) {
          console.log("Błąd przy wylogowaniu" + err);
          res.send(false);
        } else {
          res.send(true);
        }
      });
    }
  catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd! Coś poszło nie tak, przy metodzie GET w endpointcie /logout',
    });
    console.log(error)
  }
};

