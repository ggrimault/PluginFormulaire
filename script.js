class objectFormulaire{

    //variables
        _idGlobal = nbElements;
        _name;
        _type;
        _upperType;
        _activated;
       _required = true;
        

    //Constructeur
        constructor(type){


        //Creation des objects
            this.div = document.createElement("DIV");
            this.label = document.createElement("P");

            this.upperType = type;
            this.element = document.createElement(this.upperType);

        //Parametre general

            this.leId = objectFormulaire.nbId;
            this.leName = type;
            if(this.upperType != "select" && this.upperType != "textArea") {
                this.leType = type;
            }
            if(this.upperType == "textArea"){
                this.element.setAttribute("cols","72");
            }
            if(this.upperType == "text"){
                this.element.required = false;
            }
            
            this._activated = true;

        //Parametre labels
            var texteLabel = document.createTextNode("ID global : "+this.getLeId);
            this.label.appendChild(texteLabel);


        //On sait pas ^^^^'
            this._dependance = new Array();


        //Parametre div
            this.div.setAttribute("ondragover","allowDrop(event)");
            this.div.setAttribute("ondrop","drop(event,"+this.getLeId+")");
            console.log(this.getLeId);
            this.div.setAttribute("class","champForm");
            this.div.setAttribute("onclick","edit("+this.getLeId+")");

        //SI TEXTAREA

        //Creation des object et de la hiérarchie
            this.div.appendChild(this.label);
            this.div.appendChild(this.element);
            
            objectFormulaire.nbId++;
            return this.div;
        }



    //Setters


        set leId(id){
            this._idGlobal = id;
            this.element.id = "element_" + id;
            this.div.id = "div_" + id;
            this.label.id = "label_" + id;
        }


        set leName(name){
            var leNom = name + "_" + objectFormulaire.nbId;
            this.element.setAttribute("name",leNom);
            this.div.setAttribute("name",leNom);
            this.label.setAttribute("name",leNom);
        }

        

        set upperType(type){
            var choosen;
            if( type != "text" && type != "select" && type != "textArea") {
                choosen = "input";
            } else {
                choosen = type;
            }
            this._upperType = choosen;
        }

        //probablement a çmodifier
        set leType(type){
            if(this.upperType != "textArea"){
            this.element.type = type;
            }
        }

        switchActivated(){
            if(this.isActivated == true){
                this._activated = false;
                this.element.required = false;
            } else {
                this._activated = true;
                this.element.required = true;
            }
        }

        switchRequired(){
            if(this.isRequired == true){
                this._required = false;
            }else{
                this._required = true;
            }
        }
    //Getters
        get getLeId(){
            return this._idGlobal;
        }

        get leName(){
            return this._name;
        }

        get leType(){
            return this._type;
        }

        get upperType(){
            return this._upperType;
        }

        get isActivated(){
            return this._activated;
        }

        get isRequired(){
            return this._required;
        }

    }

    //varibla statique. La déclaration se fait bien de cette manière
    objectFormulaire.nbId = 0;


/*


    FIN DE LA CLASSE, DEBUT 'SCRIPT'


*/


var tabElements = new Array();
var tabId = new Array();
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

    var newElement = new objectFormulaire(typeIdTarget);

    //classer dans le tableau et donner le num d'index en id au div du nouvel element

    if (isDropped == 0) { //Si on drag dans un div qui est lui meme sur le dropper, ca l'ajoutera 2 fois, isDropped sert à ca
        if(id == "dropper") //si c'est juste sur le dropper, on le met à la fin de la ligne
        {
            //div.id = tabElements.length + 1;
            tabElements.push(newElement);
            console.log(typeof newElement);
            tabId.push(newElement.getLeId);
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
    //newElement.onclick = edit(newElement);

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

function edit(id){
    //On efface tout et on récupere la "div" selectionnée
        removeEdit();
        div = document.getElementById("div_"+id);

    //On affiche dans un input text le nom de la div
        var champ;
        champ = document.createElement("input");
        champ.setAttribute("id","champ_"+id);
        champ.value = document.getElementById("label_"+id).innerHTML;
        panneauConfig.appendChild(champ);

    //On crée un bouton qui permet de modifier le nom de la div
        var bouton;
        bouton = document.createElement("button");
        bouton.setAttribute("onclick","changeLabel("+id+")");
        bouton.innerHTML = "Mettre a jour le label";
        panneauConfig.appendChild(bouton);

    //On ajoute un saut de ligne
        var sautDeLigne = document.createElement("br");
        panneauConfig.appendChild(sautDeLigne);

    //On ajoute le champ "requis"
        addCheckBoxRequiredTo(panneauConfig, id);

    //obtention du type de l'élément formulaire dans la div
        theType = getTypeOf(id);
    //on adapte les actions possible
        switch(theType){
            case "text":
                //Dans le cas TEXT
                    //RIEN POUR LE MOMENT
                break;
            case "textArea":
                //Dans le cas TextArea
                editTextArea(id);
                break;
            case "inputText":
                //Dans le cas de inputText
                editInputText(id);
                break;
            case "checkbox":
                //Dans le cas de checkbox
                editCheckbox(id);
                break;
            case "radio":
                //Dans le cas de radio
                editRadio(id);
                break;
            case "select":
                //Dans le cas de select
                editSelect(id);
                break;
        }
}

function changeLabel(id){
    console.log(document.getElementById("label_"+id).innerHTML);
    var newText = document.getElementById("champ_"+id).value;
    console.log(newText);
    document.getElementById("label_"+id).innerHTML = newText;
    removeElements();
    showElements();
}

function editTextArea(id){
    var aTextArea = document.getElementById("element_"+id);//element central

}

function addCheckBoxRequiredTo(anElement, anId){
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id","required_"+anId);
    checkbox.setAttribute("name","required_"+anId);

    console.log(tabElements);
    console.log(tabId);
    console.log(tabElements[0].leId);
//ON EST PAR LA, VOIR COMMENT STOCKER LE REQUIRED
    checkbox.setAttribute("onclick","changeRequired("+anId+")");

    var label = document.createElement("label");
    label.setAttribute("for","required_"+anId);
    label.innerHTML = "Requis";

    anElement.appendChild(checkbox);
    anElement.appendChild(label);
}


function changeRequired(anId){
    console.log(anId);
    if(document.getElementById("required_"+anId).checked){
        document.getElementById("element_"+anId).required = true;
    } else {
        document.getElementById("element_"+anId).required = false;
    }
}

function getTypeOf(anId){
    var name_decomposed = document.getElementById("div_"+anId).getAttribute("name").split("_");    
    var theType = name_decomposed[0];
    console.log(theType);
    return theType;
}