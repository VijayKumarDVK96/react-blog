import React, {useState, useEffect} from 'react';
import {MDBValidation, MDBInput, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import AppRoot from '../AppRoot';

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: ""
}

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"]

const ManageBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const {title, description, category, imageUrl} = formValue;
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({...initialState});
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`${AppRoot}posts/${id}`);

    if(singleBlog.status === 200) {
      setFormValue({...singleBlog.data});
    } else {
      toast.error("Something went wrong")
    }

  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!category) {
      setCategoryErrMsg("Category is required")
    }

    // const imageValidation = !editMode ? imageUrl : true;

    if(title && description && imageUrl && category) {
      const currentDate = getDate();

      const updatedBlogData = {...formValue, date: currentDate};

      if(!editMode) {
        const response = await axios.post(`${AppRoot}posts`, updatedBlogData);

        if(response.status === 201) {
          toast.success("Added new post")
        } else {
          toast.error("Error in adding new post")
        }
      } else {
        const response = await axios.put(`${AppRoot}posts/${id}`, formValue);

        if(response.status === 200) {
          toast.success("Updated post")
        } else {
          toast.error("Error in updating post")
        }
      }
      setFormValue(initialState);
      navigate("/");
      
    }
    
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  };

  const onUploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fivhdf1w");
    formData.append("folder", "react-blog");
    axios.post("http://api.cloudinary.com/v1_1/dhn9skbzx/image/upload", formData)
    .then((response) => {
      // console.log(response)
      setFormValue({...formValue, imageUrl: response.data.url})
      toast.info("Image uploaded successfully")
    }).catch((error) => {
      toast.error("Something went wrong")
    })
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({...formValue, category: e.target.value});
  };

  return (
    <MDBValidation className='row g-3' style={{marginTop: "100px"}} noValidate onSubmit={handleSubmit}>
      <p className='fs-2 fw-bold text-center'>{editMode ? 'Edit Blog' : 'Add Blog'}</p>

      <div style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}}>
        <MDBInput value={title || ''} name='title' type='text' onChange={onInputChange} required label='Title' validation='Title is required' invalid='Title is required'/>
        <br/>

        <MDBInput value={description || ''} name='description' type='text' onChange={onInputChange} required label='Description' validation='Description is required' textarea rows={4} invalid='Description is required'/>
        <br/>

        {!editMode && (
          <>
            <MDBInput name='image' type='file' onChange={(e) => onUploadImage(e.target.files[0])} required  validation='Image is required' invalid='Image is required'/>
            <br/>
          </>
        )}
        

        <select className='categoryDropdown' onChange={onCategoryChange} value={category}>
            <option value=''>Select Category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>{option}</option>
          ))}
        </select>
        <br/>
        {categoryErrMsg && (
          <div className='categoryErrorMsg'>{categoryErrMsg}</div>
        )}
        <br/>

        

        <MDBBtn type='submit' style={{marginRight: "10px"}}>{editMode ? 'Update' : 'Add'}</MDBBtn>
        <MDBBtn color='danger' style={{marginRight: "10px"}} onClick={() => navigate('/')}>Go back</MDBBtn>
      </div>
    </MDBValidation>
  )
}

export default ManageBlog