import "./NewsItem.css";

function NewsItem(props) {
    return (
        <article className="articleCard">
            <img src={props.img} alt={`article ${props.index}`} />
            <h2>{props.title}</h2>
            <p className="articleText">{props.description}</p>
            <p className="date">{props.date}</p>
            <a href={props.link} target="_blank" >READ MORE</a>
        </article>
    );
};

export default NewsItem;