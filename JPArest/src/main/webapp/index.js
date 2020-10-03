
            const tb = document.getElementById('tb');
            const url = 'api/person/';
            
            window.onload = () => {
                getAll();
            };

             const getAll = async() => {
                const allUrl = url + "all";
                fetch(allUrl)
                        .then(res => fetchWithErrorCheck(res))
                        .then((data) => {
                            const trs = data.all.map((user) => {
                                return `<tr><td>${user.id}</td><td>${user.fName}</td><td>${user.lName}</td><td>${user.phone}</td><td>${user.street}</td><td>${user.zip}</td><td>${user.city}</td></tr>`;
                            });
                            const trStr = trs.join('');
                            tb.innerHTML = trStr;
                        });
            };
            document.getElementById('btnIdAll').onclick = getAll;
            
            
            const getUser = async () => {
                const id = document.getElementById('personid').value;
                const userResponse = await fetch(`${url}${id}`);
                const userData = await fetchWithErrorCheck(userResponse);
                const userStr = `${userData.fName}, ${userData.lName} has phone: ${userData.phone}. The address is: ${userData.street}, ${userData.zip}in ${userData.city}`;
                document.getElementById('divId2').innerHTML = userStr;
            }
            document.getElementById('btnId').onclick = getUser;
            
            function makeOptions(method, body) {
                var opts = {
                    method: method,
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    }
                }
                if (body) {
                    opts.body = JSON.stringify(body);
                }
                return opts;
            }
            ;
            var delbtn = document.getElementById("deleteusr");

            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            

            
            btn.onclick = addUser = async () => {
                modal.style.display = "block";
                const data = {fName: document.getElementById('fName').value, lName: document.getElementById('lName').value,
                    phone: document.getElementById('phone').value, street: document.getElementById('street').value, zip: document.getElementById('zip').value, city: document.getElementById('city').value};
                const options = makeOptions("POST", data);
                fetch(url, options);
                document.getElementById('fName').value = "";
                document.getElementById('lName').value = "";
                document.getElementById('phone').value = "";
                document.getElementById('street').value = "";
                document.getElementById('zip').value = "";
                document.getElementById('city').value = "";
            };

            const editUser = async () => {
                const id = document.getElementById('usrid').value;
                const userResponse = await fetch(`${url}${id}`);
                const userData = await fetchWithErrorCheck(userResponse);
                document.getElementById('fName').value = userData.fName;
                document.getElementById('lName').value = userData.lName;
                document.getElementById('phone').value = userData.phone;
                document.getElementById('street').value = userData.street;
                document.getElementById('zip').value = userData.zip;
                document.getElementById('city').value = userData.city;
            };
            document.getElementById('updtUsr').onclick = editUser;

            document.getElementById('deleteusr').onclick = deleteUser = async () => {
                const id = document.getElementById('deleteid').value;
                const options = makeOptions("DELETE");
                fetch(`${url}${id}`, options);
            };

            const editUser2 = async () => {
                const id = document.getElementById('usrid').value;

                const data = {fName: document.getElementById('fName').value, lName: document.getElementById('lName').value,
                    phone: document.getElementById('phone').value, street: document.getElementById('street').value,
                    zip: document.getElementById('zip').value, scity: document.getElementById('city').value};
                const options = makeOptions("PUT", data);
                fetch(`${url}${id}`, options);

                document.getElementById('fName').value = "";
                document.getElementById('lName').value = "";
                document.getElementById('phone').value = "";
                document.getElementById('street').value = "";
                document.getElementById('zip').value = "";
                document.getElementById('city').value = "";
            };
            document.getElementById('sendupdt').onclick = editUser2;






            function fetchWithErrorCheck(res) {
                if (!res.ok) {
                    return Promise.reject({status: res.status, fullError: res.json()});
                }
                return res.json();
            }
