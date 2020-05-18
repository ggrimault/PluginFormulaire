class objectFormulaire{

    //variables
        _idGlobal;
        _name;
        _type;
        _upperType;
        _activated = true; //par défaut true
        _required = true;  //par défaut true
        _label;
        parameter;
        _nbParameter;

    //Constructeur
        constructor(type){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction constructor");
            }

            this.id = objectFormulaire.nbId;
            this.upperType = type;
            this.type = type;
            this.name = this.type + "_" + this.id;
            this.label = "Element ID global " + this.id ;
            this.parameter = new Map();
            this.parameter.set("label",new Array());
            this.parameter.set("checked",new Array());
            this.parameter.get("label").push("Un paramètre quelconque...");
            this.parameter.get("checked").push(false);
            this.nbParameter = 1;
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

        set nbParameter(nb){
            this._nbParameter = nb;
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

        get nbParameter(){
            return this._nbParameter;
        }

    //AUTRE

        switchActivated(){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction switchActivated");
            }

            if(this.isActivated == true){
                this._activated = false;
            } else {
                this._activated = true;
            }
        }

        switchRequired(){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction switchRequired");
            }

            if(this.isRequired == true){
                this._required = false;
            }else{
                this._required = true;
            }
        }

        refreshLabel(){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction refreshLabel");
            }

            document.getElementById("label_" + this.id).innerHTML = this.label;
        }

        editLabel(chaine){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction editLabel");
            }

            this.label = chaine;
            this.refreshLabel();
        }

        createElementInside(father){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction createElementInside(father)");
            }

            //Creation des objects
                let div = document.createElement("DIV");
                let label = document.createElement("P");
                let element = document.createElement(this.upperType);

            //Attribution des ID
                div.id = "div_" + this.id;
                label.id = "label_" + this.id;
                if(this.type == "checkbox" || this.type == "radio"){
                    element.id = "element_" + this.id +".0";
                } else {
                    element.id = "element_" + this.id;
                }


            //Attribution des NAME
                div.name = this.type + "_" + this.id;
                label.name = this.type + "_" + this.id;
                element.name = this.type + "_" + this.id;

            //Si le type est TextArea ou select, alors ELEMENT n'aura pas de type
                if (this.type == "text"){}//Ne rien faire
                else if (this.type == "textArea") {
                    element.setAttribute("cols","72");
                } else if (this.type != "select" ){
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
                if(this.type == "checkbox" || this.type == "radio"){
                    this.displayParameters();
                } else if (this.type == "select"){
                    this.displayOptions();
                }

            //Ecriture du Text dans le LABEL
                this.refreshLabel();

            //Incrémentation de l'ID
                objectFormulaire.nbId++;
        }

        deleteDisplayedParameters(){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction deleteDisplayedParameters");
            }

            let currentDiv = document.getElementById("div_"+this.id);
            let listParameter = document.getElementsByName(this.type+"_"+this.id);
            let listLabel = document.getElementsByName("label_"+this.id);
            let listBr = document.getElementsByName("br_"+this.id);
            let it = listParameter.length;
            for(let i =listParameter.length -1; i>=0; i--)
            {
                it++;
                currentDiv.removeChild(listParameter[i]);
            }
            for(let i = listBr.length-1; i>=0; i--){
                currentDiv.removeChild(listBr[i]);
            }
            for(let i = listLabel.length-1; i>=0; i--){
                currentDiv.removeChild(listLabel[i]);
            }

        }


        displayParameters(){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction displayParameters");
            }

            this.deleteDisplayedParameters();
            for(let i = 0; i < this.nbParameter; i++){
                let element = document.createElement(this.upperType);
                let label = document.createElement("label");

                element.setAttribute("type",this.type);
                element.setAttribute("id", "element_" + this.id + "." + i);
                element.setAttribute("name", this.type + "_" + this.id);
                if(this.parameter.get("checked")[i]==true){
                  element.checked = true;
                }

                label.setAttribute("for",element.getAttribute("name"));
                label.setAttribute("name", "label_" + this.id);
                label.setAttribute("id", "label_" + this.id + "." + i);

                let valueLabel = this.parameter.get("label")[i];
                label.innerHTML = valueLabel;

                document.getElementById("div_"+this.id).appendChild(element);
                document.getElementById("div_"+this.id).appendChild(label);

                let br = document.createElement("br");
                br.setAttribute("name","br_"+this.id);

                document.getElementById("div_"+this.id).appendChild(br);
            }
        }

        displayOptions(){//Afficher toutes les options d'un select a partir des variables parameter et nbParameter
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction displayOptions");
            }

            this.deleteDisplayedOptions();

            let select = document.getElementById("element_"+this.id);
            if(afficherTraces == true){
                console.log("Le select en cours d'utilisation est le suivant:");
                console.log(select);
                console.log("Les parametres de l'élément courant sont les suivants:");
                console.log(this.parameter.get("label"));
                console.log("Il y a "+this.nbParameter+" paramètres");
            }

            for(let i = 0; i < this.nbParameter; i++){
                let anOption = document.createElement("option");
                anOption.setAttribute("value",this.parameter.get("label")[i]);
                anOption.setAttribute("id","option_"+this.id+"."+i);
                anOption.text = this.parameter.get("label")[i];
                select.add(anOption);
                console.log("L'option en cours d'utilisation est la suivante:");
                console.log(anOption);
            }

            if(afficherTraces == true){
                console.log("Vous sortez de la fonction displayOptions");
            }
        }

        deleteDisplayedOptions(){//Supprimer toutes les options (graphiquement) affichés de l'élement
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction deleteDisplayedOptions");
                console.log("Le nombre de suppression doit être de "+this.nbParameter);
                console.log("Les suppression doivent s'effectuer sur l'élement d'id suivant : "+"element_"+this.id)
            }

            let select = document.getElementById("element_"+this.id);
            for(let i = 0; i < this.nbParameter; i++){
                if(afficherTraces == true){
                    console.log("Suppression numero "+i);
                }
                select.remove(0);
            }
        }

        addParameter(label, boolean){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction addParameter CLASS");
            }

            this.parameter.get("label").push(label);
            this.parameter.get("checked").push(boolean);
            this.nbParameter++;
        }

        deleteParameter(finId){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction deleteParameter");
            }

            this.parameter.get("label").splice(finId, finId+1);
            this.parameter.get("checked").splice(finId, finId+1);
        }

        editParameterLabel(finId, label){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction editParameterLabel");
            }
            this.parameter.get("label")[finId] = label;
        }

        editParameterChecked(finId, boolean){
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction editParameterChecked");
            }
            this.parameter.get("checked")[finId] = boolean;
        }
    }
    //variable statique. La déclaration se fait en dessous de la classe.
    objectFormulaire.nbId = 0;

