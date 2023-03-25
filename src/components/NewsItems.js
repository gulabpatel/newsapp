import React from 'react'

// export default class NewsItems extends Component {
const NewsItems = (props)=>{
    // render() {
        let { title, description, imgurl, newsurl, author, date, source} = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{display:'flex',
                justifyContent:'flex-end',
                position:'absolute',
                right:'0'}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1', height:'-webkit-fill-available'}}>
                            {source}</span></div>
                    <img src={imgurl ? imgurl : "https://www.moneycontrol.com/news/business/markets/hot-stocks-mrs-bectors-food-specialities-tata-steel-persistent-systems-can-give-at-least-10-return-in-short-term-heres-why-9895821.html"} className="card-img-top" height='270px' alt="wait, loading..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className='card-text'>{description}</p>
                        <p className="card-text"><small className='text-muted'>By {author} on {date}</small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    // }
}

export default NewsItems;
