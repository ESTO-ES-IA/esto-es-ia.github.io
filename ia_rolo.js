getRandom=(min, max)=>Math.random()*(max-min)+min;
maxZ=(x1,x2,x3,x4)=>8*x1+5*x2+3*x3+2*x4;

eq1=(x1,x2,x3,x4)=>7*x1+2*x2+5*x3<=59;
eq2=(x1,x2,x3,x4)=>3*x1       +3*x3+2*x4<=42;
eq3=(x1,x2,x3,x4)=>2*x1+3*x2+3*x3+4*x4<=115;
validEq=(x1,x2,x3,x4)=>(eq1(x1,x2,x3,x4)&&eq2(x1,x2,x3,x4)&&eq3(x1,x2,x3,x4));
generateRandom=()=>[getRandom(-100,100),getRandom(-60,80),getRandom(-40,90),getRandom(-20,100)];



var Gene = function(code) {
        if (code)
                this.code = code;
        this.cost = 9999;        
};

Gene.prototype.code = [0,0,0,0];
Gene.prototype.random = function() {
	var x1,x2,x3,x4;
		do
		{  
		  [x1,x2,x3,x4]=[getRandom(-100,100),getRandom(-60,80),getRandom(-40,90),getRandom(-20,100)];
		}while(!(eq1(x1,x2,x3,x4)&&eq2(x1,x2,x3,x4)&&eq3(x1,x2,x3,x4)));
        this.code=[x1,x2,x3,x4];
};

Gene.prototype.calcCost = function() {     
		var x1,x2,x3,x4;
		[x1,x2,x3,x4]=this.code;	           
        this.cost = maxZ(x1,x2,x3,x4);
};


Gene.prototype.mate = function(gene) {
	    var x1,x2,x3,x4,y1,y2,y3,y4,z1,z2,z3,z4;
		[x1,x2,x3,x4]=this.code;
		[y1,y2,y3,y4]=gene.code;

		[z1,z2,z3,z4]=[x1+y1,x2+y2,x3+y3,x4+y4];

		[z1,z2,z3,z4]=[z1/2,z2/2,z3/2,z4/2];
		if(validEq(z1,z2,z3,z4))
        	return [new Gene([z1,z2,z3,z4])];
        
        if(this.cost>gene.cost)
        	return [this];
        return [gene];
        
        	
};

Gene.prototype.mutate = function(chance) {
        if (Math.random()> chance)
            return;

        var index = Math.floor(Math.random()*this.code.length);
        var upOrDown = generateRandom()[index];
}



var Population = function(size) {
        this.members = [];
        //this.interactions = interactions;
        this.generationNumber = 0;
        for (var i = 0; i < size; i++){
                var gene = new Gene();
                gene.random();
                this.members.push(gene);
        };
};

Population.prototype.sort = function() {
        this.members.sort(function(a, b) {
                return -(a.cost - b.cost);
        });
}

Population.prototype.generation = function(interactions) {
	for(var j=0;j<interactions;j++){
	    for (var i = 0; i < this.members.length; i++) {
	        this.members[i].calcCost();
	    }
	    this.sort();	  
	    var children = this.members[0].mate(this.members[1]);
	    this.members.splice(this.members.length - 1, 1, children[0]);

	    for (var i = 0; i < this.members.length; i++) {
	        this.members[i].mutate(0.5);
	        this.members[i].calcCost();	        
	    }	    	    
	}
	this.sort();
	console.log(JSON.stringify(this.members[0]));
	this.generationNumber++;
};

/*
var population = new Population(1000);
population.generation(200);
*/
//{"cost":1489.9202621910854,"code":[99.26882294785523,49.07117625623492,89.9310218816253,90.31036584109651]}
//{"cost":1467.9051903338482,"code":[99.09989762678035,54.368249559861965,70.88245451235551,95.30869899161449]}

//{"cost":1578.9955236387702,"code":[95.0748361965561,71.2903799648603,89.16312838334036,97.22777454599931]}
//{"cost":1337.189302475877,"code":[86.52458530547477,68.11296566262118,51.945959466348484,74.29495665996382]}
//maxZ(95.12470083897179,27.187797059722413,62.78788285808045,8.779595351056532)



function monteCarlo(cant){
	currentZ=-10000;
	[xx1,xx2,xx3,xx4]=[0,0,0,0];

	for(var i=0;i<cant;i++){
		do
		{  
		  [x1,x2,x3,x4]=[getRandom(-100,100),getRandom(-60,80),getRandom(-40,90),getRandom(-20,100)];
		}while(!(eq1(x1,x2,x3,x4)&&eq2(x1,x2,x3,x4)&&eq3(x1,x2,x3,x4)));
		zz=maxZ(x1,x2,x3,x4);
		if (currentZ<zz)
		{
			currentZ=zz;
			[xx1,xx2,xx3,xx4]=[x1,x2,x3,x4];
		}
	}
}
//monteCarlo(5000);
///console.log({currentZ:currentZ,sol:[xx1,xx2,xx3,xx4]});


