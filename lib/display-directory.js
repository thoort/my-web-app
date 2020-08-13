const fs = require('fs');
const pageParts = require('./page-parts')();

function displayDirectory(req, res) {
  const dirname = req.params.dirname;
  const dirnameComps = (dirname === '/' ? [''] : dirname.split('/'));
  const encodedDirname = (dirname === '/' ? '' : encodeURIComponent(dirname));
  console.log('dirname', `|${dirname}|`);
  console.log('dirnameComps', dirnameComps);
  const pathBreadcrumbsHtml =
    `<h2 class="dirpath">` +
    dirnameComps.reduce(
      (p, c, i) => {
        const comps = p.comps.concat(c);
        const path = comps.join('/') || '/';
        const href = `/dir/${encodeURIComponent(path)}`;
        const html = (i === 0) ? '<a href="/dir/%2F">&square;/</a>' : `<a href="${href}">${c}</a>/`;
        return {
          html: `${p.html}${html}`,
          comps: p.comps.concat(c)
        };
      },
      {
        html: '',
        comps: []
      }
    ).html +
    `</h2>`;

  const entries = fs.readdirSync(dirname, { withFileTypes: true });
  const dirNames = entries.filter(e => e.isDirectory()).map(e => e.name).sort();
  const fileNames = entries.filter(e => e.isFile()).map(e => e.name).sort();
  const listDirsHtml =
    `<h3>Directories</h3><ul>` +
    dirNames.reduce(
      (p, c) => (`${p}<li><a href="/dir/${encodedDirname}%2F${c}">${c}</a></li>`),
      ''
    ) +
    `</ul>`;
  const listFilesHtml =
    `<h3>Files</h3><ul>` +
    fileNames.reduce(
      (p, c) => (`${p}<li>${c}</li>`),
      ''
    ) +
    `</ul>`;
  res.send(
    pageParts.prefixHtml +
    pageParts.homeLink +
    pathBreadcrumbsHtml +
    listDirsHtml +
    listFilesHtml +
    pageParts.postfixHtml
  );
}

module.exports = displayDirectory;
