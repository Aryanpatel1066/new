// const FilterReducer = (state, action) => {
//     switch (action.type) {
    
//       case "SET_CATEGORY_FILTER":
//         return {
//           ...state,
//           categoryFilter: state?.categoryFilter?.includes(action.payload)
//             ? state?.categoryFilter?.filter(
//                 (category) => category !== action.payload
//               )
//             : [...state?.categoryFilter, action.payload],
//         };
     
//       case "SET_RATING_FILTER":
//         return {
//           ...state,
//           ratingFilter: action.payload,
//         };
//       case "SET_SORTBYPRICE_FILTER":
//         return {
//           ...state,
//           sortByPriceFilter: action.payload,
//         };
//       case "CLEAR_ALL_FILTERS":
//         return {
//           search: "",
//           priceRange: 10000,
//           categoryFilter: [],
//           brandFilter: [],
//           ratingFilter: "",
//           sortByPriceFilter: "",
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default FilterReducer;