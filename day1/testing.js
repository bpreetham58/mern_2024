function sendMessage(){
    if(document.getElementById('password').value !== document.getElementById('confirm-password').value){
        alert("Password not matched");
    }
    else{
        alert("Password Matched");
    }
}