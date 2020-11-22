
/*1      . Se quiere saber si el Area sanitaria de la Sierra de Cadiz ha sobrepasado la cifra de los 2600 contagios*/

db.covid.find({
    $and:[
    {"Covid-19 affected":{$elemMatch:{Total: {$gt:2600}}}},
    {"Sanitary District": {$eq:"Sierra de Cádiz"}}]}
    );
/*{ "_id" : 1014, "Province" : "Cádiz", "Sanitary District" : "Sierra de Cádiz", "Day" : ISODate("2020-11-17T23:00:00Z"), "Covid-19 affected" : [ { "Total" : 2602, "Fatalities" : 50, "Recovered" : 808 } ], "Population(x110)" : 115, "CovidRate" : 732.4, "AboveSpanishAverage" : true }
{ "_id" : 1025, "Province" : "Cádiz", "Sanitary District" : "Sierra de Cádiz", "Day" : ISODate("2020-11-18T23:00:00Z"), "Covid-19 affected" : [ { "Total" : 2657, "Fatalities" : 50, "Recovered" : 822 } ], "Population(x110)" : 115, "CovidRate" : 724.7, "AboveSpanishAverage" : true }*/


/*2      . Se quiere saber que distritos sanitarios han sobrepasado la cifra de los 5600 contagios y estan por encima de la media nacional de 
tasa de contagio*/

db.covid.find({
     $and:[
    {"Covid-19 affected":{$elemMatch:{Total: {$gt:5600}}}},
    {"AboveSpanishAverage": {$eq:true}}]}
 );

 /*{ "_id" : 113, "Province" : "Cádiz", "Sanitary District" : "Jerez-Costa Noroeste", "Day" : ISODate("2020-11-16T23:00:00Z"), "Covid-19 affected" : [ { "Total" : 5856, "Fatalities" : 118, "Recovered" : 1930 } ], "Population(x110)" : 341, "CovidRate" : 594.8, "AboveSpanishAverage" : true }
{ "_id" : 1013, "Province" : "Cádiz", "Sanitary District" : "Jerez-Costa Noroeste", "Day" : ISODate("2020-11-17T23:00:00Z"), "Covid-19 affected" : [ { "Total" : 6058, "Fatalities" : 119, "Recovered" : 1968 } ], "Population(x110)" : 341, "CovidRate" : 617.8, "AboveSpanishAverage" : true }*/



/*3      . De los reguistros llevados a cabo, se quiere saber cuantas muestras recogidas sobrepasan la media nacional de tasa de contagio*/

 db.covid.find( { "AboveSpanishAverage": {$eq:true} } ).count();

 /*7*/



 /*4       . Se quiere saber que pueblos estan siendo gobernados por el PSOE, pero limitandose el area de influencia que tiene 
 los intereses populares sobre el pescado, ya que posee propiedades muy beneficiosas de cara a la enfermedad*/



 db.caracteristica.find({$and:[
     {Mayor: {$eq: "PSOE"}},
     {Intereses:{$not:{$regex:/^P.*/}}
 }]});

/* { "_id" : 101, "Village/City" : "Alcala de los Gazules", "Population" : 5219, "PC" : 11180, "Mayor" : "PSOE", "Intereses" : [ "Jabalí en salsa", "Castillo de Alcalá de los Gazules" ] }
{ "_id" : 103, "Village/City" : "Benalup-CV", "Population" : 6929, "PC" : 11190, "Mayor" : "PSOE", "Intereses" : [ "Cocido de tagarninas", "Iglesia del Socorro" ] }
{ "_id" : 110, "Village/City" : "Pto Real", "Population" : 41627, "PC" : 11510, "Mayor" : "PSOE", "Intereses" : "iglesia San José" }
{ "_id" : 111, "Village/City" : "San Fernando", "Population" : 94979, "PC" : 11100, "Mayor" : "PSOE", "Intereses" : "Tortitas de camarones" }*/



/*5      . Se busca el estado de una Area sanitaria, que no es el Campo de Gibraltar, no tiene menos de 20000 hab ni sobrepasa la media
nacional de tasa de contagio de coronavirus a dia 18-11-2020 */


db.covid.find({$and:[{$nor:[{"Sanitary District": "Campo de Gibraltar"},
{"Population(x1000)":{$lt:200}},
{"AboveSpanishAverage": {$eq:true}}
]},
{"Day" : {$gt: new Date ("2020-11-18")}},
{"Sanitary District":{$exists:true}}
]
});

/*{ "_id" : 1022, "Province" : "Cádiz", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-18T23:00:00Z"), 
"Covid-19 affected" : [ { "Total" : 6807, "Fatalities" : 104, "Recovered" : 3036 } ], "Population(x110)" : 512, "CovidRate" : 264.2, 
"AboveSpanishAverage" : false }*/




/*6     .Se busca los pueblos que empiecen por Pto pero que su numero de indentificacion no sea 110*/

