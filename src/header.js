import newsMainCardConfig from "./newsMainCardConfig.js";
import outCards from "./outCards.js";
import { switchToAdd, switchToMain } from "./router.js";

const nav = document.getElementById("nav");

nav.onclick = event => {
    const target = event.target;
    activeTagCss();
    const tag = target.id;
    
    const tagNews = tag === "news" ? news : news.filter(n => n.tag === tag);
    outCards(tagNews, newsMainCardConfig);

    function activeTagCss() {
        for(let div of nav.children)
            div.className = "";
        target.className = "active-tag";
    }
};

const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-input-container")

searchButton.onclick = () => {
    searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
}

searchInput.addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    const searchText = event.target.value;
    const resultNews = news.filter(n => ~n.title.indexOf(searchText));
    outCards(resultNews, newsMainCardConfig);
    switchToMain();
})

const addPageLink = document.getElementById("add-page-link");
addPageLink.onclick = () => switchToAdd();