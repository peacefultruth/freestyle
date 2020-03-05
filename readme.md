# freestyle

```bash
yarn add @peacefultruth/freestyle
````

```js

const microphone = {
  i_know_you_got_soul: {
    rakim: {
      gets_stronger_when: () => 'as I get older',
    },
  },
};

// let answers = microphone.i_know_you_got_soul.rakim.gets_stronger_when();

import freestyle from '@peacefultruth/freestyle';

const answers = freestyle(microphone, `

                                                           i know you got soul;

      rakim,

          gets stronger when?
`)();

expect(answers).toEqual('as I get older');

```
