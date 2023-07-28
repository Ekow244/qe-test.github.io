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

async function assertDefaultValue(driver) {
  try {
    const buttonElement = await driver.findElement(By.className("btn btn-secondary dropdown-toggle"));

    const buttonText = await buttonElement.getText();

    assert.strictEqual(buttonText.trim(), "Option 1", "Option 1 is not the default selected value.");

    console.log("Asserted that 'Option 1' is the default selected value.");
  } catch (error) {
    console.error("Assertion failed:", error);
  }
}

async function selectOptionThree(driver) {
    try {
      const buttonElement = await driver.findElement(By.className("btn btn-secondary dropdown-toggle"));
      await buttonElement.click(); 
  
      const optionThreeElement = await driver.findElement(By.xpath("//a[normalize-space()='Option 3']"));
      await optionThreeElement.click();  
  
      console.log("Selected 'Option 3' from the select list.");
    } catch (error) {
      console.error("Selection failed:", error);
    }
  }

(async () => {
  let driver;
  try {
    driver = await navigateToHomepage();
    await assertDefaultValue(driver);
    await selectOptionThree(driver);
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
