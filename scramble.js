// REGISTRERE MEDLEM
    

function registerMember(event){
    event.preventDefault();

    let name = document.querySelector("[name='name']").value;
    let employeeId = document.querySelector("[name='employeeId']").value;

    if((name === "") || (employeeId === "")){
        window.alert("Fyll inn boksene for å registrere et medlem");
     } else {
        const medlemListe = JSON.parse(window.localStorage.getItem("teamList")) || [];
        
        medlemListe.push({name: name, ansattnr: employeeId});


        window.localStorage.setItem("teamList", JSON.stringify(medlemListe));


        event.target.reset();
        }

}

// REGISTRERE NY ARBEIDSOPPGAVE

function registerTask(event) {
    event.preventDefault();

    const headLine = document.querySelector("[name='headLine']").value;
    const description = document.querySelector("[name='description']").value;
    const assignedMember = document.getElementById("delegateTask").value;

    if(headLine === ""){
        window.alert("Fyll inn overskrift for å registrere en oppgave");
    } else if(description === ""){
        window.alert("Fyll inn en beskrivelse av hva som skal gjøres for å registrere en oppgave");
    } else {

        const assignmentList = JSON.parse(window.localStorage.getItem("assignmentList")) || [];

        assignmentList.push({headLine: headLine, description: description, member: assignedMember});
        window.localStorage.setItem("assignmentList", JSON.stringify(assignmentList));

        event.target.reset();
        }
}

    
// VIS MEDLEMMER

function displayMembers(event) {
    event.preventDefault();

    let outputDiv = document.getElementById("teamMembers");
    outputDiv.innerHTML = "";

    let teamInputs = JSON.parse(localStorage.getItem("teamList"));
        

    if(teamInputs === null){
        let emptyMessage = document.createElement("div");
        emptyMessage.innerHTML = "Legg til medlemmer for at de skal vises";
        outputDiv.appendChild(emptyMessage);
    } else {
        for(let i=0; i<teamInputs.length; i++){
            let members = document.createElement("div");
            members.innerHTML = teamInputs[i].name + ": " + teamInputs[i].ansattnr;
            outputDiv.appendChild(members);
        }
    }
}


// Vis mulige medlemmer i drop-down liste

const taskDown = document.getElementById("delegateTask");
taskDown.value = "";
taskDown.text = "Tildel til et medlem";
let firstOption = document.createElement("option");
firstOption.value = "Tildel oppgave til et medlem";
firstOption.text = "Tildel oppgave til et medlem";
taskDown.appendChild(firstOption);

const dragMemberList = JSON.parse(window.localStorage.getItem("teamList")) || [];
let nameArray = [];

for(const participant of dragMemberList){
    nameArray.push(participant.name);
}

if(nameArray === []){
    let newOption = document.createElement("option");
    newOption.value="Medlemslisten er tom";
    newOption.text = "Listen er tom";
    taskDown.appendChild(newOption);
}else {
    for(let i=0; i<nameArray.length; i++){
        let option = document.createElement("option");
        option.value = nameArray[i];
        option.text = nameArray[i];
        taskDown.appendChild(option);
    }
}


// VIS OPPGAVER OG TILDELINGEN TIL TEAMMEDLEMMER

function displayOppgaver(event) {
    event.preventDefault();

    let oppgaveOutputDiv = document.getElementById("oppGaver");
    oppgaveOutputDiv.innerHTML = "";

    let oppGaveInputs = JSON.parse(window.localStorage.getItem("assignmentList"));
    let memberOutputs = JSON.parse(window.localStorage.getItem("teamList"));

        

    if(oppGaveInputs === null){

        let emptyMessage = document.createElement("div");
        emptyMessage.innerHTML = "Legg til oppgaver for at de skal vises";
        oppgaveOutputDiv.appendChild(emptyMessage);
    } else {    
        let arrayLength = oppGaveInputs.length;
                
        for(let i=0; i<arrayLength; i++){
            let oppgaver = document.createElement("div");
            oppgaver.innerHTML = `* ${oppGaveInputs[i].headLine}:
            ${oppGaveInputs[i].description}
            Gjøres av: ${oppGaveInputs[i].member}`;
       
            oppgaveOutputDiv.appendChild(oppgaver);
        }
    } 
}

