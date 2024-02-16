import { useState, useEffect } from 'react';
const InfoPage = () => {
    //console.log(localStorage.getItem('auth_token'))
    //fetch('api/private')

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
    //.then(function (res){
        //console.log(res.statusText)
        //if (res.statusText === 'Unauthorized'){
        //    window.location.replace("http://localhost:3000/login")
        //}
        //else{
        //    return console.log(res.status)
        //}
    //})

    const submitForm = (event) => {
       //console.log("hello")
        
       var name = event.target.name.value
       var info = event.target.info.value
    
    //    console.log(name, info)
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