/*
-----------------------------------------------------------------------------------------------------
--------------------- FIN DE LA CLASSE, DEBUT 'SCRIPT' ----------------------------------------------
-----------------------------------------------------------------------------------------------------
*/
let afficherTraces = true;

let dictionnaireElements = new Map;
let ordreElement = new Array;
var nbElements = 0;
var isDropped = 1; //Permet de savoir si l'element est "en l'air", c'est utilisé pour ne pas créer 2 element quand on le drop sur un element existant

function allowDrop(event) {
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction allowDrop");
    }

    event.preventDefault();
}

function drop(event, id)
{
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction drop");
    }
    event.preventDefault();
    //creer element de bon type

    var typeIdTarget = event.dataTransfer.getData("text");

    var newElement = new objectFormulaire(typeIdTarget);

    if (isDropped == 0) { //Si on drag dans un div qui est lui meme sur le dropper, ca l'ajoutera 2 fois, isDropped sert à ca
        if(id == "dropper") //si c'est juste sur le dropper, on le met à la fin de la ligne
        {
            dictionnaireElements.set(newElement.id, newElement);
            ordreElement.push(newElement.id);
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

    removeElements();

    showElements();
}

function dragEventHandler(event)
{
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction dragEventHandler");
    }
    event.dataTransfer.setData("text",event.target.id);
    isDropped = 0;
}

