//Save Lesase
function saveLease() {
    var y = document.getElementById("ldID");
    if (y) {
        y.setAttribute("style", "display:all");
    }
    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = ''
    }

    var file = $('#fileUploadForm')[0];
    var data = new FormData(file);

    var s = document.getElementById("startDate");

    if (s.value.toString().length == 0) {
        alert("Start Date is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }
    var p = document.getElementById("duration");

    if (p.value.toString().length == 0) {
        alert("Lease Duration is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }
    var we = document.getElementById("leaseName");
    if (we.value.toString().length == 0) {
        alert("Business Name is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }

    var qs = document.getElementById("file");

    if (qs.value.toString().length == 0) {
        alert("Lease Agreement File Not Uploaded!!", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }


    var jsonDataObj = {
        "tenant_id":$("#leaseName").val(),
        "startDate": $("#startDate").val(),
        "duration": $("#duration").val(),
        "terms": $("#terms").val()
    };
    data.append("jsondata", JSON.stringify(jsonDataObj));
    $("#btnSubmit").prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/lease/addlease",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {

            var r = document.getElementById("retry");
            r.setAttribute("style", "display:none");
            console.log("SUCCESS : ", data);
            $("#btnSubmit").prop("disabled", false);
            alert('Lease Saved Successfully ', 'success');
            return


        },
        error: function (e) {
            if (e.status.toString() == "200") {

                var r = document.getElementById("retry");
                r.setAttribute("style", "display:none");
                alert("Lease  Saved Successfully ", 'success');
                console.log("ERROR : ", e);

            } else if (e.status.toString() == "500") {

                var r = document.getElementById("retry");
                r.setAttribute("style", "display:all");
                alert(e.responseJSON.message, 'danger');
                $("#btnSubmit").prop("disabled", false);
                console.log("Date :", document.getElementById("startDate").value);
                console.log("ERROR : ", e);

            } else {

                var r = document.getElementById("retry");
                r.setAttribute("style", "display:all");
                console.log("ERROR : ", e);
                alert(e.message, 'success');
                $("#btnSubmit").prop("disabled", false);
            }


        }

    });

}


function setLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id", JSON.stringify(id));

}


function setLocalfile(file){
    // var file=document.getElementById("formName2").innerText;
    localStorage.removeItem("file");
    localStorage.setItem("file", JSON.stringify(file));
}
function setLocalTenantID(tenant_id) {
    localStorage.removeItem("tenant_id");
    localStorage.setItem("tenant_id", JSON.stringify(tenant_id));
}

function SetLocal(id) {
    localStorage.removeItem("id");

    localStorage.setItem("id", JSON.stringify(id));


}
function setDuration(value){
    localStorage.removeItem("value");
    localStorage.setItem("value", JSON.stringify(value));

}
// Page Notices reload
function reload() {
    var duration = document.getElementById("adjT").value;
    var unit = document.getElementById("opt");
    if (unit) {

        if (unit.value.toString() == "day") {
            duration = duration;

        } else if (unit.value.toString() == "month") {
            duration = duration * 30;

        } else if (unit.value.toString() == "year") {
            duration = duration * 12 * 30;
        }
    }
    setDuration(duration);

    window.location="./Lease-Notices.html";
}


function getValueAndType() {
    var duration = JSON.parse(localStorage.getItem("value"));
    console.log("Duration = ",duration)
    if (duration==null){
        var duration = document.getElementById("adjT").value;
        var unit = document.getElementById("opt");
        if (unit) {

            if (unit.value.toString() == "day") {
                duration = duration;

            } else if (unit.value.toString() == "month") {
                duration = duration * 30;

            } else if (unit.value.toString() == "year") {
                duration = duration * 12 * 30;
            }
        }
        setDuration(duration);

    }




}

function setLocalLease(lease){
    localStorage.removeItem("lease");
    localStorage.setItem("lease", JSON.stringify(lease));

}

function setLocalTenant(tenant){
    localStorage.removeItem("tenant");
    localStorage.setItem("tenant", JSON.stringify(tenant));

}

//Send Email from notices page
function SendMail(){

    var m1 = document.getElementById("mailSentToast");
    var m2 = document.getElementById("mailNotSentToast");


    m1.setAttribute("style", "display:none");
    m2.setAttribute("style", "display:none");


    var Message=document.getElementById("cont").value;
    var Name = document.getElementById("tName").value;
    var id = document.getElementById("tID").innerText;
    var Subject=document.getElementById("subject").value;
    var email =document.getElementById("T_email").value;
 
var tempParams={
    from_name:"New World",
    to_email:email,
    message:Message,
    reply_to:'ninja.ld49@gmail.com',
    to_name:Name

};
emailjs.send('gmail','template_rqpdjmc',tempParams)
.then(function(res){
    console.log("success",res);
    var cont=document.getElementById("mailform");
    var foot=document.getElementById("emailfooter");
    var m1=document.getElementById("mailSentToast");
    var m2=document.getElementById("mailNotSentToast");

    if(res.status.toString()=="200"){
        cont.setAttribute("style","display:none");
        foot.setAttribute("style","display:none");
        m1.setAttribute("style","display:all");
    }
})
    .catch(function(error){
    console.error("Error  : ",error);
    if(error.status==412){
        var message=document.getElementById("mailunsent");
        if(message){
            message.innerHTML="Failed , Your Email is Invalid"+" <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
        }
        //  var cont=document.getElementById("mailform");
        // var foot=document.getElementById("emailfooter");
       // var m1=document.getElementById("mailSentToast");
        var m2=document.getElementById("mailNotSentToast");

        // cont.setAttribute("style","display:none");
        //  foot.setAttribute("style","display:none");
        m2.setAttribute("style","display:all");
    }else if(error.status==0){
        var message=document.getElementById("mailunsent");
        if(message){
            message.innerHTML="Failed , There was a network Error"+" <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
        }
        //  var cont=document.getElementById("mailform");
        // var foot=document.getElementById("emailfooter");
        // var m1=document.getElementById("mailSentToast");
        var m2=document.getElementById("mailNotSentToast");

        // cont.setAttribute("style","display:none");
        //  foot.setAttribute("style","display:none");
        m2.setAttribute("style","display:all");
    }else{

        var message = document.getElementById("mailunsent");
        if (message) {
            message.innerHTML = "Failed ," + error.text + " <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
        }
        //  var cont=document.getElementById("mailform");
        // var foot=document.getElementById("emailfooter");
       // var m1 = document.getElementById("mailSentToast");
        var m2 = document.getElementById("mailNotSentToast");

        // cont.setAttribute("style","display:none");
        //  foot.setAttribute("style","display:none");
        m2.setAttribute("style", "display:all");
    }
    })

}

// change icon on search box and fetch searched data from view lease Notice table
function ChangeIconAndSearch2(){
    var y=document.getElementById('searchbox');
    y.setAttribute("style","background-image:url('assets/images/giphy.gif'); background-size :60px 60px; background-position: top -10px left -10px");

    var t_body = document.getElementById("t_body");


    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    let items = JSON.parse(localStorage.getItem("lease"));


    var field = document.getElementById("searchbox").value.trim();
    for (let i = 0; i < items.length; i++) {
        let string = JSON.stringify(items[i]);

        if (string.toLowerCase().includes(field.toLowerCase())){

            let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td> ${items[i].buildingName} , ${items[i].buildingLocation}
                        </td>
                        <td > ${items[i].startDate}
                        </td>
                        <td > ${items[i].endDate}
                        </td>
                         <td > ${items[i].status}
                        </td>
                        <td >${items[i].timeLeft}
                    </td>
                    <td>
                        <a href="#"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setNotice('${items[i].id}','${items[i].name}','${items[i].status}','${items[i].endDate}','${items[i].timeLeft}'),loaddata()" class="badge badge-pill badge-success">Notify</span></a>

                    </td>`


            let tr = document.createElement("tr");
            if (i % 2 == 0) {
                tr.setAttribute("class", "even");
            } else {
                tr.setAttribute("class", "odd");
            }
            tr.setAttribute("role", "row");
            tr.innerHTML = html;
            t_body.appendChild(tr);
        }
    }
    var y=document.getElementById('searchbox');
    y.setAttribute("style","background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/16px-Search_Icon.svg.png'); background-position: 10px 10px");

}
// store notice data
function setNotice(id, name, status, endDate,timeLeft,email,phone) {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("status");
    localStorage.removeItem("endDate");
    localStorage.removeItem("tLeft");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("tLeft", JSON.stringify(timeLeft));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("endDate", JSON.stringify(endDate));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("phone", JSON.stringify(phone));
}
//customising notice modal
function showPhonefooter(){
    var d =document.getElementById("phonefooter");
    var e =document.getElementById("emailfooter");
    d.setAttribute("style","display:all");
    e.setAttribute("style","display:none");
}
function showEmailfooter(){
    var d =document.getElementById("phonefooter");
    var e =document.getElementById("emailfooter");
    d.setAttribute("style","display:none");
    e.setAttribute("style","display:all");
}
// fill send notice modal
function loaddata() {

    var id = JSON.parse(localStorage.getItem("id"));
    var name = JSON.parse(localStorage.getItem("name"));
    var tLeft = JSON.parse(localStorage.getItem("tLeft"));
    var endDate = JSON.parse(localStorage.getItem("endDate"));
    var status = JSON.parse(localStorage.getItem("status"));

    var email = JSON.parse(localStorage.getItem("email"));
    var phone = JSON.parse(localStorage.getItem("phone"));

    var nametag = document.getElementById("tName");
    var idtag = document.getElementById("tID");
    var nametag2 = document.getElementById("tName2");
    var idtag2 = document.getElementById("tID2");
    var phone2 = document.getElementById("phone");
    var email2 =document.getElementById("T_email");



    if (nametag) {
        nametag.value = name;
        nametag2.value = name;
    }
    if (idtag) {
        idtag.innerText = id;
        idtag2.innerText = id;
    }






    var message="";

    if(status=="Active"){
        message=` I am writing this letter from New World to inform you that your  Lease is about to expire ( `+tLeft+` Days Left ) Expiring on `+endDate+` ,Consider coming and renew it before it expires. `

    }

    if(status=="Expired"){
        message=` I am writing this letter from New World to inform you that your  Lease has Expired on `+endDate+` ,Consider coming and renew it if you still want us to continue being at you service `

    }

    var MessageBox=document.getElementById("cont");
    MessageBox.value=message;

    var subject=document.getElementById("subject");
    subject.value="Lease Expiry Notice";


    email2.value=email;
    phone2.value = phone;

  /*  $.ajax({
        type: "GET",
        url: "/api/v1/lease/getEmail/" + Name + "/" + surname,
        success: function (response) {
            console.log("Email: ",response);
            email.value=response.split(",")[0];
            if (phone) {
                phone.value = response.split(",")[1];

            }

        },
        error: function (e) {
            console.log(e);
            if (e.status.toString()=="200"){
                email.value=e.split(",")[0];
                if (phone) {
                    phone.value = response.split(",")[1];;

                }
            }
        }


    })*/


}


// function Call
function call() {
    let phone = document.getElementById("phone");
    if (phone) {
        window.location="tel:"+phone.value ;
    }
}

// Renewing Lease
function loadData() {
    var id = JSON.parse(localStorage.getItem("id"));


    $.ajax({
        url: '/api/v1/lease/getLease/' + id,
        type: 'GET',
        success: function (response) {
            let items = response;

            console.log(response);
            let nametag = document.getElementById("TenantName2");
            if (nametag) {

                nametag.value= response.tenant.business_name;
                setLocalTenantID(response.tenant_id)
            }

        }
    });


    let id2 = document.getElementById("id2");



    if (id2) {
        id2.innerText = id;
    }

}

function renewlease() {


    var e = document.getElementById("ldID");
    e.setAttribute("style", "display:all");


    var id = JSON.parse(localStorage.getItem("id"));
    var tenant_id = JSON.parse(localStorage.getItem("tenant_id"));

    var startDate = document.getElementById("startDate2").value;
    var duration = document.getElementById("duration2").value;


    let data = {
        startDate,
        duration,
        tenant_id
    }
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        url: "/api/v1/lease/renewlease/" + id,


        success: function (response) {
            console.log(response);
            let btn = document.getElementById("liveAlertBtn");
            let div = document.getElementById("renewalInfo");
            let Close = document.getElementById("Close");


            div.setAttribute("style", "display:none");
            btn.setAttribute("style", "display:none");
            Close.setAttribute("style", "display:all");
            alert2('Lease Renewed Successfully !!', 'success')

            let Cu= document.getElementById("hhh");
            Cu.setAttribute("style", "display:none");
        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {
                let btn = document.getElementById("liveAlertBtn2");
                let div = document.getElementById("renewalInfo");
                let Close = document.getElementById("Close2");


                div.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert2('Lease Renewed Successfully !!', 'success');
                let Cu= document.getElementById("hhh");
                Cu.setAttribute("style", "display:none");
                console.log("ERROR : ", e);
                return;
            } else if ((e.status.toString() == "500")) {

                alert2(e.responseJSON.message.toString(), 'danger')
                console.log("ERROR : ", e.responseJSON.message.toString());
                return;
            } else {
                let btn = document.getElementById("liveAlertBtn");
                let div = document.getElementById("renewalInfo");
                let Close = document.getElementById("Close");


                div.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert2('There was an Error in renewing the lease ! Please try again !!', 'danger')
                console.log("ERROR : ", e);
                return;
            }


        }
    });

}

// Terminating Lease

function Terminate() {

    var ty = document.getElementById("alrt");
    if (ty) {
        ty.setAttribute("style", "display:none");
    }


    var k = document.getElementById("ldID");
    if (k) {
        k.setAttribute("style", "display:all");
    }

    var e = document.getElementById("ldiD");
    if (e) {
        e.setAttribute("style", "display:all");
    }

    var id = JSON.parse(localStorage.getItem("id"));
    let status = "Terminated";

    let data = {
        status
    }
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        url: "/api/v1/lease/terminatelease/" + id,


        success: function (response) {
            console.log(response)
            let ar = document.getElementById("alrt");
            let btn = document.getElementById("liveAlertBtn");
            let btn2 = document.getElementById("liveAlertkBtn");
            let Close = document.getElementById("Close");

            ar.setAttribute("style", "display:none");
            btn.setAttribute("style", "display:none");
            btn2.setAttribute("style", "display:none");
            Close.setAttribute("style", "display:all");
            alert('Lease Terminated Successfully !!', 'success')
            return;

        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {
                let ar = document.getElementById("alrt");
                let btn = document.getElementById("liveAlertBtn");
                let btn2 = document.getElementById("liveAlertkBtn");
                let Close = document.getElementById("Close");

                ar.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                btn2.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert('Lease Terminated Successfully !!', 'success')
                return;
            } else if (e.status.toString() == "500") {
                let ar = document.getElementById("alrt");
                let btn = document.getElementById("liveAlertBtn");
                let btn2 = document.getElementById("liveAlertkBtn");
                let Close = document.getElementById("Close");

                ar.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                btn2.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert('Lease Was already Terminated ', 'danger');
                console.log("ERROR : ", e.responseJSON.message);
                return;
            }


        }
    });
}

// Updating Lease

function saveUpdate() {

    var id = JSON.parse(localStorage.getItem("id"));
    var jsonDataObj = {
        "name": $("#TenantName").val(),
        "buildingName": $("#buildingName").val(),
        "buildingLocation": $("#buildingLocation").val(),
        "startDate": $("#startDate").val(),
        "duration": $("#duration").val(),
        "terms": $("#terms").val()
    };

    let ar = document.getElementById("retry");
    ar.setAttribute("style", "display:none");
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonDataObj),
        type: "PUT",
        url: "/api/v1/lease/updatelease/" + id,


        success: function (response) {
            console.log(response)

            Close.setAttribute("style", "display:all");
            alert('Lease Updated Successfully !!', 'success')
            return;

        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {

                Close.setAttribute("style", "display:all");
                alert('Lease Updated Successfully !!', 'success')
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

function alert2(message, type) {

    var e = document.getElementById("ldID");
    if (e) {
        e.setAttribute("style", "display:none");
    }


    var i = document.getElementById("ldiD");
    if (i) {
        i.setAttribute("style", "display:none");
    }


    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

    } else {
        var wrapper = document.createElement('div');
        wrapper.setAttribute("id", "err");
        wrapper.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

        alertPlaceholder2.append(wrapper);
    }


}


// Fetching Record For Viewing
function FetchRecord() {

    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: '/api/v1/lease/getLease/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)


            let id = document.getElementById("id");
            let buildingName = document.getElementById("buildingName");
            let tenantName = document.getElementById("TenantName");
            let buildingLocation = document.getElementById("buildingLocation");

            let  b_name = document.getElementById("b_name");
            let  b_phone = document.getElementById("b_phone");

            let duration = document.getElementById("duration");
            let startDate = document.getElementById("startDate");
            let status = document.getElementById("status");
            let endDate = document.getElementById("endDate");
            let timeLeft = document.getElementById("timeLeft");
            let terms = document.getElementById("terms");


            
            id.innerText = `${response.id}`;
            b_name.value=`${response.tenant.business_name}`;
            b_phone.value=`${response.tenant.b_phone}`;
            tenantName.value = `${response.tenant.name} ${response.tenant.surname}`;
            buildingName.value = `${response.tenant.property}`;
            buildingLocation.value = `${response.tenant.city}`;
            duration.value = `${response.duration}`;
            startDate.value = `${response.startDate}`;
            status.value = `${response.status}`;
            endDate.value = `${response.endDate}`;
            timeLeft.value = `${response.timeLeft}`;
            terms.value = `${response.terms}`;


            tenantName.setAttribute("disabled", true);
            buildingName.setAttribute("disabled", true);
            buildingLocation.setAttribute("disabled", true);
            duration.setAttribute("disabled", true);
            startDate.setAttribute("disabled", true);
            terms.setAttribute("disabled", true);


        }
    });
    $.ajax({
        url: ' /api/v1/lease/getform/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var r=document.getElementById("formName");
            setLocalfile(response);
             r.innerHTML=' <img src="assets/images/pdf.png" alt="No File" height="85px" width="60px" style="margin-top: 12px"/>';
             var attr=document.getElementById("fileAttr");
             attr.setAttribute("style","margin-left: 10px;padding-left: 10px;padding-right:10px;display: all;background-color: white!important ;border-radius: 8%")
             // r.innerHTML='<i class="fe fe-file-text" style="font-size:80px;"></i>'
        }
    })

}

//Load file url for viewing
function loadURL(){
    var file = JSON.parse(localStorage.getItem("file"));
    $.ajax({

        url: '/api/v1/lease/load/' + file,
        type: 'GET',
        success: function (response) {
           var g=response.message;
           var c=g.replace("URL ["," ").trim();
           var f=c.replace("]"," ").trim();
            console.log(f);
            var i =document.getElementById("url");
            i.innerHTML= `<a target="_blank" href="localhost:8090/uploads/'+file+'"> <button class="btn btn-success" style="margin-top: 35px" >Open File</button></a>
                <a href="#"><button onclick="OPEN()">Test</button></a>`
        }
    })

}



// Fetching Record For Editing
function fetchRecord() {
    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: '/api/v1/lease/getLease/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)


            let id = document.getElementById("id");

            let b_name = document.getElementById("b_name");
            let b_phone = document.getElementById("b_phone");

            let buildingName = document.getElementById("buildingName");
            let tenantName = document.getElementById("TenantName");
            let buildingLocation = document.getElementById("buildingLocation");
            let duration = document.getElementById("duration");
            let startDate = document.getElementById("startDate");
            let status = document.getElementById("status");
            let endDate = document.getElementById("endDate");
            let timeLeft = document.getElementById("timeLeft");
            let terms = document.getElementById("terms");
            let btnSubmit = document.getElementById("btnSaveUpdate");
            let tlError = document.getElementById("TenantleaseError")


            id.innerText = `${response.id}`;
            b_name.value = `${response.tenant.business_name}`;
            b_phone.value = `${response.tenant.phone}`;
            tenantName.value = `${response.tenant.name}`;
            buildingName.value = `${response.tenant.property}`;
            buildingLocation.value = `${response.tenant.city}`;
            duration.value = `${response.duration}`;
            startDate.value = `${response.startDate}`;
            status.value = `${response.status}`;
            endDate.value = `${response.endDate}`;
            timeLeft.value = `${response.timeLeft}`;
            terms.value = `${response.terms}`;

            let terminate = "Terminated";
            let Cstatus = `${response.status}`;
            if (terminate == Cstatus) {
                b_name.setAttribute("disabled", true);
                b_phone.setAttribute("disabled", true);
                tenantName.setAttribute("disabled", true);
                buildingName.setAttribute("disabled", true);
                buildingLocation.setAttribute("disabled", true);
                duration.setAttribute("disabled", true);
                startDate.setAttribute("disabled", true);
                terms.setAttribute("disabled", true);
                btnSubmit.setAttribute("disabled", true);
                tlError.style.visibility = "visible";


            }


        }
    })


}


// Load Terminate Table



function T_Records() {
    var baseurl = "/api/v1/lease/getleases";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);
            console.log(xmlhttp.responseText);
            $("#dataTable").DataTable({
                data:data,
                columns:[
                    {"data":"id"},
                    {"data":function(row){
                            return row.tenant.business_name;
                        }},
                    {"data":function(row){
                            return row.tenant.property;
                        }},

                    {"data":"startDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data+"</strong>"
                        }},
                    {"data":"endDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data+"</strong>"
                        }},
                    {"data":"status",
                        "searchable":false,
                        render:function(data){
                            if(data==="Active"){
                                return "<span class='badge badge-pill badge-success'> "+data+"</span>";
                            } else if(data==="Expired"){
                                return "<span class='badge badge-pill badge-warning'> "+data+"</span>";
                            }else{
                                return "<span class='badge badge-pill badge-danger'> "+data+"</span>";

                            }
                        }},
                    {"data":"id",
                        "sortable":false,
                        "searchable":false,
                        render:function (data) {
                            return ` <a href="#"> <span class="badge badge-pill badge-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('`+data+`')" >Terminate</span></a>`

                        }}
                    ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25,50, 100, -1],
                    [10, 25,50, 100, "All"]
                ]
            });
        }
    };
    xmlhttp.send();



   /* $.ajax({
        url: '/api/v1/lease/getleases',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var t_body = document.getElementById("t_body");


            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td>  ${items[i].rentalFee}
                        </td>
                        <td> ${items[i].buildingName}
                        </td> 
                        <td> ${items[i].buildingLocation}
                        </td>
                        </td>
                        <td> ${items[i].status}
                        </td>
                        <td >${items[i].agreementDate}
                    </td>
                    <td>
                    
                        
                            <!--<a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>-->
                           <a href="#"> <span class="badge badge-pill badge-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</span></a>
                    </td>`

                let tr = document.createElement("tr");
                if (i % 2 == 0) {
                    tr.setAttribute("class", "even");
                } else {
                    tr.setAttribute("class", "odd");
                }
                tr.setAttribute("role", "row");
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }
        }
    })*/

}


