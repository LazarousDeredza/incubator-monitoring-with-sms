function setLocal(id, name) {
    localStorage.removeItem("id");
    localStorage.setItem("id", JSON.stringify(id));

    localStorage.removeItem("nameProp");
    localStorage.setItem("nameProp", JSON.stringify(name));
}

function setLocalCompartment(id, name) {
    localStorage.removeItem("idComp");
    localStorage.setItem("idComp", JSON.stringify(id));

    localStorage.removeItem("nameComp");
    localStorage.setItem("nameComp", JSON.stringify(name));
}

function setDropDownLocal() {
    localStorage.removeItem("drop_id");
    localStorage.setItem("drop_id", JSON.stringify(id));
}

function searchFilter() {
    let items = JSON.parse(localStorage.getItem("properties"));

    let field = document.getElementById("propertySearch").value;

    let t_body = document.getElementById("t_body");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < items.length; i++) {
        let string = JSON.stringify(items[i])

        if (string.toLowerCase().includes(field.toLowerCase())) {
            let new_html = `<td>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="2474">
                              <label class="custom-control-label" for="2474"></label>
                            </div>
                          </td>
                          <td>
                            <div class="avatar avatar-md">
                              <img src="assets/avatars/office-building.png" alt="..." class="avatar-img rounded-circle">
                            </div>
                          </td>
                          <td>
<!--                            <p class="mb-0 text-muted"><strong>Brown, Asher D.</strong></p>-->
                            <small class="mb-0 text-muted">${items[i].id}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted">${items[i].name}</p>
                            <small class="mb-0 text-muted">${items[i].addressObject.address}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted"><a href="#" class="text-muted">${items[i].propertyContactObject.phone} ${items[i].propertyContactObject.mobileNumber}</a></p>
                            <small class="mb-0 text-muted">${items[i].propertyContactObject.email}</small>
                          </td>
                          <td class="w-25">
                          <p class="mb-0 text-muted">${items[i].ownerObject.name} ${items[i].ownerObject.lastName}</p>
                          <small class="text-muted"> ${items[i].ownerObject.contactDetailsObject.mobileNumber} ${items[i].ownerObject.contactDetailsObject.email} </small>
                          </td>
                          <td class="text-muted">13/09/2020</td>
                          <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="text-muted sr-only">Action</span>
                          </button>
                            <div class="dropdown-menu dropdown-menu-right"  >
                              <a class="dropdown-item" href="editProperty" onclick="setLocal('${items[i].id}')">Edit</a>
                              <a class="dropdown-item" href="viewProperty" onclick="setLocal('${items[i].id}','${items[i].name}')">View</a>
<!--                              <a class="dropdown-item" href="#">Assign</a>-->
                            </div>
                          </td>`


            let tr = document.createElement("tr");

            tr.innerHTML = new_html;

            t_body.appendChild(tr);
        }
    }
}

/************************************compartment section******************************************************/

function setAddPropertyDropDown() {
    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            console.log(response)
            let dropDown = document.getElementById("property");

            while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");

                option.text = response[i].name;
                option.setAttribute("value", `${response[i].id}`)

                dropDown.appendChild(option);
            }
        }
    })
}

function saveCompartment() {
    let property = document.getElementById("property").value;
    let floorNumber = document.getElementById("propertyFloor").value;
    let floorArea = document.getElementById("floorArea").value;
    let rentalRate = document.getElementById("rentalRate").value;
    let description = document.getElementById("description").value;
    let compartmentNumber = document.getElementById("compartmentNumber").value;

    let data = {
        property,
        floorNumber,
        floorArea,
        rentalRate,
        description,
        compartmentNumber
    }

    $.ajax({
        url: '/api/compartment/save-compartment',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            let element = document.getElementById("toast");

            $('#successModal').modal('show')
            // Create toast instance
            // let myToast = new bootstrap.Toast(element);
            // myToast.show()

            document.getElementById("_form").reset();
            console.log(response)

        }
    })
}

