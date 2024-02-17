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
        
    if (data === 0) {
        return(<><ErrorPage/></>)
    }
    else if (data.email == undefined) {

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
                {data.email} <br/>
                {data.name} <br/>
                {data.info}
            </h3>

            

        </div></>)
    }
    
    
    
    

}  

export default ProfilePage;