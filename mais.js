let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let disscount = document.getElementById('disscount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogery = document.getElementById('catogery');
let submit = document.getElementById('submit');

// console.log(title, price, taxes, ads, disscount, total, count, catogery, submit);

let mood = 'create';
let temp;

// get total
function getTotal()
{
    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +disscount.value;
        total.innerHTML = result;

        total.style.background = '#040';
    }
    else
    {
        total.innerHTML = '';
         total.style.background = '#d21d9f';

    }

}
//create product
let dataPro; // hna lw fe data

if (localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product)  // ana t7t kont m5lyaha string hna lazem arg3ha laslahaa
}
else
{
    dataPro = []; // hna lw mafee4 data
}
// let dataPro = [];  //al array hwa al mkan aly mwgood feeh al data bta3ty 

submit.onclick = function ()
{   
    //  da object 34lan ana 3yza a save the data w mo4 hynf3 kulha fl array we have to create  object
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        disscount: disscount.value,
        total: total.innerHTML,
        count: count.value,
        catogery:catogery.value.toLowerCase() ,
    }
    
    if (title.value!=''&&price.value!=''&&catogery.value!='')
    {
        if (mood === 'create')
        {
            if (newPro.count > 1)
            {
                for (let i = 0; i < newPro.count; i++)
                {
                    dataPro.push(newPro);
                }
            }
            else
            {
                dataPro.push(newPro);

            }
        } else
        {
            dataPro[temp] = newPro;

            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';

        }

        clearData();
    }
    
    // dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));  // mynf34 a7ot direct array fl local storage l2na bt5od string

    // console.log(dataPro);

    ShowData();
}
//save data in local storage
//clear after create

function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value   = '';
    disscount.value = '';
    count.value = '';
    catogery.value = '';
    total.innerHTML = ''; 
    
}
//read inputs crud


function ShowData()
{
    getTotal();

    let table = '';
    for (let i = 0; i < dataPro.length; i++)
    {
        table += ` <tr>
                     <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].disscount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].catogery}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td> 
                </tr>`
        
       

    }
    document.getElementById('tbody').innerHTML = table;
    let deletebtn = document.getElementById('deleteall')
    if (dataPro.length > 0)
    {
        deletebtn.innerHTML = `<button id="delete" onclick="DeleteAll()">Delete All(${dataPro.length})</button>`;
        
    }
    else
    {
        deletebtn.innerHTML = '';
    }
}

ShowData();



//count put many inputs at same time



// delete

function deleteData(i)
{
    dataPro.splice(i, 1); //hna b3ml delete mn al array 
    localStorage.product = JSON.stringify(dataPro);
    ShowData();

}
//delete  all

function DeleteAll()
{
    
    localStorage.clear();
    dataPro.splice(0);
    ShowData();
}
// update

function updateData(i)
{ 

    title.value = dataPro[i].title; //hna lma aktb kda byroo7 3nd al title w yktb al kelma w a3delha 
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value   = dataPro[i].ads;
    disscount.value =dataPro[i].disscount;
    catogery.value = dataPro[i].catogery;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update'; 
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior:'smooth',
    })
    
}
//search

let searchmood = 'title';

function getSearch(id)
{
    let search = document.getElementById('search');
    
    if (id == 'searchtitle')
    {
        searchmood = 'title';
        // search.placeholder = 'search by title';
    }
    else
    {
        searchmood = 'category';
        //  search.placeholder = 'search by category';
    } 

    search.placeholder = 'search by ' + searchmood;

    search.focus();
    search.value = '';
    ShowData();


}



function searchData(value)
{
    let table = '';

    for (let i = 0; i < dataPro.length; i++){
    if (searchmood == 'title')
    {
        // for (let i = 0; i < dataPro.length; i++)
        // {
            if (dataPro[i].title.includes(value.toLowerCase()))
            {
                table += ` <tr>
                     <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].disscount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].catogery}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td> 
                </tr>`

            }

        // }



    }
    else
    {
        // for (let i = 0; i < dataPro.length; i++)
        // {
            if (dataPro[i].catogery.includes(value.toLowerCase()))
            {
                table += ` <tr>
                     <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].disscount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].catogery}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td> 
                </tr>`

            }

        // }
        
        }
        }
    
     document.getElementById('tbody').innerHTML = table;
}
//clean data
