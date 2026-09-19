let lastId = 4;
const newsPage = document.getElementById("news-page");
let userImg = document.getElementById("user-comment-image")
let userText = document.getElementById("comment-text")
let lastCommentId = 2;

export const allComments = []

export const news = [
    {
        id: 1,
        tag:'History',
        img:"../Photos/Roman.png",
        date: new Date(2023, 9, 10, 19, 39),
        title: "Trebonian gallus came from an old Etruscan " + 
            "family. At the end of the reign of Emperor " +
            "Decius Trajan, he served as legate",
        description: "The future empere Guy Vivius Gallus was born around " +
            "206. This dating is based on the message of Pseudo-Aurelius Victor, " +
            "who in his Epitome writes that at the time of his death, Guy was " +
            "about forty-seven years old. The future emperor Guy Vibius " +
            "Trebonian Gallus was born around 206.",
        likesCount: 11500,
        commentsCount: 1500,
        isLiked: false,
    },
    {
        id: 2,
        tag: "Movies",
        img:"../Photos/Roman.png",
        date: new Date(2023, 8, 23, 5, 34),
        title: "BarbenHeimer officially pass over " + 
            "one billion dollars at the box office",
        description: "With the massive success of Barbie " +
            " and Oppenheimer at the theater this year, " +
            "it is no surprising that they passed one " +
            "billion with many watchers enjoying it.",
        likesCount: 15237,
        commentsCount: 3190,
        isLiked: false,
    },
    {   
        id: 3,
        tag: "Weather",
        img:"../Photos/Roman.png",
        date: new Date(2023, 9, 17, 3, 56),
        title: "The Heat Wave has finally come to an end",
        description: "After a brutal summer, the heat " +
            "has finally come to an end with a high of 85 " +
            "degrees, which is 20 degrees down from the average " +
            "of the summer which was 107 degrees Fahrenheit",
        likesCount: 25328,
        commentsCount: 1743,
        isLiked: false,
    },
    {
        id: 4,
        tag:'History',
        img:"../Photos/Roman.png",
        date: new Date(2023, 9, 10, 19, 39),
        title: "Trebonian gallus came from an old Etruscan " + 
            "family. At the end of the reign of Emperor " +
            "Decius Trajan, he served as legate",
        description: "The future empere Guy Vivius Gallus was born around " +
            "206. This dating is based on the message of Pseudo-Aurelius Victor, " +
            "who in his Epitome writes that at the time of his death, Guy was " +
            "about forty-seven years old. The future emperor Guy Vibius " +
            "Trebonian Gallus was born around 206.",
        likesCount: 11500,
        commentsCount: 1500,
        isLiked: false,
    },
]

export const fullNews = [
    {
        id: 1,
        tag:'History',
        img:"../Photos/Roman.png",
        date: new Date(2023, 9, 10, 19, 39),
        title: "Trebonian gallus came from an old Etruscan " + 
            "family. At the end of the reign of Emperor " +
            "Decius Trajan, he served as legate",
        description: "The future empere Guy Vivius Gallus was born around " +
            "206. This dating is based on the message of Pseudo-Aurelius Victor, " +
            "who in his Epitome writes that at the time of his death, Guy was " +
            "about forty-seven years old. The future emperor Guy Vibius " +
            "Trebonian Gallus was born around 206.",
        likesCount: 11500,
        commentsCount: 1500,
        isLiked: false,
    },
    {
        id: 2,
        tag: "Movies",
        img:"../Photos/Roman.png",
        date: new Date(2023, 8, 23, 5, 34),
        title: "BarbenHeimer officially pass over " + 
            "one billion dollars at the box office",
        description: "With the massive success of Barbie " +
            " and Oppenheimer at the theater this year, " +
            "it is no surprising that they passed one " +
            "billion with many watchers enjoying it.",
        likesCount: 15237,
        commentsCount: 3190,
        isLiked: false,
    },
    {   
        id: 3,
        tag: "Weather",
        img:"../Photos/Roman.png",
        date: new Date(2023, 9, 17, 3, 56),
        title: "The Heat Wave has finally come to an end",
        description: "After a brutal summer, the heat " +
            "has finally come to an end with a high of 85 " +
            "degrees, which is 20 degrees down from the average " +
            "of the summer which was 107 degrees Fahrenheit",
        likesCount: 25328,
        commentsCount: 1743,
        isLiked: false,
    },
    {
        id: 4,
        tag:'History',
        img:"../Photos/Roman.png",
        date: new Date(2023, 9, 10, 19, 39),
        title: "Trebonian gallus came from an old Etruscan " + 
            "family. At the end of the reign of Emperor " +
            "Decius Trajan, he served as legate",
        description: "The future empere Guy Vivius Gallus was born around " +
            "206. This dating is based on the message of Pseudo-Aurelius Victor, " +
            "who in his Epitome writes that at the time of his death, Guy was " +
            "about forty-seven years old. The future emperor Guy Vibius " +
            "Trebonian Gallus was born around 206.",
        likesCount: 11500,
        commentsCount: 1500,
        isLiked: false,
    },
];

export function addNews(newArticle) {
    const article = {
        ...newArticle,
        id: lastId
    };
    lastId++;
    fullNews.push(article);

    const {text, ...fields} = article;
    news.push({
        ...fields,
        description:text.slice(0, 100)
    })
    return article
}

export const loggedUser = {
    id: 1,
    username: 'Uncle John',
    img: './photos/ME.png'
}



export function addSubComment(newsId, text, user, answerTo) {
    const subComments = allComments.find(c => c.id === newsId).subComments;
    subComments.push({
        id: subComments[subComments.length - 1].id + 1,
        text,
        user,
        answerTo
    });
}

export function updateComment(id, text) {
    allComments.find(c => c.id === id).text = text;
}

export function updateSubComment(id, text) {
    allComments.find(c => c.subComments.find(sc => sc.id === id))
        .subComments.find(sc => sc.id === id).text = text;
}


export function addComment(text, newsId) {
    lastCommentId++;
    allComments.push({
        newsId, 
        text,
        id: lastCommentId,
        user: {...loggedUser}
    });
}

export function makeLike(newsId) {
    const oneNews = news.find(n => n.id === newsId);
    oneNews.isLiked = !oneNews.isLiked;
    const oneFullNews = fullNews.find(n => n.id === newsId);
    oneFullNews.isLiked = !oneFullNews.isLiked;
    return oneNews.isLiked;
}