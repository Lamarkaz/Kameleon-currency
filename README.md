# Kameleon Currency
Cryptocurrency middleware for the Kameleon framework

This project is work in progress. It should not be used in production to hold real value.

# Installation

## Requirements:
* Node.js v.7.6.0 or higher
* Mac or Linux

```bash
npm install --save kameleon kameleon-currency
```

# Usage

```javascript
let kameleon = require('kameleon')
let currency = require('kameleon-currency')

let node = new kameleon()

node.use(currency({
  "be862ad9abfe6f22bcb087716c7d89a26051f74c":"10" // Initial balances
}))

node.start()
```

# API

API docs will be deployed on a separate site soon.

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)