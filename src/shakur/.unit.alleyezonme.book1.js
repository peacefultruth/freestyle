import freestyle from '../freestyle';
describe('hshtg', () => {
  it('fourth example: i can accept a series', () => {
    expect(
      freestyle.shakur(
        {
          reference: (
            {
              category_a: (
                '4.14'
              ),
              category_b: (
                'i cant believe its not butter'
              ),
            }
          ),
          category: (
            '#category-a #category-b'
          ),
        }
      )
    ).toEqual(
      {
        locations: (
          [
            ['category_a'],
            ['category_b'],
          ]
        ),
      }
    );
  });
});
