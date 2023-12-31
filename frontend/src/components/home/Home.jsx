import React, { useState, useRef, useEffect } from 'react';
import { FaArrowUp, FaChevronRight } from 'react-icons/fa';
import Navbar from './Navbar';
import PopularArtical from './PopularArtical';
import { Link, Switch, Route } from "react-router-dom";
import HomeArtical from './HomeArtical';
import ArticalDetails from './ArticalDetails';
import CategoryArtical from './CategoryArtical';
import TagArtical from './TagArtical';
import Footer from './Footer';
import CreateAt from './CreateAt';
import { useSelector, useDispatch } from 'react-redux'
import { get_home_tag_category } from '../../store/actions/home/homeAction'
import Carousel from './Carousel';

const Home = ({ history }) => {
    const dispatch = useDispatch()
    const { allCategory, allTag } = useSelector(state => state.homeReducer)

    const [value, setvalue] = useState('');
    const nav = useRef();
    const search = (e) => {
        e.preventDefault();
        history.push(`/artical/search/${value}`);
    }

    const scrollTop = () => {
        nav.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        dispatch(get_home_tag_category())
    }, [])
    return (
        <div className="home">
            <Navbar nav={nav} />
            <Carousel />
            <div className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <Switch>
                                <Route path='/' component={HomeArtical} exact />
                                <Route path='/article/:currentPage?' component={HomeArtical} exact />
                                <Route path='/artical/details/:slug' component={ArticalDetails} exact />
                                <Route path='/artical/category/:categorySlug/:currentPage?' component={CategoryArtical} exact />
                                <Route path='/artical/tag/:tagSlug/:currentPage?' component={TagArtical} exact />
                                <Route path='/artical/search/:searchValue' component={HomeArtical} exact />
                            </Switch>
                        </div>
                        <div className="col-4">
                            <div className="search-category-tag">
                                <div className="search">
                                    <h2>Search</h2>
                                    <div className="form-group">
                                        <input onChange={(e) => setvalue(e.target.value)} className='form-control' type="text" placeholder='search' />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={search} className="btn btn-block">Search</button>
                                    </div>
                                </div>
                                <div className="popular-artical">
                                    <div className="title">
                                        <h3>Popular Artical</h3>
                                    </div>
                                    <PopularArtical />
                                </div>
                                <div className="flow-facebook">
                                    <div className="title">
                                        <h3>Follwing Me</h3>
                                    </div>
                                    <div className="image">
                                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIslam-100798538341988&tabs=timeline&width=340&height=148&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" style={{
                                            width: "340px", height: "145px", border: 'none', overflow: 'hidden', scrolling: "no", frameborder: "0", allowfullscreen: "true", allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        }}></iframe>
                                    </div>
                                </div>
                                <div className="category">
                                    <div className="title">
                                        <h3>Category</h3>
                                    </div>
                                    <ul className="cate-list">
                                        {
                                            allCategory.length > 0 && allCategory.map((cate, index) =>
                                                <div key={index} className="cate-item">

                                                    <li><FaChevronRight /><Link to={`/artical/category/${cate._id.split(' ').join('-')}`}>{cate._id}</Link></li>
                                                    <span>({cate.count})</span>
                                                </div>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="tag">
                                    <div className="title">
                                        <h3>Tag</h3>
                                    </div>
                                    <ul>
                                        {
                                            allTag.length > 0 && allTag.map((tag, index) => <li key={index}><Link to={`/artical/tag/${tag.split(' ').join('-')}`}>{tag}</Link></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <CreateAt />
            <div onClick={scrollTop} id="scroll">
                <button className="scroll-btn">
                    <span><FaArrowUp /></span>
                </button>
            </div>
        </div>
    )
};

export default Home;
