import OutHeader from "./OutHeader"

const RegisterPage = () => { 

  const submitForm = (event) => {
        
    var email = event.target.email.value
    var password = event.target.password.value
    
    fetch("/api/user/register", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then((res) => {
      if(res.status === 200) {
        window.location.replace('http://localhost:3000/login')
      }
    })  
  }

    return (
      <>
        <OutHeader/>
        <h1>registeration</h1>
        <form id="register-form" onSubmit={(event) => {
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
  
export default RegisterPage;