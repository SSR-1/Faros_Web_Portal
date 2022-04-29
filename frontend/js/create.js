function suuccessAlert(message) {
    const aleryBody = `
    <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <span>${message}</span>
    </div>`;

    const messageDiv = $('.message-success');
    // messageDiv.empty();
    messageDiv.append(aleryBody);
    messageDiv.css("display", "block");
}

// Load library
function load_library_list() {
    const parent_div = $('div#library-list');
    parent_div.empty();
    $.ajax({
        url: 'http://3.17.129.226:8080/api/library/getAllLibraryList',
        type: 'GET',
        success: function (data) {
            let library_id, content_type, content_location, content_size, last_updated, last_updated_by, content_title, layout_count;
            let list_div, content_tag;


            data.forEach(el => {
                library_id = el.library_id;
                content_type = el.content_type;
                content_location = el.content_location;
                content_size = el.content_size;
                last_updated = el.last_updated;
                last_updated_by = el.last_updated_by;
                content_title = el.content_title;
                layout_count = el.layout_count;


                if (content_type == 'image') {
                    content_type = 'Image';
                    content_tag = `<img src="http://3.17.129.226:3000${content_location}" width="100%"></img>`;
                }

                if (content_type == 'video') {
                    content_type = 'Video';
                    content_tag = `<video width="100%" controls> <source src="http://3.17.129.226:3000${content_location}" type="video/mp4"></video>`;
                }

                list_div =
                    `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 grid-margin stretch-card ui-widget-content">
                            <div class="card" style="padding: 0px !important; border-radius: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                                ${content_tag}
                                <div class="overlay">
                                    <div class="overlay-text overlay-icon" data-id="${library_id}" onclick="addToLayoutPanel('${library_id}', 'http://3.17.129.226:3000${content_location}', '${content_type}')"><i class="ti-plus"></i></div>
                                </div>
                            </div>
                        </div>`;
                parent_div.append(list_div);
            })
        }
    })
}

// Default order value for new layout element
function getDefaultOrder() {
    const order = $("div.layout-panel> div").length;
    return order+1;
}

// Add image/video to the layout panel after clicking add button
function addToLayoutPanel(id, content_location, content_type) {
    let new_element;
    if (content_type == 'Image') {
        new_element =
            `<div>
                <img class="shadow-sm" style="vertical-align:unset" data-id="${id}" src="${content_location}" height="100%"></img>
                <div style="padding:10px" class="shadow-sm text-center">
                    <p class="order" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                        <span class="font-weight-bold">Position: </span>
                        <span style="padding:5px;" contenteditable="true">${getDefaultOrder()}</span>
                    </p>&nbsp;&nbsp;|&nbsp;
                    <p class="screen-time" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                        <span class="font-weight-bold">Screen Time: </span>
                        <span style="padding:5px" contenteditable="true">5</span>
                    </p>
                </div>
            </div>`;
    }
    if (content_type == 'Video') {
        new_element =
            `<div>
                <video class="shadow-sm" data-id="${id}" height="200px" controls>
                    <source src="http://3.17.129.226:3000${content_location}" type="video/mp4">
                </video>
                <div style="padding:10px" class="shadow-sm text-center">
                    <p class="order" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                        <span class="font-weight-bold">Position: </span>
                        <span style="padding:5px;" contenteditable="true">${getDefaultOrder()}</span>
                    </p>&nbsp;&nbsp;|&nbsp;
                    <p class="screen-time" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                        <span class="font-weight-bold">Screen Time: </span>
                        <span style="padding:5px" contenteditable="true">5</span>
                    </p>
                </div>
            </div>`;
    }
    $("div.layout-panel").append(new_element);
}

function clearLayoutPanel() {
    $("div.layout-panel").empty();
    $("div.library-config").empty();
}

// Create layout object send to backend
function createLayout() {
    let layout_id = "", last_updated_by = "", last_updated_time = "";
    const layout_content = [];
    let content_id, order, screen_time
    let layout_name = document.querySelector('input#new-layout-name').value;
    if (!layout_name) { 
        alert("Please enter layout name!");
        return;
    }
    document.querySelectorAll("div.layout-panel > div").forEach(el => {
        content_id = el.querySelector('img, video').getAttribute("data-id");
        order = el.querySelector('p.order span:last-child').textContent;
        screen_time = el.querySelector('p.screen-time span:last-child').textContent;
        layout_content.push({
            "content_id": content_id,
            "order": order,
            "screen_time": screen_time
        })
    });
   
    const layout_data = {
        "layout_id": layout_id,
        "layout_content": layout_content,
        "last_updated_by": last_updated_by,
        "last_updated_time": last_updated_time,
        "layout_name": layout_name
    }
    console.log(layout_data);

    $.ajax({
        url: "http://3.17.129.226:8080/api/layout/addNewLayout",
        type: "POST",
        data: layout_data,
        success: function (response) {
            if (response.status == 'success') {
                suuccessAlert(response.message);
                clearLayoutPanel();
            }
        }
    })
}

