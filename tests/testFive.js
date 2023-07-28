const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
require("dotenv").config();

async function navigateToHomepage() {
  try {
    const url = process.env.URL;
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(url);

    return driver;
  } catch (error) {
    console.error("Error occurred during navigation:", error);
    throw error;
  }
}

async function clickVisibleButton(driver) {
  try {
    const testDiv = await driver.findElement(By.id("test-5-div"));

    // Wait for the button to be visible
    await driver.wait(until.elementIsVisible(testDiv.findElement(By.id("test5-button"))));

    // Click the button
    const button = await testDiv.findElement(By.id("test5-button"));
    await button.click();

    console.log("Clicked the button in 'Test 5' div.");
  } catch (error) {
    console.error("Button click failed:", error);
  }
}

async function assertSuccessMessageDisplayed(driver) {
  try {
    // Wait for the success message to be visible
    await driver.wait(until.elementIsVisible(driver.findElement(By.id("test5-alert"))));

    // Get the content of the success message
    const successMessageElement = await driver.findElement(By.id("test5-alert"));
    const successMessage = await successMessageElement.getText();

    // Assert that the success message contains the expected text
    assert.strictEqual(successMessage.trim(), "You clicked a button!", "Success message is not displayed.");

    console.log("Asserted that the success message is displayed.");
  } catch (error) {
    console.error("Assertion failed:", error);
  }
}

async function assertButtonIsDisabled(driver) {
  try {
    const button = await driver.findElement(By.id("test5-button"));

    // Assert that the button is disabled
    assert.strictEqual(await button.isEnabled(), false, "Button is not disabled.");

    console.log("Asserted that the button is disabled.");
  } catch (error) {
    console.error("Assertion failed:", error);
  }
}

(async () => {
  let driver;
  try {
    driver = await navigateToHomepage();
    await clickVisibleButton(driver);
    await assertSuccessMessageDisplayed(driver);
    await assertButtonIsDisabled(driver);
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
