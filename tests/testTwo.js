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

async function assertThreeItems(driver) {
  try {
    const listGroup = await driver.findElement(By.id("test-2-div"));
    const listItems = await listGroup.findElements(By.className("list-group-item"));

    assert.strictEqual(listItems.length, 3, "Expected 3 values in the list group");

    console.log("Asserted that there are 3 values in the list group.");
  } catch (error) {
    console.error("Assertion failed:", error);
  }
}

async function assertSecondListItemValue(driver) {
    try {
      // Added a short delay because some elements were not loading quickly
      await driver.sleep(1000);
  
      
      const listGroup = await driver.findElement(By.xpath("//ul[@class='list-group']"));
      const listItems = await listGroup.findElements(By.className("list-group-item"));
  
      const secondListItemTextElement = await listItems[1].findElement(By.xpath(".//span[@class='badge badge-pill badge-primary']")); //xpath finds the <span> element within the second list item

      await driver.executeScript("arguments[0].parentNode.removeChild(arguments[0])", secondListItemTextElement); // this removes the span element located in the second list item
  
      const secondListItemValueElement = await listItems[1].findElement(By.xpath("."));
      const secondListItemValue = await secondListItemValueElement.getText();
      assert.strictEqual(secondListItemValue.trim(), "List Item 2", "Second list item value is not 'List Item 2'"); // .trim() removes trailing white spaces from the actual value
  
      console.log("Asserted that the second list item's value is 'List Item 2'.");
    } catch (error) {
      console.error("Assertion failed:", error);
    }
  }
  
async function assertValueIsSix(driver) {
  try {
   // waiting for the second list item to be present
   const secondListItemBadgeElement = await driver.wait(
    until.elementLocated(By.xpath("//ul[@class='list-group']/li[2]/span[@class='badge badge-pill badge-primary']")),
    10000 
  );
  const secondListItemBadgeValue = await secondListItemBadgeElement.getText();
  assert.strictEqual(secondListItemBadgeValue, "6", "Second list item's badge value is not 6");
  console.log("Assertion passed: Second list item's badge value is 6");
} catch (error) {
    console.error("Assertion failed:", error);
  }}



  

(async () => {
  let driver;
  try {
    driver = await navigateToHomepage();

    await assertThreeItems(driver);
    await assertSecondListItemValue(driver);
    await assertValueIsSix(driver); 

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
