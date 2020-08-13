const homeLink = `<h4><a href="/">&larr; Home</a></h4>`;

const postfixHtml =
`
</body>
</html>
`;

const prefixHtml =
`
<!DOCTYPE html>
<html>
<head>
  <title>My Web App</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
`;

module.exports = function () {
  return {
    homeLink,
    postfixHtml,
    prefixHtml
  };
};
