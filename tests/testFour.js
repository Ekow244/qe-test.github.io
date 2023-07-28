const { Builder, By } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/webdriver");
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

async function assertButtonStatus(driver) {
    try {
      const testDiv = await driver.findElement(By.id("test-4-div"));
  
      const buttons = await testDiv.findElements(By.tagName("button"));
      const firstButton = buttons[0];
      const secondButton = buttons[1];
  
      assert.strictEqual(await firstButton.isEnabled(), true, "First button is not enabled.");
  
      assert.strictEqual(await secondButton.isEnabled(), false, "Second button is not disabled.");
  
      console.log("Asserted button 1 is enabled in 'Test 4' div.");
      console.log("Asserted button 2 is disabled in 'Test 4' div.");

    } catch (error) {
      console.error("Assertion failed:", error);
    }
  }
  
  (async () => {
    let driver;
    try {
      driver = await navigateToHomepage();
      await assertButtonStatus(driver);
    } catch (error) {
      console.error("Test failed:", error);
    } finally {
      if (driver) {
        await driver.quit();
      }
    }
  })();
  