function appendCompartments() {
    let id = JSON.parse(localStorage.getItem("id"));
   

 // -----------------
    var baseurl = '/api/compartment/get-compartments-for-specific-property/' + id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);
            $("#property-compartment").DataTable({
                data: data,
                columns: [
                    {"data": "id"},
                    {"data": function (row) {
                                return "Space ID : "+row.compartmentNumber+ "<br> Floor : "+row.floorNumber;

                        },
                         "sortable":false,
                     "searchable":false },
                    {"data": function (row) {
                       let businessName="";
                        if(row.tenantObject===null){
                            businessName=" ......"
                        }else{
                            businessName =row.tenantObject.business_name
                        }
                        return businessName;
                        }},
                    {"data":function(row){
                            return "$"+row.floorArea * row.rentalRate ;
                        }},
                    {"data": function (row) {
                                return row.floorArea+ " &#13217";
                            }},
                    { "data": function(row){
                        return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="viewCompartment" onclick="setLocalCompartment('`+row.id+`')">View</a>
                                </div>`
                    },
                     "sortable":false,
                     "searchable":false }
                    
                       
                    

                ]
            });
        }
    };
    xmlhttp.send();

   // ---------------

/*

    $.ajax({
        url: '/api/compartment/get-compartments-for-specific-property/' + id,
        type: 'GET',
        success: function (response) {
            let t_body = document.getElementById("t_body");
            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < response.length; i++) {
                let html = `<td>
<!--                                                            <div class="custom-control custom-checkbox">-->
<!--                                                                <input type="checkbox" class="custom-control-input" id="2474">-->
<!--                                                                <label class="custom-control-label" for="2474"></label>-->
<!--                                                            </div>-->
                                                        </td>
                                                        <td>
                                                            <div class="avatar avatar-sm">
                                                                <img src="assets/avatars/data-random-squares.png" alt="..." class="avatar-img rounded-circle">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0 text-muted"><strong>${response[i].compartmentNumber}, floor : ${response[i].compartmentNumber} </strong></p>
                                                            <small class="mb-0 text-muted">${response[i].id}</small>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0 text-muted">Tenant Bussiness</p>
                                                            <small class="mb-0 text-muted">teneant email , tenant phone</small>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0 text-muted"><a href="#" class="text-muted">status:<span class="badge badge-secondary">owing</span></a></p>
                                                            <small class="mb-0 text-muted">${response[i].floorArea * response[i].rentalRate}</small>
                                                        </td>
                                                        <td class="text-muted">${response[i].floorArea} &#13217;</td>
                                                        <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span class="text-muted sr-only">Action</span>
                                                        </button>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="view-compartment.html" onclick="setLocalCompartment('${response[i].id}')">View</a>
                                                            </div>
                                                        </td>`
                let tr = document.createElement("tr");
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }
        }
    });*/
}

function viewCompartment() {
    let propertyName = JSON.parse(localStorage.getItem("nameProp"));
    let id = JSON.parse(localStorage.getItem("idComp"));
    $.ajax({
        url: '/api/compartment/get-compartment/' + id,
        type: 'GET',
        success: function (response) {
            let business_name;
            let business_type;
            let email;
            let phone;

            if (response.tenantObject != null){
                business_name = response.tenantObject.business_name
                business_type = response.tenantObject.business_type
                email = response.tenantObject.email
                phone = response.tenantObject.phone
            }else {
                business_type = "N/A"
                business_name = "N/A"
                email = "N/A"
                phone = "N/A"
            }

            console.log(response)
            let html = `<div class="card-body">
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted"> Property Name</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${propertyName}</strong>
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted"> Compartment Square Area</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.floorArea}</strong>
                                            </dd>
                                        </dl>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Lettable space ID</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.compartmentNumber}</strong>
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted"> Lettable space Floor Number</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.floorNumber}</strong>
                                            </dd>
                                        </dl>
                                        <dl class="row mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Rental Rate per ㎡ </dt>
                                            <dd class="col-sm-4 mb-3">${response.rentalRate}</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Rent payable</dt>
                                            <dd class="col-sm-4 mb-3">${response.floorArea * response.rentalRate}</dd>
                                            <!--<dt class="col-sm-2 mb-3 text-muted">Phone</dt>
                                            <dd class="col-sm-4 mb-3"> +263 00 000</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Mobile</dt>
                                            <dd class="col-sm-4 mb-3">+263 00 000</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Created On</dt>
                                            <dd class="col-sm-4 mb-3">2020-04-21 00:38:38</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Last Update</dt>
                                            <dd class="col-sm-4 mb-3">2020-04-21 08:48:18</dd>-->
                                            <dt class="col-sm-2 text-muted">Description</dt>
                                            <dd class="col-sm-10"> ${response.description}.
                                            </dd>

                                        </dl>
                                        <hr class="my-4">
                                        <h5 class="mb-2 mt-4">Tenant Details</h5>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Business Name</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${business_name}
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Business Type</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${business_type}
                                            </dd>
                                        </dl>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Phone</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${phone}
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Email</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${email}
                                            </dd>
                                        </dl>
                                        <hr class="my-4">
                                        <h5 class="mb-2 mt-4">Payment History</h5>
                                        <dl class="row align-items-center mb-0">
                                            <div class="col-md-12 my-4">
                                                <div class="card shadow">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Payment History</h5>
                                                        <p class="card-text">Below is a list of all payments for the tenant.</p>
                                                       <table class="table table-hover table-sm">
                                                            <thead>
                                                            <tr>
                                                                <th>Date</th>
                                                                <!--                              <th>ID #</th>-->
                                                                <th>Reference #</th>
                                                                <th>Company/Tenant</th>
                                                                <th>Payment Method</th>
                                                                <th>Invoice #</th>
                                                                <th>Amount</th>
            <!--                                                    <th>View</th>-->
                                                                <!--                              <th>Status</th>-->
                                                            </tr>
                                                            </thead>
                                                            <tbody id="t_body">
            
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </dl>
                                    </div> <!-- .card-body -->`

            let propertyDetails = document.getElementById("compartmentDetails");
            propertyDetails.innerHTML = html;

            let propNameOne = document.getElementById("propNameOne");
            let propNameTwo = document.getElementById("propNameTwo");

            propNameOne.innerText = "Lettable Space " + response.compartmentNumber;
            propNameTwo.innerText = "Lettable Space " + response.compartmentNumber;

            v_c_appendPayments()
        }
    })


}

function v_c_appendPayments(){
    let id = JSON.parse(localStorage.getItem("idComp"));

    $.ajax({
        url: '/api/payment/get-payments-for-specific-tenant/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)

            if (response !== null) {
                let t_body = document.getElementById("t_body");

                while (t_body.hasChildNodes()) {
                    t_body.removeChild(t_body.firstChild);
                }
                // console.log(response[1].paymentDate)

                for (let i = response.length - 1; i >= 0; i--) {
                    let html = `<td>${response[i].paymentDate}</td>
                                                    <td>${response[i].reference}</td>
                                                    <td>${response[i].tenantObject.business_name}</td>
                                                    <td>${response[i].method}</td>
                                                    <td>${response[i].invoice}</td>
                                                    <td><span class="text-success">${response[i].amount}</span></td>`

                    let tr = document.createElement('tr');
                    tr.innerHTML = html;

                    t_body.appendChild(tr);
                }
            } else {
                let t_body = document.getElementById("t_body");

                while (t_body.hasChildNodes()) {
                    t_body.removeChild(t_body.firstChild);
                }
                // console.log(response[1].paymentDate)

                let html = `<td>"N/A"</td>
                                                    <td>"N/A"</td>
                                                    <td>"N/A"</td>
                                                    <td>"N/A"</td>
                                                    <td>"N/A"</td>
                                                    <td><span class="text-success">"N/A"</span></td>`

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr);

            }
        }
    })
}

/************************************Property section******************************************************/

function toggleView(id) {
    let active = document.getElementById(id);

    let local = localStorage.getItem("id")
    let deactivate = document.getElementById(local);
    deactivate.classList.add("hide-sections")

    active.classList.remove("hide-sections")

    localStorage.setItem("deactivate", id);
}

function getProperties() {
   // -----------------
    var baseurl = "/api/property/get-all-properties";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data);
            $("#property_list").DataTable({
                data: data,
                columns: [

                    {"data": "id"},
                    {"data": function (row) {
                                return "<b> Name :</b> "+ row.name + " <br> "+ "<b>Address : </b>" +row.addressObject.address;

                        } },
                    {"data": function (row) {
                            return "<b>Line 1 : </b>"+row.propertyContactObject.mobileNumber +"<br> <b>Line 2 : </b>"+row.propertyContactObject.phone +"<br><a href='mailto:"+row.propertyContactObject.email+ "'>"+row.propertyContactObject.email+"</a>";
                        }},
                    {"data":function(row){
                            return "<b>Name : </b>"+ row.ownerObject.name+" "+row.ownerObject.lastName+"<br>"+ "<b>Phone : </b>" + row.ownerObject.contactDetailsObject.mobileNumber+" <br>" +"<a href='mailto:"+row.ownerObject.contactDetailsObject.email+ "'>"+row.ownerObject.contactDetailsObject.email+"</a>" ;
                        }},
                    {"data":"numberOfFloors"},
                    { "data": "numberOfCompartments" },
                    {"data": function (row) {
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="text-muted sr-only">Action</span>
                          </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="editProperty" onclick="setLocal('`+row.id+`')">Edit</a>
                              <a class="dropdown-item" href="viewProperty" onclick="setLocal('`+row.id+`','`+row.name+`')">View</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>`
                        },
                        "sortable":false,
                        "searchable":false
                    },

                ]
            });
        }
    };
    xmlhttp.send();

   // ---------------




    /*$.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            let items = response

            localStorage.setItem("properties", JSON.stringify(items));

            console.log(response)

           /!* var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }
*!/




            for (let i = 0; i < items.length; i++) {
                let new_html = `<td>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="2474">
                              <label class="custom-control-label" for="2474"></label>
                            </div>
                          </td>
                          <td>
                            <div class="avatar avatar-md">
                              <img src="assets/avatars/office-building.png" alt="..." class="avatar-img rounded-circle">
                            </div>
                          </td>
                          <td>
<!--                            <p class="mb-0 text-muted"><strong>Brown, Asher D.</strong></p>-->
                            <small class="mb-0 text-muted">${items[i].id}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted">${items[i].name}</p>
                            <small class="mb-0 text-muted">${items[i].addressObject.address}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted"><a href="#" class="text-muted">${items[i].propertyContactObject.phone} ${items[i].propertyContactObject.mobileNumber}</a></p>
                            <small class="mb-0 text-muted">${items[i].propertyContactObject.email}</small>
                          </td>
                          <td class="w-25">
                          <p class="mb-0 text-muted">${items[i].ownerObject.name} ${items[i].ownerObject.lastName}</p>
                          <small class="text-muted"> ${items[i].ownerObject.contactDetailsObject.mobileNumber} ${items[i].ownerObject.contactDetailsObject.email} </small>
                          </td>
                          <td class="text-muted">13/09/2020</td>
                          <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="text-muted sr-only">Action</span>
                          </button>
                            <div class="dropdown-menu dropdown-menu-right"  >
                              <a class="dropdown-item" href="edit_property.html" onclick="setLocal('${items[i].id}')">Edit</a>
                              <a class="dropdown-item" href="view-property.html" onclick="setLocal('${items[i].id}','${items[i].name}')">View</a>
<!--                              <a class="dropdown-item" href="#">Assign</a>-->
                            </div>
                          </td>`


                let tr = document.createElement("tr");

                tr.innerHTML = new_html;

                t_body.appendChild(tr);
            }
        }
    })*/
}

