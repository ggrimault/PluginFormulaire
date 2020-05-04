export default class objectFormulaire{

    //Constructeur
        constructor(id, name, type){
    
            this.setUpperType = type;
    
            this.element = document.createElement(this.getUpperType);
    
            this.setId = id;
            this.setName = name;
    
            if(this.getUpperType != "select") {
                this.setType = type;
            }
            
            this.activated = true;
    
            this.parameter = new Array();
            this.dependance = new Array();
    
            return this.element;
        }
        
    
    //Setters
    
        set setId(id){
            this.element.id = id;
        }
    
        set setName(name){
            this.element.name = name;
        }
    
        set setUpperType(type){
            var choosen;
            if ( type == "text"){
                choosen = "text";
            } else if ( type == "select" ){
                choosen = "select";
            } else {
                choosen = "input";
            }
            this.upperType = choosen;
        }
    
        set setType(type){
            this.element.type = type;
        }
        
        switchActivated(){
            if(this.activated == true){
                this.activated = false;
            } else {
                this.activated = true;
            }
        }
    
    
    //Getters
        get getId(){
            return this.element.id;
        }
    
        get getName(){
            return this.element.name;
        }
    
        get getType(){
            return this.element.type;
        }
    
        get getUpperType(){
            return this.upperType;
        }
    
        get isActivated(){
            return this.activated;
        }
    
    }