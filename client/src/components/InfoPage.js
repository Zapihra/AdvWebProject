const InfoPage = () => {

    //some reason proxy doesn't work here
    fetch('http://localhost:1234/api/private', { 
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token')
        }})
        .then((res) => {
            if (res.statusText === 'Unauthorized'){
                window.location.replace("http://localhost:3000/login")
            }
        })

    const submitForm = (event) => {
       
       var name = event.target.name.value
       var info = event.target.info.value
    
        fetch("/api/public", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          'Authorization': 'bearer ' + localStorage.getItem('auth_token')
          },
          body: JSON.stringify({
            "name": name,
            "info": info
          })
        }).then((res) => {return res.json()
        }).then((res) => { 
            //redirecting based on if crator was a new user or old one
            if (res.res === 'user found') {
                var name = res.user
                window.location.replace(`http://localhost:3000/profile/${name}`)
            }
            else if (res.res === 'ok') {
                window.location.replace("http://localhost:3000/tclone")
            }
        })
    }

    return(
        <>
        <div>
        
            <form onSubmit={(event) => {
            event.preventDefault()
            submitForm(event)
            }}>

            name<input id="name"/> <br/>
            info about me <br/><textarea id="info"/> <br/>
            <input id="submit" type="submit"/>
            </form>
        </div>
        
        </>
    )
}

export default InfoPage;