//Get Leases
function getLeases() {

    var baseurl = "/api/v1/lease/getleases";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);
            console.log(xmlhttp.responseText);
            $("#dataTable").DataTable({
                data:data,
                columns:[
                    {"data":"id"},
                    {"data":function(row){
                        return row.tenant.business_name;
                    }},
                    {"data":function(row){
                            return row.tenant.name +" "+row.tenant.surname;
                        }},
                    {"data":function(row){
                            return row.tenant.b_phone;
                        },
                        "sortable":false,
                        "searchable":false
                        },

                    {"data":"startDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i>  "+data;
                        }},

                    {"data":"endDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data+"</strong>"
                        }},
                    {"data":"status",
                    render:function(data){
                        if(data==="Active"){
                            return "<span class='badge badge-pill badge-success'> "+data+"</span>";
                        } else if(data==="Expired"){
                            return "<span class='badge badge-pill badge-warning'> "+data+"</span>";
                        }else{
                            return "<span class='badge badge-pill badge-danger'> "+data+"</span>";

                        }
                    }},
                    {"data":"id",
                        "sortable":false,
                        "searchable":false,
                        render:function (data) {
                        return '<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <span class="text-muted sr-only">Action</span></button>'+`
                            <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="Edit-Lease" onclick="setLocal('`+data+`')">Edit</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('`+data+`')" href="#">Terminate</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#renewal" onclick="SetLocal('`+data+`'),loadData() " href="#">Renew</a>
                            <a class="dropdown-item" href="Lease-Detail" onclick="setLocal('`+data+`')">View More Details</a>
                        </div>`

                    }}
                ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25,50, 100, -1],
                    [10, 25,50, 100, "All"]
                ]
            });
        }
    };
    xmlhttp.send();


}

