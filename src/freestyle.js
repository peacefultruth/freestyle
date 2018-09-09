
import delve from 'dlv';

const nesting = {
  freestyle_keys: ':;?!,',
  impl_key: '.',
};

nesting.freestyle_keys_array =
  nesting.freestyle_keys.split('');

const replacement_key = '_';

const rakim = (lyric) => {
  lyric = (lyric || '').trim().replace(/\s+/g, replacement_key);

  nesting.freestyle_keys_array.forEach((nesting_freestyle_key) => {
    let index = lyric.indexOf(nesting_freestyle_key);
    while(index !== -1) {
      lyric = `${lyric.substring(0, index)}${nesting.impl_key}${
        lyric.substring(index + 1, lyric.length)}`;
      index = lyric.indexOf(nesting_freestyle_key);
    }
  });

  lyric = lyric.replace(/\_{2,}/g, replacement_key);
  lyric = lyric.replace(/(\._|_\.)/g, nesting.impl_key);

  // lyric = lyric.replace(/(\.\Z|_\Z)/g, '');
  if (lyric.length > 0 && (
    lyric[lyric.length-1] === nesting.impl_key
    || lyric[lyric.length-1] === replacement_key)) {
    lyric = lyric.substring(0, lyric.length-1);
  }

  return lyric;
};

const krsone = (microphone, the_moment) => {
    return delve(microphone, rakim(the_moment));
};

const tupac = (one, two) => {
  if (two) {
    return krsone(one, two);
  } else {
    return rakim(one);
  }
};

const icecube = (object) => new Proxy(object, {
  get: (obj, prop) => {
    const spit = krsone;
    return spit(obj, prop);
  },
});

export default Object.assign(tupac, {
  rakim,
  krsone,
  icecube,
});