function showElements()
{
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction showElements");
    }

    let iteration = 0;
    for (let i = 0; i < ordreElement.length; i++) {
      let elementCourant = dictionnaireElements.get(ordreElement[i]);
      var espace = document.createElement("div");
      espace.setAttribute("ondragover","allowDrop(event)");
      espace.setAttribute("ondrop","drop(event, this.id)");
      espace.setAttribute("class","space");
      espace.id = iteration;
      document.getElementById("dropper").appendChild(espace);

      iteration++;
      elementCourant.createElementInside("dropper");

    }

}

function removeElements(){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction removeElements");
    }
    document.getElementById("dropper").innerHTML = ""; //plus rien
}

function removeEdit(){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction removeEdit");
    }
    document.getElementById("panneauConfig").innerHTML = "";
}

function edit(idCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction edit");
    }
    //On efface tout dans la colonne d'edition
        removeEdit();
        let elementCourant = dictionnaireElements.get(idCourant);
    //On affiche dans un input text le LABEL
        //Creation de l'input
            let champ;
            champ = document.createElement("input");
            champ.setAttribute("id","champ_"+idCourant);
            panneauConfig.appendChild(champ);
        //Affectation de la chaine
            champ.value = elementCourant.label;

    //On crée un bouton qui permet de modifier le LABEL
        let bouton;
        bouton = document.createElement("button");
        bouton.id = "btn_" + idCourant;
        panneauConfig.appendChild(bouton);
        bouton.setAttribute("onclick", "getInputValueAndEditLabel("+idCourant+")");
        bouton.innerHTML = "Mettre a jour le label";

    //On ajoute un saut de ligne
        panneauConfig.appendChild(document.createElement("br"));
        panneauConfig.appendChild(document.createElement("br"));

    //Bouton pour monter l'élément dans l'ordre des éléments
        let boutonUp;
        boutonUp = document.createElement("button");
        boutonUp.id = "btnUp_" + idCourant;
        panneauConfig.appendChild(boutonUp);
        boutonUp.setAttribute("onclick", "putElementUp("+idCourant+")");
        boutonUp.innerHTML = "Monter l'élément";

    //On ajoute un saut de ligne
        panneauConfig.appendChild(document.createElement("br"));
        panneauConfig.appendChild(document.createElement("br"));

    //Bouton pour monter l'élément dans l'ordre des éléments
        let boutonDown;
        boutonDown = document.createElement("button");
        boutonDown.id = "btnDown_" + idCourant;
        panneauConfig.appendChild(boutonDown);
        boutonDown.setAttribute("onclick", "putElementDown("+idCourant+")");
        boutonDown.innerHTML = "Baisser l'élément";

    //On ajoute un saut de ligne
        panneauConfig.appendChild(document.createElement("br"));
        panneauConfig.appendChild(document.createElement("br"));

    //On crée un bouton qui permet de supprimer l'élément
        let boutonSuppr;
        boutonSuppr = document.createElement("button");
        boutonSuppr.id = "btnSuppr" + idCourant;
        panneauConfig.appendChild(boutonSuppr);
        boutonSuppr.setAttribute("onclick","supprimerElement("+idCourant+")");
        boutonSuppr.innerHTML = "Supprimer l'élément";

    //On ajoute un saut de ligne
        panneauConfig.appendChild(document.createElement("br"));
        panneauConfig.appendChild(document.createElement("br"));

    //On crée une checkbox permettant de faire du champ un champ requis ou non
        createCheckBoxRequired(idCourant);

    //On ajoute un saut de ligne
        panneauConfig.appendChild(document.createElement("br"));
        panneauConfig.appendChild(document.createElement("br"));

    //On crée une checkbox permettant de faire du champ un champ actif ou non
        createCheckBoxActivated(idCourant);

    //On ajoute un saut de ligne
        panneauConfig.appendChild(document.createElement("br"));
        panneauConfig.appendChild(document.createElement("br"));

    //On crée la div des parametres
        divParameter = document.createElement("div");
        divParameter.setAttribute("id", "divParameter");
        panneauConfig.appendChild(divParameter);

        switch(elementCourant.type){
            case "checkbox":
                editCheckBox(elementCourant);
                createBtnAddParameter(elementCourant);
                break;
            case "radio":
                editRadio(elementCourant);
                createBtnAddParameter(elementCourant);

                break;
            case "select":
                editSelect(elementCourant);
                createBtnAddOption(elementCourant);
                break;
            default:
                //lalala
                break;
        }
}

