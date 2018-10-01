const user = require("./user");
const post = require("./post");
const comment = require("./comment");

module.exports = router => {
  user(router);
  post(router);
  comment(router);
};
