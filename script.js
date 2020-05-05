class objectFormulaire{

    //variables
        _idGlobal;
        _name;
        _type;
        _upperType;
        _activated = true; //par défaut true
        _required = true;  //par défaut true
        _label;

    //Constructeur
        constructor(type){
            this.id = objectFormulaire.nbId;
            this.upperType = type;
            this.type = type;
            this.name = this.type + "_" + this.id;
            this.label = "Element ID global " + this.id ;
        }



    //SET

        set id(id){
            this._idGlobal = id;
        }

        set name(name){
            this._name = name;
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

        set type(type){
            this._type = type;
        }

        set isActivated(bool){
            this._activated = bool;
        }

        set isRequired(bool){
            this._required = bool;
        }

        set label(chaine){
            this._label = chaine;
        }

    //GET
        get id(){
            return this._idGlobal;
        }

        get name(){
            return this._name;
        }

        get type(){
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

        get label(){
            return this._label;
        }

    //AUTRE

        switchActivated(){
            if(this.isActivated == true){
                this._activated = false;
            } else {
                this._activated = true;
            }
        }

        switchRequired(){
            if(this.isRequired == true){
                this._required = false;
            }else{
                this._required = true;
            }
        }

        refreshLabel(){
            console.log("On recherche : label_" + this.id);
            document.getElementById("label_" + this.id).innerHTML = this.label;
        }

        editLabel(chaine){
            this.label = chaine;
            this.refreshLabel();
        }

        createElementInside(father){
            //Creation des objects
                let div = document.createElement("DIV");
                let label = document.createElement("P");
                let element = document.createElement(this.upperType);

            //Attribution des ID
                div.id = "div_" + this.id;
                label.id = "label_" + this.id;
                console.log("Attribution de l'id: " + label.id);
                element.id = "element_" + this.id;

            //Attribution des NAME
                div.name = this.type + "_" + this.id;
                label.name = this.type + "_" + this.id;
                element.name = this.type + "_" + this.id;

            //Si le type est TextArea ou select, alors ELEMENT n'aura pas de type
                if (this.type == "textArea") {
                    element.setAttribute("cols","72");
                } else if (this.type != "select"){
                    element.setAttribute("type",this.type);
                }

            //Parametrage du DIV
                div.setAttribute("ondragover","allowDrop(event)");
                div.setAttribute("ondrop","drop(event," + this.id + ")");
                div.setAttribute("class","champForm");
                div.setAttribute("onclick","edit(" + this.id + ")");


            //Creation de la hiérarchie
                div.appendChild(label);
                div.appendChild(element);
                document.getElementById(father).appendChild(div);

            //Ecriture du Text dans le LABEL
                this.refreshLabel();

            //Incrémentation de l'ID
                objectFormulaire.nbId++;
            }

    }
    //variable statique. La déclaration se fait en dessous de la classe.
    objectFormulaire.nbId = 0;

/*
-----------------------------------------------------------------------------------------------------
--------------------- FIN DE LA CLASSE, DEBUT 'SCRIPT' ----------------------------------------------
-----------------------------------------------------------------------------------------------------
*/

let dictionnaireElements = new Map;
var nbElements = 0;
var isDropped = 1; //Permet de savoir si l'element est "en l'air", c'est utilisé pour ne pas créer 2 element quand on le drop sur un element existant

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, id)
{
    event.preventDefault();
    //creer element de bon type

    var typeIdTarget = event.dataTransfer.getData("text");

    var newElement = new objectFormulaire(typeIdTarget);

    //classer dans le tableau et donner le num d'index en id au div du nouvel element

    if (isDropped == 0) { //Si on drag dans un div qui est lui meme sur le dropper, ca l'ajoutera 2 fois, isDropped sert à ca
        if(id == "dropper") //si c'est juste sur le dropper, on le met à la fin de la ligne
        {
            //div.id = tabElements.length + 1;
            dictionnaireElements.set(newElement.id, newElement);
            console.log("On est sur l'élement d'id:" + newElement.id);
            console.log(dictionnaireElements.get(newElement.id));
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
    dictionnaireElements.forEach(function(element){
        /*
        //Ajouter un petit espace entre chaque elements, celui ci doit répondre à un drop dessus
        var espace = document.createElement("div");
        espace.setAttribute("ondragover","allowDrop(event)");
        espace.setAttribute("ondrop","drop(event, this.id)");
        espace.setAttribute("class","space");
        espace.id = element.id-1;
        document.getElementById("dropper").appendChild(espace);
        */
        element.createElementInside("dropper");
    });
}

function removeElements(){
    document.getElementById("dropper").innerHTML = ""; //plus rien
}

function removeEdit(){
    document.getElementById("panneauConfig").innerHTML = "";
}

function edit(idCourant){
    //On efface tout dans la colonne d'edition
        removeEdit();
        let elementCourant = dictionnaireElements.get(idCourant);
        console.log(elementCourant);
    //On affiche dans un input text le LABEL
        //Creation de l'input
            let champ;
            champ = document.createElement("input");
            champ.setAttribute("id","champ_"+idCourant);
            panneauConfig.appendChild(champ);
        //Affectation de la chaine
            champ.value = elementCourant.label;
            console.log("value : " + champ.value);
            console.log(typeof champ.value);

    //On crée un bouton qui permet de modifier le LABEL
        let bouton;
        bouton = document.createElement("button");
        bouton.id = "btn_" + idCourant;
        panneauConfig.appendChild(bouton);
        //bouton.addEventListener("click",getInputValue(idCourant));
        bouton.setAttribute("onclick", "getInputValueAndEditLabel("+idCourant+")");
        console.log("sapasse");
        //bouton.setAttribute("onclick", "test()");
        bouton.innerHTML = "Mettre a jour le label";

    //On ajoute un saut de ligne
        let sautDeLigne = document.createElement("br");
        panneauConfig.appendChild(sautDeLigne);}

    function test(id){
        console.log("tout est nique, surtout l'id"+id);
    }

    function getInputValueAndEditLabel(anId){
        console.log("Dans getInputValue "+document.getElementById("champ_"+anId).value);
        let elementCourant = dictionnaireElements.get(anId);
        elementCourant.editLabel(document.getElementById("champ_"+anId).value);
        //return document.getElementById("champ_"+anId).value;
    }
/*
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
/*
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
}*/
