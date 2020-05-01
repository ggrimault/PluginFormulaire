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
