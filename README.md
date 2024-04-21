# @ntf/logger

Another console logger library

## Why

Because I like reinventing the wheel :)

## Installation

Use your favourite package manager, idk

```sh
npm install @ntf/logger
```

```sh
yarn add @ntf/logger
```

```sh
pnpm install @ntf/logger
```

## Usage

### Importing

This library can be used in `CommonJS` and `ESModule` environments

```typescript
const { ... } = require("@ntf/logger");
```

```typescript
import { ... } from "@ntf/logger";
```

### For NodeJS

For NodeJS there's `AnsiLogger` class which you can guess, uses escaped ansi code for colors in termnial/console/command prompt/whatever terminal name

### For Browser

For Browser there's `CSSLogger` class which uses the cool feature of CSS styling, you can try `AnsiLogger` but on some browsers it looks weird (especially Chrome)

### I want to make my own Logger

Just extend the `Logger` class and implement `print`:

```typescript
class MyCoolAndAwesomeLogger extends Logger
{
    // level = can be "info", "warn", "error", "debug" or "trace"
    // args = well... anything... literally
    print(level,...args)
    {
        // do some funny stuff here
    }
};
```

### License stuff that nobody reads

Just like any [Open Source Project](https://github.com/N1ghtTheF0x/ntf-logger) this has a [License](./LICENSE), the MIT License
