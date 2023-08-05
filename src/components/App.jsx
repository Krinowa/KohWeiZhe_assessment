import React, {useEffect, useState} from 'react';
import Paginate from './Paginate';
import '../styles/index.css';
import '../styles/paginate.css';


function App() {
  const [posts, setPosts] = useState(null);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    //fetching the post list from api
    fetch('/api/posts')
    .then(res => res.json())
    .then(json => setPosts(json.posts))
    .catch(error => console.log(error)) 

    //Set the current page to 1 if changing the category through dropdown list
    setCurrentPage(1);
  }, [selected]);

  
  // Function to handle the category selection using the set api which store unique object
  const unique_categories = new Set(
    posts?.flatMap((post) => post.categories.map((category) => category.name))
  );

  // Setting the targeted category name and passing the value to the selected
  const setSelectedCategory = (e) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    setSelected(selectedCategory);
  }

  //Getting the filtered list based on the category
  const filteredPosts = selected? posts?.filter((post) => post.categories.some((category) => category.name === selected)): posts ;

  
  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredPosts?.slice(indexOfFirstItem, indexOfLastItem);


  //getting the page number if clicked and set current page to that clicked page
  const pageSelected = (pageNumber) => {

    setCurrentPage(pageNumber);

  };

  
  return (
      <div className='container'>
            <h1 className="text_center">Posts</h1>

            {/*Display the dropdown list by converting it back to array to map the component*/}
            <select className="category_filter" onChange={setSelectedCategory}> 
              <option value="">All Categories</option>
              {/*Getting the unique category name and out in a array to display it*/}
              {Array.from(unique_categories).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <br/>
            {/*Display the table*/}
            {filteredPosts?.length > 0 ? (
              <div className="content">
                <table>
                  <thead>
                      <tr>
                        <th>title</th>
                        <th>publish date</th>
                        <th>author</th>
                        <th>summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*mapping the the header and display in the table*/}
                      {currentItems.map(({id, title, publishDate, author, summary}) => (
                        <tr key={id}>
                          <td>{title}</td>
                          <td>{publishDate}</td>
                          <td className="author"><img src={author.avatar}  alt="avatar"/> <br/> {author.name} </td>
                          <td>{summary}</td>
                        </tr>
                      ))}
                    </tbody>
                    
                </table>
                {/*The pagination and passing the data into the parameter of the paginate component*/}
                <Paginate
                  postsPerPage={itemsPerPage}
                  totalPosts={filteredPosts?.length}
                  pageSelected={pageSelected}
                />
                
              </div>
            
              
            ):(
              //if dun have any post display no posts message
              <p>No posts</p>
            )}
      </div>
  );
  
}

export default App;
