import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorPage from './ErrorPage';
import Admin from './Admin';

const ProfilePage = () => {
    
    let {id} = useParams()
    const [data, setData] = useState(1);

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
    
    if (data === 0) {
        return(<><ErrorPage/></>)
    }
    else if (data === 1){}
    else if (data.email === undefined) {
        var date = data.date.toString().slice(0,10)
        
        
        return(<>
            <div>
                <h3>{data.name}</h3>
                <a>User since {date}</a>
                <p>{data.info}</p>
                
                    
            </div></>)
    }
    else {
        return(
            <>
                <Admin data={data}/>
            </>
        )
    }

}  

export default ProfilePage;