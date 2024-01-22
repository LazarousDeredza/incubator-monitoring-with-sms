function saveIncubator() {
    let firstName = document.getElementById("fname").value
    let lastName = document.getElementById("lname").value
    let location = document.getElementById("location").value

    let phone = document.getElementById("phone").value;
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    let address = location;
    let temperature = "";
    let humidity = ""
    let batteryVoltage = "";
    let batteryCurrent = ""
    let state = "";

    if (firstName.length === 0 || lastName.length === 0 || location.length === 0 ||
        phone.length === 0 || latitude.length === 0 || longitude.length === 0
    ) {
        alert("Fill in all details");
        return;
    }

    let data = {
        firstName,
        lastName,
        location,
        address,
        phone,
        latitude,
        longitude,
        temperature,
        humidity,
        batteryCurrent,
        batteryVoltage,
        state,

        dateAdded: new Date().toISOString().slice(0, 10),

    }

    $.ajax({
        url: '/incubator/add',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            //  alert( response.responseText);
            console.log(response);
            // getProperties();
            let element = document.getElementById("response");
            element.innerText = response.responseText.toString();
            $('#successModal').modal('show')

            //  document.getElementById("_form").reset();
        },
        error: function (response) {
            // alert(  response.responseText);
            console.log(response);
            // getProperties();
            let element = document.getElementById("response");
            element.innerText = response.responseText.toString();
            $('#successModal').modal('show')

            //  document.getElementById("_form").reset();
        },

    })


}

function closeModal() {
    $('.modal').modal('hide')

}

const properties = [];
async function getIncubators() {

    var baseurl = "/incubator/list";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            for (let i = 0; i < data.length; i++) {
                const item = data[i];

                const property = {
                    id:item.id,
                    address: item.address,
                    location: item.location,
                    type: "home",
                    phone:item.phone,
                    firstName:item.firstName,
                    lastName:item.lastName,
                    temperature: item.temperature,
                    humidity: item.humidity,
                    batteryVoltage: item.batteryVoltage,
                    batteryCurrent: item.batteryCurrent,
                    position: {
                        lat: parseFloat(item.latitude),
                        lng: parseFloat(item.longitude)
                    }
                };

                properties.push(property);
            }




            console.log(xmlhttp.responseText);
            $("#dataTable").DataTable({
                data: data,
                columns: [
                    {"data": "id"},
                    {
                        "data": function (row) {
                            return row.firstName + " " + row.lastName;
                        }
                    },
                    {
                        "data": function (row) {
                            return row.location;
                        }
                    },
                    {
                        "data": function (row) {
                            return row.phone;
                        },
                        "sortable": false,
                        "searchable": false
                    },

                    {
                        "data": "latitude",
                        render: function (data) {
                            return data;
                        }
                    },

                    {
                        "data": "longitude",
                        render: function (data) {
                            return data;
                        }
                    },
                    {
                        "data": "state",
                        render: function (data) {
                            if (data === "ON") {
                                return "<span class='badge badge-pill badge-success' style='background-color: green!important;'> " + data + "</span>";
                            } else if (data === "OFF") {
                                return "<span class='badge badge-pill badge-warning' style='background-color: red!important;'> " + data + "</span>";
                            } else {
                                return "<span class=' badge-pill badge-danger'> .... </span>";

                            }
                        }
                    },
                    {
                        "data": "id",
                        "sortable": false,
                        "searchable": false,
                        render: function (data) {
                            return '<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <span class="text-muted sr-only">Action</span></button>' + `
                            <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="Edit-Incubator" onclick="setLocal('` + data + `')">Edit</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('` + data + `')" href="#">Turn On/Off</a>
                            
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#deleteDialog" onclick="setLocal('` + data + `')" href="#">Delete</a>
                            <a class="dropdown-item" href="IncubatorDetails" onclick="setLocal('` + data + `')">View More Details</a>
                        </div>`

                        }
                    }
                ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ]
            });
        }
    };
    xmlhttp.send();


}


function saveUpdate() {

    var id = JSON.parse(localStorage.getItem("id"));
    var jsonDataObj = {
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "phone": $("#phone").val(),
        "location": $("#location").val(),
        "latitude": $("#latitude").val(),
        "longitude": $("#longitude").val()
    };

    let ar = document.getElementById("retry");
    ar.setAttribute("style", "display:none");
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonDataObj),
        type: "PUT",
        url: "/incubator/edit/" + id,


        success: function (response) {
            console.log(response)

            Close.setAttribute("style", "display:all");
            alert('Record Updated Successfully !!', 'success')
            return;

        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {

                Close.setAttribute("style", "display:all");
                alert('Incubator Updated Successfully !!', 'success')
                return;
            } else if (e.status.toString() == "500") {

                ar.setAttribute("display", "all");
                Close.setAttribute("style", "display:all");
                alert("There was an error in Updating record !!", 'danger');
                console.log("ERROR : ", e.responseJSON.message);
                return;
            } else {
                ar.setAttribute("style", "display:all");
                Close.setAttribute("style", "display:all");
                alert(e.responseJSON.message, 'danger');
                console.log("ERROR : ", e);
                return;
            }


        }
    });
}

