const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();

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
app.get('/generativeTypewriter',function(req,res){
  res.sendFile(path.join(__dirname,'/www/generativeTypewriter/index.html'));
})
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`);
});
