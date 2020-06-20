class objetFormulaire{

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
        dependance;
        _nbDependance;

    //Constructeur
        constructor(type){ //Construit un objet ObjetFormulaire en initialisant ses propriétés
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction constructor");
            }

            this.id = objetFormulaire.nbId;
            this.upperType = type;
            this.type = type;
            this.name = this.type + "_" + this.id;
            this.label = "Element ID global " + this.id;

            this.parameter = new Map();
            this.parameter.set("label",new Array());
            this.parameter.set("checked",new Array());
            if(this.type == "checkbox" || this.type == "radio"){
                this.parameter.set("price",new Array());
                this.parameter.get("price").push(0);
            }
            this.parameter.get("label").push("Un paramètre quelconque...");
            this.parameter.get("checked").push(false);
            this.nbParameter = 1;

            this.dependance = new Map();
            this.dependance.set("idLinked", new Array());
            this.dependance.set("eventLinked", new Array());
            this.nbDependance = 0;
        }

    //SETTEURS

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

        set nbDependance(nb){
            this._nbDependance = nb;
        }

    //GETTEURS
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

        get nbDependance(){
            return this._nbDependance;
        }

    //AUTRE

        switchActivated(){ //Permet d'inverser la valeur du paramètre booléen activated
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction switchActivated");
            }

            if(this.isActivated == true){
                this._activated = false;
            } else {
                this._activated = true;
            }
        }

        switchRequired(){ //Permet d'inverser la valeur du paramètre booléen Required
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction switchRequired");
            }

            if(this.isRequired == true){
                this._required = false;
            }else{
                this._required = true;
            }
        }

        refreshLabel(){ //Affiche le label avec la valeur contenu dans son paramètre label
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction refreshLabel");
            }

            document.getElementById("label_" + this.id).innerHTML = this.label;
        }

        editLabel(chaine){ //Permet d'attribuer une nouvelle valeur au paramètre label et l'affiche
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction editLabel");
            }

            this.label = chaine;
            this.refreshLabel();
        }

        createElementInside(father){ //Affiche un ObjetFormulaire à l'intérieur d'un élément HTML
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
                objetFormulaire.nbId++;
        }

        deleteDisplayedParameters(){ //Efface graphiquement l'objet
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction deleteDisplayedParameters");
            }
            //Sélection des éléments de l'objet
                let currentDiv = document.getElementById("div_"+this.id);
                let listParameter = document.getElementsByName(this.type+"_"+this.id);
                let listLabel = document.getElementsByName("label_"+this.id);
                let listBr = document.getElementsByName("br_"+this.id);
                let it = listParameter.length;

            //Suppression
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


        displayParameters(){ //Affiche les paramètres d'un Objet, tel que les différentes case à cocher, bouton radio...
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction displayParameters");
            }
            //Suppression des paramètres affichés
                this.deleteDisplayedParameters();

            //Affichage des paramtètres
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

        displayOptions(){//Affiche toutes les options d'une Combobox (select) à partir des variables parameter et nbParameter
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

        deleteDisplayedOptions(){//Supprime graphiquement toutes les options affichés de l'objet combobox (Select)
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

    //CONCERNANT L'ATTRIBUT PARAMETRE
        addParameter(label, boolean){ //Ajoute un paramètre à l'objet, contenant un nom et une valeur booléenne coché ou non (sans affichage)
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction addParameter CLASS");
            }

            this.parameter.get("label").push(label);
            this.parameter.get("checked").push(boolean);
            if(this.type == "checkbox" || this.type == "radio"){
                this.parameter.get("price").push(0);
            }
            this.nbParameter++;
        }

        deleteParameter(finId){ //Supprime le paramètre indiqué par un nombre (sansa affichage)
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction deleteParameter");
            }

            this.parameter.get("label").splice(finId, finId+1);
            this.parameter.get("checked").splice(finId, finId+1);
        }

    //CONCERNANT DEPENDANCE
        addDependance(IdLinked, eventLinked){ //Ajout d'une dépendance à l'objet (sans affichage)
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction addDependance");
                console.log(this);
            }
            this.dependance.get("idLinked").push(IdLinked);
            this.dependance.get("eventLinked").push(eventLinked);
            this.nbDependance++;
        }

        deleteDependance(IdLinked){ //Suppression d'une dépendance à l'objet (sans affichage)
            if(afficherTraces == true){
                console.log("Vous êtes dans la fonction deleteDependance");
            }
            let numeroTab = this.dependance.get("idLinked").indexOf(IdLinked);
            this.dependance.get("idLinked").splice(numeroTab,1);
            this.dependance.get("eventLinked").splice(numeroTab,1);
            this.nbDependance--;
        }
    }
    //variable statique. La déclaration se fait en dessous de la classe.
    objetFormulaire.nbId = 0;

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

