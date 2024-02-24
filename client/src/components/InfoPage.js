import { useState } from "react";

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

    var [file, setFile] = useState();
    const fileChange = (e) => {
        //console.log(e.target.value)
        if(e.target) {
            //var photo = .split('th\\')
            //console.log(photo)
            setFile(e.target.files[0])
        }}

    const submitForm = (event) => {

       const formData = new FormData();
       formData.append("file", file)
       
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
            //else if (res.res === 'ok') {
            //    window.location.replace("http://localhost:3000/tclone")
            //}
        })
        if(file) {
            fetch('/api/picture', {
                method: "POST",
                headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
                
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