const InfoPage = () => {

    const submitForm = (event) => {
        //console.log("hello")
        
        var name = event.target.name.value
        var info = event.target.info.value
    
        console.log(name, info)
        //fetch("/api/book", {
        //  method: "POST",
        //  headers: {
        //  "Content-Type": "application/json"},
        //  body: JSON.stringify({
        //    "name": name,
        //    "author": author,
        //    "pages": pages
        //  })
        //})  
    }

    return(
        <>
        <div>
        
            <form onSubmit={(event) => {
            event.preventDefault()
            submitForm(event)
    
            }}>
            name<input id="name"/> <br/>
            info about me <br/><textarea id="info"/> <br/>
            <input id="submit" type="submit"/>
            </form>
        </div>
        
        </>
    )
}

export default InfoPage;