function allowDrop(event) { //Pour ne pas effectuer le premier clic sur élément sans faire drag & drop
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction allowDrop");
    }

    event.preventDefault();
}

function dragEventHandler(event)
{
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction dragEventHandler");
    }
    event.dataTransfer.setData("text",event.target.id);
    isDropped = 0;
}

function drop(event, id) //Permet de drop un élément sur la partie formulaire de la page
{
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction drop");
    }
    event.preventDefault();
    //creer element de bon type

    var typeIdTarget = event.dataTransfer.getData("text");

    var newElement = new objetFormulaire(typeIdTarget);

    if (isDropped == 0) { //Si on drag dans un div qui est lui meme sur le dropper, ca l'ajoutera 2 fois, isDropped sert à ca
        if(id == "dropper") //si c'est juste sur le dropper, on le met à la fin de la ligne
        {
            dictionnaireElements.set(newElement.id, newElement);
            ordreElement.push(newElement.id);
            isDropped = 1;
        }
    }

    removeElements();

    showElements();
}

function showElements() //Permet d'afficher tous les éléments dans la colonne centrale 
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

function removeElements(){ //Permet de supprimer tous les éléments de la colonne centrale graphiquement
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction removeElements");
    }
    document.getElementById("dropper").innerHTML = ""; //plus rien
}

function removeEdit(){ //Permet de vider la colonne droite
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction removeEdit");
    }
    document.getElementById("panneauConfig").innerHTML = "";
}

function edit(idCourant){ //Permet l'affichage du panneau d'édition des éléments
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction edit");
        console.log("Voici l'id courant: "+idCourant);
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
        displayDependances(elementCourant);
        editDependance(elementCourant);
        editPrice(elementCourant);

        
}

function putElementUp(anId){ //Permet de monter un élément de la colonne centrale d'un rang
  let index = ordreElement.indexOf(anId);
  if(index > 0){
    let temp = ordreElement[index - 1];
    ordreElement[index-1] = ordreElement[index];
    ordreElement[index] = temp;
    removeElements();
    showElements();
  }
}
function putElementDown(anId){ //Permet de descendre un élément de la colonne centrale d'un rang
  let index = ordreElement.indexOf(anId);
  if(index < ordreElement.length-1){
    let temp = ordreElement[index + 1];
    ordreElement[index+1] = ordreElement[index];
    ordreElement[index] = temp;
    removeElements();
    showElements();
  }
}

function supprimerElement(anId){ //Permet de supprimer un élément (classe et graphiquement)
  dictionnaireElements.delete(anId);
  console.log(ordreElement);
  ordreElement.splice(ordreElement.indexOf(anId),1);
  console.log(ordreElement);
  removeElements();
  showElements();
  removeEdit();
}

function getInputValueAndEditLabel(anId){ //Permet d'éditer le label en fonction de la value contenu dans l'input correspondant (non graphique)
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction getInputValueAndEditLabel");
    }
    let elementCourant = dictionnaireElements.get(anId);
    elementCourant.editLabel(document.getElementById("champ_"+anId).value);
}

function swapRequis(anId){ //Permet d'appeler la méthode de classe switchRequired
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction swapRequis");
    }
    let elementCourant = dictionnaireElements.get(anId);
    elementCourant.switchRequired();
}