function putElementUp(anId){
  let index = ordreElement.indexOf(anId);
  if(index > 0){
    let temp = ordreElement[index - 1];
    ordreElement[index-1] = ordreElement[index];
    ordreElement[index] = temp;
    removeElements();
    showElements();
  }
}
function putElementDown(anId){
  let index = ordreElement.indexOf(anId);
  if(index < ordreElement.length-1){
    let temp = ordreElement[index + 1];
    ordreElement[index+1] = ordreElement[index];
    ordreElement[index] = temp;
    removeElements();
    showElements();
  }
}

function supprimerElement(anId){
  dictionnaireElements.delete(anId);
  removeElements();
  showElements();
  removeEdit();
}

function getInputValueAndEditLabel(anId){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction getInputValueAndEditLabel");
    }
    let elementCourant = dictionnaireElements.get(anId);
    elementCourant.editLabel(document.getElementById("champ_"+anId).value);
}

function swapRequis(anId){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction swapRequis");
    }
    let elementCourant = dictionnaireElements.get(anId);
    elementCourant.switchRequired();
}

function swapActif(anId){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction swapActif");
    }
    let elementCourant = dictionnaireElements.get(anId);
    elementCourant.switchActivated();
}

function createCheckBoxRequired(anId){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction createCheckBoxRequired");
    }
    let elementCourant = dictionnaireElements.get(anId);
    let checkboxRequis = document.createElement("input");
    checkboxRequis.setAttribute("type","checkbox");
    checkboxRequis.setAttribute("id","checkboxRequis_"+anId);
    if(elementCourant.isRequired == true){
        checkboxRequis.setAttribute("checked","");
    }
    checkboxRequis.setAttribute("onclick","swapRequis("+anId+")");

    let champRequis = document.createElement("label");
    champRequis.setAttribute("for","checkboxRequis_"+anId);
    champRequis.innerHTML = "Requis";

    let panneauConfig = document.getElementById("panneauConfig");
    panneauConfig.appendChild(checkboxRequis);
    panneauConfig.appendChild(champRequis);
}

function createCheckBoxActivated(anId){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction checkBoxActivated");
    }
    let elementCourant = dictionnaireElements.get(anId);
    let checkboxActif = document.createElement("input");
    checkboxActif.setAttribute("type","checkbox");
    checkboxActif.setAttribute("id","checkboxActif_"+anId);
    if(elementCourant.isActivated == true){
        checkboxActif.setAttribute("checked","");
    }
    checkboxActif.setAttribute("onclick","swapActif("+anId+")");

    let champActif = document.createElement("label");
    champActif.setAttribute("for","checkboxActif_"+anId);
    champActif.innerHTML = "Activé";

    let panneauConfig = document.getElementById("panneauConfig");
    panneauConfig.appendChild(checkboxActif);
    panneauConfig.appendChild(champActif);
}