//Get renewed leases
function getRenewedLeases() {

    var baseurl = "/api/v1/lease/renewed";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);
            console.log(xmlhttp.responseText);
            $("#dataTable").DataTable({
                data:data,
                columns:[
                    {"data":"tenant_id"},
                    {"data":function(row){
                            return row.tenant.business_name;
                        }},
                    {"data":function(row){
                            return row.tenant.property;
                        }},

                    {"data":"startDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i>  "+data;
                        }},

                    {"data":"endDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data+"</strong>"
                        }},
                    {"data":"action",
                        render:function(data){
                            if(data==="Renewed"){
                                return "<span class='badge badge-pill badge-success'> "+data+"</span>";
                            } else if(data==="Expired"){
                                return "<span class='badge badge-pill badge-warning'> "+data+"</span>";
                            }else{
                                return "<span class='badge badge-pill badge-danger'> "+data+"</span>";

                            }
                        }},
                    {"data":"actionDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data.substr(0,10)+"</strong>"
                        }},
                    {"data":"actionDate",
                        render:function(data){
                            return "<i class='fe fe-clock'></i> <strong>"+data.substr(11,5)+"</strong>"
                        }}
                ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25,50, 100, -1],
                    [10, 25,50, 100, "All"]
                ]
            });
        }
    };
    xmlhttp.send();


}


