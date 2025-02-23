const searchIcon = document.getElementById("SearchIcon");
const searchBar = document.getElementById("Searchbar");
let alreadyDisplayingProfile = true;

function beginThisMotherfucker () {
    console.log("search icon has been clicked.")
    hideSearchIcon();
    searchBarActive();
    console.log("beginthismotherfucker function has ended.")
}

function hideSearchIcon () {
    console.log("searchicon hidden, searchbar shown.")
    searchIcon.style.display = "none";
    searchBar.style.display = "block";
    return;
}

function showSearchIcon() {
    console.log("searbar hidden, searchicon shown.")
    searchBar.style.display = "none";
    searchIcon.style.display = "block";
    return;
}

function searchPaneFadesIn () {
    const searchPane = document.getElementById("Search_Results");
    searchPane.style.visibility = "visible";
    searchPane.style.opacity = 1;
    console.log("searchPane fades in.");
    return;
}

function searchPaneFadesOut (){
    const searchPane = document.getElementById("Search_Results");
    searchPane.style.opacity = 0;
    searchPane.style.visibility = "hidden";
    console.log("searchpane fades out");
    return;
}

function hideTitle() {
    console.log("hidetitle called.")
    const title = document.getElementById("title");
    title.style.visibility = "hidden";
    title.style.opacity = 0;
    return;
}

function searchBarActive() {    
//    console.log("searchbaractive fn started.")

    let hide = false;

    const searchQuery = (event) => {
        console.log("searchquery eventlistener is running.")
        const query = searchBar.value;
        if((query!="")&&(event.key === "Enter")) {
            displaySearchResults(query);
            document.removeEventListener("click", hideSearhBar);
            document.removeEventListener("click", searchQuery);
            console.log("hidesearchbar eventlistener has been removed.")
            console.log("searchquery event listener has been removed.")
            console.log("search query has been entered.");           
        }
    };

    const hideSearhBar = (event) => {
        console.log("hidesearchbar eventlistener is running")
        if((!searchBar.contains(event.target))&&(hide)) {
            showSearchIcon();
            hide = false;
            document.removeEventListener("click", hideSearhBar);
            document.removeEventListener("keydown", searchQuery);
//            console.log("hidesearchbar eventlistener has been removed.")
            console.log("searchquery event listener has been removed.")    
        } else {
            hide = true;
        }
    };
    document.addEventListener("click", hideSearhBar);
//    console.log("hidesearchbar event listener has been added.")
    document.addEventListener("keydown", searchQuery);
    console.log("searchquery eventlistener has been added.")

//    console.log("searchbaractive fn ends.");
    return;

}

function displaySearchResults(query) {
    console.log("displaysearchresults is now running")

    hideTitle();
    searchPaneFadesIn();
    
    fetch(`https://api.github.com/search/users?q=${query}`)
    .then(Response => {
        console.log("search response received.")
        if(!Response.ok) {
            throw new Error(`${Response.status} - ${Response.statusText}`);
        }
        return Response.json();
    })
    .then(data => {
        console.log("here's what we received:")
        let n = data.items.length;
        let m = data.total_count;
        let users = data.items;
        console.log("array of "+ n + ' results out of ' + m + " total.");
        console.log(data.items);
        let resultList = document.querySelector(".resultList");
        resultList.innerHTML = "";
        console.log("previous search results cleared.");
        users.forEach(users => {
            const userButton = document.createElement("button");
            userButton.innerHTML = `
            <button class = "resultListButton" id = "${users.url}">${users.login}</button>
            `;
            resultList.appendChild(userButton);
            console.log("new result buttons added.");
        });
    })
    .catch(error => console.error("Error fetching users with search.", error));

    const buttonClickListener = (event) => {
        console.log("result button listener has been called.")
        if(event.target.classList.contains("resultListButton")) {
            console.log("Begun searching with keyword "+event.target.innerText);
            displayProfile(event.target.id);
            searchPaneFadesOut();
            showSearchIcon();
            document.removeEventListener("click", buttonClickListener);
            console.log("result button listener has been removed.")
            if(alreadyDisplayingProfile) {
                document.removeEventListener("click", hideSearchPane);
                console.log("hidesearchpane eventlistener of displaysearchresults function has been removed.");
            }
            alreadyDisplayingProfile = true;
            console.log("displaying a profile. hidesearchpane event listener will be active in the next search.");
        }
    }

    const hideSearchPane = (event) => {
        console.log("hidesearchpane eventlistener has been called.")
        let searchPane = document.getElementById("Search_Results");
        if(!searchPane.contains(event.target)) {            
            searchPaneFadesOut();
            showSearchIcon();
            document.removeEventListener("click", hideSearchPane);
            document.removeEventListener("click", buttonClickListener);
            console.log("hideSearchPane and buttonClickListener eventlistener removed")
        }
    }

    if(alreadyDisplayingProfile) {
        document.addEventListener("click", hideSearchPane);
        console.log("hidesearchpane eventlistener added.");
    }
    document.querySelector(".resultList").addEventListener("click", buttonClickListener);
    console.log("resultbuttonclick evenlistener added.");
}

