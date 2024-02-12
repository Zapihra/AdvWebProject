import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorPage from './ErrorPage';

const BookPage = () => {
    let {id} = useParams()
    const [data, setData] = useState({});

    useEffect(() => {
        const api = async () => {
            var res = await fetch(`/api/getBook/${id}`)
            
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
                {data.name} <br/>
                {data.author} <br/>
                {data.pages}
            </h3>
        </div></>)
    }
    
    
    
    

}  
  
export default BookPage;