function saveProperty() {
    let name = document.getElementById("propertyName").value
    let address = "";
    let tenant = "";
    let insurance = ""
    let description = document.getElementById("description").value
    let propertyType = document.getElementById("propertyType").value
    let owner = ""
    let assetValue = document.getElementById("assetValue").value;
    let dateRegistered = document.getElementById("date-input").value;
     let numberOfFloors = document.getElementById("numberOfFloors").value;
    

    //property contact details
    let propertyEmail = document.getElementById("propertyEmail").value;
    let propertyPhone = document.getElementById("propertyPhone").value;
    let propertyMobileNumber = document.getElementById("propertyMobileNumber").value;


    //owner Object properties
    let ownerName = document.getElementById("ownerFirstName").value;
    let ownerLastname = document.getElementById("ownerLastName").value;

    let OwnerAddressAddress = document.getElementById("ownerAddress").value;
    let owerZipCode = document.getElementById("ownerZipCode").value;
    let ownerCity = document.getElementById("ownerCity").value;
    let ownerCountry = document.getElementById("ownerCountry").value;

    let ownerPhone = document.getElementById("ownerPhone").value;
    let ownerCell = document.getElementById("ownerCellNumber").value;
    let ownerEmail = document.getElementById("ownerEmailAddress").value;

    //property address object properties
    let propertyAddressAddress = document.getElementById("propertyAddress").value;
    let propertyZipCode = document.getElementById("propertyZipCode").value;
    let propertyCity = document.getElementById("propertyCity").value;
    let propertyCountry = document.getElementById("propertyCountry").value;

    let data = {
        name,
        addressObject: {
            address: propertyAddressAddress,
            zipCode: propertyZipCode,
            city: propertyCity,
            country: propertyCountry,
            property: 0
        },
        numberOfFloors,
        address,
        tenant,
        insurance,
        description,
        propertyType,
        ownerObject: {
            name: ownerName,
            lastName: ownerLastname,
            address: "",
            addressObject: {
                address: OwnerAddressAddress,
                zipCode: owerZipCode,
                city: ownerCity,
                country: ownerCountry,
                property: 0
            },
            contactDetailsObject: {
                phone: ownerPhone,
                mobileNumber: ownerCell,
                email: ownerEmail
            }
        },
        propertyContactObject: {
            phone: propertyPhone,
            mobileNumber: propertyMobileNumber,
            email: propertyEmail
        },
        owner,
        assetValue,
        dateAdded: new Date().toISOString().slice(0, 10),
        dateRegistered
    }

    $.ajax({
        url: '/api/property/save-property',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            // alert("success" + response)
            console.log(response)
            // getProperties();
            let element = document.getElementById("successModal");

            $('#successModal').modal('show')
            // Create toast instance
            // let myToast = new bootstrap.Toast(element);
            // myToast.show()

            document.getElementById("_form").reset();
        }
    })
}

