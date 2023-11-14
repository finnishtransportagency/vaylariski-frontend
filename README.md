# Vaylariski

## Node and npm versions

Node: 16.15.0
Npm: 8.5.5

## End-to-end tests

**NOTE!** The tests can be run locally with a connection to the Snowflake database. HOWEVER, when the tests are in our CI-pipeline, the data that is used comes from a local postgres server (containerized). Since the postgres server only contains a subset of the data found in Snowflake, make sure the tests also work with that data.
As of 14.7.2023, the only two wayareas that exist in the postgres server are the wayareas with id 100 and 7010. Thus, it's recommended to use these wayareas when writing tests.
Instructions on how to run the dockerized backend and postgres server is foun din the backend repo's README.md.

### How to run end-to-end (E2E) tests locally

We use the [Cypress](https://docs.cypress.io/guides/overview/why-cypress)-library for running the E2E tests. For running the tests, you need to have three terminal sessions, one for running the backend, one for the frontend, and one for running cypress.

Step-by-step guide on how to run the E2E tests:

1. Run the backend with your desired branch
2. Run the frontend with your desired branch
3. Open a new terminal session and navigate to the frontend folder (root-folder where e.g. package.json resides). **NOTE!** If this is your first time running tests, make sure to run the command `npm i` to install the cypress library
4. Run the command `npm run cypress`. This should open up cypress in a new cypress-browser
5. Choose "E2E Testing"
6. Choose your browser. **NOTE!** If you cannot see any other browser execpt for Electron, you might not have the desired browser installed. This can happen e.g. when running the cypress command from a WSL-terminal, which doesn't have e.g. Chrome or Firefox pre-installed. So, to get your browser you want to test against you need to download and install that browser. Example for installing Chrome for WSL have be found [here](https://shouv.medium.com/how-to-run-cypress-on-wsl2-989b83795fb6)
7. You can find the E2E tests under the cypress/e2e folder in the newly opened window. Run your desired tests

## Deployment to test and prod

When we want to deploy to test and prod, we only need to merge our changes to the relevant branches. However, we must **FIRST MERGE TO THE BACKEND** before the frontend. This is due to the CI-pipeline that is run on the frontend branch.

Thus, do the following:

- Create a pull request on the **backend** from the branch dev -> test (update to test) or test -> prod (update to production)
  - When the pull request is okay, merge the pull request
- Create a pull request on the **frontend** from the branch dev -> test (update to test) or test -> prod (update to production)
  - Check that the tests in the pipeline are okay
  - When the pull request is okay, merge the pull request

As our AWS-pipeline checks for changes on the branches _test_ and _prod_, automatic deployment happens after merging to either of these branches. Thus, no more action is needed by the developer to complete the deployment.

## VSCode extensions

Need to have:
EJS language support
ESLint
Prettier (9.14.0)
Pylance
Python

Good to have:
Docker
Git Graph
GitLens
Snowflake

Nice to have:
Black Formatter
Console Ninja
env-cmd-file
GitHub Actions
Image preview
indent-preview
Jupyter
Markdown All in One
markdownlint
Todo Tree
Random Everything
vscode-pdf
vscode-pets
WSL (if you're using WSL)
