import { useEffect, useState } from "react";
import "./css/img.css"

const Img = (props) => {
    
    var [image, setImage] = useState();
    
    useEffect(()=> {
        //checking if user has a photo
        if (props.photo === undefined){
            return
        }
        
        //getting the photo from server
        fetch(`http://localhost:1234/uploads/${props.photo}`, {
            method: "get"
        }).then((res) => {
            if(res.status === 404) {
                return 0;
            }
            return res.blob()})
        .then((img) => {
            if (img === 0){
                setImage(0)
                return
            }
            setImage(URL.createObjectURL(img))
        })
        
    
    }, []);
    if(image) {
        //showing the image
        return(<>
    
            <img src={image}></img>
        
        </>)
    }
    
}

export default Img