function swapActif(anId){ //Permet d'appeler la méthode de classe swapActif
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction swapActif");
    }
    let elementCourant = dictionnaireElements.get(anId);
    elementCourant.switchActivated();
}

function createCheckBoxRequired(anId){ //Créer une checkbox qui gère l'attribut de classe _required
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

function createCheckBoxActivated(anId){ //Créer une checkbox qui gère l'attribut de classe _activated
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

function editParametersLabel(elementCourant){ //permet de créer dans la colonne d'édition tous les éléments relatifs à l'édition des paramètres d'un élément
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

                divParameter.appendChild(document.createElement("br"));
            }
}

function addParameter(idCourant){ //Permet d'ajouter un paramètre à l'élément dont l'ID est passé en paramètre
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

function deleteParameter(idDebut,idSuite){ //permet de supprimer le paramètre désigné
    let elementCourant = dictionnaireElements.get(idDebut);
    elementCourant.parameter.get("label").splice(idSuite,1);
    elementCourant.parameter.get("checked").splice(idSuite,1);
    elementCourant.nbParameter--;
    removeElements();
    showElements();
    edit(idDebut);
}


function displayEditionParameter(idDebut, idFin, i){ //Permet de modifier le nom d'un paramètre
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


/*
----------------------------------------------------------------------------------------------
----------------- Fonctions concerning exclusively CHECKBOX & RADIO --------------------------
----------------------------------------------------------------------------------------------
*/
function createBtnAddParameter(elementCourant){ //permet de créer le bouton d'ajout de paramètre
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction createBtnAddParameter");
    }
    let btn = document.createElement("button");
    btn.setAttribute("id","addParameterBtn");
    btn.innerHTML = "Ajouter Parametre";
    btn.setAttribute("onclick","addParameter("+elementCourant.id+")");
    document.getElementById("panneauConfig").appendChild(btn);
}

function displayCheckParameter(idDebut, idFin){ //permet de modifier la valeur check d'un paramètre d'un élément checkbox
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

function editCheckBox(elementCourant){ //Fonction a appeler spécifiques à l'édition d'une checkbox
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editCheckBox");
    }
    editParametersLabel(elementCourant);
}

function editRadio(elementCourant){ //Fonction a appeler spécifiques à l'édition d'un élément bouton radio
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
function createBtnAddOption(elementCourant){ //permet de créer un bouton d'ajout de de paramètre dans une combobox
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction createBtnAddOption");
    }
    let btn = document.createElement("button");
    btn.setAttribute("id","addOptionBtn");
    btn.innerHTML = "Ajouter parametre";
    btn.setAttribute("onclick","addOption("+elementCourant.id+")");
    document.getElementById("panneauConfig").appendChild(btn);
}

function addOption(idCourant){ //Permet d'ajouter une option a une checkbox
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction addOption");
    }
    let elementCourant = dictionnaireElements.get(idCourant);
    elementCourant.addParameter("Une nouvelle option","false");
    elementCourant.displayOptions();
    edit(idCourant);
}

function editSelect(elementCourant){ //permet de créer dans la colonne d'édition tous les éléments relatifs à l'édition des paramètres d'un élément select
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
----------------- Fonctions concerning DEPENDANCES -------------------------------------------
----------------------------------------------------------------------------------------------
*/
function editDependance(elementCourant){ ////permet de créer dans la colonne d'édition tous les éléments relatifs à l'édition des dépendances/conditions
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editDependance");
    }
    //Affichage
        let divDependance = document.getElementById("divDependance");
        let label = document.createElement("label");
        label.innerHTML = "Dépendances";

        divDependance.appendChild(document.createElement("br"));
        divDependance.appendChild(document.createElement("br"));
        divDependance.appendChild(label);
        divDependance.appendChild(document.createElement("br"));
        divDependance.appendChild(document.createElement("br"));

    //Creation de l'espace d'edition des dependance
        //Creation des options
        let selectElement = document.createElement("select");
        selectElement.setAttribute("id","selectElement");
        dictionnaireElements.forEach(function(element){
            
            if(element == elementCourant || element.type == "text"  || element.type == "textArea" || element.type == "checkbox" || element.type == "inputText" ){}//Ne rien faire
            else {
                //Creation d'une liste déroulante contenant le nom des éléments présents
                    let option = document.createElement("option");
                    option.text = element.label;
                    selectElement.add(option);

            }

        })

        bouton = document.createElement("button");
        bouton.id = "btn_" + elementCourant.id;
        bouton.setAttribute("onclick", "getParameterOfElement("+elementCourant.id+")");
        bouton.innerHTML = "=>";

        //Attribution et saut de ligne
        divDependance.appendChild(selectElement);
        divDependance.appendChild(bouton);
}

function getParameterOfElement(IdCourant){ //permet d'obtenir tous les paramètre d'un élément et de les insérer (label) dans la combobox courante
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction getParameterOfElement");
    }
    //Suppression des éléments
        let oldSelectParameterOfElement = document.getElementById("selectElementParameter");
        if(oldSelectParameterOfElement == null){}//Rien
        else{
            document.getElementById("divDependance").removeChild(oldSelectParameterOfElement);
        }
        let oldBtn = document.getElementById("btn_validerDep");
        if(oldBtn == null){}//Rien
        else{
            document.getElementById("divDependance").removeChild(oldBtn);
        }

        let oldBtnValidate = document.getElementById("btn_confirmerEvent");
        if(oldBtnValidate == null){}//Rien
        else{
            document.getElementById("divDependance").removeChild(oldBtnValidate);
        }

        let oldSelectEvent = document.getElementById("selectEvent");
        if(oldSelectEvent == null){}//Rien
        else{
            document.getElementById("divDependance").removeChild(oldSelectEvent);
        }
    

    let choosenText = document.getElementById("selectElement").value;

    let selectElementParameter = document.createElement("select");
    selectElementParameter.setAttribute("id","selectElementParameter");

    let iteration = 0;
    let trouve = 0;
    dictionnaireElements.forEach(function(element){
        console.log("element.label = "+element.label);
        console.log("choosenText = "+choosenText);
        if(element.label.localeCompare(choosenText) == 0){
            trouve = element.id;
        }
        iteration++;
    })
    
    elementCourant = dictionnaireElements.get(trouve);
    
    for(let i = 0; i < elementCourant.parameter.get("label").length; i++){
        let option = document.createElement("option");
        option.text = elementCourant.parameter.get("label")[i];
        selectElementParameter.add(option);
    }

    document.getElementById("divDependance").appendChild(selectElementParameter);
    
    let bouton = document.createElement("button");
    bouton.id = "btn_validerDep" ;
    bouton.setAttribute("onclick", "selectionnerEvent("+IdCourant+","+elementCourant.id+")");
    bouton.innerHTML = "Valider";
    document.getElementById("divDependance").appendChild(bouton);
}

