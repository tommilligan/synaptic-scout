var express = require('express');
var path = require('path');
var serveStatic = require('serve-static')

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
console.log('server started ' + port);