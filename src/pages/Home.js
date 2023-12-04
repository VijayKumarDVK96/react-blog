import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBTypography
} from "mdb-react-ui-kit";
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';
import Pagination from '../components/Pagination';
import AppRoot from '../AppRoot';

const Home = () => {

  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(5);

  useEffect(() => {
    loadBlog(0, 3, 0);
    fetchLatestBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"]

  const loadBlog = async(start, end, increase, operation) => {
    const response = await axios.get(`${AppRoot}posts?_start=${start}&_end=${end}`);

    if(response.status === 200) {
      setData(response.data);

      if(operation) {
        setCurrentPage(0);
      } else {
        setCurrentPage(currentPage + increase);
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  const fetchLatestBlog = async() => {
    const total = await axios.get(`${AppRoot}posts`);
    const start = total.data.length - 4;
    const end = total.data.length;

    setTotalBlog(total.data.length);

    const response = await axios.get(`${AppRoot}posts?_start=${start}&_end=${end}`);

    if(response.status === 200) {
      setLatestBlog(response.data)
    } else {
      toast.error("Something went wrong")
    }
  };

  const excerpt = (str) => {
    if(str.length > 50) {
      str = str.substring(0, 50) + "...";
    }

    return str;
  }

  const onInputChange = (e) => {
    if(!e.target.value) {
      loadBlog(0, 3, 0);
    }

    setSearchValue(e.target.value);
  }

  const handleCategory = async (category) => {
    const response = await axios.get(`${AppRoot}posts?category=${category}`);

    if(response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${AppRoot}posts?q=${searchValue}`);

    if(response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  }

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure that you wanted to delete that blog?")) {
      const response = await axios.delete(`${AppRoot}posts/${id}`);
      if(response.status === 200) {
        toast.success("Blog Deleted Successfully");
        loadBlog(0, 3, 0, "delete");
      } else {
        toast.error("Something went wrong");
      }
    } else {

    }
  };
  

  return (
    <>
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item, index) => {
                return <Blogs key={index} {...item} excerpt={excerpt} handleDelete={handleDelete}/>
              })}
            </MDBRow>

            <div className='mt-3'>
              <Pagination currentPage={currentPage} loadBlog={loadBlog} pageLimit={pageLimit} data={data} totalBlog={totalBlog}/>
            </div>
          </MDBContainer>
        </MDBCol>

        <MDBCol size="3">
          <h4 className='text-start'>Latest Posts</h4>
          {latestBlog && latestBlog.map((item, index) => (
            <LatestBlog key={index} {...item}/>
          ))}
          <Category options={options} handleCategory={handleCategory}/>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default Home