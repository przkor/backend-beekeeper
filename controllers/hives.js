const {checkIsLogged} = require('./checkIsLogged')
const hives = require("../database/hives");

module.exports = {

  getFreeHiveNumber: function (req, res, next) {
    const username = req.session.username;
    if (!checkIsLogged(username)) {res.send('access denied') ;return}
    try {
      hives.getFreeHiveNumber(username, function (result) {
        res.send(result);
      });
    } catch (error) {
      response.status(500).json({
        error,
        message: 'Błąd ! Coś poszło nie tak, przy metodzie GET w endpointcie /hives/getFreeHiveNumber',
      });
    }
  },

  getHivesAmountInApiary: function (req, res, next) {
    const username = req.session.username;
    if (!checkIsLogged(username)) {res.send('access denied') ;return}
    try {
      const id = req.query._id
      hives.getHivesAmountInApiary(username,id, function (result) {
        res.send(result);
      });
    } catch (error) {
      response.status(500).json({
        error,
        message: 'Błąd ! Coś poszło nie tak, przy metodzie GET w endpointcie /hives/getHivesAmountInApiary',
      });
    }
  },



getHives: function (req, res, next) {
  const username = req.session.username;
  let apiaryID= req.query.apiaryID
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  if (apiaryID===null || apiaryID===undefined) {apiaryID=''}
  try {
    hives.getHives(username, apiaryID, function (result) {
      res.status(200).send(result);
    })
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie GET w endpointcie /hives',
    });
  }
},

addHive: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {
    const data = req.body.data
    hives.addHive(username, data, 
      function (result) {
      res.send(result);
    });  
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie POST w endpointcie /hives',
    });
  }
},

updateHive: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try {  
    const data = req.body.data
    hives.updateHive(username, data, 
    function (result) {
    res.send(result);
  });   
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie PUT w endpointcie /hives',
    });
  }
},

migrateHives: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try { 
    const hivesNumbers = req.body.data.hivesNumbers;
    const apiaryID = req.body.data.apiaryID;
    hives.migrateHives(username, hivesNumbers, apiaryID, 
      function (result) {
      res.send(result);
    }); 
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie PATCH w endpointcie /hives',
    });
  }
},

deleteHive: function (req, res, next) {
  const username = req.session.username;
  if (!checkIsLogged(username)) {res.send('access denied') ;return}
  try { 
    const id= req.query.id
    const number = req.query.number
    hives.deleteHive(username, id,number, 
      function (result) {
      res.send(result);
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Błąd ! Coś poszło nie tak, przy metodzie DELETE w endpointcie /hives',
    });
  }
},




}
  
/*
exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    response.status(200).json({
      course: courseToSend, 
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { authors, img, price, title } = request.body;
    if ( !authors || !price || !title ) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const isCourseExist = coursesData.some(({title: currentTitle}) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `Istnieje już w bazie kurs ${title}`,
      });

      return;
    }

    const newCourse = {
      authors: authors,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }
    
    
    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id',
    });
  }
};

exports.coursesData = coursesData;
*/