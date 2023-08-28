const displaypassword= document.querySelector("[display-password]");
const passwordlengthdisplay=document.querySelector(".datalenghtnumber");
const slidervalue=document.querySelector("[slider-range]");
const datacopymessage= document.querySelector("[data-copymessage]");
const datacopybtn=document.querySelector(".datacoptbtn");
const strengthindicator=document.querySelector("[strength-indicator]");
const generatepasswordbtn=document.querySelector("[generate-password-btn]");
const uppercasecheck=document.querySelector("#Include_Uppercase_Letters");
const lowercasecheck=document.querySelector("#Include_Lowercase_Letters");
const numberscheck=document.querySelector("#Include_Numbers");
const specialcheck=document.querySelector("#Include_Specialcharacters");
const Allcheckbox=document.querySelectorAll("input[type=checkbox]");
let password="";

let passwordlength=5;
let checkcount=1;
const symbols="!@#$%^&*()_-+=[]{}.?";
setindicator("#ccc");
handleslider();
check();
function check(){
    uppercasecheck.checked=true;
}
function handleslider(){
    slidervalue.value=passwordlength;
    passwordlengthdisplay.innerText=passwordlength;
}
function setindicator(color){
    strengthindicator.style.backgroundColor=color;
}
function getRNDinteger(min,max){
 return  Math.floor(Math.random()*(max-min))+min;
} 
function getrandomnumbers(){
  return  getRNDinteger(0,9);
}
function generateuppercase(){
    return String.fromCharCode(getRNDinteger(97,123));
}
function generatelowercase(){
    return String.fromCharCode(getRNDinteger(65,91));
}
function generatesymbols(){
   
 let rndnumber= getRNDinteger(0,symbols.length);

 return symbols.charAt(rndnumber);
 
}
function calcstrength(){
    let hasupper=false;
    let haslower=false;
    let hasnumber=false;
    let hasspecial=false;
    if(uppercasecheck.checked){
     hasupper=true;
    }
    if(lowercasecheck.checked){
    haslower=true;
    }
    if(numberscheck.checked){
    hasnumber=true;
    }
    if(specialcheck.checked){
     hasspecial=true;
    }

    if(hasupper && haslower && (hasnumber || hasspecial) && passwordlength>=8){
        setindicator("#0f0");
    }
    else if((haslower || hasupper) && (hasnumber || hasspecial) && passwordlength>=6){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00")
    }
}

async function copycontent(){
    try{
        //await isiliye kyoki clipboard pei copy karna ek async operation hai jo ki reject ya true return karta hai jab tak ye pura nahi ho jata await function wait karega 
       // or agla command nahi chalne dega
    await navigator.clipboard.writeText(displaypassword.value);
     datacopymessage.innerText="copied";
    }
    catch(e){
      datacopymessage.innerText="failed";
    }
    datacopymessage.classList.add("active");

    setTimeout( () => {
        datacopymessage.classList.remove("active");
    },2000);
}

slidervalue.addEventListener('input',()=>{
    passwordlength=slidervalue.value;
    handleslider();
});

datacopybtn.addEventListener('click',()=>{
    if(displaypassword.value){
        copycontent();
    }
})
function handlecheckboxchange(){
   
    checkcount=0;
    // if(uppercasecheck.checked){
    //     checkcount++;
    // }
    // if(lowercasecheck.checked){
    //     checkcount++;
    // }
    // if(numberscheck.checked){
    //     checkcount++;
    // }
    // if(specialcheck.checked){
    //     checkcount++;
    // }

     Allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
     })

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    } 
}
Allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange);
})
// uppercasecheck.addEventListener('change',()=>{
//     handlecheckboxchange();
// })
// lowercasecheck.addEventListener('change',()=>{
//     handlecheckboxchange();
// })
// numberscheck.addEventListener('change',()=>{
//     handlecheckboxchange();
// })
// specialcheck.addEventListener('change',()=>{
//     handlecheckboxchange();
// })
function shufflepassword(array){
    for(let i=array.length-1;i>0;i--){
        const j= Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str += el));
    return str;
}

generatepasswordbtn.addEventListener('click',()=>{
      
    if(checkcount==0){
        return;
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    password="";
    let funcarr=[];
    if(uppercasecheck.checked){
        funcarr.push(generateuppercase);
    }
    if(lowercasecheck.checked){
        funcarr.push(generatelowercase);
    }
    if(specialcheck.checked){
        funcarr.push(generatesymbols);
    }
    if(numberscheck.checked){
        funcarr.push(getrandomnumbers);
    }
    for(let i=0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }
    for(let i=0;i<passwordlength-funcarr.length;i++){
        let rndindex=getRNDinteger(0,funcarr.length);
        password+=funcarr[rndindex]();
    }
    password=shufflepassword(Array.from(password));
    displaypassword.value=password;
    calcstrength();

})