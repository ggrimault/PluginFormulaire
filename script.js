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
            this.id = objectFormulaire.nbId;
            this.upperType = type;
            this.type = type;
            this.name = this.type + "_" + this.id;
            this.label = "Element ID global " + this.id ;
            this.parameter = new Map();
            this.parameter.set("label",new Array());
            this.parameter.set("checked",new Array());
            this.parameter.get("label").push("Un paramètre quelconque");
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
                element.id = "element_" + this.id +".0";

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
                    console.log(this.parameter);
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
                }

            //Ecriture du Text dans le LABEL
                this.refreshLabel();

            //Incrémentation de l'ID
                objectFormulaire.nbId++;
            }

            deleteDisplayedParameters(){

                let currentDiv = document.getElementById("div_"+this.id);
                let listParameter = document.getElementsByName(this.type+"_"+this.id);
                let listLabel = document.getElementsByName("label_"+this.id);
                let listBr = document.getElementsByName("br_"+this.id);
                let it = listParameter.length;
                console.log("///////////////////////");
                console.log("Liste des objts qui doivent disparaitre :  ");
                console.log(listParameter);
                for(let i =listParameter.length -1; i>=0; i--)
                {
                    console.log("deleted n°"+it+", avec element suivant: ");
                    console.log(listParameter[i]);
                    console.log("----------");
                    it++;
                    currentDiv.removeChild(listParameter[i]);
                    console.log("Après le removeChild");
                    console.log(listParameter[i]);
                }
                for(let i = listBr.length-1; i>=0; i--){
                    currentDiv.removeChild(listBr[i]);
                }
                for(let i = listLabel.length-1; i>=0; i--){
                    currentDiv.removeChild(listLabel[i]);
                }
               
            }


            displayParameters(){
                this.deleteDisplayedParameters();
                for(let i = 0; i < this.nbParameter; i++){
                    let element = document.createElement(this.upperType);
                    let label = document.createElement("label");

                    element.setAttribute("type",this.type);
                    element.setAttribute("id", "element_" + this.id + "." + i);
                    element.setAttribute("name", this.type + "_" + this.id);

                    label.setAttribute("for",element.getAttribute("name"));
                    label.setAttribute("name", "label_" + this.id);
                    label.setAttribute("id", "label_" + this.id + "." + i);

                    let valueLabel = this.parameter.get("label")[i];
                    label.innerHTML = valueLabel;

                    console.log("Affichage de :");
                    console.log(element);

                    document.getElementById("div_"+this.id).appendChild(element);
                    document.getElementById("div_"+this.id).appendChild(label);

                    let br = document.createElement("br");
                    br.setAttribute("name","br_"+this.id);

                    document.getElementById("div_"+this.id).appendChild(br);
                }
            }

            addParameter(label, boolean){
                this.parameter.get("label").push(label);
                this.parameter.get("checked").push(boolean);
                this.nbParameter++;
                console.log("Vous etes dans addParameter: méthode de classe");
            }

            deleteParameter(finId){
                this.parameter.get("label").splice(finId, finId+1);
                this.parameter.get("checked").splice(finId, finId+1);
            }

            editParameterLabel(finId, label){
                this.parameter.get("label")[finId] = label;
            }

            editParameterChecked(finId, boolean){
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
        bouton.setAttribute("onclick", "getInputValueAndEditLabel("+idCourant+")");
        bouton.innerHTML = "Mettre a jour le label";

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
                break;
            default:
                //lalala
                break;
        }
    }

    function test(){
        let currentElement = dictionnaireElements.get(0);
        currentElement.parameter.get("label").push("Parametre 1");
        currentElement.parameter.get("label").push("Parametre 2");
        currentElement.nbParameter++;
        currentElement.displayParameters();
    }

    function getInputValueAndEditLabel(anId){
        console.log("Dans getInputValue "+document.getElementById("champ_"+anId).value);
        let elementCourant = dictionnaireElements.get(anId);
        elementCourant.editLabel(document.getElementById("champ_"+anId).value);
    }

    function swapRequis(anId){
        let elementCourant = dictionnaireElements.get(anId);
        elementCourant.switchRequired();
        console.log(elementCourant);
    }

    function swapActif(anId){
        let elementCourant = dictionnaireElements.get(anId);
        elementCourant.switchActivated();
        console.log(elementCourant);
    }

    function createCheckBoxRequired(anId){
        let elementCourant = dictionnaireElements.get(anId);
        console.log("JUFIBGVEO8IYF GHBER8Z7IFGE8AZF"+elementCourant);
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
        let elementCourant = dictionnaireElements.get(anId);
        console.log("JUFIBGVEO8IYF GHBER8Z7IFGE8AZF"+elementCourant);
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
        let label = document.createElement("p");
        label.innerHTML = "Edition des paramètres";
        
        let divParameter = document.getElementById("divParameter");
        console.log("Obj Courant: ");
        console.log(elementCourant);
        console.log(dictionnaireElements);
        divParameter.appendChild(document.createElement("br"));
        divParameter.appendChild(document.createElement("br"));

        divParameter.appendChild(label);

        //On affiche dans un input text le LABEL
            //Creation de l'input
                let lesInputs = document.getElementById("div_"+elementCourant.id).getElementsByTagName("input");
                console.log(lesInputs);
                console.log(lesInputs.length);
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
                    console.log("LES ID : "+idDebut+"  ET  " + idSuite);
                    btnEditLabel.setAttribute("onclick","displayEditionParameter("+idDebut+","+idSuite+","+i+")");
                    divParameter.appendChild(btnEditLabel);

                    let btnCheck_Uncheck = document.createElement("button");
                    btnCheck_Uncheck.setAttribute("id","check_uncheckBtn");
                    btnCheck_Uncheck.innerHTML = "coché/decoche";
                    console.log("LES ID : "+idDebut+"  ET  " + idSuite);
                    btnCheck_Uncheck.setAttribute("onclick","displayCheckParameter("+idDebut+","+idSuite+")");
                    divParameter.appendChild(btnCheck_Uncheck);
                   
                    divParameter.appendChild(document.createElement("br"));
                }
    }

    function displayEditionParameter(idDebut, idFin, i){
        let anId = idDebut +"."+idFin;

        console.log("On prend la valeur de : " + "champ_"+anId);
        console.log("valeur : "+document.getElementById("champ_"+anId).value);
        console.log("On va chercher dans la valeur de : " + "label_"+anId);
        console.log(document.getElementById("label_"+anId));

        let newValue = document.getElementById("champ_"+anId).value;
        document.getElementById("label_"+anId).innerHTML = newValue;


        let elementCourant = dictionnaireElements.get(idDebut);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(elementCourant);
        console.log(elementCourant.parameter.get("label")[i]);
        elementCourant.parameter.get("label")[i] = newValue;
        console.log(elementCourant.parameter.get("label")[i]);
    }

    function displayCheckParameter(idDebut, idFin){
        let anId = idDebut +"."+idFin;

        console.log("On prend la valeur de : " + "champ_"+anId);
        console.log("valeur : "+document.getElementById("champ_"+anId).value);
        console.log("On va chercher dans la valeur de : " + "label_"+anId);
        console.log(document.getElementById("label_"+anId));

        let anElement = document.getElementById("element_"+anId);
        
        if(anElement.checked == true){
            anElement.checked = false;
        } else if (anElement.checked == false){
            anElement.checked = true;
        }
    }

    function editCheckBox(elementCourant){
        editParametersLabel(elementCourant);
    }

    function editRadio(elementCourant){
        editParametersLabel(elementCourant);
    }

    function addParameter(idCourant){
        console.log(idCourant);
        let elementCourant = dictionnaireElements.get(idCourant);
        console.log("samarcheeeeeee");
        console.log(elementCourant);
        elementCourant.addParameter("Un nouveau paramètre","false");
        elementCourant.displayParameters();
        edit(idCourant);


    }

    function createBtnAddParameter(elementCourant){
        let btn = document.createElement("button");
        btn.setAttribute("id","addParameterBtn");
        btn.innerHTML = "Ajouter Parametre";
        btn.setAttribute("onclick","addParameter("+elementCourant.id+")");
        document.getElementById("panneauConfig").appendChild(btn);
       
    }

    function test(){

    }