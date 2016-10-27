#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var dom = require('cheerio')
var args = process.argv.slice(2)
var wrap = dom.load('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="display:none;"></svg>')
if (args && args.length) {
  var dir = args[0]
  fs.readdir(dir, function(err, files) {
    if (err) {
      console.error(err)
      return
    }
    files.forEach(function(file) {
      if (path.extname(file) === '.svg') {
        var fileName = file.slice(0, -4)
        var file = fs.readFileSync(path.join(dir, file), 'utf8')
        var $ = dom.load(file)
        var viewbox = $('svg').attr('viewbox')
        var symbol = dom.load('<symbol></symbol>')
        var symbolNode = symbol('symbol')
        symbolNode.attr('viewbox', viewbox)
        symbolNode.attr('id', fileName)
        symbolNode.append($('svg').contents())
        wrap('svg').append(symbolNode)
      }
    })
    process.stdout.write(wrap.html())
  })
}
else {
  console.log('Directory not found.')
}
