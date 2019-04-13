let view = {
    displaySubCategory: function( category ){
        let container = document.getElementById("news-list");
        container.innerHTML = "";
        let url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&category=' + category + '&apiKey=8b1a6b42c15d4aa09dd87eba4c467616';
        let req = new Request(url);
        fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData){
            jsonData.articles.forEach(element => {
                let newsItemDiv = document.createElement("article");
                let newsItemImg = document.createElement("div");
                if( element.urlToImage === null ){
                    newsItemImg.style.backgroundImage = 'url()';
                } else {
                    newsItemImg.style.backgroundImage = `url(${element.urlToImage})`;
                }
                newsItemDiv.appendChild( newsItemImg );
                let newsItemHead = document.createElement("header");
                let newsItemH3 = document.createElement("h3");
                let newsTitleLink = document.createElement("a");
                newsTitleLink.innerHTML = element.title;
                newsTitleLink.href = element.url;
                newsTitleLink.target = "_blank";
                newsItemH3.appendChild(newsTitleLink);
                newsItemHead.appendChild(newsItemH3);
                newsItemDiv.appendChild(newsItemHead);
                newsItemP = document.createElement("p");
                newsItemP.innerHTML = element.description;
                newsItemDiv.appendChild(newsItemP);
                let newsPublishedAt = document.createElement("time");
                let publishingDate = Date.parse(element.publishedAt);
                let nowDate = Date.now();
                let compareDate = ( publishingDate - nowDate );
                newsPublishedAt.innerHTML = element.source.name + " - " + Math.abs(Math.round(compareDate /  3600000)) + " hours ago";
                newsItemDiv.appendChild(newsPublishedAt);
                container.appendChild( newsItemDiv );
            });
        });
    }
}

let container = document.getElementById("sidebar");
let header = document.querySelector("#main h3");
container.addEventListener('click', function(event){
    document.querySelectorAll('#sidebar li').forEach(function(li){
        li.className = "";
    })
    if( event.path[0].localName === "li" ){
        event.target.className = "active";
        header.innerHTML = event.target.id;
        view.displaySubCategory( event.target.id );
    }
})

view.displaySubCategory("");