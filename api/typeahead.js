// The Type Ahead API.
// Probably not practical or helpful to provide txid typeahead. Users will almost
// certainly will be copy/pasting this.
module.exports = function(req, res) {
  return res.json([{
    title: '<i>(no results)</i>',
    text: ''
  }]);
};
