import outNews from "./news.js";
import { TAG_COLORS, TAG_NAMES } from "./option.js";
import { makeLike } from "./background.js";
import { switchToMain } from "./router.js";

export function makeFriendlyNumber(num) {
    if (num >= 1000000)
        return intlFormat(num/1000000) + 'million';
    if(num >= 1000)
        return intlFormat(num/1000)
    
    function intlFormat(num) {
        return new Intl.NumberFormat().format(Math.round(num*10) / 10);
    }
}

export function addImage(node, src) {
    node.children[0].src = src;
}

export function addTag(node, tag) {
    node.className = `tag ${TAG_COLORS[tag]}`;
    node.innerHTML = TAG_NAMES[tag];
}

export function addStatistic(node, likesCount, commentsCount, isLiked) {
    const likes = makeFriendlyNumber(likesCount);
    if (isLiked == true) {
        node.children[0].innerHTML = `<img src = "./Photos/Hearts.png" alt = "" id = "hearts"> ${likes}`
    } else {
        node.children[0].innerHTML = `<img src = "./Photos/Seeheart.png" alt = "" id = "hearts"> ${likes}`
    }
    const comments = makeFriendlyNumber(commentsCount);
    node.children[1].innerHTML = `<img src = "./Photos/Text.png" alt = ""> ${likes}`
}

export function addNewsLinkClick(node, id) {
    node.onclick = event => {
        event.preventDefault();
        outNews(id);
    }
}

export function makeLikeClick(node, newsId, isLiked) {
    node.onclick = event => {
        event.preventDefault();
        const updatedIsLiked = makeLike(newsId);
        console.log(updatedIsLiked)
        updateLikeVisuals(node, updatedIsLiked);
    }
}

export function switchDisplay(node) {
    node.style.display = node.style.display === 'none'? "flex" : "none"
}

function updateLikeVisuals(node, isLiked) {
    const imgElement = node.querySelector('img');
    const newSrc = isLiked ? "./Photos/Hearts.png" : "./Photos/Seeheart.png";
    imgElement.src = newSrc;
}
