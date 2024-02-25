import "./css/chatPage.css"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import Pagination from "./Pagination";
import Header from "./Header";
import Img from "./Img"

const ChatPage = () => {
    let {id,page} = useParams();
    let [fetchedList, setFetchList] = useState();
    let [fetchedChat, setFetchChat] = useState("click a chat!");
    var [name, setName] = useState();
    var [photo, setPhoto] = useState();

    useEffect(() => {

        if (id !== "main") {
            //fetchin picture if we are not in the chats main page
            fetch(`/api/photo/${id}`, {
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('auth_token')},
                    
            }).then((res) => {
                if (res.statusText === 'Unauthorized'){
                    window.location.replace("http://localhost:3000/login")
                }
                return res.json()})
            .then((res) => {
                
                if (res.length === 0) {
                    setPhoto(undefined)
                }
                else {
                    setPhoto(res.photo)
                }
                
            })
        }

            //fetching all the persons that are matched
            fetch(`/chat/matched/${id}`, {
                method: 'GET', 
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('auth_token')
                }
            }).then((res) => {
                if (res.statusText === 'Unauthorized'){
                    window.location.replace("http://localhost:3000/login")
                }
                return res.json()
            }).then((res)=> {
                //if in main page we only return the sidebar list of names
                if (id === "main") {
                    var fetchedList = res.map((item) =>
                        <h5 key={item[0]} onClick={(e) => handleClick(item[1])}>{item[1]}</h5>
                    )
                    setFetchList(fetchedList)
                }
                else {
                    
                    //if in chat with someone we also define the chat 
                    var fetchedList = res[1].map((item) =>
                        <h5 key={item[0]} onClick={(e) => handleClick(item[1])}>{item[1]}</h5>
                    )
                    setFetchList(fetchedList)

                    var fetchedChat = res[0].map((item, index) => 
                        <p key={index}>{item[0]}: {item[1]}</p>
                    )
                    if (fetchedChat.length == 0) {
                        setFetchChat("start chat by writing")
                    }
                    else {
                        setFetchChat(fetchedChat)
                    }
                }
                                
            })
        

        return

    }, [])

    useEffect(() => {
        //getting the users name for profile
        fetch('http://localhost:1234/api/private', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('auth_token')}
        }).then((res) => {
            if (res.statusText === 'Unauthorized'){
                window.location.replace("http://localhost:3000/login")
            }
            return res.json()})
        .then((res) => {
            setName(res)
        })
        
    }, []);

    //moving from one chat to another
    const handleClick = (name) => {
        window.location.replace(`http://localhost:3000/chats/${name}/${page}`)
    }

    //sending text to another user
    const sendText = (e) => {

        fetch('/chat/add', {
            method: 'POST',
            headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
            },
            body: JSON.stringify({"name": id, "msg": e.target.area.value})
        })
    
    }

    //reloading function for reload button
    const reload = () => {
        window.location.reload()
    }

    //handling move to another persons profile
    const goProfile = () => {
        window.location.replace(`http://localhost:3000/profile/${id}`)
    }
    
    if(fetchedList) {
        if (id === 'main') {

            //returning only sidebar functionality
            return(
                <>
                <Header name={name}/>
                <div className="container">
                    <div className="sidebar">
                    <Pagination list={fetchedList} page={page} />
                    </div>
                    <div className="main">
                        <button onClick={() => reload()}>reload</button> <br/>
                        {fetchedChat}
                    </div>
                </div>
                </>
            )
        }
        else {

            //returning the chat with the sidebar
            return(
                <>
                <Header name={name}/>
                <div className="container">
                    <div className="sidebar">
                        <Pagination list={fetchedList} page={page} />
                    </div>
                    <div className="main">
                        <button onClick={() => reload()}>reload</button> <br/>
                        <Img photo={photo}/>
                        <h5 onClick={() => goProfile()}>{id}</h5> <br/>
                        {fetchedChat}
                        <form onSubmit={(e) => {
                            sendText(e)
                        }}>
                            <textarea id="area"/> <br/>
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
                </>
            )
        }
    }
}

export default ChatPage;