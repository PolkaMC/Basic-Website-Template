import { allComments } from "./background.js";
import { loggedUser } from "./background.js";
import { updateSubComment } from "./background.js";
import { updateComment } from "./background.js";
import { makeFriendlyNumber, switchDisplay } from "./helper.js";
const commentContainer = document.getElementById("comment-container")


function configComment({user, id, text, commentId, answerTo}, node, answerHandler) {
    const copy = node.children[0].cloneNode(true);
    copy.style.display = "flex";
    copy.id = id;
    copy.children[0].src = user.img;
    const contentContainer = copy.children[1];
    if(user.id === loggedUser.id) {
        configCommentBehavior(contentContainer, "Me", "Edit",
            () => redactCommentHandler({id, node: copy, answerTo}));
    } else {
        configCommentBehavior(contentContainer, user.username, "Reply", answerHandler);
    }
    configText(contentContainer.children[1], answerTo, text);
    return copy;

    function configCommentBehavior(contentContainer, username, buttonName, onclickCb){
        contentContainer.children[0].innerText = username;
        contentContainer.children[2].innerText = buttonName;
        contentContainer.children[2].onclick = onclickCb;
    }
}

function configText(textContainer, answerTo, text) {
    textContainer.innerHTML = "";
    if (answerTo) textContainer.innerHTML = 
        `<span class = "answer-reference" id = "${answerTo.userId}">@${answerTo.username}</span>`;
    textContainer.append(text);
}

export default function outComments(newsId) {
    cleanContainer(commentContainer);
    cleanContainer(commentContainer.children[0].children[1].children[4]);
    const comments = allComments.filter(c => c.newsId === newsId);
    comments.forEach(comment => {
        const copy = configComment(comment, commentContainer, redactCommentHandler,
            () => answerHandler(comment.id, copy.children[1].children[5]));
        configHideShowButton(copy.children[1]);
        const subCommentContainer = copy.children[1].children[4];
        comment.subComments?.forEach(subComment => {
            const subCommentCopy = configComment(subComment, subCommentContainer, redactSubComment,
                () => answerHandler(comment.id, copy.children[1].children[5]))
            subCommentContainer.appendChild(subCommentCopy);
        });
        commentContainer.appendChild(copy);
        isLiked()
    });
}

function cleanContainer(node) {
    const comment = node.children[0].cloneNode(true);
    node.innerHTML = '';
    node.appendChild(comment)
}


function configHideShowButton(contentContainer) {
    const showContent = '<img src = "./photos/down.png"> Show Answers';
    const hideContent = '<img src = "./photos/r.png"> Hide Answers';
    const hideShowButton = contentContainer.children[3];
    const subCommentContainer = contentContainer.children[4];
    console.log(subCommentContainer)
    subCommentContainer.style.display = "none";
    hideShowButton.innerHTML = showContent;
    hideShowButton.onclick = () => {
        switchDisplay(subCommentContainer);
        hideShowButton.innerHTML = subCommentContainer.style.display === "none" ?
            showContent : hideContent;
    }
}

function answerHandler(newsId, answerNode) {
    answerNode.style.display = "block";
    answerNode.children[1].children[2].onclick = () => {
        const text = answerNode.children[1].children[1].value;
        answerNode.children[1].children[1].value = "";
        addSubComment(newsId, text, loggedUser);
        outComments(newsId);
    };
}

function redactCommentHandler({id, node}) {
    let isEditable = false;
    node.children[1].children[2].onclick = () => {
        if(!isEditable) {
            console.log(node.children)
            node.children[1].children[1].setAttribute("contentEditable", "true");
            node.children[1].children[2].innerHTML = "Save";
        } else{
            node.children[1].children[1].removeAttribute("contentEditable");
            const text = node.children[1].children[1].innerText;
            updateComment(id, text);
            configText(node.children[1].children[1], null, text);
            node.children[1].children[2].innerHTML = "Edit";
        }
        isEditable = !isEditable
    }
}

function redactSubComment({id, answerTo, node}) {
    let isEditable = false;
    node.children[1].children[2].onclick = () => {
        if(!isEditable) {
            node.children[1].children[1].setAttribute("contentEditable", "true");
            node.children[1].children[2].innerHTML = "Save";
        } else{
            node.children[1].children[1].removeAttribute("contentEditable");
            const text = node.children[1].children[1].innerText;
            updateSubComment(id, text);
            configText(node.children[1].children[1], answerTo, text);
            node.children[1].children[2].innerHTML = "Edit";
        }
        isEditable = !isEditable
    }
}

