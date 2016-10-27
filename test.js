var test = require('tape')
var nixt = require('nixt')
var fs = require('fs')
var fixture = fs.readFileSync('./out.svg', 'utf8')

test('should have correct output', function(t) {
  nixt()
    .expect(function(result) {
      t.equals(result.stdout, fixture)
    })
    .run('svg-symbols ./fixtures')
    .end(t.end)
})
