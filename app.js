// elementleri seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear");

const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("click",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}
function getData(e){
    let username = nameInput.value.trim();
    if (username === ""){
        alert("Lütfen Geçerli Bir Username Girin!");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                // hata mesajı
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUsersInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }


    ui.clearInput(); // input temizleme
    e.preventDefault();
}
function clearAllSearched(){
    //tüm arananları temizle
    if(confirm("Emin misiniz")){
        //silme
        Storage.clearAllSearchedUserFromStorage();
        ui.clearAllSearchedFromUI();
    }
}
function getAllSearched(){
    //arananları storagedan al ui'a ekle
    let users = Storage.getAllSearchedUsersFromStorage();
    let result = "";
    
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;

    });

    lastUsers.innerHTML = result;

}