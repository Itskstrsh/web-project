describe('Навигация по сайту ВИНЕГРЕТ', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('должен отображать заголовок и логотип', () => {
    cy.contains('ВИНЕГРЕТ').should('be.visible')
    cy.contains('МАГАЗИН – КУЛИНАРИЯ').should('be.visible')
    cy.get('header').should('exist')
  })

  it('должен отображать навигационное меню', () => {
    cy.contains('Часто покупают').should('be.visible')
    cy.contains('Ассортимент').should('be.visible')
    cy.contains('Доставка').should('be.visible')
    cy.contains('Контакты').should('be.visible')
  })

  it('должен отображать телефонный номер', () => {
    cy.contains('+7 (988) 130-45-76').should('be.visible')
    cy.get('a[href^="tel:"]').should('have.attr', 'href', 'tel:+79881304576')
  })

  it('должен отображать главный баннер', () => {
    cy.contains('ВКУС МЕНЯЕТ НАСТРОЕНИЕ!').should('be.visible')
    cy.contains('ДОМАШНЯЯ ЕДА БЕЗ ИЗЖОГИ И ТЯЖЕСТИ В ЖЕЛУДКЕ').should('be.visible')
    cy.contains('Посмотреть ассортимент').should('be.visible')
  })

  it('должен отображать преимущества', () => {
    cy.contains('БЕЗ ГМО И КОНСЕРВАНТОВ').should('be.visible')
    cy.contains('ДЛЯ САМЫХ МАЛЕНЬКИХ').should('be.visible')
    cy.contains('ДЛЯ ТЕХ КТО СЧИТАЕТ БЖУ').should('be.visible')
  })

  // 👇 временно отключённые тесты
  it.skip('должен работать переход по навигационным ссылкам', () => {
    cy.get('a[href="#assortment"]').click()
    cy.url().should('include', '#assortment')
    
    cy.get('a[href="#delivery"]').click()
    cy.url().should('include', '#delivery')
  })

  it.skip('должен открывать мобильное меню на маленьких экранах', () => {
    cy.viewport('iphone-6')
    cy.get('button').contains('☰').should('be.visible')
    cy.get('button').contains('☰').click()
    cy.contains('Часто покупают').should('be.visible')
    cy.contains('Контакты').should('be.visible')
  })
})
