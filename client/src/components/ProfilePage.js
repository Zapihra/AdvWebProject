import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorPage from './ErrorPage';
import Admin from './Admin';
import Header from "./Header";
import Img from './Img';

const ProfilePage = () => {
    
    let {id} = useParams()
    const [data, setData] = useState(1);
    var [name, setName] = useState();

    useEffect(() => {
        const api = async () => {
            //fetching user data
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
    useEffect(() => {
        //fetching the name of user for profile link
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


    if (data === 0) {
        //returning error if nothing is found
        return(<><ErrorPage/></>)
    }
    else if (data === 1){}
    else if (data.email === undefined) {
        //showing other user profile
        var date = data.date.toString().slice(0,10)
        
        return(<>
            <div>
                <Header name={name}/>
                <Img photo={data.photo}/>
                <h3>{data.name}</h3>
                <a>User since {date}</a>
                <p>{data.info}</p>
                  
            </div></>)
    }
    else {
        //showing admin or own profile
        return(
            <>  
                <Header name={name}/>
                <Img photo={data.photo}/>
                <Admin data={data}/>
            </>
        )
    }

}  

export default ProfilePage;