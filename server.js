const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const url = require('url');
const firebase = require('firebase');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/www/index.html');
})
app.get('/generativeTypewriter/new',function(req,res,next){
  //instead of generating smth here on your own,
  //generate an empty submission to
  newCanvasId = Math.random().toString(36).substring(2);
  res.redirect(url.format({
    pathname:"/generativeTypewriter/create",
    query:{
      id:newCanvasId
    }
  }));
})
app.get('/generativeTypewriter/gallery',function(req,res){
  res.sendFile(__dirname + '/www/gallery.html');
})
app.get('/generativeTypewriter/create',function(req,res){
  res.sendFile(__dirname + '/www/generativeTypewriter/index.html');
})
//lead create new random post and lead them to it if create
// Math.random().toString(36).substring(1);
//if create/id, go to that id by retrieving it in the front end
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`);
});