function viewProperty() {
    let id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: '/api/property/get-property/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)
            let html = `<div class="card-body">
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted"> Name</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.name}</strong>
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted"> Type</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.propertyType}</strong>
                                            </dd>
                                        </dl>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Compartments Number</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.numberOfCompartments}</strong>
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted"> Number Of Floors</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response.numberOfFloors}</strong>
                                            </dd>
                                        </dl>
                                        <dl class="row mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Asset NBV</dt>
                                            <dd class="col-sm-4 mb-3">${response.assetValue}</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Email</dt>
                                            <dd class="col-sm-4 mb-3">${response.propertyContactObject.email}</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Phone</dt>
                                            <dd class="col-sm-4 mb-3"> ${response.propertyContactObject.phone}</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Mobile</dt>
                                            <dd class="col-sm-4 mb-3">${response.propertyContactObject.mobileNumber}</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Date registered</dt>
                                            <dd class="col-sm-4 mb-3">${response.dateRegistered}</dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Date Captured</dt>
                                            <dd class="col-sm-4 mb-3">${response.dateAdded}</dd>
                                            <dt class="col-sm-2 text-muted">Description</dt>
                                            <dd class="col-sm-10"> ${response.description}</dd>
                                            <dt class="col-sm-2 text-muted">Address</dt>
                                            <dd class="col-sm-10"> ${response.addressObject.address} , ${response.addressObject.city} , ${response.addressObject.country}</dd>
                                        </dl>
                                        <hr class="my-4">
                                        <h5 class="mb-2 mt-4">Property Contact Person Details</h5>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Name</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${response.ownerObject.name}
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Surname</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${response.ownerObject.lastName}
                                            </dd>
                                        </dl>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Phone</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${response.ownerObject.contactDetailsObject.phone}
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Mobile</dt>
                                            <dd class="col-sm-4 mb-3">
                                                ${response.ownerObject.contactDetailsObject.mobileNumber}
                                            </dd>
                                        </dl>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Email</dt>
                                            <dd class="col-sm-4 mb-3">${response.ownerObject.contactDetailsObject.email}</dd>
                                            <!--<dt class="col-sm-2 mb-3 text-muted">Mobile</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>Kelley Sonya</strong>
                                            </dd>-->
                                        </dl>
                                    </div> <!-- .card-body -->`


            let propertyDetails = document.getElementById("propertyDetails");
            propertyDetails.innerHTML = html;

            let propNameOne = document.getElementById("propNameOne");
            let propNameTwo = document.getElementById("propNameTwo");

            propNameOne.innerText = response.name;
            propNameTwo.innerText = response.name;
        }
    })
}

