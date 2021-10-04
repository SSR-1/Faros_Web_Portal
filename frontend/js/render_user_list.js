fetch('http://3.17.129.226:8080/api/user/getUserList', { mode: 'cors' })
    .then(data => data.json())
    .then(data => {
        let id, name, email, password, mobile, role, profile_pic;
        let table_record;
        const table = $('table#user-list-table');

        data.forEach(el => {
            id = el.user_id;
            name = el.user_name;
            email = el.user_email;
            password = el.user_password;
            mobile = el.user_mobile;
            role = el.user_role;
            profile_pic = el.user_profile_pic;

            table_record =
                `<tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                    <td>${role}</td>
                    <td class="font-weight-medium">
                        <div data-id="${id}" actio="edit-user" class="badge badge-warning">Edit</div>
                        <div data-id="${id}" action="delete-user" class="badge badge-danger">Delete</div>
                    </td>
                </tr>`;
            table.append(table_record);
        })

    });