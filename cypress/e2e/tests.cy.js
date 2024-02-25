//test 1
describe('register', () => {
  it('user should be able to register', () => {
    cy.visit('http://localhost:3000/register')
    //help at https://stackoverflow.com/questions/54113654/creating-a-random-string-in-cypress-and-passing-this-to-a-cy-command
    var user = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      user += possible.charAt(Math.floor(Math.random() * possible.length));
    //
    Cypress.env('user', user)
    cy.get('input[id=email]').type(user + "@email")
    cy.get('input[id=password]').type(user + 123)
    cy.get('input[id=submit]').click()

    cy.url().should('include', '/login')
  })
})

//test 2
describe('login', () => {
  it('user should be able to login', () => {
    var user = Cypress.env('user')
    cy.visit('http://localhost:3000/login')
    cy.get('input[id=email]').type(user + "@email")
    cy.get('input[id=password]').type(user + 123)
    cy.get('input[id=submit]').click()
    
    cy.wait(500)

    cy.getLocalStorage("auth_token").should("exist")
    cy.saveLocalStorage()
  })
})

//test 3
describe('info', () => {
  it('after logging in the customer should be able to define information', () => {
    var user = Cypress.env('user')
    cy.restoreLocalStorage()
    cy.visit("http://localhost:3000/info")
    cy.get("[id=name]").type(user)
    cy.get("[id=info]").type(user)
    cy.get("[id=submit").click()

    cy.url().should('include', '/tclone')
  })
  
})

// test 4
describe('change info', () => {
  it('user should be able to change own info', () => {
    cy.restoreLocalStorage()

    //randomaizing text for checking if it updates
    //help at https://stackoverflow.com/questions/54113654/creating-a-random-string-in-cypress-and-passing-this-to-a-cy-command
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    //

    var user = Cypress.env('user') 

    cy.getLocalStorage("auth_token").should("exist")
    cy.visit("http://localhost:3000/profile/" + user)
    cy.get("textarea[id=info]").type(text)
    cy.get("button[id=sendInfo]").click()
    cy.reload()
    cy.get("p[id=infoData]").invoke('text').should("eq", text)

  })
})

// test 5
describe('view', ()=> {
  it('user should not be able to change others info but view them', () => {
    cy.restoreLocalStorage();
    cy.visit("http://localhost:3000/profile/bb");
    cy.get("textarea[id=info]").should('not.exist');
    cy.get("h3").invoke('text').should("eq", "bb")
    cy.get("p").invoke('text').should("exist")
  })
})

// test 6
describe('interest', ()=> {
  it('user should user should be able to like and dislike other users', () => {
    cy.restoreLocalStorage();
    cy.visit("http://localhost:3000/tclone")
    cy.intercept('PUT', '/api/opinion/liked').as('putLiked')
    cy.wait(500)
    cy.get("[id=like]").click()
    cy.wait('@putLiked').then((intercept) => {
      const {statusCode} = intercept.response
      expect(statusCode).to.eq(200)
    })
    cy.intercept('PUT', '/api/opinion/dislike').as('putDislike')
    cy.wait(500)
    cy.get("[id=dislike]").click()
    cy.wait('@putDislike').then((intercept) => {
      const {statusCode} = intercept.response
      expect(statusCode).to.eq(200)
      
    })
  })
})

// test 7
describe('chat', () => {
  it('chat should exist when users have liked each other', () =>{
    cy.visit('http://localhost:3000/login')
    cy.get('input[id=email]').type("aa@aa")
    cy.get('input[id=password]').type("aa")
    cy.get('input[id=submit]').click()
    cy.wait(500)

    cy.visit('http://localhost:3000/tclone')
    cy.wait(500)
    cy.get("[id=like]").click()

    cy.visit('http://localhost:3000/chats/main/1')
    cy.get('a:last').click()
    cy.get('h5:last').invoke('text').should('eq', Cypress.env('user'))
  })
})

// test 8
describe('chatting', () => {
  it('chats should show for the other user', () => {
    var user = Cypress.env('user')
    cy.restoreLocalStorage()
    cy.visit('http://localhost:3000/chats/main/1')
    cy.get('h5:last').click()
    cy.wait(500)
    cy.get("[id=area]").type("Hello")
    cy.get("[type=submit]").click()
    cy.wait(500)

    cy.clearAllLocalStorage()

    cy.visit('http://localhost:3000/login')
    cy.get('input[id=email]').type("aa@aa")
    cy.get('input[id=password]').type("aa")
    cy.get('input[id=submit]').click()
    cy.wait(500)
    cy.visit('http://localhost:3000/chats/main/1')
    cy.get('a:last').click()
    cy.get('h5:last').click()
    cy.wait(500)
    cy.get("p:last").invoke('text').should('eq', user + ": Hello")
  })
})

// test 9
describe('admin', () => {
  it('admin should be able to delete user and their chats', () => {
    var user = Cypress.env('user');
    
    cy.visit('http://localhost:3000/login')
    cy.get('input[id=email]').type("admin@admin")
    cy.get('input[id=password]').type("admin")
    cy.get('input[id=submit]').click()
    cy.wait(500)

    cy.visit("http://localhost:3000/profile/" + user)
    cy.get("[id=deleteInfo]").should("exist")
    cy.get("[id=deleteUser]").should("exist").click()
    cy.url().should('include', "/tclone")

    cy.visit('http://localhost:3000/login')
    cy.get('input[id=email]').type("admin@admin")
    cy.get('input[id=password]').type("admin")
    cy.get('input[id=submit]').click()
    cy.wait(500)
  })
})

// test 10
describe('pager',() => {
  it('pager shoud be used for users that have more than 10 chats', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[id=email]').type("aa@aa")
    cy.get('input[id=password]').type("aa")
    cy.get('input[id=submit]').click()
    cy.wait(500)
    cy.visit('http://localhost:3000/chats/main/1')
    cy.get('[class=pagination]').should('exist')
  })

  it('pager should not be shown for user that have less than 10 chats', () => {
    cy.restoreLocalStorage()
    cy.visit('http://localhost:3000/chats/main/1')
    cy.get('[class=pagination]').should('not.exist')
  })
})




