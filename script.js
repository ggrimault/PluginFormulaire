class objectFormulaire{

    //Constructeur
        constructor(type){


        //Creation des objects
            this.div = document.createElement("DIV");
            this.label = document.createElement("P");

            this.upperType = type;
            this.element = document.createElement(this.upperType);

        //Parametre general

            this.id = objectFormulaire.nbId;
            this.name = type;
            if(this.upperType != "select" && this.upperType != "textArea") {
                this.type = type;
            }
            if(this.upperType == "textArea"){
                this.element.setAttribute("cols","72");
            }
            this._activated = true;

        //Parametre labels
            var texteLabel = document.createTextNode("ID global : "+this.id);
            this.label.appendChild(texteLabel);


        //On sait pas ^^^^'
            this._dependance = new Array();


        //Parametre div
            this.div.setAttribute("ondragover","allowDrop(event)");
            this.div.setAttribute("ondrop","drop(event,"+this.id+")");
            this.div.setAttribute("class","champForm");
            this.div.setAttribute("onclick","edit("+this.id+")");

        //SI TEXTAREA

        //Creation des object et de la hiérarchie
            this.div.appendChild(this.label);
            this.div.appendChild(this.element);
            
            objectFormulaire.nbId++;
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
        set type(type){
            if(this.upperType != "textArea"){
            this.element.type = type;
            }
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

    }

    //varibla statique. La déclaration se fait bien de cette manière
    objectFormulaire.nbId = 0;


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

    var newElement = new objectFormulaire(typeIdTarget);

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
        
    //On affiche les options supplémentaire (dépendent du type et upperType de ObjectFormulaire)
        var name_decomposed = div.getAttribute("name").split("_");    
        var type = name_decomposed[0];
        console.log(type);

    //on adapte les actions possible
        switch(div.classType.value){
            case "text":
                //Dans le cas TEXT
                break;
            case "textArea":
                //Dans le cas TextArea
                break;
            case "inputText":
                //Dans le cas de inputText
                break;
            case "checkbox":
                //Dans le cas de checkbox
                break;
            case "radio":
                //Dans le cas de radio
                break;
            case "select":
                //Dans le cas de select
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