/*****************************************Edit Property section*************************************************/


//Property Details
function editPropertyDetails(id) {
    $.ajax({
        url: '/api/property/get-property/' + id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="propertyName">Property Name</label>
                            <input type="text" class="form-control" id="propertyName" placeholder="${response.name}">
                          </div>
                            <div class="form-group col-md-6">
                                <label for="propertyType">Property Type</label>
                                <select id="propertyType" class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="Multi Story"> Multi Story</option>
                                    <option value="Complex Building">Complex Building</option>
                                    <option value="Shopping Mall">Shopping Mall</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="assetValue">Property Value</label>
                          <input type="number" class="form-control" id="assetValue" placeholder="${response.assetValue}">
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-4">
                            <div class="card shadow">
                              <div class="card-body">
                                <div class="form-group mb-3">
                                  <label for="description">Description</label>
                                  <textarea class="form-control" id="description" rows="4" placeholder="${response.description}"></textarea>
                                </div>
                              </div> <!-- /.card-body -->
                              <hr class="my-4">
                              <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Property Details</span></button>
                            </div> <!-- /.card -->
                          </div> <!-- /.col -->
                        </div>`


            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;

        }
    })
}

function updatePropertyDetails(id) {
    let name = document.getElementById("propertyName").value
    let description = document.getElementById("description").value
    let propertyType = document.getElementById("propertyType").value
    let propertyAssetValue = document.getElementById("assetValue").value;

    let data = {
        name: name,
        description: description,
        propertyType: propertyType,
        assetValue: propertyAssetValue
    }

    $.ajax({
        url: '/api/property/update-property/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {

            editPropertyDetails(id);
            alert("Update Completed Successfully");

            /*let html =  `<div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="propertyName">Property Name</label>
                            <input type="text" class="form-control" id="propertyName" placeholder="${response.name}">
                          </div>
                            <div class="form-group col-md-6">
                                <label for="propertyType">Property Type</label>
                                <select id="propertyType" class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="Multi Story"> Multi Story</option>
                                    <option value="Complex Building">Complex Building</option>
                                    <option value="Shopping Mall">Shopping Mall</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="assetValue">Property Value</label>
                          <input type="number" class="form-control" id="assetValue" placeholder="${response.assetValue}">
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-4">
                            <div class="card shadow">
                              <div class="card-body">
                                <div class="form-group mb-3">
                                  <label for="description">Description</label>
                                  <textarea class="form-control" id="description" rows="4" placeholder="${response.description}"></textarea>
                                </div>
                              </div> <!-- /.card-body -->
                              <hr class="my-4">
                              <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Property Details</span></button>
                            </div> <!-- /.card -->
                          </div> <!-- /.col -->
                        </div>`

            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;*/
        }
    })
}

/*function discardEditPropertyDetailsChanges(id){
    $.ajax({
        url: '/api/property/get-property/'+id,
        type: 'GET',
        success: function (response) {
            let html =  `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Name is required">
                                                <p><span class="bi bi-file">&nbsp;</span> Name : ${response.name}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Description is required">
                                                <p> <span class="bi bi-file-earmark-text">&nbsp;</span>Description : ${response.description}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Type is required">
                                                <p><span class="bi bi-house-door">&nbsp;</span>Property Type : ${response.propertyType} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "status is required">
                                                <p><span class="bi bi-person-workspace">&nbsp;</span>Status : ${response.status}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <p><span class="bi bi-map">&nbsp;</span>Country : ${response.province}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Asset Value is required">
                                                <p><span class="bi bi-currency-dollar">&nbsp;</span>Asset Value : ${response.assetValue} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;

        }
    })
}*/

