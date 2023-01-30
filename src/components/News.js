import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category:'business',
        apiKey:"6502c1dede0a46929232b3775667c470"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category:PropTypes.string,
        apiKey: PropTypes.string,
    }
    
    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page:1,
            totalResults:0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    
    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({ articles: parseData.articles,
                        totalResults: parseData.totalResults,
                        loading: false });
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({ articles: parseData.articles,
        //                 totalResults: parseData.totalResults,
        //                 loading: false });
        this.updateNews()
    }

    handlePrevClick = async ()=>{
    //     console.log("Prev")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parseData.articles,
    //         loading:false
    //   })
           this.setState({page : this.state.page-1})
           this.updateNews()
    }
    handleNextClick = async ()=>{
    //     console.log("Next")
    //     if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    //     }
    //     else{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parseData = await data.json()
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parseData.articles,
    //         loading:false
    //   })
    // }
    this.setState({page : this.state.page+1})
    this.updateNews()
    }
    
    fetchMoreData = async() => {
        this.setState({page:this.state.page+1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({ articles: this.state.articles.concat(parseData.articles),
                        totalResults: parseData.totalResults,
                        loading: false });
      }

    render() {
        return (
            <>
                <h1 className='text-center'>News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                {this.state.articles && <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>
                    
                    <div className="container">
                    <div className='row'>
                        {/* !this.state.loading && */}
                        {this.state.articles && this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 90) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author?element.author:"unknown"} date={element.publishedAt?new Date(element.publishedAt).toGMTString():"unknown"} source={element.source.id?element.source.id:"unknown"}/>
                            </div>

                        })}
                    </div>
                    </div>
                    </InfiniteScroll>}
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} className="btn btn-dark" type="button" onClick={this.handlePrevClick}>&larr; Prev</button>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" type="button" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            </>

        )
    }
}
