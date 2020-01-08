import freestyle from '../freestyle';
describe('freestyle', () => {
  it('second example: i can care about order', () => {
    expect(
      freestyle.shakur(
        {
          reference: (
            {
              my_value: {
                important: (
                  (
                    my_value
                  ) => (
                    `my value is: ${my_value}`
                  )
                ),
              },
              important: {
                my_value: (
                  (
                    my_value
                  ) => (
                    `my value is: ${my_value}`
                  )
                ),
              },
            }
          ),
          category: (
            '#my-value #important'
          ),
        }
      )
    ).toEqual(
      {
        locations: [
          ['my_value', 'important'],
          ['important', 'my_value'],
        ],
      }
    );
  });
});
