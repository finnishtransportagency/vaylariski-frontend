# Node and npm versions

Node: 16.15.0
Npm: 8.5.5

# How to run end-to-end (E2E) tests

We use the [Cypress](https://docs.cypress.io/guides/overview/why-cypress)-library for running the E2E tests. For running the tests, you need to have three terminal sessions, one for running the backend, one for the frontend, and one for running cypress.

Step-by-step guide on how to run the E2E tests:

1. Run the backend with your desired branch
2. Run the frontend with your desired branch
3. Open a new terminal session and navigate to the frontend folder (root-folder where e.g. package.json resides). **NOTE!** If this is your first time running tests, make sure to run the command `npm i` to install the cypress library
4. Run the command `npm run cypress`. This should open up cypress in a new cypress-browser
5. Choose "E2E Testing"
6. Choose your browser. **NOTE!** If you cannot see any other browser execpt for Electron, you might not have the desired browser installed. This can happen e.g. when running the cypress command from a WSL-terminal, which doesn't have e.g. Chrome or Firefox pre-installed. So, to get your browser you want to test against you need to download and install that browser. Example for installing Chrome for WSL have be found [here](https://shouv.medium.com/how-to-run-cypress-on-wsl2-989b83795fb6)
7. You can find the E2E tests under the cypress/e2e folder in the newly opened window. Run your desired tests

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
