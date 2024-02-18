import "./css/chatPage.css"
import { useEffect, useState } from "react"

const ChatPage = () => {
    let [fetchedList, setFetchList] = useState();
    let [fetchedChat, setFetchChat] = useState("click a chat");
    useEffect(() => {
        let mounted = true;

        function fetchList() {
            fetch('http://localhost:1234/chat/matched', {
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
                var fetchedList = res.map((item) =>
                    <h5 key={item[0]} onClick={(e) => handleClick(item[1])}>{item[1]}</h5>
                )
                
                setFetchList(fetchedList)
            })
        }
        fetchList()

        return () => {mounted = false}

    }, [])

    const handleClick = (name) => {
        window.location.replace(`http://localhost:3000/chats/${name}`)
    }

    return(
        <>
        
        <div className="container">
            <div className="sidebar">
                {fetchedList}
            </div>
            <div className="main">
                {fetchedChat}
            </div>
        </div>
        </>
    )
}

export default ChatPage;