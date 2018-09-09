import freestyle from './freestyle';
describe('freestyle example', () => {
  it('the i know you got soul rakim', () => {
    const the_secret = 'as I get older';
    const microphone = {
      i_know_you_got_soul: {
        rakim: {
          gets_stronger_when: jest.fn().mockReturnValue(the_secret),
        },
      },
    };
    const answers = freestyle(microphone, `

                                                           i know you got soul;

          rakim,

              gets stronger when?
    `)();
    expect(microphone.i_know_you_got_soul.rakim.gets_stronger_when).toHaveBeenCalledWith();
    expect(answers).toEqual(the_secret);
  });
});
