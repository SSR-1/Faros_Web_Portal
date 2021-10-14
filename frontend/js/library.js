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
    $('.alert-success').alert();
}

function removeContent(library_id) {
    $.ajax({
        url: `http://localhost:8080/api/library/deleteContentById/${library_id}`,
        type: 'GET',
        success: function (response) {
            if (response.status == 'success') {
                suuccessAlert(response.message);
                load_library_list();
            }
        }
    });
}

function load_library_list() {
    const parent_div = $('div#library-list');
    parent_div.empty();
    $.ajax({
        url: 'http://localhost:8080/api/library/getAllLibraryList',
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
                    content_tag = `<img src="http://localhost:3000${content_location}" width="100%"></img>`;
                }

                if (content_type == 'video') {
                    content_type = 'Video';
                    content_tag = `<video width="100%" controls> <source src="http://localhost:3000${content_location}" type="video/mp4"></video>`;
                }

                list_div =
                    `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 grid-margin stretch-card">
                            <div class="card" style="padding: 0px !important; border-radius: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                                ${content_tag}
                                <div class="card-body" style="padding: 0px !important">
                                    <div class="row" style="padding-top: 20px; padding-left: 18px">
                                        <div class="col-md-2">
                                            <img src="./../images/faces/face28.jpg" style="width:50px; height:50px; border-radius:50%"
                                                alt="profile">
                                        </div>
                                        <div class="col-md-10">
                                            <p><span class="font-weight-medium">${content_title}</span></p>
                                            <p><span class="last_updated_by" data-id="${last_updated_by}">User Name</span> | <span>${last_updated.replace(/(.*)T(.*)\.(.*)/g, '$1 $2')}</span></p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row mt-4">
                                        <div class="col-md-4 text-center">
                                            <h6 class="text-primary font-weight-medium">${content_size}</h6>
                                            <p class="text-muted font-weight-medium">Size</p>
                                        </div>
                                        <div class="col-md-4 text-center">
                                            <h6 class="text-primary font-weight-medium hover-cursor">${layout_count} Layout(s)</h6>
                                            <p class="text-muted font-weight-medium">Usage</p>
                                        </div>
                                        <div class="col-md-4 text-center">
                                            <h6 class="text-primary font-weight-medium">${content_type}</h6>
                                            <p class="text-muted font-weight-medium">Type</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row mb-2">
                                        <div class="col-md-4 text-center">
                                            <p class="text-primary font-weight-bold hover-cursor" id="remove-content" data-id="${library_id}" onclick=removeContent("${library_id}")>REMOVE</p>
                                        </div>
                                        <div class="col-md-4 text-center">
                                            <p class="text-primary font-weight-bold hover-cursor" id="quick-add-content" data-id="${library_id}">QUICK ADD</p>
                                        </div>
                                        <div class="col-md-4 text-center">
                                            <p class="text-primary font-weight-bold hover-cursor" id="edit-content" data-id="${library_id}">EDIT</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                parent_div.append(list_div);
            })
        }
    })
}

load_library_list();

$(document).ready(function () {
    // $('#new-file').on('change', function () {
    //     var fileName = $(this).val();
    //     $(this).next('.custom-file-label').html(fileName);
    // })

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
                url: 'http://localhost:8080/api/library/uploadFile',
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
