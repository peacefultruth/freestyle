import freestyle from '../freestyle';
describe('freestyle', () => {
  it('first example: locations from a reference by category', () => {
    const message = (
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
          }
        ),
        category: (
          '#my-value #important'
        ),
      }
    );
    const value = (
      freestyle.shakur(
        message
      )
    );
    expect(
      value
    ).toEqual(
      {
        locations: (
          [
            ['my_value', 'important'],
          ]
        ),
      }
    );
  });
});
