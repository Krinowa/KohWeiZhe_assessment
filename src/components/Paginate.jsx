import React from 'react';
import '../styles/paginate.css';

 function Paginate ({postsPerPage, totalPosts, pageSelected}) {
    const pageNumbers = [];
    //getting the page numbers and putting into the pageNumbers array
    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) 
    {
        pageNumbers.push(i);
      
    }

    return (
        <div className="paginate-container">
            
            <ul className="paginate">
                {/*using the page numbers and loop to display the page number button, adding onClick event to
                   make it display the next page when click the page number button*/}
                {pageNumbers.map((number) => 
                <li key = {number} onClick={() => pageSelected(number)} className="page-number">{number}</li>
                )}
            </ul>
        </div>
    );
};

export default Paginate;