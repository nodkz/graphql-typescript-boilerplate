# dentist [![travis-ci](https://travis-ci.org/paperhive/dentist.svg?branch=master)](https://travis-ci.org/paperhive/dentist) [![codecov.io](https://codecov.io/github/paperhive/dentist/coverage.svg?branch=master)](https://codecov.io/github/paperhive/dentist?branch=master) [![npm](https://img.shields.io/npm/v/dentist.svg)](https://www.npmjs.com/package/dentist)

NodeJS string dedenting module – make your template strings look nice!

## Documentation
```
npm install dentist
```

```javascript
import { dedent } from 'dentist';

const str = dedent(`
  Hi, check out the following line:

    it's indented!
  
  Crazy!
`);

/* Now str contains the string without the leading indentation:
Hi, check out the following line:

  it's indented!

Crazy!
*/
```

