# Kensho

![NPM Download](https://img.shields.io/npm/dt/@yokotak0527/kensho)
![TravisCI](https://travis-ci.org/yokotak0527/kensho.svg?branch=master)
![open issue](https://img.shields.io/github/issues/yokotak0527/kensho)
![MIT licence](https://img.shields.io/github/license/yokotak0527/kensho)

The JavaScript validation package.

This plugin can't validate form values. If you want to it, use [Kensho-form](https://github.com/yokotak0527/kensho-form).

**Note** :  
Destructive changes have been made since version 2.X. It is not compatible. If you need an older version, please use [Kensho-legacy](https://github.com/yokotak0527/kensho-legacy). 🙇‍♂️

## What can this do.

- Simple and easy validation of values.
- Apply multiple validation rules for one value.
- Apply filteres to the value before validation.
- Addition of your custom validation rules.

## Install

### npm

```bash
$ npm i @yokotak0527/kensho
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@yokotak0527/kensho/dist/bundle.iife.min.js"></script>
```

## Setup

### CommonJS

```js
const Kensho = require('@yokotak0527/kensho')
```

### ESModule

```js
import Kensho from '@yokotak0527/kensho'
```