// Open Lease agreement form
function DownloadLeaseAgreementForm(){
    var filename = JSON.parse(localStorage.getItem("file"));
    var filename2=filename.split("'")[1];
    console.log(filename2);

    $.ajax({
        url: '/api/v1/lease/download/' + filename2,
        type: 'GET',
        success: function (response) {

            var h=filename.split(".").pop();
            console.log("Extension: = ",h);
            console.log(response);

            if(h=="jpg"|| h=="png"||h=="jpeg"){
                window.open('/assets/uploads/'+filename2,"_blank");
            }

        }
    })
}

function hover() {
    var prev_item = document.getElementById("prev");
    var page1_item = document.getElementById("page1");
    var page2_item = document.getElementById("page2");
    var page3_item = document.getElementById("page3");
    var next_item = document.getElementById("next");

    if(prev_item.disabled){
        prev_item.setAttribute("onMouseOver","this.style.background-color='#0F0'");
        
    }
    if(page1_item.disabled){
        page1_item.setAttribute("onMouseOver","this.style.background-color=none");

    }
    if(page2_item.disabled){
        page2_item.setAttribute("onMouseOver","this.style.background-color=none");

    }
    if(page3_item.disabled){
        page3_item.setAttribute("onMouseOver","this.style.background-color=none");

    }
    if(next_item.disabled){
        next_item.setAttribute("onMouseOver","this.style.background-color=none");

    }
    
}
// Get Tenant Names
function getTenants() {
    $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response;
            console.log(response);

            localStorage.setItem("tenant", JSON.stringify(items));

            var t_body = document.getElementById("leaseName");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }


            let r = document.createElement("option");

            var t = "Select Business Name";

            r.setAttribute("disabled", "true");
            r.setAttribute("value", "-1");

            r.innerHTML = t;

            t_body.appendChild(r);


            for (let i = 0; i < items.length; i++) {
                let html = `${items[i].business_name}`;

                let tr = document.createElement("option");

                var tID =items[i].id;

                tr.setAttribute("value", tID);


                tr.innerHTML = html;

                t_body.appendChild(tr);


            }
        }

    })

}
/*

function setTenantID() {

    let items = JSON.parse(localStorage.getItem("tenant"));


    var field = document.getElementById("leaseName").value.trim();
   console.log("Full Name =",field);

    var name=field.split(" ")[0];
    console.log("Name =",name);
    var surname=field.split(" ")[1];
    console.log("Surname =",surname);

    for (let i = 0; i < items.length; i++) {
        let string = JSON.stringify(items[i]);


        if (string.toLowerCase().includes(name.toLowerCase()) && string.toLowerCase().includes(surname.toLowerCase()) ) {

            let id=document.getElementById("id");
                id.innerText= `${items[i].id}`;
                id.value=`${items[i].id}`;

        }

    }
}
*/

