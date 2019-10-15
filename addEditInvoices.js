window.onload = function(){
    let idObj = window.location.search.slice(4);
    let form = document.forms.addForm;
    if(idObj !== ''){
        getEditData();       
        async function getEditData(){
            let invEditData = await fetch("https://invoices-proj.herokuapp.com/invoices/"+idObj);
            let data = await invEditData.json();
            form.number.value = data.number;
            form.invdate.value = data.date_created;
            form.supplydate.value = data.date_supply;
            form.comment.value = data.comment;
            form.submit.addEventListener("click", updateInv);
        }
        async function updateInv(){
            let editInv = {
                "id": idObj,
                "number": form.number.value,
                "date_created": form.invdate.value,
                "date_supply": form.supplydate.value,
                "comment": form.comment.value
            };
            let addInv = await fetch("https://invoices-proj.herokuapp.com/invoices/"+idObj, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editInv),        
            });
            document.location.href = "index.html";
        }
    } else{
        form.submit.addEventListener("click", addNewInv);
        async function addNewInv(){  
            let newInv = {        
                "number": form.number.value,
                "date_created": form.invdate.value,
                "date_supply": form.supplydate.value,
                "comment": form.comment.value
            };
            let addInv = await fetch("https://invoices-proj.herokuapp.com/invoices/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newInv),         
            });           
            document.location.href = "index.html";
        }
    }
}