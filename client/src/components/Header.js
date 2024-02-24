//navbar from bootstrap website
//https://getbootstrap.com/docs/4.1/components/navbar/

const Header = (props) => {
    var url = "/profile/" + props.name

    const logOut = () => {
      localStorage.removeItem("auth_token")
    }

 return( <>
<nav className="navbar navbar-light bg-light">
  <a className="navbar-brand" href="/chats/main/1">Chat</a>
  <a className="navbar-brand" href="/tclone">TinderClone</a>
  <a className="navbar-brand" href={url}>Profile</a>
  <a className="navbar-brand" href="/login" onClick={() => {logOut()}}>Logout</a>
</nav>
</>)
}

export default Header;