function updateLayout() { 
    const url = window.location.href;
    const layout_id = url.split("?") ? url.split("?")[1] : null;
    const last_updated_by = "";
    const last_updated_time = "";
    const layout_content = [];
    let content_id, order, screen_time
    let layout_name = document.querySelector('input#new-layout-name').value;
    if (!layout_name) {
        alert("Please enter layout name!");
        return;
    }
    document.querySelectorAll("div.layout-panel > div").forEach(el => {
        content_id = el.querySelector('img, video').getAttribute("data-id");
        order = el.querySelector('p.order span:last-child').textContent;
        screen_time = el.querySelector('p.screen-time span:last-child').textContent;
        layout_content.push({
            "content_id": content_id,
            "order": order,
            "screen_time": screen_time
        })
    });

    const layout_data = {
        "layout_id": layout_id,
        "layout_content": layout_content,
        "last_updated_by": last_updated_by,
        "last_updated_time": last_updated_time,
        "layout_name": layout_name
    }
    console.log(layout_data);

    $.ajax({
        url: "http://3.17.129.226:8080/api/layout/updateLayout",
        type: "POST",
        data: layout_data,
        success: function (response) {
            if (response.status == 'success') {
                suuccessAlert(response.message);
                clearLayoutPanel();
            }
        }
    })
}

load_library_list();

function getRequest(url) {
    return new Promise(res => {
        fetch(url).then(result => result.json()).then(data => res(data));
    })
}

$(document).ready(function () {

    const url = window.location.href;
    const layout_id = url.split("?") ? url.split("?")[1] : null;
    if (layout_id) { 
        $("button#create_layout_btn").text("UPDATE LAYOUT");
        $("button#create_layout_btn").attr("onclick", "updateLayout()")
        $.ajax({
            url: `http://3.17.129.226:8080/api/layout/getLayoutDetailsById/${layout_id}`,
            type: 'get',
            success: function (response) {
                const layout_content = response[0]["layout_content"];
                console.log()
                let layout_name = response[0].layout_name;
                let content_details;
                JSON.parse(layout_content).forEach(async (ele, index) => {
                    content_details = await getRequest(`http://3.17.129.226:8080/api/library/getContentDetailsById/${ele.content_id}`);
                    let content_location = `http://3.17.129.226:3000${content_details[0].content_location}`;
                    let layout_order = ele.order;
                    let layout_screen_time = ele.screen_time;
                    let content_size = content_details[0].content_size;
                    let content_title = content_details[0].content_title;
                    let content_type = content_details[0].content_type;
                    let last_updated = content_details[0].last_updated;
                    let last_updated_by = content_details[0].last_updated_by;
                    let layout_count = content_details[0].layout_count;
                    let library_id = content_details[0].library_id;

                    if (content_type == 'image') {
                        let layout_element = `<div>
                            <img class="shadow-sm" style="vertical-align:unset" data-id="${library_id}" src="${content_location}" height="100%">
                            <div style="padding:10px" class="shadow-sm text-center">
                                <p class="order" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                                    <span class="font-weight-bold">Position: </span>
                                    <span style="padding:5px;" contenteditable="true">${layout_order}</span>
                                </p>&nbsp;&nbsp;|&nbsp;
                                <p class="screen-time" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                                    <span class="font-weight-bold">Screen Time: </span>
                                    <span style="padding:5px" contenteditable="true">${layout_screen_time}</span>
                                </p>
                            </div>
                        </div>`;
                        $("div.layout-panel").append(layout_element);
                        $("input#new-layout-name").val(layout_name);
                    }

                    // addToLayoutPanel(`${library_id}`, `http://3.17.129.226:3000${content_location}`, `${content_type}`);

                    // if (content_type == 'video') {
                    //     $(`<div
                    //         <video class="shadow-sm" data-id="cnt00005" height="200px" controls="">
                    //             <source src="http://3.17.129.226:3000http://3.17.129.226:3000/library/images/fd-344b6b90-ebc7-46ce-a785-d1606c38155b.mp4" type="video/mp4">
                    //         </video>
                    //         <div style="padding:10px" class="shadow-sm text-center">
                    //             <p class="order" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                    //                 <span class="font-weight-bold">Position: </span>
                    //                 <span style="padding:5px;" contenteditable="true">3</span>
                    //             </p>&nbsp;&nbsp;|&nbsp;
                    //             <p class="screen-time" style="display:inline-block; margin-bottom:0px; line-height:0.875rem">
                    //                 <span class="font-weight-bold">Screen Time: </span>
                    //                 <span style="padding:5px" contenteditable="true">5</span>
                    //             </p>
                    //         </div>
                    //     </div>`);
                    // }
                })
            }
        });
    }
    $('div[aria-labelledby="dropdownMenuCompany"] a').click(function () {
        var selected_option = $(this).text().trim();
        $('#dropdownMenuCompany').text(selected_option);
        $('#dropdownMenuStore').text("Select Store");
        $('div#store-dropdown-list').removeAttr("hidden");

        $('div[aria-labelledby="dropdownMenuStore"] a').each(function (el) {
            if ($(this).attr('company-id') == selected_option) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        })
    })

    $('div[aria-labelledby="dropdownMenuStore"] a').click(function () {
        var selected_option = $(this).text().trim();
        $('#dropdownMenuStore').text(selected_option);
    });

    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });

    $("#file-upload-button").click(function () {

        var fd = new FormData();
        var files = $('input#new-file')[0].files;

        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);

            $.ajax({
                url: 'http://3.17.129.226:8080/api/library/uploadFile',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.status == 'success') {
                        $('div#add-new-file').modal('toggle');
                        suuccessAlert(response.message);
                        load_library_list();
                    }
                }
            });
        } else {
            alert("Please select a file.");
        }
    });
})
