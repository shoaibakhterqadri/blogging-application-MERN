import React, { useState, useRef, useEffect } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { BsCardImage } from "react-icons/bs";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { get_tag_category, add_articale} from "../../store/actions/Dashborad/articalAction";

const ArticleAdd = ({history}) => {

    const { allCategory, allTag, loader ,articleError,articleSuccessMessage} = useSelector(state => state.dashboradArtical)

    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const editor = useRef();

    const [state, setState] = useState({
        title: '',
        category: '',
        tag: '',
        image: '',
    })

    const [slug, setSlug] = useState('');
    const [updateBtn, setUpdateBtn] = useState(false);
    const [image, setImage] = useState({
        imageName: '',
        img: ''
    })

    



//         try{
// console.log(url_of_serpstack);
//         }
//         catch(error){
// console.log(error);
//         }


    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const titleHendler = (e) => {
        setState({
            ...state,
            title: e.target.value
        })
        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug)
    }

    const slugHendle = (e) => {
        setSlug(e.target.value);
        setUpdateBtn(true)
    }


    const updateSlug = (e) => {
        e.preventDefault();
        const newSlug = slug.trim().split(' ').join('-');
        setSlug(newSlug)
        setUpdateBtn(false)
    }


    const imageHendle = (e) => {
        console.log(e.target.files)
        if (e.target.files.length !== 0) {
            setState({
                ...state,
                image: e.target.files[0]
            })
            const imageReader = new FileReader();
            imageReader.onload = () => {
                setImage({
                    ...image,
                    img: imageReader.result,
                    imageName: e.target.files[0].name
                })
            }
            imageReader.readAsDataURL(e.target.files[0]);
        }
    }

    console.log((text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ")))

    const add = async (e) => {
        e.preventDefault();

        // Perform plagiarism check using Google Custom Search API
        const apiKey = "AIzaSyCE6QKnae7KqrR0n6oRBcak04LlGejw1EU";
        console.log(apiKey);

        // const searchQuery = (text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " "));
        const searchQuery="Engineer Shoaib Akhter Qadri"
        console.log("searchQuery "+searchQuery);
        // const searchQuery = encodeURIComponent(text.replace(/<\/?[^>]+(>|$)/g, ""));
const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${apiKey}`;

        // const searchQuery = text.replace(/<\/?[^>]+(>|$)/g, "");
        console.log("API URL is " +apiUrl);

        try {
            const response = await fetch(apiUrl);
            console.log(response);
            const data = await response.json();
            console.log(data);
            // Check if the article text is found in the search results
            if (data.items && data.items.length > 0) {
                toast.error('Plagiarism detected! Article cannot be published.');
                alert("Plagiarism");
                return;
            }
    
            // Continue with the article submission if no plagiarism is detected
            const { title, image, category, tag } = state;
            const formData = new FormData();
    
            formData.append('title', title);
            formData.append('image', image);
            formData.append('category', category);
            formData.append('tag', tag);
            formData.append('slug', slug);
            formData.append('text', text);
    
            dispatch(add_articale(formData));
        } catch (error) {
            console.error('Error:', error);
            alert("fsdfsa")
            toast.error('Error checking plagiarism. Please try again.');
        }
    };




    const config = {
        readonly: false
    }
    useEffect(() => {
        dispatch(get_tag_category())
    }, [])

    useEffect(()=>{
        if(articleSuccessMessage){
            dispatch({type :'ART_SUCCESS_MESSAGE_CLEAR'})
            history.push('/dashborad/all-article');
        }
    },[articleSuccessMessage])



    return (
        <div className='add-article'>
            <Toaster position={'bottom-center'}
                reverseOrder={false}
                toastOptions={
                    {
                        style: {
                            fontSize: '15px'
                        }
                    }
                }
            />
            <Helmet>
                <title>Article add</title>
            </Helmet>
            <div className="add">
                <div className="title-show-article">
                    <h2>Add Article</h2>
                    <Link className='btn' to="/dashborad/all-article">All Article</Link>
                </div>
                <form onSubmit={add}>
                    <div className="form-group">
                        <label htmlFor="title">Article title</label>
                        <input onChange={titleHendler} value={state.title} type="text" name='title' placeholder='article title' className="form-control" id='title' />
                        {
                            articleError?<p className='error'>{articleError.title}</p>:''
                        }
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Article slug</label>
                        <input value={slug} onChange={slugHendle} type="text" placeholder='article slug' className="form-control" name='slug' id='slug' />
                        {
                            articleError?<p className='error'>{articleError.slug}</p>:''
                        }
                    </div>
                    {
                        updateBtn ? <button onClick={updateSlug} className='btn'>Update</button> : ''
                    }
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select onChange={inputHendle} value={state.category} className='form-control' name="category" id="category">
                            <option value="">--select article category--</option>
                            {
                                allCategory.length > 0 ? allCategory.map((c, index) => {
                                    return <option key={index} value={c.categorySlug}>{c.categoryName}</option>
                                }) : ''
                            }

                        </select>
                        {
                            articleError?<p className='error'>{articleError.category}</p>:''
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <select onChange={inputHendle} value={state.tag} className='form-control' name="tag" id="tag">
                            <option value="sdas">--select article tag--</option>
                            {
                                allTag.length > 0 ? allTag.map((t, index) => <option value={t.tagSlug}>{t.tagName}</option>) : ''
                            }
                        </select>
                        {
                            articleError?<p className='error'>{articleError.tag}</p>:''
                        }
                    </div>
                    <div className="form-group img_upload">
                        <div className="upload">
                            <label htmlFor="upload_image"><BsCardImage /></label>
                            <input type="file" id='upload_image' />
                        </div>
                        <label htmlFor="article text">Article text</label>
                        <JoditEditor
                            value={text}
                            tabIndex={1}
                            ref={editor}
                            config={config}
                            onBlur={newText => setText(newText)}
                            onChange={newText => { }}
                        
                        />
                        <div className="gcse-search"></div>
                        {
                            articleError?<p className='error'>{articleError.text}</p>:''
                        }


                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <div className="image-select">
                            {
                                image.imageName ? <span>{image.imageName}</span> : <span></span>
                            }
                            <label htmlFor="image">Select Image</label>
                            <input onChange={imageHendle} type="file" className="form-control" name='image' id='image' />
                        </div>
                        <div className="image">
                            {
                                image.img ? <img src={image.img} alt="" /> : ''
                            }

                        </div>
                        {
                            articleError?<p className='error'>{articleError.image}</p>:''
                        }
                    </div>
                    <div className="form-group">
                        {
                            loader ? <button className="btn btn-block">
                                <div className="spinner">
                                    <div className="spinner1"></div>
                                    <div className="spinner2"></div>
                                    <div className="spinner3"></div>
                                </div>
                            </button> : <button className="btn btn-block">Add Article</button>




                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleAdd