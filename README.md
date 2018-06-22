This project was created with [Create React App](https://github.com/facebookincubator/create-react-app).

It was separated by steps (view the `git log`), with some extra steps for dividing the single `js` react app into files and folders, also updated the dependencies and the changes in the code that implies.

There is an additional folder `example-test` that uses [Jest](https://facebook.github.io/jest).

The first 30 steps corresponds to the tutorial [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)

The next 27 steps corresponds to the other excelent tutorial [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

It also adds an example of using `redux-saga`, and using `async/await` in with `redux-thunk` middleware.

Adds [ESLint](https://eslint.org) with React rules, [EditorConfig](https://editorconfig.org), and [Prettier](https://prettier.io) configurations files.

For ESLint:
`npm install -g eslint`
`eslint --init`
`npm install -g eslint-plugin-react`

The only error left is:
` error  'process' is not defined  no-undef`

See: <https://eslint.org/docs/rules/no-process-env>
