import { useEffect, useState } from "react";

const Admin = (props) => {
    var bool = true;

    //handling email change
    const sendEmail = (event) => {
        
        fetch('/api/update/email', { 
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "email": event.target.email.value
        })})
    }

    //handling info/bio change
    const sendInfo = (event) => {
        
        fetch('/api/update/info', { 
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "info": event.target.info.value
        })})
    }

    //handling password change
    const sendPassword = (event) => {
        
        fetch('/api/update/password', { 
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "password": event.target.password.value
        })})
    }

    //admin delete user from database
    const deleteUser = () => {
        console.log(bool)
        if (bool === true) {
            bool = false;
            fetch('/admin/user/' + data.name, { 
                method: 'DELETE',
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('auth_token')
            }})
        }
        window.location.replace('http://localhost:3000/tclone')
        
    }

    //admins can delete info
    const deleteInfo = () => {
        fetch('/admin/info/' + data.name, { 
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token')
            }})
    }

    //uploading picture useState for sending
    var [file, setFile] = useState();
    const fileChange = (e) => {
        
        //checking if there is file on filechange
        if(e.target) {
            setFile(e.target.files[0])
        }}
        
    //sending image to server
    const sendFile = () => {
        const formData = new FormData();
        formData.append("file", file)


        fetch('/api/picture/update', {
            method: "POST",
            headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            
            },
            body: formData
        })
        window.location.reload()
    }
        
    //handling the data and date to more easier use
    var data = props.data
    var date = data.date.toString().slice(0,10)

    //returned if user is existing 
    //so in other words the admin is logged in
    if (data.user) {
        
        return( 
        <>
        <div>
            <h3>
                {data.name} <br/>
                
            </h3>
            <button id="deleteUser" onClick={() => deleteUser()}>delete user</button>
            <br/>

            {data.email} <br/>
            
            <br/>
            <h4>Info</h4>
            <a>User since {date}</a>
            <p id="infoData">{data.info}</p> <br/> 
            
            delete info: <br/>  
            <button id="deleteInfo" onClick={() => deleteInfo()}>Delete Info</button>
        </div></>)
    }
    else {
        //returned if anybody else than admin is 
        //logged in for their own profile modification possibility
        return(<>
        <div>

            <img src={props.image}></img>
            change picture
            <input id="file" type="file" onChange={fileChange}></input> <br/>
            <button id="sendPicture" onClick={()=> sendFile()}>Send</button>

            <h3>
                {data.name} <br/>
                
            </h3>
            {data.email} <br/>
            change email: <br/>
            <form onSubmit={event => {
                event.preventDefault()
                sendEmail(event)}}>
            <input id="email" type='email'/>
            <button id="sendEmail">Send</button>
            </form>

            <br/>
            <h4>Info</h4>
            <a>User since {date}</a> <br/>
            <p id="infoData">{data.info}</p> <br/> 
            
            update info:   
            <form onSubmit={event => {
                event.preventDefault()
                sendInfo(event)}}>
            <textarea id="info"/>
            <button id="sendInfo">Send</button>
            </form>

            change password:   
            <form onSubmit={event => {
                event.preventDefault()
                sendPassword(event)}}>
            <input id="password"/>
            <button id="sendPassword">Send</button>
            </form>

        </div></>)
    }
}

export default Admin;
