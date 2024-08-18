import "./Filterbar.css"
import { NavLink } from "react-router-dom";
 
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
                    <input type="radio"/>4 and above
                </label>
                <label>
                    <input type="radio"/>3 and above
                </label> <label>
                    <input type="radio"/>2 and above
                </label> <label>
                    <input type="radio"/>1 and above
                </label>
                <h2>sort by price</h2>
                 <label>
                    <input type="radio"/>high to low
                 </label>
                 <label>
                    <input type="radio"/>low to high</label>
            </div>
        </div>
        </>
    )
}