// Update User Count
fetch('http://3.17.129.226:8080/api/user/getUserList', { mode: 'cors' })
    .then(data => data.json())
    .then(data => {
        $('#users-count').text(data.length);
    });

fetch('http://3.17.129.226:8080/api/org/getOrgList', { mode: 'cors' })
    .then(data => data.json())
    .then(data => {
        $('#orgs-count').text(data.length);
    });

fetch('http://3.17.129.226:8080/api/store/getStoreList', { mode: 'cors' })
    .then(data => data.json())
    .then(data => {
        $('#stores-count').text(data.length);
    });