//Property Address
function editPropertyAddress(id) {
    $.ajax({
        url: '/api/address/get-address/' + id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-group">
                            <label for="propertyAddress">Address</label>
                            <input type="text" class="form-control" id="propertyAddress" placeholder="${response.address}">
                          </div>
                          <!--<div class="form-group">
                            <label for="inputAddress2">Address 2</label>
                            <input type="text" class="form-control" id="inputAddress6" placeholder="Apartment, studio, or floor">
                          </div>-->
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="propertyCity">City</label>
                              <input type="text" class="form-control" id="propertyCity" placeholder="${response.city}">
                            </div>
                            <div class="form-group col-md-4">
                              <label for="propertyCountry">Country</label>
                              <select id="propertyCountry" class="form-control">
                                <option selected>${response.country}</option>
                                <option>...</option>
                              </select>
                            </div>
                            <div class="form-group col-md-2">
                              <label for="propertyZipCode">Zip</label>
                              <input type="text" class="form-control" id="propertyZipCode" ${response.zipCode}>
                            </div>
                          </div>
                          <hr class="my-4">
                          <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyAddress('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Address</span></button>
                       `

            let container = document.getElementById("update_PropertyAddress");
            container.innerHTML = html;

        }
    })
}

function updatePropertyAddress(id) {
    //property address object properties
    let name = document.getElementById("propertyAddress").value;
    let address = document.getElementById("propertyAddress").value;
    let zipCode = document.getElementById("propertyZipCode").value;
    let country = document.getElementById("propertyCountry").value;
    let city = document.getElementById("propertyCity").value;


    let data = {
        name,
        address,
        zipCode,
        city,
        country
    }

    $.ajax({
        url: ' /api/address/update-address/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            alert("Update Completed Successfully");


            editPropertyAddress(id);
        }
    })
}

/*function discardEditPropertyAddress(id){
    $.ajax({
        url: '/api/address/get-address/'+id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address Name is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Name : ${response.name}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 validate-input d-flex m-b-16" data-validate = "Zip Code is required">
                                                    <p><span class="bi bi-file-earmark-zip">&nbsp;Zip Code : ${response.zipCode}</span></p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Country is required">
                                                    <p><span class="bi bi-map">&nbsp;</span>Country : ${response.country}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Address : ${response.address}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                    <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>`

            let container = document.getElementById("update_PropertyAddress");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyAddress('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyAddress");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}*/

//Property  Contact Details
function editPropertyContactDetails(id) {
    $.ajax({
        url: '/api/contact-details/get-contact-details/' + id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="ownerEmailAddress">Email</label>
                                    <input type="email" class="form-control" id="propertyEmail" placeholder="${response.email}">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="ownerPhone">Phone</label>
                                    <input type="text" class="form-control" id="propertyPhone" placeholder="${response.phone}">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="ownerCellNumber">Mobile Number</label>
                                    <input type="text" class="form-control" id="propertyMobileNumber" placeholder="${response.mobileNumber}">
                                </div>
                            </div>
                            <hr class="my-4">
                            <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyContactDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Contacts</span></button>
`


            let container = document.getElementById("propertyContactDetails");
            container.innerHTML = html;
        }
    })
}

function updatePropertyContactDetails(id) {
    let phone = document.getElementById("propertyPhone").value;
    let mobileNumber = document.getElementById("propertyMobileNumber").value;
    let email = document.getElementById("propertyEmail").value;

    let data = {
        phone,
        mobileNumber,
        email
    }

    $.ajax({
        url: ' /api/contact-details/update-contact-details/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyContactDetails(id);
        }
    })
}

//Property Owner Details
function editPropertyOwnerDetails(id) {
    $.ajax({
        url: '/api/owner/get-owner/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="ownerFirstName">Firstname</label>
                              <input type="text" id="ownerFirstName" class="form-control" placeholder="${response.name}">
                            </div>
                            <div class="form-group col-md-6">
                              <label for="ownerLastName">Lastname</label>
                              <input type="text" id="ownerLastName" class="form-control" placeholder="${response.lastName}">
                            </div>
                          </div>
                          <hr class="my-4">
                          <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyOwnerDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Owner</span></button>
                        `

            let container = document.getElementById("update_PropertyOwnerDetails");
            container.innerHTML = html;
        }
    })
}

function updatePropertyOwnerDetails(id) {
    let name = document.getElementById("ownerFirstName").value;
    let lastName = document.getElementById("ownerFirstName").value;

    let data = {
        name,
        lastName
    }

    $.ajax({
        url: '/api/owner/update-owner/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyOwnerDetails(id)
        }
    })
}

/*function discardEditPropertyOwnerDetails(id){
    $.ajax({
        url: '/api/owner/get-owner/'+id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "First Name is required">
                                                <p><span class="bi bi-person-bounding-box">&nbsp;</span>First Name : ${response.name} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Owner Last Name is required">
                                                <p><span class="bi bi-person-bounding-box"></span>Last Name : ${response.lastName} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`;

            let container = document.getElementById("update_PropertyOwnerDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyOwnerDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}*/

//Property Owner Address
function editPropertyOwnerAddress(id) {
    $.ajax({
        url: '/api/address/get-address/' + id,
        type: 'GET',
        success: function (response) {
            let html = `                          <hr class="my-4">
                          <h5 class="mb-2 mt-4">Address</h5>
                          <p class="mb-4">Input Property Contact Person Address</p>
                          <div class="form-row">
                            <div class="form-group col-md-12">
                              <div class="form-group">
                                <label for="ownerAddress">Address</label>
                                <input type="text" class="form-control" id="ownerAddress" placeholder="${response.address}">
                              </div>
                            </div>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-4">
                              <label for="ownerZipCode">Zip code</label>
                              <input class="form-control input-zip" id="ownerZipCode" ${response.country}>
                            </div>
                            <div class="form-group col-md-4">
                              <label for="ownerCountry">Country</label>
                              <select id="ownerCountry" class="form-control">
                                <option valye="">${response.country}</option>
                                <option>...</option>
                              </select>
                            </div>
                            <div class="form-group col-md-4">
                              <label for="ownerCity">City</label>
                             <input type="text" class="form-control" id="ownerCity" placeholder="${response.city}">
                        
                            </div>
                          </div>
                          <hr class="my-4">
                          <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyOwnerAddress('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Address</span></button>
                        `

            let container = document.getElementById("update_PropertyOwnerAddress");
            container.innerHTML = html;
        }
    })
}

function updatePropertyOwnerAddress(id) {
    let address = document.getElementById("ownerAddress").value;
    let zipCode = document.getElementById("ownerZipCode").value;
    let city = document.getElementById("ownerCity").value;
    let country = document.getElementById("ownerCountry").value;

    let data = {
        address,
        zipCode,
        city,
        country
    }

    $.ajax({
        url: ' /api/address/update-address/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyOwnerAddress(id);
        }
    })
}

/*
function discardEditPropertyOwnerAddress(id) {
    $.ajax({
        url: '/api/address/get-address/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address Name is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Name : ${response.name}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 validate-input d-flex m-b-16" data-validate = "Zip Code is required">
                                                    <p><span class="bi bi-file-earmark-zip">&nbsp;Zip Code : ${response.zipCode}</span></p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Country is required">
                                                    <p><span class="bi bi-map">&nbsp;</span>Country : ${response.country}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Address : ${response.address}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                    <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>`

            let container = document.getElementById("update_PropertyOwnerAddress");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyOwnerAddress('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerAddress");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}
*/

//Property Owner Contact Details
function editPropertyOwnerContactDetails(id) {
    $.ajax({
        url: '/api/contact-details/get-contact-details/' + id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="ownerEmailAddress">Email</label>
                                    <input type="email" class="form-control" id="ownerEmailAddress" placeholder="${response.email}">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="ownerPhone">Phone</label>
                                    <input type="text" class="form-control" id="ownerPhone" placeholder="${response.phone}">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="ownerCellNumber">Mobile Number</label>
                                    <input type="text" class="form-control" id="ownerCellNumber" placeholder="${response.mobileNumber}">
                                </div>
                            </div>
                            <hr class="my-4">
                            <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyOwnerContactDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Contacts</span></button>
`


            let container = document.getElementById("update_PropertyOwnerContactDetails");
            container.innerHTML = html;
        }
    })
}

function updatePropertyOwnerContactDetails(id) {
    let phone = document.getElementById("ownerPhone").value;
    let mobileNumber = document.getElementById("ownerCellNumber").value;
    let email = document.getElementById("ownerEmailAddress").value;

    let data = {
        phone,
        mobileNumber,
        email
    }

    $.ajax({
        url: ' /api/contact-details/update-contact-details/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyOwnerContactDetails(id);
        }
    })
}

/*
function discardEditPropertyOwnerContactDetails(id) {
    $.ajax({
        url: '/api/contact-details/get-contact-details/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                                <div class="wrap-input100  d-flex validate-input m-b-16" data-validate = "Owner Phone is required">
                                                    <p><span class="bi bi-telephone">&nbsp;</span>Phone : ${response.phone} </p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Email Address is required">
                                                    <p><span class="bi bi-envelope">&nbsp;</span>Email : ${response.email}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Cell Number is required">
                                                    <p><span class="bi bi-phone">&nbsp;</span>Cell Number : ${response.MobileNumber}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>`

            let container = document.getElementById("update_PropertyOwnerContactDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyOwnerContactDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerContactDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}
*/

function setPropertyDetails() {
    let id = JSON.parse(localStorage.getItem("id"))

    let url = '/api/property/get-property/' + id;

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            editPropertyDetails(id);
            editPropertyAddress(response.address);
            editPropertyOwnerDetails(response.owner);
            editPropertyContactDetails(response.propertyContactObject.id)
            editPropertyOwnerAddress(response.ownerObject.address);
            editPropertyOwnerContactDetails(response.ownerObject.contactDetailsObject.id);
        }
    })
}
