const express = require('express');
const app = express();
const pageParts = require('./lib/page-parts')();
const displayEnvvars = require('./lib/display-envvars');
const displayDirectory = require('./lib/display-directory');

app.use(express.static(`${__dirname}/public`));
app.use('/dir/:dirname', displayDirectory);
app.use('/env/:varname', (req, res) => {
  const varname = req.params.varname;
  res.send(`${pageParts.prefixHtml}${pageParts.homeLink}<b>${varname}</b>="${process.env[varname]}"${pageParts.postfixHtml}`);
});
app.use('/env', displayEnvvars);
app.use('/end', (req, res) => {
  res.send('process exit');
  process.exit();
});
app.listen(8080, () => {
  console.log('listening at 8080');
});
