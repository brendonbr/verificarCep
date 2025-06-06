


const getElement = (id) => document.getElementById(id);

const cep = getElement("cep");
const logradouro = getElement("logradouro");
const bairro = getElement("bairro");
const cidade = getElement("cidade");
const estado = getElement("estado");
const numero = getElement("numero");

let cepData = JSON.parse(localStorage.getItem("cepData"));
let nEndereco = localStorage.getItem("numeroEndereco")
if(cepData){
    let cepUnformatted = cepData.cep;
    cep.value = cepUnformatted.replace("-","");
    logradouro.value = cepData.logradouro;
    bairro.value = cepData.bairro;
    cidade.value = cepData.localidade;
    estado.value = cepData.estado;
    
};

if(nEndereco){
numero.value = nEndereco;
}

cep.addEventListener("blur", (event)=>{

    event.preventDefault()

    let cepInformado = event.target.value;

    
if (cepInformado.length !== 8){
    console.log( cepInformado.length )
    return;
}
else{

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(response =>{if(!response.ok){
        throw new Error("Erro de resposta")
    }
    return response.json()
    })
    .then(data =>{

        console.log(data)

         logradouro.value = data.logradouro;
         bairro.value = data.bairro;
         cidade.value = data.localidade;
         estado.value = data.estado;
 
       localStorage.setItem("cepData", JSON.stringify(data));

    })
    .catch(erro => console.log("Erro: " + erro))
}


})


numero.addEventListener("blur", (event)=>{
event.preventDefault();



localStorage.setItem("numeroEndereco", event.target.value)


})