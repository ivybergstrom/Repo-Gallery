const overview = document.querySelector(".overview"); //this is the div where profile info will appear
const username = "ivybergstrom"; //my github username


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
            <img alt="user avatar" src=${data.avataur_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    overview.append(div);
}