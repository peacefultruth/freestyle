import freestyle from './freestyle';
describe('freestyle', () => {
  it('krs-one', () => {
    const microphone = {
      nested: {
        nested: {
          some_blah_blah_blah: 3.14,
        },
      },
    };
    expect(freestyle.krsone(microphone, `
      nested:_


                                    nested:



      some    blah          blah blah
    `)).toEqual(microphone.nested.nested.some_blah_blah_blah);
  });
});
