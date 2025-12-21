require('chromedriver')
const { Builder, By, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Testando Tudo', function () {
  this.timeout(40000)
  let driver

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  afterEach(async function () {
    await driver.quit()
  })

  it('Testando Tudo', async function () {
    await driver.get('http://localhost:3000/')
    await driver.manage().window().setRect({ width: 1280, height: 720 })

    
    await driver.wait(until.elementLocated(By.linkText('Questões')), 10000)
    await driver.findElement(By.linkText('Questões')).click()

    // Aguarda as questões carregarem
    await driver.wait(until.elementsLocated(By.css('.questao')), 10000)
    await driver.sleep(500)

   
    let questao2 = await driver.findElements(By.css('.questao'))
    assert(questao2.length >= 2)

    let opcoesQ2 = await questao2[1].findElements(By.css('.opcao span'))
    await opcoesQ2[3].click()
    await driver.sleep(300)
    await questao2[1].findElement(By.css('.btn')).click()

    
    await driver.sleep(1000)

    
    let questao3 = await driver.findElements(By.css('.questao'))
    assert(questao3.length >= 3)

    let opcoesQ3 = await questao3[2].findElements(By.css('.opcao span'))
    await opcoesQ3[1].click()
    await driver.sleep(300)
    await questao3[2].findElement(By.css('.btn')).click()

    
    await driver.sleep(1500)

    
    let categoriasClicado = false
    
    
    try {
      const linkCategorias = await driver.wait(
        until.elementLocated(By.css('header ul li a[href="/categorias"]')),
        5000
      )
      await driver.wait(until.elementIsVisible(linkCategorias), 5000)
      await linkCategorias.click()
      categoriasClicado = true
    } catch (e) {
      console.log('Estratégia 1 falhou, tentando estratégia 2...')
    }

    
    if (!categoriasClicado) {
      try {
        await driver.get('http://localhost:3000/categorias')
        categoriasClicado = true
      } catch (e) {
        console.log('Estratégia 2 falhou, tentando estratégia 3...')
      }
    }

    
    if (!categoriasClicado) {
      try {
        const linkCategorias = await driver.findElement(By.css('a[href="/categorias"]'))
        await driver.executeScript('arguments[0].click();', linkCategorias)
        categoriasClicado = true
      } catch (e) {
        console.log('Estratégia 3 falhou')
      }
    }

    
    await driver.wait(
      until.elementsLocated(By.css('.btn-materia')),
      10000
    )

    const materias = await driver.findElements(By.css('.btn-materia'))
    for (const materia of materias) {
      await materia.click()
      await driver.sleep(200)
    }

   
    await driver.findElement(By.linkText('Login')).click()

    await driver.wait(until.elementLocated(By.id('email')), 10000)
    await driver.findElement(By.id('email')).sendKeys('renato@gmail.com')
    await driver.findElement(By.id('senha')).sendKeys('zampa')
    await driver.findElement(By.css('button')).click()

    
    const editar = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(),'Editar')]")),
      10000
    )
    await editar.click()

    await driver.findElement(By.id('enunciado')).clear()
    await driver.findElement(By.id('enunciado'))
      .sendKeys('Qual é a capital da França?')

    await driver.findElement(By.id('materia')).clear()
    await driver.findElement(By.id('materia')).sendKeys('Geografia')

    await driver.findElement(By.id('tema')).clear()
    await driver.findElement(By.id('tema')).sendKeys('Europa')

    await driver.findElement(By.name('altA')).clear()
    await driver.findElement(By.name('altA')).sendKeys('Berlim')

    await driver.findElement(By.name('altB')).clear()
    await driver.findElement(By.name('altB')).sendKeys('Madrid')

    await driver.findElement(By.name('altC')).clear()
    await driver.findElement(By.name('altC')).sendKeys('Paris')

    await driver.findElement(By.name('altD')).clear()
    await driver.findElement(By.name('altD')).sendKeys('Roma')

    await driver.findElement(By.name('altE')).clear()
    await driver.findElement(By.name('altE')).sendKeys('Lisboa')

    const corretaEditar = await driver.findElement(By.id('correta'))
    await corretaEditar.findElement(By.xpath(".//option[.='C']")).click()

    await driver.findElement(By.id('explicacao')).clear()
    await driver.findElement(By.id('explicacao'))
      .sendKeys('Paris é a capital da França.')

    await driver.findElement(By.css('.btn')).click()

    
    const criar = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(),'Criar Nova Questão')]")),
      10000
    )
    await criar.click()

    await driver.findElement(By.id('materia')).sendKeys('Matemática')
    await driver.findElement(By.id('tema')).sendKeys('Teste')
    await driver.findElement(By.id('enunciado')).sendKeys('Teste')

    await driver.findElement(By.name('altA')).sendKeys('Teste')
    await driver.findElement(By.name('altB')).sendKeys('Teste')
    await driver.findElement(By.name('altC')).sendKeys('Teste')
    await driver.findElement(By.name('altD')).sendKeys('Teste')
    await driver.findElement(By.name('altE')).sendKeys('Teste')

    const corretaNova = await driver.findElement(By.id('correta'))
    await corretaNova.findElement(By.xpath(".//option[.='B']")).click()

    await driver.findElement(By.id('explicacao')).sendKeys('Teste')
    await driver.findElement(By.css('.btn')).click()
  })

})