var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
var alertPlaceholder2 = document.getElementById('liveAlertPlaceholder2');


function alert(message, type) {

    var y = document.getElementById("ldID");
    if (y) {
        y.setAttribute("style", "display:none");
    }


    var e = document.getElementById("ldiD");
    if (e) {
        e.setAttribute("style", "display:none");
    }


    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

    } else {
        var wrapper = document.createElement('div');
        wrapper.setAttribute("id", "err");
        wrapper.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

        alertPlaceholder.append(wrapper);
    }

}


function setLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id", JSON.stringify(id));

}

// Fetching Record For Viewing
function FetchRecord() {

    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: '/incubator/get/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)


            let id = document.getElementById("id");
            let firstName = document.getElementById("firstName");
            let lastName = document.getElementById("lastName");
            let location = document.getElementById("location");
            let phone = document.getElementById("phone");
            let latitude = document.getElementById("latitude");
            let longitude = document.getElementById("longitude");


            id.innerText = `${response.id}`;
            firstName.value = `${response.firstName}`;
            lastName.value = `${response.lastName}`;
            location.value = `${response.location}`;
            phone.value = `${response.phone}`;
            latitude.value = `${response.latitude}`;
            longitude.value = `${response.longitude}`;


        }
    });

}

function FetchRecordForAllDetails() {

    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: '/incubator/get/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)


            let id = document.getElementById("id");
            let firstName = document.getElementById("firstName");
            let lastName = document.getElementById("lastName");
            let location = document.getElementById("location");
            let phone = document.getElementById("phone");
            let latitude = document.getElementById("latitude");
            let longitude = document.getElementById("longitude");

            let temperature = document.getElementById("temperature");
            let humidity = document.getElementById("humidity");
            let voltage = document.getElementById("voltage");
            let current = document.getElementById("current");
            let state = document.getElementById("state");
            let dateAdded = document.getElementById("dateAdded");


            id.innerText = `${response.id}`;
            firstName.value = `${response.firstName}`;
            lastName.value = `${response.lastName}`;
            location.value = `${response.location}`;
            phone.value = `${response.phone}`;
            latitude.value = `${response.latitude}`;
            longitude.value = `${response.longitude}`;
            temperature.value = `${response.temperature}`;
            humidity.value = `${response.humidity}`;
            voltage.value = `${response.batteryVoltage}`;
            current.value = `${response.batteryCurrent}`;
            state.value = `${response.state}`;
            dateAdded.value = `${response.dateAdded}`;


            var data = response.messagesList;
            console.log("Messages: " + response.messagesList);
            $("#dataTable").DataTable({
                data: data,
                columns: [

                    {
                        "data": function (row) {
                            return "<i class='fe fe-calendar'></i>" + row.date;
                        }
                    },
                    {
                        "data": function (row) {
                            return "<i class='fe fe-watch'></i>" + row.time;
                        }
                    },
                    {
                        "data": function (row) {
                            return "<i class='fe fe-thermometer'></i>" + row.temperature;
                        }
                    },

                    {"data": "humidity"},

                    {
                        "data": "batteryCurrent",
                        render: function (data) {
                            return data;
                        }
                    },
                    {
                        "data": "batteryVoltage",
                        render: function (data) {
                            return data;
                        }
                    },


                ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ]
            });


        }
    });

}



function turn(s) {
    console.log("Turning :"+s);

    var id = JSON.parse(localStorage.getItem("id"));


    let ar = document.getElementById("alerrt5");
    ar.setAttribute("style", "display:all");

    let rr = document.getElementById("ldiD5");
    rr.setAttribute("style", "display:all;background: none;color: green;border: none;font-size: 20px");

console.log(".,....");

    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        url: "/sms/send/" + id+"/"+s,


        success: function (response) {
            console.log("Response: " + e.responseText.toString());
            let Close = document.getElementById("Close5");
            Close.setAttribute("style", "display:all");

            let Response = document.getElementById("liveAlertPlaceholder");
            Response.innerHTML = "<span> " + e.responseText + "</span> ";

            let turnon = document.getElementById("turnon");
            turnon.setAttribute("style", "display:none");

            let turnoff = document.getElementById("turnoff");
            turnoff.setAttribute("style", "display:none");

        }
        ,
        error: function (e) {
            console.log("Response: " + e.responseText.toString());
            let Close = document.getElementById("Close5");
            Close.setAttribute("style", "display:all");

            let Response = document.getElementById("liveAlertPlaceholder");
            Response.innerHTML = "<span> " + e.responseText + "</span> ";

            let turnon = document.getElementById("turnon");
            turnon.setAttribute("style", "display:none");

            let turnoff = document.getElementById("turnoff");
            turnoff.setAttribute("style", "display:none");

        }
    });

}

