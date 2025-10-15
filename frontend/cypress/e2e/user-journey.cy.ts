describe('Пользовательский сценарий: Поиск и заказ еды', () => {
    it('должен пройти полный путь пользователя', () => {
      // 1. Пользователь заходит на сайт
      cy.visit('/')
      
      // 2. Видит главную страницу
      cy.contains('ВКУС МЕНЯЕТ НАСТРОЕНИЕ!').should('be.visible')
      
      // 3. Кликает на кнопку "Посмотреть ассортимент"
      cy.contains('Посмотреть ассортимент').click()
      
      // 4. Переходит в раздел ассортимента
      cy.url().should('include', '#assortment')
      
      // 5. Просматривает информацию о доставке
      cy.contains('Доставка').click()
      cy.url().should('include', '#delivery')
      
      // 6. Находит контакты
      cy.contains('Контакты').click()
      cy.url().should('include', '#contacts')
      
      // 7. Видит телефон для связи
      cy.contains('+7 (988) 130-45-76').should('be.visible')
      
      // 8. Проверяет преимущества компании
      cy.scrollTo('top')
      cy.contains('БЕЗ ГМО И КОНСЕРВАНТОВ').should('be.visible')
    })
  })