import "./Filterbar.css"
import { NavLink } from "react-router-dom";
 import "./Filterbar.css"
export default function FilterBar(){
    return(
        <>
        <div className="leftSideFilterContainer">
            <div className="filterHeading">
                <h2>Filters</h2>
                <NavLink>Clear</NavLink>
            </div>
            <div className="categoryContainer">
                <h2>category</h2>
                <label>
                    <input type="checkbox"/>
                    men
                </label>
                <label>
                    <input type="checkbox"/>
                    women
                </label>
                <label>
                    <input type="checkbox"/>
                    kids
                </label>
                <h2>Ratings</h2>
                <label>
                    <input type="radio" name="rating"/>4 and above
                </label>
                <label>
                    <input type="radio" name="rating"/>3 and above
                </label> <label>
                    <input type="radio" name="rating"/>2 and above
                </label> <label>
                    <input type="radio" name="rating"/>1 and above
                </label>
                <h2>sort by price</h2>
                 <label>
                    <input type="radio" name="sort"/>high to low
                 </label>
                 <label>
                    <input type="radio" name="sort"/>low to high</label>
            </div>
        </div>
        </>
    )
}

