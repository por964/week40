import 'bootstrap/dist/css/bootstrap.css';
import regeneratorRuntime from "regenerator-runtime";

const tb = document.getElementById('tb');
const url = 'http://localhost:3333/api/users/';

document.getElementById('btnIdAll').onclick = () => {
fetch(url)
.then(res=>fetchWithErrorCheck(res))
.then((data)=>{
    const trs = data.map((user)=>{
        return `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td><td>${user.gender}</td><td>${user.email}</td></tr>`;
    });
    const trStr = trs.join('');
    tb.innerHTML = trStr;
});
};

/*document.getElementById('btnId').onclick = () => {
    const id = document.getElementById('inpId').value;
    fetch(`${url}/${id}`)
    .then(res=>fetchWithErrorCheck(res))
    .then(user=>{
        const userStr = `${user.name} has email: ${user.email}. ${(user.gender==='female')?'She':'He'} is ${user.age} years old`;
        document.getElementById('divId').innerHTML = userStr;
    });
};*/


const getUser = async () => {
    const id = document.getElementById('inpId').value;
    const userResponse = await fetch(`${url}/${id}`);
    const userData = await fetchWithErrorCheck(userResponse);
    const userStr = `${userData.name} has email: ${userData.email}. ${(userData.gender==='female')?'She':'He'} is ${userData.age} years old`;
    document.getElementById('divId2').innerHTML = userStr;
}
document.getElementById('btnId').onclick = getUser;



function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   };

   const addUser = async () => {
   const data = {age: document.getElementById('age').value,name: document.getElementById('name').value, gender: document.getElementById('gender').value,email: document.getElementById('email').value};
    const options = makeOptions("POST",data);
    fetch(url,options);
    document.getElementById('age').value = "";
    document.getElementById('name').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('email').value = "";
   };
   document.getElementById('addUsr').onclick = addUser;

   const edituser = async () => {
    const id = document.getElementById('usrid').value;
    const userResponse = await fetch(`${url}/${id}`);
    const userData = await fetchWithErrorCheck(userResponse);
    document.getElementById('age').value = userData.age;
    document.getElementById('name').value = userData.name;
    document.getElementById('gender').value = userData.gender;
    document.getElementById('email').value = userData.email;
   };
   document.getElementById('updtUsr').onclick = edituser;

   document.getElementById('deleteusr').onclick = async () => {
    const id = document.getElementById('deleteid').value;
        const options = makeOptions("DELETE");
       fetch(`${url}/${id}`,options);
     };

   const editUser2 = async () => {
    const id = document.getElementById('usrid').value;

    const data = {age: document.getElementById('age').value,name: document.getElementById('name').value, gender: document.getElementById('gender').value,email: document.getElementById('email').value};
     const options = makeOptions("PUT",data);
     fetch(`${url}/${id}`,options);
     
     document.getElementById('age').value = "";
     document.getElementById('name').value = "";
     document.getElementById('gender').value = "";
     document.getElementById('email').value = "";
    };
    document.getElementById('sendupdt').onclick = editUser2;

    




function fetchWithErrorCheck(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}