// get Property details
/*function getProperty() {
        $.ajax({
            url: '/api/property/get-all-properties',
            type: 'GET',
            success: function (response) {
                let items = response;

                console.log(response);



                var t_body = document.getElementById("buildingName");

                while (t_body.hasChildNodes()) {
                    t_body.removeChild(t_body.firstChild);
                }


                let r = document.createElement("option");

                var t = "Select Building Name";

                r.setAttribute("disabled", "true");
                r.setAttribute("value", "-1");

                r.innerHTML = t;

                t_body.appendChild(r);




                for (let i = 0; i < items.length; i++) {
                    let html = `${items[i].name}`

                    let tr = document.createElement("option");

                    var name = `${items[i].name}`;

                    tr.setAttribute("value", name);

                    tr.innerHTML = html;

                    t_body.appendChild(tr);
                }




                var t_body1 = document.getElementById("buildingLocation");

                while (t_body1.hasChildNodes()) {
                    t_body1.removeChild(t_body1.firstChild);
                }


                let ru = document.createElement("option");

                var tn = "Select Building Name";

                ru.setAttribute("disabled", "true");
                ru.setAttribute("value", "-1");

                ru.innerHTML = tn;

                t_body1.appendChild(ru);



                for (let i = 0; i < items.length; i++) {
                    let html = `${items[i].addressObject.city}`

                    let tr = document.createElement("option");

                    var name = `${items[i].addressObject.city}`;

                    tr.setAttribute("value", name);

                    tr.innerHTML = html;

                    t_body1.appendChild(tr);
                }


            }
        })
    }*/

