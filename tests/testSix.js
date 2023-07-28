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

async function findCellValue(driver, row, column) {
  try {
    // first finds the table element containing the grid
    const table = await driver.findElement(By.css("#test-6-div table"));

    // then find all rows in the table 
    const rows = await table.findElements(By.css("tbody tr"));

    // gets the  row element
    const rowElement = rows[row];

    // finds all cells 
    const cells = await rowElement.findElements(By.css("td"));

    // gets the specified cell element
    const cellElement = cells[column];

    // gets the text content of the cell
    const cellValue = await cellElement.getText();

    return cellValue;
  } catch (error) {
    console.error("Error occurred while finding cell value:", error);
    throw error;
  }
}

async function findCellValueAtCoordinates(driver, x, y) {
  const row = x;
  const column = y;

  try {
    const cellValue = await findCellValue(driver, row, column);
    console.log(`Cell value at coordinates (${x}, ${y}): ${cellValue}`);
    return cellValue;
  } catch (error) {
    console.error(`Error occurred while finding cell value at coordinates (${x}, ${y}):`, error);
    throw error;
  }
}

async function assertCellValue(driver, x, y, expectedValue) {
  try {
    const cellValue = await findCellValueAtCoordinates(driver, x, y);

    assert.strictEqual(
      cellValue.trim(),
      expectedValue,
      `Cell value does not match the expected value: ${expectedValue}`
    );

    console.log(`Asserted that the cell value at coordinates (${x}, ${y}) is "${expectedValue}".`);
  } catch (error) {
    console.error("Assertion failed:", error);
  }
}

(async () => {
  let driver;
  try {
    driver = await navigateToHomepage();

    const xCoordinate = 2;
    const yCoordinate = 2;
    const expectedValue = "Ventosanzap"; //asserts that value is specificied
    await assertCellValue(driver, xCoordinate, yCoordinate, expectedValue);
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
