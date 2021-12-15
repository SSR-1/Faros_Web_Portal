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

function getRequest(url) {
    return new Promise(res => {
        fetch(url).then(result => result.json()).then(data => res(data));
    })
}

function updateCarouselContent(carousel_id, content_id_list) {
    return new Promise((res) => {
        let content_details;
        content_id_list.forEach(async (ele, index) => {
            content_details = await getRequest(`http://3.17.129.226:8080/api/library/getContentDetailsById/${ele}`);
            console.log(content_details);
            content_location = `http://3.17.129.226:3000${content_details[0].content_location}`;
            content_type = content_details[0].content_type;
            console.log(content_type);
            
            if (content_type == 'image') {
                $(`<div class="carousel-item"><img class="d-block w-100" src="${content_location}" alt="First slide"></div>`).appendTo(`#${carousel_id} .carousel-inner`);
            }

            if (content_type == 'video') {
                $(`<div class="carousel-item"><video width="100%" controls=""> <source src="${content_location}" type="video/mp4"></video></div>`).appendTo(`#${carousel_id} .carousel-inner`);
            }

            $(`<li data-target="#${carousel_id}" data-slide-to="${index}"></li>`).appendTo(`#${carousel_id} .carousel-indicators`);
            $(`#${carousel_id} .carousel-indicators > li`).first().addClass('active');
            $(`#${carousel_id} .carousel-inner .carousel-item`).first().addClass('active');
            $(`#${carousel_id}`).carousel();

            res();
        })
    })
}

async function load_layouts() {
    const layoutList = await getRequest('http://3.17.129.226:8080/api/layout/getLayoutList');

    const parent_div = $('div#library-list');
    let carousel_id, layout_id, layout_content, last_updated, last_updated_by, content_id_list, layout_name;

    layoutList.forEach(async (element, index) => {
        carousel_id = `carousel-${index + 1}`;
        layout_id = element.layout_id;
        layout_content = JSON.parse(element.layout_content);
        last_updated = element.last_updated;
        last_updated_by = element.last_updated_by;
        layout_name = element.layout_name;
        let content_id_list = [];
        
        // console.log(layout_content);
        // content_id_list = '';
        // layout_content.forEach((content, index) => {
        //     console.log(content);
        //     content_id_list = `${content_id_list} ${content.content_id}`
        // });
        // content_id_list = content_id_list.trim();
        // console.log(content_id_list);

        list_div =
            `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 grid-margin stretch-card layout-item" data-content-id="${content_id_list}">
                <div class="card" style="padding: 0px !important; border-radius: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                    <div id="${carousel_id}" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            
                        </ol>
                        <div class="carousel-inner">
                            
                        </div>
                        <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <div class="card-body" style="padding: 0px !important">
                        <div class="row" style="padding-top: 20px; padding-left: 18px">
                            <div class="col-md-2">
                                <img src="./../../images/faces/face28.jpg" style="width:50px; height:50px; border-radius:50%" alt="profile">
                            </div>
                            <div class="col-md-10">
                                <p><span class="font-weight-medium">${layout_name}</span></p>
                                <p><span class="last_updated_by" data-id="usr00001">User Name</span> | <span>2021-10-07 20:51:18</span></p>
                            </div>
                        </div>
                        <hr>
                        <div class="row mt-4">
                            <div class="col-md-4 text-center">
                                <h6 class="text-primary font-weight-medium">69.2 KB</h6>
                                <p class="text-muted font-weight-medium">Size</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <h6 class="text-primary font-weight-medium hover-cursor">1 Display(s)</h6>
                                <p class="text-muted font-weight-medium">Usage</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <h6 class="text-primary font-weight-medium">Images</h6>
                                <p class="text-muted font-weight-medium">Type</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row mb-2">
                            <div class="col-md-4 text-center">
                                <p class="text-primary font-weight-bold hover-cursor" data-id="cnt00001" onclick="delete_layout('${layout_id}')">DELETE</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <p class="text-primary font-weight-bold hover-cursor" data-id="cnt00001">DISABLE</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <p class="text-primary font-weight-bold hover-cursor" data-id="cnt00001">EDIT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        parent_div.append(list_div);

        layout_content.forEach((content, index) => {
            content_id_list.push(content.content_id);
        });

        await updateCarouselContent(carousel_id, content_id_list);
    });

    
}

function reload_layouts_table() {
    $('#library-list').empty();
    load_layouts();
}

function delete_layout(layout_id) {
    $.ajax({
        url: `http://3.17.129.226:8080/api/layout/deleteLayoutById/${layout_id}`,
        type: "GET",
        success: function (response) {
            if (response.status == 'success') {
                suuccessAlert(response.message);
                reload_layouts_table();
            }
        }
    })
}

load_layouts();

