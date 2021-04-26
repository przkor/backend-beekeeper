const user = require("../database/user");

exports.signInUser = (req, res, next) => {
  try {
    const login = 'wiesiek' //req.query.login;
    const password = 'w' //req.query.password;
    user.validateSignIn(login, password, function (result) {
      if (result) {
        req.session.username = login;
        res.send("success");
      } else {
        res.send("failure");
      }
    });
    /*
    const { login, password } = request.body;
    const user = usersData.find(u => u.login === login);
    if (!user) {
      response.status(404).json({
        message: 'Użytkownik o podanym loginie nie istnieje',
      });
  
      return;
    }

    const isPasswordCorrect = user.password === password;
    if (!isPasswordCorrect) {
      response.status(401).json({
        message: 'Hasło lub login się nie zgadza',
      });

      return;
    }

    response.status(200).json({
      user,
    });
    */
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /users/signin',
    });
  }
};


exports.signUpUser = (req, res, next) => {
  try {
      let login = req.body.login;
      let name = req.body.name;
      let email = req.body.email;
      let password = req.body.password;
      if (login && name && email && password) {
        user.signup(login, name, email, password, function (result) {
          if (result) {
            res.send("success");
          } else {
            res.send("failure");
          }
        });
      } 
      else {
        res.send("Failure");
      }

    /*
    const { login, courseId } = request.body;

    const course = coursesData.find(course => course.id === courseId);
    const user = usersData.find(user => user.login === login);

    if (!course) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym Id',
      });

      return;
    } else if (!user) {
      response.status(404).json({
        message: 'Nie znaleziono uzytkownika o podanym loginie',
      });

      return;
    }

    const hasUserCourseAlready = user.courses.some(id => id === courseId);
    if (hasUserCourseAlready) {
      response.status(200).json({
        user,
      });

      return;
    }

    const hasUserEnoughtMoney = user.budget - course.price >= 0;
    if (!hasUserEnoughtMoney) {
      response.status(403).json({
        message: 'Uzytkownik nie posiada wystarczających funduszy',
      });

      return;
    }

    user.budget = Number((user.budget - course.price).toFixed(2));
    user.courses.push(courseId);
    response.status(202).json({
      user,
    });
    */
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Błąd! Coś poszło nie tak, przy metodzie post w endpointcie /users/signup',
    });
  }
};