var sync = require('synchronize');
var request = require('request');
var graphviz = require('graphviz');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var text = req.query.text.trim();

  var matches = text.match(/([0-9a-f]+)$/);
  if (!matches) {
    res.status(400).send('Invalid txid');
    return;
  }

  var txid = matches[1];

  // get transaction json data from blockchain.info
  var response;
  try {
    response = sync.await(request({
      url: 'https://blockchain.info/tx-index/' + encodeURIComponent(txid),
      qs: {
        format: 'json'
      },
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  // get total input amount in BTC
  var totalIn = response.body.inputs
    .map(function(input) { return input.prev_out.value })
    .reduce(function(a, b) { return a + b });
  totalIn /= 1e8;

  // create graph for the transaction
  var g = graphviz.digraph('G');

  // create input node for transaction graph
  g.set('labelloc', 't');
  g.set('label', txid);
  var inNode = g.addNode(totalIn + ' BTC');

  // create graph node and edge for each output
  response.body.out.forEach(function(output) {
    var btc = output.value / 1e8;
    var outNode = g.addNode(btc + ' BTC');
    g.addEdge(inNode, outNode);
  });

  // render svg to replace link
  g.render('svg', function(buf) {
    res.json({
      body: buf.toString('utf8')
    });
  }, function(err) {
    res.status(500).send('Error');
  });
};
