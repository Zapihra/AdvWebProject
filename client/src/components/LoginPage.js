import OutHeader from "./OutHeader"

const LoginPage = () => { 

    const submitForm = (event) => {
          
      var email = event.target.email.value
      var passw = event.target.password.value

      //handles the user login
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
              window.location.replace('http://localhost:3000/tclone')
            }
            else {
              var body = document.getElementsByTagName("body")
              body[0].appendChild(document.createTextNode("Invalid credentials"))
            }
        })  
    }
  
      return (
        <>
          <OutHeader/>
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