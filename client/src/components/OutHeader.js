//navbar from bootstrap website
//https://getbootstrap.com/docs/4.1/components/navbar/

//header for not logged in users
const OutHeader = (props) => {
    
 return( <>
    <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/login">Login</a>
        <a className="navbar-brand" href="/register">Register</a>
    </nav>
</>)
}

export default OutHeader;