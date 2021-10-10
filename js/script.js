const overview = document.querySelector(".overview"); //this is the div where profile info will appear
const username = "ivybergstrom"; //my github username
const displayReposList = document.querySelector(".repo-list") //ul to display repos 
const repoClass = document.querySelector(".repos");//selects class of repos
const repoData = document.querySelector(".repo-data");//selects class of repo data
const repoList = document.querySelector(".repo-list"); //selects class of repo list

//function to get info from my github profile
const getBergi = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
}

getBergi(); //function to get info from my github profile

//function to display fetched user info on page
const displayUserInfo = function (data) {
    const div = document.createElement ("div");
    div.classList.add("user-info");
        div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    overview.append(div);
    getRepos();
}

const getRepos = async function () {
    const reposCollect = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await reposCollect.json();
    displayRepoInfo(reposData);
};

//the function below is for displaying repo information that is pulled by the getRepos function
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3> ${repo.name} </h3>`;
        displayReposList.append(repoItem);
    }
    
};
//event listener for the ul with class of .repo-list
repoList.addEventListener("click", function (e) {
    //if statement will check if the event target matches the name of the repo in the h3 element
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getInfo(repoName);
    }
    
});

//function to collect information of specific repos
const getInfo = async function (repoName) {
    const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    //json translation
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    //will fetch language data from the URL
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    //loops through languageData object and adds them to the array titled languages
    for (let language in languageData) {
        languages.push(language);
    }
    repoDetails(repoInfo, languages);
};

//function to display specific repo info
const repoDetails = function (repoInfo, languages) {
    repoData.innerHTML ="";
    repoData.classList.remove("hide");
    repoClass.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}  </h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
       <p>Languages: ${languages.join(", ")}</p>
       <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
       repoData.append(div);
};