function selectionnerEvent(idCourant, selectedElementId){ //Permet de choisir un évènement dans une combobox
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction selctionnerEvent");
    }
    let selectEvent = document.createElement("select");
    selectEvent.setAttribute("id","selectEvent");

    let option_activate = document.createElement("option");
    option_activate.text = "activate";
    selectEvent.add(option_activate);

    let option_disactivate = document.createElement("option");
    option_disactivate.text = "desactivate";
    selectEvent.add(option_disactivate);

    let bouton = document.createElement("button");
    bouton.id = "btn_confirmerEvent" ;
    bouton.setAttribute("onclick", "addDependance("+idCourant+","+selectedElementId+")");
    bouton.innerHTML = "Valider";

    document.getElementById("divDependance").appendChild(selectEvent);
    document.getElementById("divDependance").appendChild(bouton);
}

function addDependance(idCourant, selectedElementId){ //permet  d'ajouter une dépendance
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction addDependance");
    }

    let elementCourant = dictionnaireElements.get(idCourant);
    let elementSelected = dictionnaireElements.get(selectedElementId);

    let choosenParameter = document.getElementById("selectElementParameter").value;
    let choosenEvent = document.getElementById("selectEvent").value;

    let parameterId = "pas trouve";
    let parameters;
    console.log(elementSelected);
    if(elementSelected.upperType == "select"){
        parameters = document.getElementById("element_"+selectedElementId).childNodes; //CA NE MARCHE QUE POUR LES LISTES DEROULANTE
        console.log("childNodes");
    } else if (elementSelected.type == "radio"){
        parameters = document.getElementById("div_"+ elementSelected.id).getElementsByTagName("INPUT");
        console.log("PAS childNodes");
    }

    if(afficherTraces == true){
        console.log(parameters);
        console.log(selectedElementId);
        //console.log(document.getElementById("element_"+selectedElementId));
    }

    for(let i = 0; i < parameters.length; i++){
        if(dictionnaireElements.get(selectedElementId).type == "radio"){ //radio btn
            let currentChaine = document.getElementById("label_"+parameters[i].id.split("_")[1]).innerHTML;
            if(currentChaine.localeCompare(choosenParameter) == 0){
                parameterId = parameters[i].id;
            }
        } else { //Liste déroulante
            if(parameters[i].innerHTML.localeCompare(choosenParameter) == 0){
                parameterId = parameters[i].id;
            }
        }
        
        if(afficherTraces == true){
            console.log("comparaison de | "+parameters[i].innerHTML+" | et | "+choosenParameter+" |");
        }
    }


    if(afficherTraces == true){
        console.log("On envoie dans addDependance:");
        console.log(parameterId);
        console.log(choosenEvent);
    }

    elementCourant.addDependance(parameterId, choosenEvent);
    console.log(elementCourant);
    edit(idCourant);
}

