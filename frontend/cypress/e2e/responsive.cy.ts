describe('Адаптивность сайта', () => {
    const breakpoints = [
      { device: 'desktop', width: 1280, height: 720 },
      { device: 'tablet', width: 768, height: 1024 },
      { device: 'mobile', width: 375, height: 667 }
    ]
  
    breakpoints.forEach(({ device, width, height }) => {
      it(`должен корректно отображаться на ${device} (${width}x${height})`, () => {
        cy.viewport(width, height)
        cy.visit('/')
        
        cy.contains('ВИНЕГРЕТ').should('be.visible')
        cy.contains('МАГАЗИН – КУЛИНАРИЯ').should('be.visible')
        
        cy.screenshot(`${device}-layout`)
      })
    })
  })