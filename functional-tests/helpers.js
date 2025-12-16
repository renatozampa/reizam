const { By, until } = require('selenium-webdriver')

async function fazerLogin(driver) {
  await driver.get('http://localhost:3000/')

  await driver.wait(
    until.elementLocated(By.linkText('Login')),
    10000
  )
  await driver.findElement(By.linkText('Login')).click()

  await driver.wait(until.elementLocated(By.id('email')), 10000)

  await driver.findElement(By.id('email')).sendKeys('renato@gmail.com')
  await driver.findElement(By.id('senha')).sendKeys('zampa')
  await driver.findElement(By.css('button')).click()

  await driver.wait(
    until.elementLocated(By.xpath("//*[contains(text(),'Criar')]")),
    10000
  )
}

module.exports = { fazerLogin }
