const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
require("dotenv").config(); 

async function navigateToHomepage() {
    try {
      const url = process.env.URL;
      let driver = await new Builder().forBrowser("chrome").build();
      await driver.get(url);
  
      return driver;
    } catch (error) {
      console.error("Error found during navigation:", error);
      throw error;
    }
  }

async function assertEmail(driver) {
  try {
    const emailField = await driver.findElement(By.id("inputEmail"));
    assert(await emailField.isDisplayed(), "Email address field was not displayed");
    console.log("Email address field was displayed.");
  } catch (error) {
    console.error("Assertion failed for email field:", error);
    throw error;
  }
}

async function assertPassword(driver) {
  try {
    const passwordField = await driver.findElement(By.id("inputPassword"));
    assert(await passwordField.isDisplayed(), "Password field was not displayed");
    console.log("Password field was displayed.");
  } catch (error) {
    console.error("Assertion failed for password field:", error);
    throw error;
  }
}

async function enterEmailandPassword(driver) {
  try {
    const email = process.env.EMAIL; // getting email and pwd from .env file
    const password = process.env.PASSWORD; 

    await driver.findElement(By.id("inputEmail")).sendKeys(email);
    await driver.findElement(By.id("inputPassword")).sendKeys(password);

    await assertEmail(driver);
    await assertPassword(driver);

    
    console.log("Email and password were sent successfully");


  } catch (error) {
    console.error("Error occurred while entering email and password:", error);
    throw error;
  } finally {
    await driver.quit();
  }
}

(async () => {
  let driver;
  try {
    driver = await navigateToHomepage();
    await enterEmailandPassword(driver);
  } catch (error) {
    console.error("Test failed:", error);
  }
})();