function displayDependances(elementCourant){ //permet d'afficher les dépendances présente pour l'élément courant
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction displayDependances");
    }

    //Affichage
        let divDependance = document.createElement("DIV");
        divDependance.setAttribute("id","divDependance");
        document.getElementById("panneauConfig").appendChild(divDependance);
        divDependance.appendChild(document.createElement("br"));
        divDependance.appendChild(document.createElement("br"));

    let labelPresentation = document.createElement("h4");
    labelPresentation.innerHTML = "Liste des dépendances présentes: ";
    divDependance.appendChild(labelPresentation);

    console.log("Le nombre de dep est de : "+elementCourant.nbDependance);
    for(let i = 0; i < elementCourant.nbDependance; i++){
        let uneDependance = document.createElement("p");
        let idObjet = elementCourant.dependance.get("idLinked")[i];
        let eventObjet = elementCourant.dependance.get("eventLinked")[i];
        console.log(idObjet.split("_")[1].split(".")[0]);
        console.log(idObjet);
        let elementLie = dictionnaireElements.get(parseInt(idObjet.split("_")[1].split(".")[0]));
        console.log(elementLie);
        let chaine;
        if(elementLie.type == "radio"){//radio btn
            chaine = "Lié au paramètre : " + document.getElementById("label_"+idObjet.split("_")[1]).innerHTML +  " contenu dans " + elementLie.label + " et l'évènement lié est " + eventObjet;
        } else {//select
            chaine = "Lié au paramètre : " + document.getElementById(idObjet).innerHTML + " contenu dans " + elementLie.label + " et l'évènement lié est " + eventObjet;
        }
        uneDependance.innerHTML = chaine;
        
        //On crée un bouton qui permet de supprimer la dépendance
            let boutonSuppr;
            boutonSupprDependance = document.createElement("button");
            boutonSupprDependance.id = "btnSupprDependance_" + elementCourant.id;
            boutonSupprDependance.setAttribute("onclick","deleteDependance("+elementCourant.id +","+ i +")");
            boutonSupprDependance.innerHTML = "Supprimer la dépendance";

        divDependance.appendChild(uneDependance);
        divDependance.appendChild(boutonSupprDependance);
    } 

    //eventLinked et idLinked
}

