var express    = require("express");
var expressJWT = require("express-jwt");
var morgan     = require("morgan");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var passport   = require("passport");
var app        = express();
var config     = require('./config/config');
var port       = process.env.PORT || 3000;

// Connect to DB
mongoose.connect(config.database);

// Setup Passport
require('./config/passport')(passport);

// Secret JWT phrase, should move to process.env
var secret = config.secret;

function isAuthenticated(req, res, next) { 
  if (req.url == "/auth/linkedin") return next();
  // if (req.url == "/" ||
  //     req.url == "/signup" ||
  //     req.url == "/signin")

  //   return next();

  // if (!(req.headers && req.headers.authorization)) {
  //   return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
  // }
  console.log(req.url)
  console.log(req.body)
  // console.log("HEEEEEE")
  // var header = req.headers.authorization.split(' ');
  // var token = header[1];
  // console.log(token);

  // var payload = jwt.decode(token);
  // var now = moment().unix();

  // if (now > payload.exp) {
  //   return res.status(401).send({ message: 'Token has expired.' });
  // }

  // console.log(payload.sub._id)

  // User.findById({ _id: payload.sub._id}, function(err, user) {
  //   if (!user) return res.status(400).send({ message: 'User no longer exists.' });
   
  //   req.user = user;
  //   next();
  // })
  next();
}

// app.use("/api", isAuthenticated);

// JWT access control. Important to have these before our routes!
// app
//   .use('/api', expressJWT({secret: config.secret})
//   .unless({path: ['/api/authorize', '/api/join','/api/auth/linkedin', '/api/auth/linkedin/callback'], method: 'post, get'}  ));

// // Handle "No authorization token was found" errors
// app.use(function (error, request, response, next) {
//   if (error.name === 'UnauthorizedError') {
//     response.status(401).json({message: 'You need an authorization token to view confidential information.'});
//   }
// });

// Setup Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"))

// Setup CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(passport.initialize());

// Require routes
var routes = require('./config/routes');
app.use('/api', routes);

// Setup Angular index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"))
});

// Start Server
app.listen(port, function () {
  console.log( "Express server listening on port " + port);
});