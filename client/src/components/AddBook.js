
const AddBook = () => { 
    const submitForm = (event) => {
      //console.log("hello")
      
      var name = event.target.name.value
      var author = event.target.author.value
      var pages = event.target.pages.value
  
      //console.log(name, author, pages)
      fetch("/api/book", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify({
          "name": name,
          "author": author,
          "pages": pages
        })
      })  
    }
  
    return (
      <>
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          submitForm(event)
  
        }}>
          name<input id="name"/> <br/>
          author<input id="author"/> <br/>
          pages<input id="pages" type="number"/><br/>
          <input id="submit" type="submit" />
        </form>
      </div>
      
      </>
    );
    }  
  
export default AddBook;
  