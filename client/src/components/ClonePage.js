import { useEffect, useState } from "react";
import "./css/clonePage.css"
import {useSwipeable} from "react-swipeable"
import Header from "./Header";

const ClonePage = () => {

    const [data, setData] = useState({});
    const [name, setName] = useState();
    
    useEffect(() => {
        fetch('/api/neutral', {headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token')}
        }).then((res) => {
            if (res.statusText === 'Unauthorized'){
                window.location.replace("http://localhost:3000/login")
            }
            return res.json()})
        .then((res) => {
            
            if (res !== 0) {
                setData(res)
            }
            else {
                setData(0)
            }
            return
        })

    }, []);
    useEffect(() => {
        fetch('http://localhost:1234/api/private', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token')}
        }).then((res) => {
            if (res.statusText === 'Unauthorized'){
                window.location.replace("http://localhost:3000/login")
            }
            return res.json()})
        .then((res) => {
            setName(res.user)
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

    const handlers = useSwipeable({
        onSwipedLeft: () => disliked(),//disliked
        onSwipedRight: () => liked(), //liked
        trackMouse: true
    })
    if(data.res === "info") {
        window.location.replace("http://localhost:3000/info")
    }
    else if (data.res !== 0) {
        var url = "http://localhost:3000/profile/" + data.name
        return(
            <>
            <Header name={name}/>
            
            <div {...handlers} id="handlers">
            
                <div>
                    <a href={url}>{data.name}</a> <br/>
                    {data.info} <br/>
                </div>
    
                <button id="dislike" onClick={() => disliked()}>dislike</button>
                <button id="like" onClick={() => liked()}>like</button>
            </div>                
            </>
            )
    }
    else{
        return(
            <>
                <Header name={name}/>
                <div id="handlers">
                    all profiles have been liked or disliked
                </div>
            </>
            )
    }
    
}

export default ClonePage;