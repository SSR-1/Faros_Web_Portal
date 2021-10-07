function load_users_table() {
    const table_body = $('table#user-list-table > tbody');
    $.ajax({
        url: 'http://3.17.129.226:8080/api/user/getUserList',
        type: 'GET',
        success: function (data) {
            let id, name, email, password, mobile, role, profile_pic;
            let table_record;
            

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
                        <div data-id="${id}" action="delete-user" class="badge badge-danger" onClick="delete_user('${id}')">Delete</div>
                    </td>
                </tr>`;
                table_body.append(table_record);
            })
        }
    })
}

function reload_users_table() {
    $('table#user-list-table > tbody').empty();
    load_users_table();
}

function add_new_user() {
    const name = $("input#new-user-name").val();
    const mobile = $("input#new-user-mobile").val();
    const email = $("input#new-user-email").val();
    const password = $("input#new-user-password").val();
    const role = $("select#new-user-role :selected").text();
    const pic = '';

    const user_data = {
        "name": name,
        "mobile": mobile,
        "email": email,
        "password": password,
        "role": role,
        "pic": pic
    }

    $.ajax({
        url: "http://3.17.129.226:8080/api/user/addNewUser",
        type: "POST",
        data: user_data,
        success: function (response) {
            if (response == "success") {
                $("input#new-user-name").val('');
                $("input#new-user-mobile").val('');
                $("input#new-user-email").val('');
                $("input#new-user-password").val('');
                $("select#new-user-role").val('0');
                $("p#new-user-message").text('Successfully Inserted');
                window.setTimeout(function () {
                    $('div#userRegistration').modal('toggle');
                    reload_users_table();
                },2000)
            }
        }
    })
}

function delete_user(user_id) {
    $.ajax({
        url: `http://3.17.129.226:8080/api/user/deleteUserById/${user_id}`,
        type: "GET",
        success: function (response) {
            if (response == "success") {
                reload_users_table();
            }
        }
    })
}

load_users_table();

$(document).on("change", "select", function () {
    $("option[value=" + this.value + "]", this)
        .attr("selected", true).siblings()
        .removeAttr("selected")
});

