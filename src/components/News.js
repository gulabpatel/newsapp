import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   
    const updateNews = async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        setLoading(true)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
        
    }
    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
        },[])

    // const handlePrevClick = async ()=>{
    //     setPage(page-1)
    //     updateNews()
    // }
    // const handleNextClick = async ()=>{
    //     setPage(page+1)
    //     updateNews()
    // }
    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
    };
    // render() {
        return (
            <>
                <h1 className='text-center' style={{margin:'35px 0px', marginTop:"90px"}}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner/>}
                {articles && <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}>
                    
                    <div className="container">
                    <div className='row'>
                        {/* !loading && */}
                        {articles && articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                 <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 90) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author?element.author:"unknown"} date={element.publishedAt?new Date(element.publishedAt).toGMTString():"unknown"} /> {/*source={element.source.id?element.source.id:"unknown"} */}
                            </div>

                        })}
                    </div>
                    </div>
                    </InfiniteScroll>}
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} className="btn btn-dark" type="button" onClick={this.handlePrevClick}>&larr; Prev</button>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} className="btn btn-dark" type="button" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            </>

        )
}

News.defaultProps = {
        country: 'in',
        pageSize: 8,
        category:'general',
    }
News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category:PropTypes.string,
    }

export default News;