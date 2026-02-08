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
    cy.contains('О нас').should('be.visible')
    cy.contains('Ассортимент').should('be.visible')
    cy.contains('Отзывы').should('be.visible')
    cy.contains('Корзина').should('be.visible')
  })

  it('должен отображать телефонный номер', () => {
    cy.contains('+7 (988) 130-45-76').should('be.visible')
    cy.get('a[href^="tel:"]').should('have.attr', 'href', 'tel:+79881304576')
  })

  it('должен отображать главный баннер', () => {
    cy.contains('ВКУС МЕНЯЕТ').should('be.visible')
    cy.contains('НАСТРОЕНИЕ').should('be.visible')
    cy.contains('Откройте для себя мир изысканных вкусов').should('be.visible')
    cy.contains('АССОРТИМЕНТ').should('be.visible')
  })

  it('должен отображать преимущества', () => {
    cy.contains('КАК ВСЁ УСТРОЕНО').should('be.visible')
    cy.contains('ПОЛУФАБРИКАТЫ').should('be.visible')
    cy.contains('ВЫПЕЧКА').should('be.visible')
    cy.contains('ГОТОВАЯ ЕДА').should('be.visible')
  })

  // 👇 временно отключённые тесты
  it.skip('должен работать переход по навигационным ссылкам', () => {
    cy.get('a[href="#assortment"]').click()
    cy.url().should('include', '#assortment')
    
    cy.get('a[href="#delivery"]').click()
    cy.url().should('include', '#delivery')
  })

  it.skip('должен открывать мобильное меню на маленьких экранах', () => {
    // @ts-expect-error - Cypress viewport types issue
    cy.viewport('iphone-6')
    cy.get('button').first().should('be.visible')
    cy.get('button').first().click()
    cy.contains('О нас').should('be.visible')
    cy.contains('Отзывы').should('be.visible')
  })
})
