const Header = (props) => {
    var url = "/profile/" + props.name
 return( <>
<nav className="navbar navbar-light bg-light">
  <a className="navbar-brand" href="/chats/main/1">Chat</a>
  <a className="navbar-brand" href="/tclone">TinderClone</a>
  <a className="navbar-brand" href={url}>Profile</a>
</nav>
</>)
}

export default Header;