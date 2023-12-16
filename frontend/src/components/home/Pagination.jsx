import React from 'react';
import { Link } from "react-router-dom";
import { BsChevronDoubleLeft,BsChevronDoubleRight } from "react-icons/bs";
const Pagination = ({pageNumber,parPage,itemCount,path}) => {

    let totalPage = Math.ceil(itemCount/parPage);
    let startLink = pageNumber
    let diff = totalPage - pageNumber

    if(diff<=4){
        startLink = parseInt(totalPage) - 4;
    }
    let endLink = parseInt(startLink) + 4 ;

    if(startLink <=0){
        startLink = 1 ;
    }
    const createLink  = () =>{
        const storeLink = [] ;

        for(var i = startLink ; i<endLink ; i++){
            storeLink.push(
                <li key={i} className={parseInt(pageNumber) === i ? 'active':''}><Link to={`${path}/page-${i}`} >{i}</Link></li>
            )
        }
        return storeLink
    }
    const nextPage = () =>{
        if(pageNumber<totalPage){
            return <li><Link to={`${path}/page-${parseInt(pageNumber) + 1}`}><BsChevronDoubleRight/></Link></li>
        }else{
            return <button className='not-hover' disabled ><span><BsChevronDoubleRight/></span></button>
        }
    }
    const prePage = () =>{
        if(pageNumber>1){
            return <li><Link to={`${path}/page-${parseInt(pageNumber) - 1}`}><BsChevronDoubleLeft/></Link></li>
        }else{
            return <button className='not-hover' disabled ><span><BsChevronDoubleLeft/></span></button>
        }
    }
    return <div className='pagination'>
        <ul>
            {prePage()}
            {createLink()}
            {nextPage()}
        </ul>
    </div>;
};

export default Pagination;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

// const Pagination = ({ pageNumber, parPage, itemCount, path }) => {
//   const totalPage = Math.ceil(itemCount / parPage);

//   // Calculate start and end pages
//   let startLink = Math.max(1, pageNumber - 2);
//   let endLink = Math.min(totalPage, startLink + 4);

//   // Ensure that we always show 5 page links
//   if (endLink - startLink < 4) {
//     startLink = Math.max(1, endLink - 4);
//   }

//   const createLink = () => {
//     const storeLink = [];

//     for (let i = startLink; i <= endLink; i++) {
//       storeLink.push(
//         <li key={i} className={parseInt(pageNumber) === i ? 'active' : ''}>
//           <Link to={`${path}/page-${i}`}>{i}</Link>
//         </li>
//       );
//     }
//     return storeLink;
//   };

//   const nextPage = () => {
//     if (pageNumber < totalPage) {
//       return (
//         <li>
//           <Link to={`${path}/page-${parseInt(pageNumber) + 1}`}>
//             <BsChevronDoubleRight />
//           </Link>
//         </li>
//       );
//     } else {
//       return (
//         <button className="not-hover" disabled>
//           <span>
//             <BsChevronDoubleRight />
//           </span>
//         </button>
//       );
//     }
//   };

//   const prePage = () => {
//     if (pageNumber > 1) {
//       return (
//         <li>
//           <Link to={`${path}/page-${parseInt(pageNumber) - 1}`}>
//             <BsChevronDoubleLeft />
//           </Link>
//         </li>
//       );
//     } else {
//       return (
//         <button className="not-hover" disabled>
//           <span>
//             <BsChevronDoubleLeft />
//           </span>
//         </button>
//       );
//     }
//   };

//   return (
//     <div className="pagination">
//       <ul>
//         {prePage()}
//         {createLink()}
//         {nextPage()}
//       </ul>
//     </div>
//   );
// };

// export default Pagination;