function displayProfile(query) {
    console.log("displayProfile function started.")

    fetch(`${query}`)
    .then(Response => {
        console.log("profile response received.")
        if(!Response.ok) {
            throw new Error(`${Response.status} - ${Response.statusText}`);
        }
        return Response.json();
    })
    .then(data => {
        let a = document.getElementById("profilePic");
        a.style.visibility = "visible";
        a.style.backgroundImage = `url(${data.avatar_url})`;
        a.style.backgroundSize = "cover";
        a.style.backgroundPosition = "center";
        a.style.backgroundRepeat = "no-repeat";

        a = document.getElementById("profile_nick");
        if(data.name) {
            a.innerText = data.name;
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("profile_username");
        if(data.login) {
            a.innerText = data.login;
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("profile_bio");
        if(data.bio) {
            a.innerText = data.bio;
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("profile_blog");
        if(data.blog) {
            a.innerHTML = `<a href="${data.blog}">${data.blog}</a>`;
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("public_repo");
        if(data.public_repos) {
            if(data.public_repos === 1) {
                a.innerText = "1 REPOSITORY"
            } else {
                a.innerText = data.public_repos + " REPOSITORIES"
            }
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("public_gist");
        if(data.public_gists) {
            if(data.public_gists === 1) {
                a.innerText = "1 GIST"
            } else {
                a.innerText = data.public_gists + " GISTS"
            }
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("following");
        if(data.following) {
            a.innerHTML = "FOLLOWING " + data.following;
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("followers");
        if(data.followers) {
            if(data.followers === 1) {
                a.innerText = "1 FOLLOWER"
            } else {
                a.innerText = data.followers + " FOLLOWERS"
            }
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("birth");
        if(data.created_at) {
            a.innerText = "Joined on " + data.created_at.slice(0,10);
            a.style.visibility = "visible";
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("profile_company");
        if(data.company) {
            a.innerText = "Company: "+data.company;
            a.style.visibility = "visible";            
        } else {
            a.style.visibility = "hidden";
        }
        a = document.getElementById("profile_location");
        if(data.location) {
            a.innerText = "Location: " + data.location;
            a.style.visibility = "visible";            
        } else {
            a.style.visibility = "hidden";
        }
    })
    .catch(error => console.error("Error while displaying profile info.", error));

    publicInfo = document.querySelector(".publicinfo");
    publicInfo.style.visibility = "visible";
        
    repo = fetch(`${query}/repos`)
    .then(Response => {
        console.log("profile response received.");
        if(!Response.ok) {
        throw new Error(`${Response.status} - ${Response.statusText}`);
    }
    return Response.json();
    })
    .then(data => {
        console.log(data);

        const repoList = document.getElementById("repoList");
        repoList.innerHTML = "";

        data.forEach(entry => {
            const repoCard = document.createElement("div");
            repoCard.classList.add("repoCard");

            repoCard.innerHTML = 
            `
            <div class="stupiddiv"><span class="repoCard_ifFork">${entry.archived ? `ARCHIVED` : ""} ${entry.fork ? `FORK` : `REPO`}</span>
            <span class="repoCard_stats">🧵${entry.forks} 🌟${entry.watchers_count} 👁️‍🗨️${entry.stargazers_count}</span></div>
            <div class="repoCard_title"><a href="${entry.html_url}">${entry.name}</a></div>
            <div class="repoCard_description">${entry.description ? entry.description : ""}</div>

            `
            ;
            repoList.appendChild(repoCard);
        });
    })
    .catch(error => console.error("Fetching repos went sideways.", error));

    document.getElementById("repoList").style.visibility = "visible";
    return;
}