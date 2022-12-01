import { useEffect, useState } from "react";
import "./NewsList.css";
import apiKey from "../../secrets.json"
import NewsItem from "../newsItem/NewsItem";

function NewsList() {

    // API Abruf und Verarbeiten der Daten
    // =======================================================
    // Variable zum Speichern der Daten aus der API
    const [articles, setArticles] = useState([]);

    const apiKeyValue = apiKey[0].apiKey;
    console.log(apiKeyValue);


    // Abruf der Daten von der API
    useEffect(() => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyValue}`)
            .then(res => res.json())
            .then((articles) => {
                setArticles(articles.articles);
            });
        console.log("first render");
    }, []);


    // Umformatieren der Datumsangabe aus der API
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString([], options);
    }


    // Bonus
    // ======================================================
    // Variablen zum speichern der Eingaben
    const [country, setCountry] = useState("");

    const [searchValue, setSearchValue] = useState("");

    // Funktionen bei Klick auf die Buttons
    const countryHandler = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKeyValue}`)
            .then(res => res.json())
            .then((articles) => {
                setArticles(articles.articles);
            })
    };

    const keywordHandler = () => {
        fetch(`https://newsapi.org/v2/top-headlines?q=${searchValue}&apiKey=${apiKeyValue}`)
            .then(res => res.json())
            .then((articles) => {
                setArticles(articles.articles);
            });
    };


    // Ausgabe
    // ========================================================
    return (
        <div className="newsListWrapper">
            <div className="inputSection">
                <input type="text" id="countryInput" onChange={(event) => { setCountry(event.target.value) }} />
                <button type="button" onClick={countryHandler}>Search news for a specific country</button>
            </div>
            <div className="inputSection">
                <input type="text" id="keywordInput" onChange={(event) => { setSearchValue(event.target.value) }} />
                <button type="button" onClick={keywordHandler}>Search news for a specific keyword</button>
            </div>
            <div></div>
            {console.log(articles)}
            {articles.map((singlearticle, index) => {
                return <NewsItem key={index} img={singlearticle.urlToImage} index={Number(singlearticle.index) + 1} title={singlearticle.title} description={singlearticle.description
                } date={formatDate(singlearticle.publishedAt)} link={singlearticle.url} />
            })}

        </div>

    )
};

export default NewsList;