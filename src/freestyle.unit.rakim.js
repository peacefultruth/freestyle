import freestyle from './freestyle';
describe('freestyle', () => {
  it('rakim', () => {
    expect(freestyle.rakim(`
      nested?


                            nested! nested;



      some    blah          blah blah
    `)).toEqual('nested.nested.nested.some_blah_blah_blah');
  });
});
