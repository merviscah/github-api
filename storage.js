class Storage {
    static getAllSearchedUsersFromStorage(){
        // tüm kullanıcıları al
        let users;
        if(localStorage.getItem("searched") === null){
            users = [];

        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));

        }
        return users;


    }
    static addSearchedUserToStorage(username){
        // sorgulanmış kullanıcıyı storagea ekle
        let users = this.getAllSearchedUsersFromStorage();
        // indexOf
        if(users.indexOf(username) === -1){
            users.push(username);

        }

        localStorage.setItem("searched",JSON.stringify(users));


    }
    static clearAllSearchedUserFromStorage(){
        //tüm kullanıcıları silme
        localStorage.removeItem("searched");

         
    }

}