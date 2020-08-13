const pageParts = require('./page-parts')();

function displayEnvvars(req, res) {
  const varNames = Object.keys(process.env).sort();

  const entriesHtml = varNames.reduce((p, c) => {
      return `${p}<li><a href="/env/${encodeURIComponent(c)}">${c}</a></li>`;
  }, '');

  const listEnvHtml =
    '<h2>Environment variables</h2>' +
    `<ul>${entriesHtml}</ul>`;

  res.send(
    pageParts.prefixHtml +
    pageParts.homeLink +
    listEnvHtml +
    pageParts.postfixHtml
  );
}

module.exports = displayEnvvars;
