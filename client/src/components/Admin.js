const Admin = (props) => {

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

    const deleteUser = () => {
        console.log("hello")
    }

    const deleteInfo = () => {
        console.log("here")
    }
    var data = props.data

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
            change email: <br/>
            <form onSubmit={event => {
                event.preventDefault()
                sendEmail(event)}}>
            <input id="email" type='email'/>
            <button id="sendEmail">Send</button>
            </form>

            <br/>
            <h4>Info</h4>
            <p id="infoData">{data.info}</p> <br/> 
            info:   
            <form onSubmit={event => {
                event.preventDefault()
                sendInfo(event)}}>
            <textarea id="info"/>
            <button id="sendInfo">Send</button>
            </form>

            delete info: <br/>  
            <button id="deleteInfo" onClick={() => deleteInfo()}>Delete Info</button>
        </div></>)
    }
    else {
        return(<>
        <div>
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
