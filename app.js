const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-12-31/v1/currencies";

const dropdown=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".msg");
// const time=Date.now(); to change the date


// for (code in countryList)
// {
//     console.log(code, countryList[code]);
// }

for(let select of dropdown){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name ==="from" && code==="USD"){
            newOption.selected="selected"; 
        }else if(select.name ==="to" && code==="INR"){
            newOption.selected="selected"; 
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target); 
    })
}

const updateFlag=(element) =>{
      let code=element.value;
      let CountryCode= countryList[code];
      let newSrc=`https://flagsapi.com/${CountryCode}/flat/64.png`;
      let img=element.parentElement.querySelector("img");
      img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" ||  amtval<1){
        amtVal=1;
        amount.value="1";
    }

    // const URL=`${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    const URL=`${BASE_URL}/${from.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let f=from.value.toLowerCase();
    let t=to.value.toLowerCase();
    let rate=data[f][t];
    let finalAmt=amtval*rate;
    msg.innerText=`${amtval} ${from.value} = ${finalAmt} ${to.value}`;
});