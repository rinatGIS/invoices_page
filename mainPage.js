window.onload = getData();
async function getData(){
    let invData = await fetch("https://invoices-proj.herokuapp.com/invoices/");
    let data = await invData.json();   
    createTable(data);
    addNewInvoices();
    searchFilterInv();
}
function createTable(data){  
    for (let i=0; i<data.length; i++){        
        $("#tableData").append("<tr id='ID"+ data[i].id +"'><td>" + data[i].date_created + 
                        "</td><td>" + data[i].number + 
                        "</td><td>" + data[i].date_supply + 
                        "</td><td>" + data[i].comment + 
                        "</td><td><button class='editInvoices' value='"+ data[i].id +"'>Edit</button></td><td><button class='delInvoices' id='"+ data[i].id +"'>Delete</button></td></tr>");
    }
    editDelInvoices();
}
function addNewInvoices(){
    $("#addInv").click(function(){
        document.location.href = "editform.html";
    });
}
function editDelInvoices(){
    $(".editInvoices").click(function(){
        let idEditInv = this.value;
        document.location.href = "editform.html?id="+ idEditInv;
    });

    $(".delInvoices").click(async function(){             
        let idDelInv = this.id;
        let deiInv = await fetch("https://invoices-proj.herokuapp.com/invoices/"+ idDelInv, {
            method: 'DELETE',            
        });
        $("#ID"+ idDelInv).remove();
    });
}
function searchFilterInv(){
    $("#filterInv").click(async function(){
        let filtQuery;
        let searchOpt = document.forms.filterForm.searchWind.value;
        let filtOpt = document.forms.filterForm.filterSel.value;
        let sortOpt = document.forms.filterForm.sortSel.value;
        let orderOpt = document.forms.filterForm.orderSel.value;
        if(searchOpt == ""){
            if(orderOpt == "No sorting"){
                filtQuery = "";
            }else{
                filtQuery = "?_sort="+sortOpt+"&_order="+orderOpt;
            }
        }else{
            if(filtOpt =="All"){
                filtQuery = "?q="+searchOpt;
            }else{
                filtQuery = "?"+ filtOpt +"_like="+searchOpt;
            }
            if(orderOpt == "No sorting"){

            }else{
                filtQuery = filtQuery+"&_sort="+sortOpt+"&_order="+orderOpt;
            }
        }
        let filtInv = await fetch("https://invoices-proj.herokuapp.com/invoices/"+ filtQuery);
        let sortData = await filtInv.json();
        $("#tableData").html("");
        createTable(sortData);
    });  
}