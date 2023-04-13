# Mangareader
Comic book reader app.

## Available scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the application in dev-mode on [http://127.0.0.1:5173](http://127.0.0.1:5173).\
The page will be updated when changes are made to the code.

### `npm run build`

Builds the project for production into the `build` folder.

### `npm run preview`

Locally preview production build.

### `npm run storybook`

Runs Storybook.

### `npm run build-storybook`

Build Storybook to deploy.

### `npm run lint`

Runs code linting.

### `npm run lint:fix`

Format all files according to codestyle rules.

## Deploying

Before starting, in the `.github/test.yml` file, you need to include the following [github variables](https://docs.github.com/en/actions/learn-github-actions/variables)
* DEPLOY_ENABLED: 1
* DEPLOY_STORYBOOK_ENABLED: 1

and in the `.github/production.yml` file, these:
* DEPLOY_ENABLED: 1

And add the following variables:
* MASTER_BRANCH_ACTION_ENABLED: 1 - enable activity when pushing changes to `master`, else set 0
* TEST_BRANCH_ACTION_ENABLED: 1 - enable activity when pushing changes to `test`, else set 0
* PULL_REQUEST_ACTION_ENABLED: 1 - enable activity when creating a pull request, else set 0

After uploading the solution to the `test` branch, the `.github/test.yml` script is launched, which will upload the build
to your hosting on test domain. To do this, you must specify the following [github secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
* DEPLOY_SERVER_HOST - hosting IP address
* DEPLOY_SERVER_PORT - hosting port
* TEST_DEPLOY_PATH - path to the test domain folder: /home/path/test.domain.com/public_html/

To set the correct version of node, you need to specify a [github variable](https://docs.github.com/en/actions/learn-github-actions/variables):
* NODE_VERSION - 19

After uploading the solution to the `master` branch, the `.github/production.yml` script is launched, which will upload the build
to your hosting on production domain. You must also specify the following [github secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
* DEPLOY_SERVER_HOST - hosting IP address
* DEPLOY_SERVER_PORT - hosting port
* DEPLOY_PATH - path to production domain folder: /home/path/domain.com/public_html/
* DEPLOY_STORYBOOK_PATH - path to storybook folder: /home/path/ui.domain.com/public_html/
