const LoginPage = () => { 

    const submitForm = (event) => {
          
      var email = event.target.email.value
      var password = event.target.password.value
      
      //console.log(name, author, pages)
      //fetch("/api/book", {
      //  method: "POST",
      //  headers: {
      //  "Content-Type": "application/json"},
      //  body: JSON.stringify({
      //    "name": name,
      //    "author": author,
      //    "pages": pages
      //  })
      //})  
    }
  
      return (
        <>
          <h1>Login</h1>
          <form id="login-form" onSubmit={(event) => {
            event.preventDefault()
            submitForm(event)
          }}>
              email <input id="email" type="email"/><br/>
              password <input id="password" type="password"/> <br/>
              <input id="submit" type="submit"/>
          </form>
        </>
      );
      }  
    
  export default LoginPage;