let list_transporteurs=[]
let list_vehicules=[]
let list_resource=[]
let k=0
let datasend={}
const vehis=JSON.parse(vehicules).vehcule
const dmd=JSON.parse(demande).Demande
console.log(dmd)
document.getElementById("btn").addEventListener("click", function () {
    var elems = document.querySelectorAll('.cost-block');
    elems.forEach(function (el) {
        list_resource.push(el.options[el.selectedIndex].text);
    })
    for(let i=1;i<list_resource.length;i=i+2){
        list_vehicules.push(list_resource[i])
    }
    
    
    for(let elemnt of vehis){
         elemnt.index=list_vehicules[k]
         k=k+1
        
    }
   
    for(let i=0;i<list_resource.length-1;i=i+2){
        list_transporteurs.push(list_resource[i]) 
    }

    console.log(list_transporteurs)
    
   
datasend={vehicules:vehis,transporteur:list_transporteurs,demande:dmd}
dataSend=JSON.stringify(datasend)
let form = document.getElementById('final');
form.action = "/expidtions/finalConfirme/" + dataSend
});

$("#btn").on("click", function() {
    $(this).prop("disabled", true);
});
