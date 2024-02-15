import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorPage from './ErrorPage';

const ProfilePage = () => {
    
    let {id} = useParams()
    const [data, setData] = useState({});

    useEffect(() => {
        const api = async () => {
            var res = await fetch(`/api/user/${id}`)
            
            if (res.status === 404) {
                setData(0)
            }
            else {
                var resJson = await res.json()
                console.log(resJson)
                setData(resJson)
            }
            
        }

        api()
        
    }, []);
        
    if (data === 0) {
        return(<><ErrorPage/></>)
    }
    else {
        return(<>
        <div>
            <h3>
                {data.email} <br/>
                
            </h3>
        </div></>)
    }
    
    
    
    

}  

export default ProfilePage;