function editParametersLabel(elementCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editParametersLabel");
    }
    let label = document.createElement("p");
    label.innerHTML = "Edition des paramètres";

    let divParameter = document.getElementById("divParameter");
    divParameter.appendChild(document.createElement("br"));
    divParameter.appendChild(document.createElement("br"));

    divParameter.appendChild(label);

    //On affiche dans un input text le LABEL
        //Creation de l'input
            let lesInputs = document.getElementById("div_"+elementCourant.id).getElementsByTagName("input");
            for(let i = 0; i < lesInputs.length; i++){
                let champ = document.createElement("input");
                champ.setAttribute("id","champ_"+lesInputs[i].id.split("_")[1]);
                divParameter.appendChild(champ);
                champ.value = elementCourant.parameter.get("label")[i];

                let leId = lesInputs[i].getAttribute("id").split("_")[1];
                let idDebut = leId.split(".")[0];
                let idSuite = leId.split(".")[1];

                let btnEditLabel = document.createElement("button");
                btnEditLabel.setAttribute("id","editLabelBtn");
                btnEditLabel.innerHTML = "Appliquer Label";
                btnEditLabel.setAttribute("onclick","displayEditionParameter("+idDebut+","+idSuite+","+i+")");
                divParameter.appendChild(btnEditLabel);

                let btnCheck_Uncheck = document.createElement("button");
                btnCheck_Uncheck.setAttribute("id","check_uncheckBtn");
                btnCheck_Uncheck.innerHTML = "coché/decoche";
                btnCheck_Uncheck.setAttribute("onclick","displayCheckParameter("+idDebut+","+idSuite+")");
                divParameter.appendChild(btnCheck_Uncheck);

                let btnSuppr = document.createElement("button");
                btnSuppr.setAttribute("id","btnSuppr");
                btnSuppr.innerHTML = "Supprimer le champ";
                btnSuppr.setAttribute("onclick","deleteParameter("+idDebut+","+idSuite+")");
                divParameter.appendChild(btnSuppr);

                divParameter.appendChild(document.createElement("br"));
            }
}

function addParameter(idCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction addParameter");
    }
    let elementCourant = dictionnaireElements.get(idCourant);

    elementCourant.addParameter("Un nouveau paramètre","false");
    if(elementCourant.upperType == "select"){
        elementCourant.displayOptions();
    } else {
        elementCourant.displayParameters();
    }
    edit(idCourant);
}

function deleteParameter(idDebut,idSuite){
    let elementCourant = dictionnaireElements.get(idDebut);
    elementCourant.parameter.get("label").splice(idSuite,1);
    elementCourant.parameter.get("checked").splice(idSuite,1);
    elementCourant.nbParameter--;
    removeElements();
    showElements();
    edit(idDebut);
}

function displayEditionParameter(idDebut, idFin, i){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction displayEditionParameter");
    }

    let anId = idDebut +"."+idFin;
    let elementCourant = dictionnaireElements.get(idDebut);

    let newValue = document.getElementById("champ_"+anId).value;

    if (elementCourant.upperType == "select"){
        document.getElementById("option_"+anId).value = newValue;
        document.getElementById("option_"+anId).text = newValue;
    } else {
        document.getElementById("label_"+anId).innerHTML = newValue;
    }

    elementCourant.parameter.get("label")[i] = newValue;
}

function test(){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction test");
    }
    for(let i = 0; i<= 5; i++){
        let anOption = document.createElement("option");
        anOption.setAttribute("value","something"+i);
        anOption.setAttribute("id","0."+i);
        anOption.text = "something"+i;
        document.getElementsByTagName("select")[0].add(anOption);
    }
}
/*
----------------------------------------------------------------------------------------------
----------------- Fonctions concerning exclusively CHECKBOX & RADIO --------------------------
----------------------------------------------------------------------------------------------
*/
function createBtnAddParameter(elementCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction createBtnAddParameter");
    }
    let btn = document.createElement("button");
    btn.setAttribute("id","addParameterBtn");
    btn.innerHTML = "Ajouter Parametre";
    btn.setAttribute("onclick","addParameter("+elementCourant.id+")");
    document.getElementById("panneauConfig").appendChild(btn);
}