function turn2(s,id) {
    console.log("Turning :"+s);

    $('#exampleModal').modal('show');

    let ar = document.getElementById("alerrt5");
    ar.setAttribute("style", "display:all");

    let rr = document.getElementById("ldiD5");
    rr.setAttribute("style", "display:all;background: none;color: green;border: none;font-size: 20px");

    console.log(".,....");

    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        url: "/sms/send/" + id+"/"+s,


        success: function (response) {
            console.log("Response: " + e.responseText.toString());
            let Close = document.getElementById("Close5");
            Close.setAttribute("style", "display:all");

            let Response = document.getElementById("liveAlertPlaceholder");
            Response.innerHTML = "<span> " + e.responseText + "</span> ";



        }
        ,
        error: function (e) {
            console.log("Response: " + e.responseText.toString());
            let Close = document.getElementById("Close5");
            Close.setAttribute("style", "display:all");

            let Response = document.getElementById("liveAlertPlaceholder");
            Response.innerHTML = "<span> " + e.responseText + "</span> ";



        }
    });

}

function DeleteIncubator() {


    var id = JSON.parse(localStorage.getItem("id"));


    let ar = document.getElementById("modal-body");
    ar.setAttribute("style", "display:all");

    let Close = document.getElementById("Close");


    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        type: "DELETE",
        url: "/incubator/delete/" + id,


        success: function (response) {
            console.log("Response: " + response);
            let Close = document.getElementById("Close4");

            Close.setAttribute("style", "display:all");

            let Response = document.getElementById("liveAlertPlaceholder4");
            Response.innerHTML = "<span> " + e.toString() + "</span> ";

            return;

        }
        ,
        error: function (e) {
            console.log("Response: " + e.responseText.toString());
            let Close = document.getElementById("Close4");
            Close.setAttribute("style", "display:all");

            let Response = document.getElementById("liveAlertPlaceholder4");
            Response.innerHTML = "<span> " + e.responseText + "</span> ";

            let YesBtn = document.getElementById("yes");
            YesBtn.setAttribute("style", "display:none");

            let CancelBtn = document.getElementById("cancel");
            CancelBtn.setAttribute("style", "display:none");

        }
    });
}




//markers

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: -18.3873297, lng: 30.5088342 };
    const map = new Map(document.getElementById("map"), {
        zoom: 6.4,
        center,
        mapId: "4504f8b37365c3d0",
    });

    for (const property of properties) {
        const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
            map,
            content: buildContent(property),
            position: property.position,
            title: property.location,
        });

        AdvancedMarkerElement.addListener("click", () => {
            toggleHighlight(AdvancedMarkerElement, property);
        });
    }
}

function toggleHighlight(markerView, property) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
}

function buildContent(property) {
    const content = document.createElement("div");

    content.classList.add("property");
    content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
        <span class="fa-sr-only">${property.type}</span>
    </div>
    <div class="details">
        <div class="price">${property.location}</div>
        <div class="address">${property.phone}  |  ${property.firstName} ${property.lastName}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-sun fa-lg sun" title="Temperature"></i>
            <span class="fa-sr-only">Temperature</span>
            <span>${property.temperature} <sup>o</sup>C</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-cloud fa-lg cloud" title="Humudity"></i>
            <span class="fa-sr-only">Humudity</span>
            <span>${property.humidity} <span> <i aria-hidden="true" class="fa fa-percentage fa-sm" title="Humudity"></i></span></span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-battery-half fa-lg battery" title="Voltage & Current"></i>
            <span class="fa-sr-only">Voltage</span>
            <span>${property.batteryVoltage} V</span>
            <span>|</span>
             <span class="fa-sr-only">Current</span>
            <span>${property.batteryCurrent} Amps</span>
        </div>
        </div>
        <div class="features" style=" justify-content: center; padding-top: 8px;">
        <div style="background-color: green;"><button onclick="turn2('ON',${property.id})" >ON</button></div>
        <div style="background-color: red;"><button onclick="turn2('OFF',${property.id})" >OFF</button></div>
        </div>
    </div>
    `;
    return content;
}

// const properties = [
//     {
//         address: "215 Emily St, MountainView, CA",
//         location: "Location",
//         type: "home",
//         temperature: 5,
//         himudity: 4.5,
//         position: {
//             lat: 37.50024109655184,
//             lng: -122.28528451834352,
//         },
//     },
//     {
//         address: "108 Squirrel Ln &#128063;, Menlo Park, CA",
//         price: "$ 3,050,000",
//         type: "building",
//         temperature: 5,
//         himudity: 4.5,
//         position: {
//             lat: 37.44440882321596,
//             lng: -122.2160620727,
//         },
//     }
//
// ];
//

//markers
