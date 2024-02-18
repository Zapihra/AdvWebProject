import { useEffect, useState } from "react";

const ClonePage = () => {

    const [data, setData] = useState({});
    
    useEffect(() => {
        fetch('/api/neutral', {headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token')}
        }).then((res) => {
            if (res.statusText === 'Unauthorized'){
                window.location.replace("http://localhost:3000/login")
            }
            return res.json()})
        .then((res) => {
            
            if (res.res !== 0) {
                setData(res)
            }
            else {
                setData(0)
            }
            return
        })

    }, []);

    const liked = () => {
        fetch('/api/opinion/liked', {
            method: 'PUT',
            headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
            },
            body: JSON.stringify({name: data.name})
        }).then((res)=> {
            if(res.status === 200 || res.status === 304) {
                window.location.reload()
            }
        })

        fetch('/chat/check', {
            method: 'POST', 
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
                'Content-Type': "application/json"
            },
            body: JSON.stringify({name: data.name})
        })
        
    }

    const disliked = () => {
        fetch('/api/opinion/dislike', {
            method: 'PUT',
            headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
            },
            body: JSON.stringify({name: data.name})
        }).then((res)=> {
            if(res.status === 200 || res.status === 304) {
                window.location.reload()
            }
        })
    }

    if (data !== 0) {

        return(
            <>
            <div>
                <div>
                    {data.name} <br/>
                    {data.info} <br/>
                </div>
    
                <button id="like" onClick={() => liked()}>like</button>
                <button id="dislike" onClick={() => disliked()}>dislike</button>
            </div>                
            </>
            )

        
    }
    else{
        return(
            <>
                <div>
                    all profiles have been liked or disliked
                </div>
            </>
            )
    }
    
}

export default ClonePage;