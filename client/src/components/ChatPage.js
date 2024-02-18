import "./css/chatPage.css"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

const ChatPage = () => {
    let {id} = useParams();
    let [fetchedList, setFetchList] = useState();
    let [fetchedChat, setFetchChat] = useState("click a chat!");

    useEffect(() => {
        let mounted = true;

        function fetchList() {
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

                if (id === "main") {
                    var fetchedList = res.map((item) =>
                        <h5 key={item[0]} onClick={(e) => handleClick(item[1])}>{item[1]}</h5>
                    )
                    setFetchList(fetchedList)
                }
                else {
                    //console.log(res)
                    
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
        }
        fetchList()

        return () => {mounted = false}

    }, [])

    const handleClick = (name) => {
        window.location.replace(`http://localhost:3000/chats/${name}`)
    }

    const sendText = (e) => {
        //console.log(e.target.area.value)
        fetch('/chat/add', {
            method: 'POST',
            headers: {
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
            'Content-Type': "application/json"
            },
            body: JSON.stringify({"name": id, "msg": e.target.area.value})
        })
    
    }
    const reload = () => {
        window.location.reload()
    }
    if (id === 'main') {
        return(
            <>
            
            <div className="container">
                <div className="sidebar">
                    {fetchedList}
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
    return(
        <>
        
        <div className="container">
            <div className="sidebar">
                {fetchedList}
            </div>
            <div className="main">
                <button onClick={() => reload()}>reload</button> <br/>
                {fetchedChat}
                <form onSubmit={(e) => {
                    //e.preventDefault()
                    sendText(e)
                }}>
                    <textarea id="area"/> <br/>
                    <input type="submit"/>
                </form>
            </div>
        </div>
        </>
    )}
}

export default ChatPage;