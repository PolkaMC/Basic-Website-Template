import {DATE_OPTION} from "./option.js";
import {addImage, addNewsLinkClick, addStatistic, addTag, makeLikeClick} from "./helper.js"

export default {
    id: "main-news-container",
    configCardNode,
}

function configCardNode(node, oneNews) {
    const {id, tag, date, title, description, commentsCount, likesCount, img, isLiked} = oneNews;
    node.style.display = "block";
    addNewsLinkClick(node.children[0], id);
    addImage(node.children[0], img);
    addInfo(node.children[1], tag, date, commentsCount, likesCount, isLiked);
    addNewsLinkClick(node.children[2], id)
    addTextContent(node.children[2], title, description);
    makeLikeClick(node.children[1].children[2].children[0], id, isLiked)
    console.log(node.children[1].children[2].children[0])
}
function addTextContent(node, title, description) {
    node.children[0].innerText = title;
    node.children[1].innerText = description;
}

function addInfo(node, tag, date, commentsCount, likesCount, isLiked) {
    addTag(node.children[0], tag);
    node.children[1].innerText = date.toLocaleString('by', DATE_OPTION);
    addStatistic(node.children[2], likesCount, commentsCount, isLiked)
}