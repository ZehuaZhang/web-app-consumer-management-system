# Epic Frontend

Designed Epic User and My Job Page

For applications, clicking an user or a job directly applied to, or cancelled from My Jobs, since we don't really have api to call. Applications persist when reopeninig the browser via local storage.

User fetch count is guaranteed to be exact 3 users for following 3 cases, i.e. initial rendering, clicking Show More, & choosing Sorting Type. User fetch would retry 3 times when server errors occur. Fetch status are added to Footer to show status of the fetch, i.e. Not Started, Loading, Retrying, Completed, Failed.

Main app is designed with hidden scroll bar, and would scroll to top when a new sorting, i.e. either sort type or sort order is clicked. Animations and transitions added on all user interactions. Header, Footer, 2 Sortings components are sticky.

Designed with Redux and Hot Reload for easy debugging

## How tos

### Installation

```
$ yarn
```

### Run

```
$ yarn start
```

### Run in Local

```
$ yarn open
```

### Build

```
$ yarn build
```

## Libraries Applied

- [x] [Typescript](https://www.typescriptlang.org/) 3
- [x] [React](https://facebook.github.io/react/) 16.8
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.3
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)

## To dos
- [x] Create a server to cosume upstream API, and save user information, recent activity, save jobs with a persist storage, redis / DB
- [x] Server-Side Rendering
- [x] Static code analysis
- [x] Testing Frameworks
- [x] Local Storage compliance to GDPR, and reduce Xxs attack
- [x] Accessiblity - Keyboard focus via tabs, and outline with contrast on focus
- [x] Accessiblity - Focused or Hovered items should be able to narrate