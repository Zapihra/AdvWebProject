const LoginPage = () => { 

    const submitForm = (event) => {
          
      var email = event.target.email.value
      var passw = event.target.password.value

      fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                "email": email,
                "password": passw
            }),
            headers: { 
            'Content-Type': "application/json"} 
        }).then(function (response) {return (response.json())})
        .then(function(res) {
            if(res.success === true) {
                localStorage.setItem('auth_token', res.token)
                console.log("success")
                //window.location.replace('http://localhost:3000/')
            }
            else {
                var body = document.getElementById("body")
                body.appendChild(document.createTextNode("Invalid credentials"))
            }
        })  
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