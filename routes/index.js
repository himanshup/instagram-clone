const user = require("./user");
const post = require("./post");

module.exports = router => {
  user(router);
  post(router);
};