function displayCheckParameter(idDebut, idFin){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction displayCheckParameters");
    }
    let anId = idDebut +"."+idFin;

    let anElement = document.getElementById("element_"+anId);

    let elementCourant = dictionnaireElements.get(idDebut);

    if(anElement.checked == true){
        anElement.checked = false;
        elementCourant.parameter.get("checked")[idFin] = false;
    } else if (anElement.checked == false){
        anElement.checked = true;
        elementCourant.parameter.get("checked")[idFin] = true;
    }
}

function editCheckBox(elementCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editCheckBox");
    }
    editParametersLabel(elementCourant);
}

function editRadio(elementCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editRadio");
    }
    editParametersLabel(elementCourant);
}

/*
----------------------------------------------------------------------------------------------
----------------- Fonctions concerning exclusively SELECT & OPTIONS --------------------------
----------------------------------------------------------------------------------------------
*/
function createBtnAddOption(elementCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction createBtnAddOption");
    }
    let btn = document.createElement("button");
    btn.setAttribute("id","addOptionBtn");
    btn.innerHTML = "Ajouter parametre";
    btn.setAttribute("onclick","addOption("+elementCourant.id+")");
    document.getElementById("panneauConfig").appendChild(btn);
}

function addOption(idCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction addOption");
    }
    let elementCourant = dictionnaireElements.get(idCourant);
    elementCourant.addParameter("Une nouvelle option","false");
    elementCourant.displayOptions();
    edit(idCourant);
}

function editSelect(elementCourant){
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editSelect");
    }
    let label = document.createElement("p");
    label.innerHTML = "Edition des paramètres";

    let divParameter = document.getElementById("divParameter");
    divParameter.appendChild(document.createElement("br"));
    divParameter.appendChild(document.createElement("br"));

    divParameter.appendChild(label);

    //On affiche dans un input text le LABEL
        //Creation des options
            let lesOptions = document.getElementById("div_"+elementCourant.id).getElementsByTagName("OPTION");
            for (let i = 0; i < lesOptions.length; i++){
                //Creation de l'input contenant le nom de l'option
                    let champ = document.createElement("input");
                    champ.setAttribute("id","champ_"+lesOptions[i].id.split("_")[1]);
                    divParameter.appendChild(champ);
                    champ.value = elementCourant.parameter.get("label")[i];

                //Creation du btn afin d'actualiser le nom du label
                    let leId = lesOptions[i].getAttribute("id").split("_")[1];
                    let idDebut = leId.split(".")[0];
                    let idSuite = leId.split(".")[1];

                    let btnEditLabel = document.createElement("button");
                    btnEditLabel.setAttribute("id","editLabelBtn");
                    btnEditLabel.innerHTML = "Appliquer Label";
                    btnEditLabel.setAttribute("onclick","displayEditionParameter("+idDebut+","+idSuite+","+i+")");
                    divParameter.appendChild(btnEditLabel);

                    let btnSuppr = document.createElement("button");
                    btnSuppr.setAttribute("id","btnSuppr");
                    btnSuppr.innerHTML = "Supprimer le champ";
                    btnSuppr.setAttribute("onclick","deleteParameter("+idDebut+","+idSuite+")");
                    divParameter.appendChild(btnSuppr);

                //Saut de ligne
                    divParameter.appendChild(document.createElement("br"));
            }
}

/*
----------------------------------------------------------------------------------------------
----------------- Fonctions concerning exclusively SAVING FORM --------------------------
----------------------------------------------------------------------------------------------
*/

function saveForm(){
    dictionnaireElements.forEach(function(element){
        let donnees = JSON.stringify(element);

        //Suite du traitement à faire ici (La on obtient un obj parse en str)
    });
}