//Get Lease Notices
function getLeaseNotice() {
    // var duration = JSON.parse(localStorage.getItem("value"));

   var duration = document.getElementById("adjT").value;
    var unit = document.getElementById("opt");
    if (unit) {

        if (unit.value.toString() == "day") {
            duration = duration;

        } else if (unit.value.toString() == "month") {
            duration = duration * 30;

        } else if (unit.value.toString() == "year") {
            duration = duration * 12 * 30;
        }
    }


    $.ajax({
        url: '/api/v1/lease/notice/' + duration,
        type: 'GET',
        success: function (response) {
            let items = response;

            console.log("Response: ",response);
            localStorage.setItem("lease", JSON.stringify(items));
            var t_body=document.getElementById("t_body");


            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

           /* 
            // -------------

            var data = response;
            
            $("#dataTable").DataTable({
                data:data,
                columns:[
                    {"data":"id"},
                    {"data":function(row){
                            return row.tenant.business_name;
                        }},
                    {"data":function(row){
                            return row.tenant.property+" "+ row.tenant.city;
                        }},

                    {"data":"startDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i>  "+data;
                        }},

                    {"data":"endDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data+"</strong>"
                        }},
                    {"data":"status",
                        render:function(data){
                            if(data==="Renewed"){
                                return "<span class='badge badge-pill badge-success'> "+data+"</span>";
                            } else if(data==="Expired"){
                                return "<span class='badge badge-pill badge-warning'> "+data+"</span>";
                            }else{
                                return "<span class='badge badge-pill badge-danger'> "+data+"</span>";

                            }
                        }},
                    {"data":"timeLeft"},
                    {"data":function(row){
                            return `<a href="#"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setNotice('`+row.id+`','`+row.tenant.business_name+`','`+row.status+`','`+row.endDate+`','`+row.timeLeft+`'),loaddata()" class="badge badge-pill badge-success "> <i class="fe fe-bell" style="margin-right: 10px;color: white;"></i>Notify</span></a>`
                        }}
                ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25,50, 100, -1],
                    [10, 25,50, 100, "All"]
                ]
            });
            // ---------
            */





            for (let i = 0; i < items.length; i++) {
                let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].tenant.business_name}
                        </td>
                        <td> ${items[i].tenant.property} , ${items[i].tenant.city}
                        </td>
                        <td > ${items[i].startDate}
                        </td>
                        <td > ${items[i].endDate}
                        </td>
                         <td > ${items[i].status}
                        </td>
                        <td >${items[i].timeLeft}
                    </td>
                    <td>
                        <a href="#"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setNotice('${items[i].id}','${items[i].tenant.business_name}','${items[i].status}','${items[i].endDate}','${items[i].timeLeft}','${items[i].tenant.b_email}','${items[i].tenant.b_phone}'),loaddata()" class="badge badge-pill badge-success "> <i class="fe fe-bell" style="margin-right: 10px;color: white;"></i>Notify</span></a>

                    </td>`


                let tr = document.createElement("tr");
                if (i % 2 == 0) {
                    tr.setAttribute("class", "even");
                } else {
                    tr.setAttribute("class", "odd");
                }
                tr.setAttribute("role", "row");
                tr.innerHTML = html;
                t_body.appendChild(tr);
            }
        }
    });


}


