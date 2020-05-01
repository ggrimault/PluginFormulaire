class objectFormulaire{

//Constructeur
    constructor(id, type){
        this.id = id;
        this.type = type;

        this.activated = true;

        this.parameter = new Array();
        this.dependance = new Array();
    }


//Setters

    setId(id){
        this.id = id;
    }

    setType(type){
        this.type = type;
    }

    switchActivated(){
        if(this.activated == true){
            this.activated = false;
        } else {
            this.activated = true;
        }
    }

    setParameter(){

    }

    setDependance(){

    }




//Getters
    getId(){
        return this.id;
    }

    getType(){
        return this.type;
    }

    isActivated(){
        return this.activated;
    }

    getParameter(){

    }

    getDependance(){

    }

}

function test(){
var tabObj = new Array();
tabObj.push(new objectFormulaire(1,"Oui bonjour"));
tabObj.push(new objectFormulaire(2,"Non au revoir"));

console.log(tabObj[0].getId());
console.log(tabObj[0].isActivated());
console.log(tabObj[0].getType());
tabObj[0].switchActivated();
console.log(tabObj[0].isActivated());
}

var tabElements = new Array();
	
var nbElements = 0;

var isDropped = 1; //Permet de savoir si l'element est "en l'air", c'est utilisé pour ne pas créer 2 element quand on le drop sur un element existant

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, id)
{
    event.preventDefault();
    //creer element de bon type selon l'event target dans un div avec 2 br
    
    var typeIdTarget = event.dataTransfer.getData("text");
    
    var newElement;
    
    switch(typeIdTarget){
        case "text" :
            newElement = createTextInput();
            break ;
        case "radio" :
            newElement = createRadioButton();
            break ;
        case "checkbox" :
            newElement = textInput(); //changer
            break ;
        case "textarea":
            newElement = textInput(); //changer
            break ;
    }
    
    var div = document.createElement("DIV"); //div enveloppant tout l'element
    
    var label = document.createElement("p"); // creation du label de base
    var texteLabel = document.createTextNode(typeIdTarget); 
    label.appendChild(texteLabel);
    
    div.setAttribute("ondragover","allowDrop(event)");
    div.setAttribute("ondrop","drop(event, this.id)");
    div.class = typeIdTarget; //sera surement utile pour les options
    
    div.appendChild(label);
    div.appendChild(newElement);
    div.appendChild(document.createElement("BR"));
    div.appendChild(document.createElement("BR"));
    
    //classer dans le tableau et donner le num d'index en id au div du nouvel element
    
    if (isDropped == 0) { //Si on drag dans un div qui est lui meme sur le dropper, ca l'ajoutera 2 fois, isDropped sert à ca
        if(id == "dropper") //si c'est juste sur le dropper, on le met à la fin de la ligne
        {
            div.id = tabElements.length + 1;
            tabElements.push(div);
            isDropped = 1;
        }
        else //si c'est drop sur un element
        {
            var indexDrop = parseInt(id);
            
            div.id = indexDrop + 1;
            for(i = indexDrop; i < tabElements.length; i++) //incremmenter les id de tous les suivants
            {
                tabElements[i].id++;
            }
            
            tabElements.splice(indexDrop,0,div); //on le met à l'index indexDrop
            isDropped = 1;
        }
    }
    
    //tout afficher
    
    removeElements();
    
    showElements();
}

function dragEventHandler(event)
{
    event.dataTransfer.setData("text",event.target.id);
    isDropped = 0;
}

function showElements()
{		
    tabElements.forEach(function(element){
        
        //Ajouter un petit espace entre chaque elements, celui ci doit répondre à un drop dessus
        var espace = document.createElement("div");
        espace.setAttribute("ondragover","allowDrop(event)");
        espace.setAttribute("ondrop","drop(event, this.id)");
        espace.setAttribute("class","space");
        espace.id = element.id-1;
        document.getElementById("dropper").appendChild(espace);
    
    
        document.getElementById("dropper").appendChild(element); //ajouter l'element
    });
}

function removeElements()
{
    document.getElementById("dropper").innerHTML = ""; //plus rien
}

function createTextInput(){ //faire une fonction comme ca par type d'element
    var input = document.createElement("input");
    input.type ="text";
    input.id = nbElements;
    nbElements++;
    return input;
}

function createRadioButton()
{
   
}

