import React, {useState, useEffect} from 'react';
import {
    MDBCol,
    MDBCard,
    MDBCardTitle,
    MDBContainer,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBIcon,
    MDBTypography,
    MDBRow,
} from "mdb-react-ui-kit";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Badge from '../components/Badge';
import { toast } from 'react-toastify';
import AppRoot from '../AppRoot';

const Blog = () => {

  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const singleBlog = await axios.get(`${AppRoot}posts/${id}`);
    const relatedPostData = await axios.get(`${AppRoot}posts?category=${singleBlog.data.category}&_start=0&_end=3`);

    if(singleBlog.status === 200 || relatedPostData.status === 200) {
      setBlog(singleBlog.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something went wrong")
    }

  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  }

  const excerpt = (str) => {
    if(str.length > 50) {
      str = str.substring(0, 50) + "...";
    }

    return str;
  }

  return (
    <MDBContainer style={{ border: '1px solid #d1ebe8', marginTop: '15px', position: 'relative' }}>
      <Link to='/'>
        <strong style={{float: 'left', color: '#000'}} className='mt-3'>Go Back</strong>
      </Link>

      <MDBTypography tag="h2" className='text-muted mt-2' style={{ display: 'inline-block', position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>{blog && blog.title}</MDBTypography>

      <img src={blog && blog.imageUrl} className='img-fluid rounded' alt={blog && blog.title} style={{width: '100%', maxHeight: '600px', marginTop: '10px'}}/>

      <div style={{ marginTop: '20px' }}>
        <div style={{height: '43px', background: '#f6f6f6'}}>
          <MDBIcon style={{ float: 'left' }} className='mt-3' far icon='calendar-alt' size='lg'/>
          <strong style={{ float: 'left', marginTop: '15px', marginLeft: '2px' }}>{blog && blog.date}</strong>
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>

        <MDBTypography className='lead md-0'>
        {blog && blog.description}
        </MDBTypography>
      </div>

      {relatedPost && relatedPost.length > 1 && (
        <>
          <h1>Related Post</h1>
          <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
            {relatedPost.filter((item) => item.id != id).map((item, index) => (
              <Link to={`/blog/${item.id}`} key={index}>
                <MDBCol>
                    <MDBCard style={{ height: '350px' }}>
                        <MDBCardImage src={item.imageUrl} alt={item.title} position='top' style={{ height: '200px' }}/>

                      <MDBCardBody>
                        <MDBCardTitle>{item.title}</MDBCardTitle>
                        <MDBCardText>{excerpt(item.description)}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
              </Link>
            ))}
          </MDBRow>
        </>
      )}


    </MDBContainer>
  )
}

export default Blog