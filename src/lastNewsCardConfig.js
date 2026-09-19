import { addNewsLinkClick } from "./helper.js";

export default{
    id: "last-news-container",
    configCardNode,
}

export function configCardNode(node, {id, title, date}) {
    node.style.display = "block";
    addNewsLinkClick(node.children[0], id);
    const card = document.createElement('div');
    card.classList.add("news-description");
    card.id = id;
    card.append(createDateSpan(date));
    card.append(title);
    return card;
}

function createDateSpan(date) {
    const span = document.createElement('span');
    span.innerText = `${date.getHours()}:${date.getMinutes()}`;
    return span;
}