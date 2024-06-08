import '../assets/css/Home.css';
import {topGenreList} from '../types';
import {Link, useNavigate} from "react-router-dom";


/*const categoryImageFileName = (category) => {
  let name = category.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};*/


function HomeTopGenreList(){
    const navigate = useNavigate();
    return(
        <div className="genre-boxes">
            {topGenreList.map((genre) => (
                <Link key={genre.name} className={"genre-box "+(genre.name.toLowerCase())} to={`/categories/${genre.name}`} onClick={()=> navigate(`/categories/${genre.name}`)}>
                    <div className="genre-text">{genre.name}</div>
                </Link>
            ))} </div>
  // <ul className ="home-list">
  //     {categoryList.map((category) => (
  //         <li className="home-list-li">
  //   <img src={categoryImages[category.name.toLowerCase()]}
  //        alt="book.title"
  //   />
  //             <div className="home-list-div"> {category.name} </div>
  //         </li>
  //     ))}
  //
  //
  // </ul>

)
}
export default HomeTopGenreList;
