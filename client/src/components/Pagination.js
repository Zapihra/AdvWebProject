import "./css/pagination.css"

const Pagination = (props) => { 
//console.log(props.list, props.page)
var list = props.list
var page = props.page
var list1 = [];
var j = 0;
var pags = []

if(list.length <=10) {
    return(
        <>
        {list}
        </>
    )
}
else if(list.length <=20) {
    pags.push(1,2)
}
else if(list.length <=30) {
    pags.push(1,2,3)
}
else if(list.length <=40) {
    pags.push(1,2,3,4)
}
else if(list.length <=50) {
    pags.push(1,2,3,4,5)
}

var pagsList = pags.map((item) =>
    <a href={item} key={item}>{item}</a>
)

if (page === '1') {
    for (let i = 0; i < 10; i++) {
        list1[i] = list[i];
    }
} else if (page === '2') {
    j = 10
    for (let i = 0; i < 10; i++) {
        list1[i] = list[j];
        j++
    }
}
else if (page === '3') {
    j = 20
    for (let i = 0; i < 10; i++) {
        list1[i] = list[j];
        j++
    }
}
else if (page === '4') {
    j = 30
    for (let i = 0; i < 10; i++) {
        list1[i] = list[j];
        j++
    }
}
else if (page === '5') {
    j = 40
    for (let i = 0; i < 10; i++) {
        list1[i] = list[j];
        j++
    }
}


return(
<>
{list1}
<div className="pagination">
  {pagsList}
</div>
</>
)}

export default Pagination;