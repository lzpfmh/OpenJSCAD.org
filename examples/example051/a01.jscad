include("a02.jscad");

n = 10;

a01 = function() { 
   return a02.b().translate([a01.b(1),0,0]); 
};

a01.b = function(n) {     
   return n*2;
}

