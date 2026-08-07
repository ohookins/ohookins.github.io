const test = require('node:test');
const assert = require('node:assert/strict');

const paginate = require('./paginate');

test('stops generating a next page link on the final paginated page', () => {
  const createdPages = [];

  paginate(
    page => createdPages.push(page),
    '/tmp/component',
    '/page',
    160,
    10
  );

  assert.equal(createdPages.length, 16);
  assert.equal(createdPages[0].context.firstPath, '/');
  assert.equal(createdPages[0].context.nextPath, '/page/2');
  assert.equal(createdPages[14].context.nextPath, '/page/16');
  assert.equal(createdPages[15].context.pageID, 16);
  assert.equal(createdPages[15].context.lastPath, '/page/16');
  assert.equal(createdPages[15].context.nextPath, '');
});
