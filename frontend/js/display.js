function load_layout_name(layout_id) { 
    fetch(`http://3.17.129.226:8080/api/layout/getLayoutDetailsById/${layout_id}`)
        .then(response => response.json())
        .then((data) => {
            $(`td[data-id="${layout_id}"]`).each(function (index, element) { 
                $(this).text(data[0].layout_name);
            })
        });
}

function load_store_name(store_id) {
    fetch(`http://3.17.129.226:8080/api/store/getStoreDetailsById/${store_id}`)
        .then(response => response.json())
        .then((data) => {
            $(`td[data-id="${store_id}"]`).each(function (index, element) {
                $(this).text(data[0].store_name);
            })
        });
}

function load_display_table() {
    const table_body = $('table#display-list-table > tbody');
    $.ajax({
        url: 'http://3.17.129.226:8080/api/display/getDisplayList',
        type: 'GET',
        success: function (data) {
            let display_id, store_id, active_lyt_id, display_name, layout_details, store_details;
            let table_record;
            

            data.forEach(async (el, index) => {
                display_id = el.display_id;
                store_id = el.store_id;
                active_lyt_id = el.active_lyt_id;
                display_name = el.display_name;

                table_record =
                    `<tr>
                    <td>${display_name}</td>
                    <td data-id="${active_lyt_id}"></td>
                    <td data-id="${store_id}"></td>
                    <td class="font-weight-medium">
                        <div data-id="${display_id}" actio="edit-user" class="badge badge-warning" onClick="change_layout('${display_id}')">Change Layout</div>
                        <div data-id="${display_id}" action="delete-user" class="badge badge-danger" onClick="delete_display('${display_id}')">Delete Display</div>
                    </td>
                </tr>`;
                table_body.append(table_record);
                load_layout_name(active_lyt_id);
                load_store_name(store_id);
            })
        }
    })
}

function add_new_display() {
    const display_name = $("input#new-display-name").val();
    const store_id = $("select#new-display-store :selected").val();
    const layout_id = $("select#new-display-layout :selected").val();

    const display_data = {
        "display_name": display_name,
        "store_id": store_id,
        "layout_id": layout_id
    }

    console.log(display_data);

    $.ajax({
        url: "http://3.17.129.226:8080/api/display/addNewDisplay",
        type: "POST",
        data: display_data,
        success: function (response) {
            if (response == "success") {
                $("input#new-display-name").val('');
                window.setTimeout(function () {
                    $('div#addNewDisplay').modal('toggle');
                    reload_display_table();
                }, 2000)
            }
        }
    })
}

function reload_display_table() {
    $('table#display-list-table > tbody').empty();
    load_display_table();
}

function delete_display(display_id) { 
    $.ajax({
        url: `http://3.17.129.226:8080/api/display/deleteDisplayById/${display_id}`,
        type: "GET",
        success: function (response) {
            if (response == "success") {
                reload_display_table();
            }
        }
    })
}

load_display_table();

$(document).ready(function () {
    $(document).on("change", "select", function () {
        $("option[value=" + this.value + "]", this)
            .attr("selected", true).siblings()
            .removeAttr("selected")
    });
})

