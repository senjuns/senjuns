# Setup
following this guide from selenium site https://www.browserstack.com/guide/automation-using-selenium-javascript
## Install
* these npm packages should already be in the `package.json`
* `yarn add -D selenium-webdriver @types/selenium-webdriver geckodriver chromedriver`
## Setup safari
https://www.ibm.com/docs/en/rtw/9.2.1?topic=cwut-enabling-apple-safari-web-ui-recording-macintosh-computer
* To enable the Develop menu in the Safari browser, click Safari > Preferences > Advanced tab. Select the Show Develop Menu check box. The Develop menu appears in the menu bar.
* To enable Remote Automation click Develop > Allow Remote Automation in the menu bar.
* Authorize safaridriver to launch the webdriverd service that hosts the local web server. To permit this, run /usr/bin/safaridriver once manually and complete the authentication prompt.
* Safari does not currently support headless mode - https://github.com/SeleniumHQ/selenium/issues/5985
* Safari will prompt you with an alert popup everytime telling you that it is running automated testing unless you run this command
  * ```sudo /usr/bin/safaridriver --enable```

## Update PATH with drivers
* geckodriver / chromedriver path for selentium testing
* ```bash 
  export PATH="$PATH:<YOUR_NEATLEAF_GIT_REPO>/dashboard/node_modules/.bin"
  ```

# Running
- edit `.env`
  - set the following variables
  ```
  QA_USER_NAME=qa@neatleaf.com
  QA_USER_PASSWORD=<ASK>
  QA_ROOT_URL=http://localhost:3000
  ```
- in one terminal start the site locally
  - `yarn start`
- in another terminal run the tests
  - `yarn test`

# Gotchas
## Failing test due to missing elements

**Issue:**
- Tests fail because there is a missing element

**Solutions:**
- make sure the id / names match for the elements
- did you make sure to `await`?
- you may have to wait longer try using the methods in `neatleaf/dashboard/src/qa/selenium_utils.ts`
