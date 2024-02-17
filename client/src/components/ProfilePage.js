import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorPage from './ErrorPage';

const ProfilePage = () => {
    
    let {id} = useParams()
    const [data, setData] = useState({});

    useEffect(() => {
        const api = async () => {
            var res = await fetch(`/api/user/${id}`, 
            {headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token')}})
            
            if (res.status === 404) {
                setData(0)
            }
            else {
                var resJson = await res.json()
                setData(resJson)
            }
            
        }

        api()
        
    }, []);

    const sendEmail = (event) => {
        
        fetch('/api/update/email', { 
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "email": event.target.email.value
        })}).then(res => {return res.json()})
        .then((res) => {console.log(res)})
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

        
    if (data === 0) {
        return(<><ErrorPage/></>)
    }
    else if (data.email === undefined) {

        return(<>
            <div>
                <h3>
                    {data.name} <br/>
                    {data.info}
                </h3>
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
            {data.info} <br/> 
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

export default ProfilePage;