let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let totle = document.getElementById('totle');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood="create";
let tmp;
function getTotal(){
    if(price.value != ""){
       let result = ((+price.value + +taxes.value + +ads.value) - +discount.value);
        totle.innerHTML=result;
        totle.style.background="limegreen";
        totle.style.fontWeight="bold";
        if (result >=99999999) {
            totle.innerHTML="error";
            totle.style.background="crimson";
        }
    }else{
        totle.innerHTML=" ";
        totle.style.background="crimson";
    }
}

// create product
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro=[];
}
submit.onclick = function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        totle:totle.innerHTML,
        category:category.value.toLowerCase(),
    }
if(title.value !="" && price.value !="" && category.value !=''&& newPro.count<=100){
    if (mood ==="create") {
        if (newPro.count>0) {
            // for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            // }
        }else{
            dataPro.push(newPro);
        }

    }else{
        dataPro[tmp]=newPro;
        mood="create";
        submit.innerHTML="create";
        count.style.display='block';
    }
    clearData();
}else{
    window.alert("نعتذر يرجي ملئ البيانات الصحيحة وألا يتجاوز العدد مئة عنصر");
}






// save localStorage
    localStorage.setItem("product",JSON.stringify(dataPro));
    showData();
}

// clear inputs
function clearData(){
title.value="";
title.value="";
price.value="";
taxes.value="";
ads.value="";
discount.value="";
count.value="";
totle.innerHTML="";
category.value="";
}
// read
function showData(){
    getTotal();
    let table='';
    for (let i= 0; i < dataPro.length; i++) {
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].totle}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDlete=document.getElementById('deleteAll');
    if (dataPro.length>0) {
        btnDlete.innerHTML=`
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        //this button exist if exist data
        btnDlete.innerHTML='';
    }
}
showData();
// count

// delete
function deleteData(i) {
dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
showData();
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// update
function updateData(i) {
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    getTotal()
    count.style.display="none";
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    submit.innerHTML="Update";
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
// sreach
let searchMood='title';
function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == 'searchTitle') {
        searchMood='title';
        search.placeholder="search by Title";
    }else{
        searchMood='category';
        search.placeholder="search by Category";
    }
    search.focus()
    search.value='';
    showData();
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function searchData(value){
   let table='';
if (searchMood=='title') {
   for (let i = 0; i < dataPro.length; i++) {
    if (dataPro[i].title.includes(value.toLowerCase())) {
                    table +=`
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].totle}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
        }
    }
}
//    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                            table +=`
                            <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].totle}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}


// clean data



//  save
