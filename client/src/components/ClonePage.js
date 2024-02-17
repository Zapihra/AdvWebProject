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
            
            if (res !== undefined) {
                setData(res)
            }
            else {
                setData(0)
            }
        })

    }, []);

    const liked = () => {
        console.log("liked")
    }

    const disliked = () => {
        console.log("disliked")
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