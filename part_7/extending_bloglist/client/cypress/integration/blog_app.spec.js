describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('login')
  })
  describe('Login', function () {
    it('succedds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('Superuser logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('false')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function() {
      cy.contains('new create').click()
      cy.get('#focus').type('title created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('#url created by cypress')

      cy.get('.create-btn').click()
      cy.contains('title created by cypress')
    })
    it('user can like a blog', function() {
      cy.contains('new create').click()
      cy.get('#focus').type('title created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('#url created by cypress')

      cy.get('.create-btn').click()
      cy.contains('title created by cypress')
      cy.get('#toggle-btn').click()
      cy.get('.like-btn').click()
      cy.contains('likes 1')
    })
    it('delete the blog', function() {
      cy.contains('new create').click()
      cy.get('#focus').type('title created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('#url created by cypress')
      cy.get('.create-btn').click()
      cy.get('#toggle-btn').click()

      cy.get('.remove-btn').click()
      cy.get('html').should('not.contain', 'title created by cypress')
    })
    it('blogs are ordered according to likes', function async() {
      cy.contains('new create').click()
      cy.get('#focus').type('title 1')
      cy.get('#author').type('author 1')
      cy.get('#url').type('#url created by cypress')
      cy.get('.create-btn').click()

      cy.contains('new create').click()
      cy.get('#focus').type('title 2')
      cy.get('#author').type('author 2')
      cy.get('#url').type('#url created by cypress')
      cy.get('.create-btn').click()
      cy.contains('title 1')
      cy.contains('title 2')
      cy.get('.toggle-btn').eq(0).click()
      cy.get('.toggle-btn').eq(1).click()
      cy.get('.like-btn').eq(1).click()
      cy.wait(600)
      cy.get('.blogPreview').then(($blogs) => {
        console.log('$blogs',$blogs[0].innerHTML)
        cy.wrap($blogs[0].innerText).should('contain','title 2 author 2')
      })
    })
  })
})