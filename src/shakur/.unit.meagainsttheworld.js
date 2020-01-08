import freestyle from '../freestyle';
describe('hshtg', () => {
  it('third example: i can not care about order', () => {
    expect(
      freestyle.shakur(
        {
          reference: (
            {
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
        locations: (
          [
            ['important', 'my_value'],
          ]
        ),
      }
    );
  });
});
