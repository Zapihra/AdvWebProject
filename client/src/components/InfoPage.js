import { useState } from "react";

const InfoPage = () => {

    //some reason proxy doesn't work here
    //checking if the person is logged in 
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

    var [file, setFile] = useState();
    const fileChange = (e) => {
        //handling the adding picture
        if(e.target) {
            setFile(e.target.files[0])
        }}

    const submitForm = (event) => {

        //hadling the submitting of info and file

        const formData = new FormData();
        formData.append("file", file)
       
        var name = event.target.name.value
        var info = event.target.info.value
        
        //sending all but file
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
        })
        if(file) {
            //sending file
            fetch('/api/picture', {
                method: "POST",
                headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token')
                },
                body: formData
            })
        }
        window.location.replace("http://localhost:3000/tclone")
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

            add picture <br/>
            <input id="file" type="file" onChange={fileChange}></input> <br/>

            <input id="submit" type="submit"/>
            </form>
        
        </div>
        
        </>
    )
}

export default InfoPage;