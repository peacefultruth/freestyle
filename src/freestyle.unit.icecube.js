import freestyle from './freestyle';
describe('freestyle', () => {
  it('icecube', () => {
    const microphone = {
      was_today_good: {
        got_a_triple_double: {
          means_yes: 'today was a good day',
        },
      },
    };
    expect(freestyle.icecube(microphone)[`was today good? got a triple double; means yes.`])
      .toEqual('today was a good day');
  });
});