function deleteDependance(idCourant, iteration){ //Permet de supprimé la dépendance sélectionnée
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction displayDependances");
        console.log("les parametre sont: "+idCourant+","+iteration);
    }
    let elementCourant = dictionnaireElements.get(idCourant);
    elementCourant.deleteDependance(elementCourant.dependance.get("idLinked")[iteration]);
    console.log(elementCourant);
    edit(idCourant);
}

/*
----------------------------------------------------------------------------------------------
----------------- Fonctions concerning PRICES -------------------------------------------
----------------------------------------------------------------------------------------------
*/

function editPrice(elementCourant){ //permet l'édition du prix (affichage) NON IMPLEMENTE MAIS FONCTIONNELLE PARTIELEMENT
//ATTENTION
//Pour cette fonction ci, il manque seulement à implément un checkbox PRICE, qui en fonction de son état affiche cette édition de prix ou non
    if(afficherTraces == true){
        console.log("Vous êtes dans la fonction editPrice");
    }
    //ATTENTION CETTE LIGNE DE CODE N'EST LA QUE TEMPORAIREMENT, DOIT ETRE GERER PAR L'OBJET A TERME
                                     elementCourant.isPrice = true;

    if(elementCourant.isPrice == true){
    //Affichage
        let divPrice = document.createElement("DIV");
        divPrice.setAttribute("id","divPrice");
        document.getElementById("panneauConfig").appendChild(divPrice);
        let label = document.createElement("label");
        label.innerHTML = "Prix";

        divPrice.appendChild(document.createElement("br"));
        divPrice.appendChild(document.createElement("br"));
        divPrice.appendChild(label);
        divPrice.appendChild(document.createElement("br"));
        divPrice.appendChild(document.createElement("br"));

    //Creation de l'espace d'edition des prix
        //Creation des options
        for(let i = 0; i < elementCourant.nbParameter; i++){
            let chaine = elementCourant.parameter.get("label")[i] + " :  ";
            let labelParam = document.createElement("P");
            labelParam.innerHTML = chaine;
            labelParam.setAttribute("id","parametre_"+i);
            let champPrix = document.createElement("INPUT");
            champPrix.setAttribute("id","prix_" + i );

            divPrice.appendChild(labelParam);
            divPrice.appendChild(champPrix);
            champPrix.value = elementCourant.parameter.get("price")[i];

            let btnPrix = document.createElement("button");
            btnPrix.setAttribute("id","btnPrix");
            btnPrix.innerHTML = "Modifier";
            btnPrix.setAttribute("onclick","changerPrix("+elementCourant.id+","+i+")");
            champPrix.appendChild(btnPrix);
            champPrix.appendChild(document.createElement("br"));
        }
    }
}

function changerPrix(idElement,index){ //permet de modifier le prix 
    let elementCourant = dictionnaireElements.get(idElement);

    let prix = document.getElementById("prix_"+index).value;
    if (isNaN(prix)){
      alert("Veuillez insérer un prix valide");
      document.getElementById("prix_"+index).innerHTML = "";
    }else{
      elementCourant.parameter.get("price")[index] = prix;
    }
    edit(idDebut);
}



/*
----------------------------------------------------------------------------------------------
----------------- Fonctions concerning exclusively SAVING FORM --------------------------
----------------------------------------------------------------------------------------------
*/

function saveForm(){//procédure de sauvegarde
    let donnees = {};

    dictionnaireElements.forEach(function(value, key){
        donnees[key] = value
    });

    JSON.stringify(donnees);

    if(afficherTraces == true){
        console.log(donnees);
    }

    let xhr = getXMLHttpRequest();
    xhr.open("POST","/wp-content/plugins/pluginCreationFormulaire/sauvegarderDonnees.php",true);
    xhr.send("json="+donnees);
}

//ATTENTION CETTE FONCTION POSE PROBLEME ET NE RENVOIE PAS CE QUI EST DESIRE
function getXMLHttpRequest() { //Cette méthode permet de créer un objet XMLHttpRequest ( si c'est possible sur le navigateur sinon elle renvoit null)
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject){
        if (window.ActiveXObject){
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e){
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        else{
            xhr = new XMLHttpRequest();
        }
    }
    else{
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}