db.caracteristica.find({$and:[{"Village/City":{$regex:/^Pto/}},
{"_id":{$not: {$eq:110}}}]
});

/*{ "_id" : 109, "Village/City" : "Pto de Santa María", "Population" : 88405, "PC" : 11500, 
"Mayor" : "PP", "Intereses" : [ "Tortita de camarones", "Iglesia Mayor Prioral" ] }*/



/*7    .Se quiere saber el numero de fallecidos del Area sanitaria de Bahia de cadiz-Lajanda en el dia 18-11-2020 y donde ocurrió*/

db.pueblo.find({$and:[{"Day" : {$gt: new Date ("2020-11-18")}},
{Fatalities: {$ne: 0}}
]});

/*{ "_id" : 3005, "Location" : "Chiclana de la Fra.", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-18T23:00:00Z"),
 "Total" : 14, "Fatalities" : 1, "Recovered" : 4, "Population(x1000)" : 84.4, "CovidRate" : 259.2, "AboveSpanishAverage" : false }*/



 /*8      .Se quiere buscar en los Id menores a 1012 los pueblos que no empiezan por B y cuya tasa de contagio sea mayor a 250.0*/

db.pueblo.find({$and:[{"_id":{$lte:1012}},{"Location":{$not:/^B/}},{"CovidRate": {$gte:250.0}}]});

/*{ "_id" : 1004, "Location" : "Cádiz", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 1513, "Fatalities" : 14, "Recovered" : 646, "Population(x1000)" : 116, "CovidRate" : 276.7, "AboveSpanishAverage" : false }
{ "_id" : 1005, "Location" : "Chiclana de la Fra.", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 954, "Fatalities" : 22, "Recovered" : 420, "Population(x1000)" : 84.4, "CovidRate" : 278.1, "AboveSpanishAverage" : false }
{ "_id" : 1008, "Location" : "Paterna de Rivera", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 116, "Fatalities" : 1, "Recovered" : 79, "Population(x1000)" : 5.4, "CovidRate" : 420.5, "AboveSpanishAverage" : false }
{ "_id" : 1009, "Location" : "Pto de Santa María", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 1448, "Fatalities" : 24, "Recovered" : 556, "Population(x1000)" : 88.4, "CovidRate" : 319, "AboveSpanishAverage" : false }
{ "_id" : 1012, "Location" : "Vejer de la Fra", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 149, "Fatalities" : 1, "Recovered" : 68, "Population(x1000)" : 12.6, "CovidRate" : 372.3, "AboveSpanishAverage" : false }*/


/*9     . Se quiere saber que pueblos tienen aun menos de 100 hab contagiados desde el id 1000 al 1013*/

db.pueblo.find({"Total": {$lte:100}}).min({"_id":1000}).max({"_id":1013}).hint({"_id":1});

/*{ "_id" : 1001, "Location" : "Alcala de los Gazules", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 52, "Fatalities" : 0, "Recovered" : 31, "CovidRate" : 229.9, "AboveSpanishAverage" : false }
{ "_id" : 1003, "Location" : "Benalup-CV", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 28, "Fatalities" : 0, "Recovered" : 11, "Population(x1000)" : 6.9, "CovidRate" : 86.6, "AboveSpanishAverage" : false }
{ "_id" : 1007, "Location" : "Medina Sidonia", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 70, "Fatalities" : 0, "Recovered" : 27, "Population(x1000)" : 11.7, "CovidRate" : 205, "AboveSpanishAverage" : false }*/



/*10         .Se quiere saber que distrito tiene mas de 1200 contagios y se han curado menos de 1500 personas, a dia del ultimo registro*/
db.covid.find({$and:[{"Covid-19 affected.Total":{$gte : 1200}},
{"Covid-19 affected.Recovered":{$lte : 1500}},
{"_id":{$gte:1021}}]});


/*{ "_id" : 1025, "Province" : "Cádiz", "Sanitary District" : "Sierra de Cádiz", "Day" : ISODate("2020-11-18T23:00:00Z"), "Covid-19 affected" 
: [ { "Total" : 2657, "Fatalities" : 50, "Recovered" : 822 } ], "Population(x110)" : 115, "CovidRate" : 724.7, "AboveSpanishAverage" : true }*/


/*11       .Media de la Tasa de contagio en los diferentes distritos sanitarios de la provincia de Cadiz en los 3 dias*/

db.covid.aggregate({$group:{_id:"$Sanitary District",
mediaTasa: {$avg:"$CovidRate"}}});


/*{ "_id" : "Jerez-Costa Noroeste", "mediaTasa" : 607.8333333333334 }
{ "_id" : "Bahía de Cádiz-La Janda", "mediaTasa" : 270.1666666666667 }
{ "_id" : "Campo de Gibraltar", "mediaTasa" : 454.0333333333333 }     
{ "_id" : null, "mediaTasa" : null }
{ "_id" : "Sierra de Cádiz", "mediaTasa" : 732.4333333333334 }*/

