class objectFormulaire{

    //Constructeur
        constructor(id, name, type){


        //Creation des objects
            this.div = document.createElement("DIV");
            this.label = document.createElement("P");

            this.upperType = type;
            this.element = document.createElement(this.upperType);
    
        //Parametre general
            
            this.id = id;
            this.name = name;
            if(this.upperType != "select") {
                this.type = type;
            }
            this._activated = true;
        
        //Parametre labels
            var texteLabel = document.createTextNode("ID global : "+this.id); 
            this.label.appendChild(texteLabel);
    

        //On sait pas ^^^^'
            this._parameter = new Array();
            this._dependance = new Array();


        //Parametre div
            this.div.setAttribute("ondragover","allowDrop(event)");
            this.div.setAttribute("ondrop","drop(event, this.id)");
            this.div.setAttribute("class","champForm");
            this.div.setAttribute("onclick","edit(div)");

        //Creation des object et de la hiérarchie
            this.div.appendChild(this.label);
            this.div.appendChild(this.element);

            return this.div;
        }
        
    
    //Setters
    
        set id(id){
            this._idGlobal = id;
            this.element.id = "element_" + id;
            this.div.id = "div_" + id;
            this.label.id = "label_" + id;
        }

        set name(name){
            this.element.name = name;
        }
    
        set upperType(type){
            var choosen;
            if ( type == "text"){
                choosen = "text";
            } else if ( type == "select" ){
                choosen = "select";
            } else {
                choosen = "input";
            }
            this._upperType = choosen;
        }
    
        set type(type){
            this.element.type = type;
        }
        
        switchActivated(){
            if(this.isActivated == true){
                this._activated = false;
            } else {
                this._activated = true;
            }
        }
    
    
    //Getters
        get id(){
            return this._idGlobal;
        }
    
        get name(){
            return this.element._name;
        }
    
        get type(){
            return this.element._type;
        }
    
        get upperType(){
            return this._upperType;
        }
    
        get isActivated(){
            return this._activated;
        }
    
    }

/*


    FIN DE LA CLASSE, DEBUT 'SCRIPT'


*/


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
    
    var newElement = new objectFormulaire(nbElements, nbElements, typeIdTarget);
    
    //var div = document.createElement("DIV"); //div enveloppant tout l'element
    
    //var label = document.createElement("p"); // creation du label de base
    //var texteLabel = document.createTextNode(typeIdTarget); 
    //label.appendChild(texteLabel);
    
    /*
    div.setAttribute("ondragover","allowDrop(event)");
    div.setAttribute("ondrop","drop(event, this.id)");
    div.setAttribute("class","champForm");
    div.setAttribute("onclick","edit(div)");
    

    div.appendChild(label);
    div.appendChild(newElement);
    */
    
    //classer dans le tableau et donner le num d'index en id au div du nouvel element
    
    if (isDropped == 0) { //Si on drag dans un div qui est lui meme sur le dropper, ca l'ajoutera 2 fois, isDropped sert à ca
        if(id == "dropper") //si c'est juste sur le dropper, on le met à la fin de la ligne
        {
            //div.id = tabElements.length + 1;
            tabElements.push(newElement);
            isDropped = 1;
        }
        else //si c'est drop sur un element
        {
            /*var indexDrop = parseInt(id);
            
            div.id = indexDrop + 1;
            for(i = indexDrop; i < tabElements.length; i++) //incremmenter les id de tous les suivants
            {
                tabElements[i].id++;
            }
            
            tabElements.splice(indexDrop,0,div); //on le met à l'index indexDrop
            isDropped = 1;*/
        }
    }
    newElement.onclick = edit(newElement);
    
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
        /*
        //Ajouter un petit espace entre chaque elements, celui ci doit répondre à un drop dessus
        var espace = document.createElement("div");
        espace.setAttribute("ondragover","allowDrop(event)");
        espace.setAttribute("ondrop","drop(event, this.id)");
        espace.setAttribute("class","space");
        espace.id = element.id-1;
        document.getElementById("dropper").appendChild(espace);
        */
    
        document.getElementById("dropper").appendChild(element); //ajouter l'element
        
    });
}

function removeElements(){
    document.getElementById("dropper").innerHTML = ""; //plus rien
}

function removeEdit(){
    document.getElementById("panneauConfig").innerHTML = "";
}

function edit(element){
    console.log(element);
    removeEdit();
    document.getElementById("panneauConfig").appendChild(element);
    /*
    var champ = document.createElement("input");
    console.log(element.getElementsByTagName("p")[0].innerHTML);
    champ.value = element.getElementsByTagName("p")[0].innerHTML;
    var panneauConfig = document.getElementById("panneauConfig");
    panneauConfig.appendChild(champ);
    */
}