import { useState, useEffect } from 'react';
const InfoPage = () => {
    //console.log(localStorage.getItem('auth_token'))
    //fetch('api/private')

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
            return res.json()
        }).then((res) => {
            console.log(res)
        })

    const submitForm = (event) => {
       //console.log("hello")
        
       var name = event.target.name.value
       var info = event.target.info.value
    
    //    console.log(name, info)
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