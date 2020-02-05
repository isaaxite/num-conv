# num-conver

Arabic digital converter.

## Install

```shell
npm i ic-num-conv --save
```

## Usage

#### Use with ts

```typescript
import * as numConver from 'ic-num-conv';
const input = [9999, 9999, 9999, 9999, 9999, 9999, 9999, 9003].join('');
const cnNum = numConver.transform(input);

console.log(Date.now(), 'input:', input, 'output:', cnNum);
```

<img src="https://github.com/isaaxite/num-conv/blob/master/asset/73809373-0e025f80-480e-11ea-9758-375c33e53a88.png"/>

#### Use with js

```javascript
const numConver = require('ic-num-conv');
const input = [9999, 9999, 9999, 9999, 9999, 9999, 9999, 9003].join('');
const cnNum = numConver.transform(input);

console.log(Date.now(), 'input:', input, 'output:', cnNum);
```

## Contributing

Feel free to dive in! [Open an issue](https://github.com/isaaxite/num-conv/issues) or submit PRs.

## License

[MIT](https://github.com/isaaxite/num-conv/blob/master/LICENSE)
