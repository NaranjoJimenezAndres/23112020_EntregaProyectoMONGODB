/*1   .Se quieren agrupar los partidos politicos que gobiernan en los diferentes pueblos de la zona Bahia de Cadiz - La Janda. Para ello 
la instruccion $group para agrupar los pueblos en los distintos grupos politicos que gobiernan la zona*/

db.caracteristica.aggregate([
    {$group:{_id:"$Mayor"}}
]);

/*{ "_id" : "PSOE" }
{ "_id" : "IU" }
{ "_id" : "PP" }
{ "_id" : "Adelante Andalucia" }
{ "_id" : "AxSí" }*/





/*2       .Se quiere saber la situación de la capital de provincia en los 3 dias que se han tomado el muestreo de datos. Se comprueba que el operador
$match hace su funcion  */

db.pueblo.aggregate([
    {$match: {"Location": "Cádiz"}}
]);

/*{ "_id" : 1004, "Location" : "Cádiz", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-16T23:00:00Z"), "Total" : 1513, "Fatalities" : 14, "Recovered" : 646, "Population(x1000)" : 116, "CovidRate" : 276.7, "AboveSpanishAverage" : false }
{ "_id" : 2004, "Location" : "Cádiz", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-17T23:00:00Z"), "Total" : 30, "Fatalities" : 14, "Recovered" : 6, "Population(x1000)" : 116, "CovidRate" : 286.1, "AboveSpanishAverage" : false }
{ "_id" : 3004, "Location" : "Cádiz", "Sanitary District" : "Bahía de Cádiz-La Janda", "Day" : ISODate("2020-11-18T23:00:00Z"), "Total" : 18, "Fatalities" : 0, "Recovered" : 8, "Population(x1000)" : 116, "CovidRate" : 283.6, "AboveSpanishAverage" : false }*/




/*3    .Para el informe se quiere saber la cifra de muertos que hay hasta el momento de coronavirus en los pueblos que conforman el distrito
sanitario de la Bahia de Cadiz- La Janda. Para realizar la suma se usa el operador $sum */

db.pueblo.aggregate([
    {$group: {_id: "$Location", muertes: {$sum:"$Fatalities"}}}

]);

/*{ "_id" : "Benalup-CV", "muertes" : 0 }
{ "_id" : "Cádiz", "muertes" : 28 }
{ "_id" : "Alcala de los Gazules", "muertes" : 0 }
{ "_id" : "Conil de la Fra.", "muertes" : 4 }
{ "_id" : "Chiclana de la Fra.", "muertes" : 24 }
{ "_id" : "Paterna de Rivera", "muertes" : 2 }
{ "_id" : "Barbate", "muertes" : 4 }
{ "_id" : "Medina Sidonia", "muertes" : 0 }
{ "_id" : "Pto de Santa María", "muertes" : 48 }
{ "_id" : "San Fernando", "muertes" : 52 }
{ "_id" : "Pto Real", "muertes" : 8 }
{ "_id" : "Vejer de la Fra.", "muertes" : 2 }*/



/*4         .Al tener un array dentro de la coleccion estadistica, interesa pasar todo a tipo documento para el posterior tratamiento
de la información, para ello se una el operador $unwind */

db.caracteristica.aggregate([
    {$unwind:"$Intereses"}
]);

/*{ "_id" : 101, "Village/City" : "Alcala de los Gazules", "Population" : 5219, "PC" : 11180, "Mayor" : "PSOE", "Intereses" : "Jabalí en salsa" }
{ "_id" : 101, "Village/City" : "Alcala de los Gazules", "Population" : 5219, "PC" : 11180, "Mayor" : "PSOE", "Intereses" : "Castillo de Alcalá de los Gazules" }
{ "_id" : 102, "Village/City" : "Barbate", "Population" : 22518, "PC" : 11160, "Mayor" : "AxSí", "Intereses" : "Mojama" }
{ "_id" : 102, "Village/City" : "Barbate", "Population" : 22518, "PC" : 11160, "Mayor" : "AxSí", "Intereses" : "Torre Trafalgar" }
{ "_id" : 103, "Village/City" : "Benalup-CV", "Population" : 6929, "PC" : 11190, "Mayor" : "PSOE", "Intereses" : "Cocido de tagarninas" }       
{ "_id" : 103, "Village/City" : "Benalup-CV", "Population" : 6929, "PC" : 11190, "Mayor" : "PSOE", "Intereses" : "Iglesia del Socorro" }        
{ "_id" : 104, "Village/City" : "Cádiz", "Population" : 116027, "PC" : 11000, "Mayor" : "Adelante Andalucia", "Intereses" : "Pescaito" }        
{ "_id" : 104, "Village/City" : "Cádiz", "Population" : 116027, "PC" : 11000, "Mayor" : "Adelante Andalucia", "Intereses" : "Casas-Palacio" }   
{ "_id" : 105, "Village/City" : "Chiclana de la Fra.", "Population" : 85556, "PC" : 11130, "Mayor" : "PSOE", "Intereses" : "Pescaito Frito" }   
{ "_id" : 105, "Village/City" : "Chiclana de la Fra.", "Population" : 85556, "PC" : 11130, "Mayor" : "PSOE", "Intereses" : "Torre de Guzman" }  
{ "_id" : 106, "Village/City" : "Conil de la Fra.", "Population" : 22529, "PC" : [ 11140, 11149 ], "Mayor" : "IU", "Intereses" : "Pescaito Frito" }
{ "_id" : 106, "Village/City" : "Conil de la Fra.", "Population" : 22529, "PC" : [ 11140, 11149 ], "Mayor" : "IU", "Intereses" : "Novo Sancti Petri" }
{ "_id" : 107, "Village/City" : "Medina Sidonia", "Population" : 11708, "PC" : 11170, "Mayor" : "IU", "Intereses" : "Mantecado" }
{ "_id" : 107, "Village/City" : "Medina Sidonia", "Population" : 11708,  "PC" : 11170, "Mayor" : "IU", "Intereses" : "Castillo Medina Sidonia" } 
{ "_id" : 108, "Village/City" : "Paterna de Rivera", "Population" : 5470, "PC" : 11178, "Mayor" : "AxSí", "Intereses" : "Caracoles" }
{ "_id" : 108, "Village/City" : "Paterna de Rivera", "Population" : 5470, "PC" : 11178, "Mayor" : "AxSí", "Intereses" : "Torre Cuatro Vientos" }
{ "_id" : 109, "Village/City" : "Pto de Santa María", "Population" : 88405, "PC" : 11500, "Mayor" : "PP", "Intereses" : "Tortita de camarones" }
{ "_id" : 109, "Village/City" : "Pto de Santa María", "Population" : 88405, "PC" : 11500, "Mayor" : "PP", "Intereses" : "Iglesia Mayor Prioral" }
{ "_id" : 110, "Village/City" : "Pto Real", "Population" : 41627, "PC" : 11510, "Mayor" : "PSOE", "Intereses" : "iglesia San José" }
{ "_id" : 111, "Village/City" : "San Fernando", "Population" : 94979, "PC" : 11100, "Mayor" : "PSOE", "Intereses" : "Tortitas de camarones" }   
{ "_id" : 112, "Village/City" : "Vejer de la Fra", "Population" : 12624, "PC" : 11150, "Mayor" : "PP", "Intereses" : "Carne al toro" }
{ "_id" : 112, "Village/City" : "Vejer de la Fra", "Population" : 12624, "PC" : 11150, "Mayor" : "PP", "Intereses" : "Torre del Mayorazgo" } */

/*5    . Se quiere saber la poblacion de Cadiz y como va evolucionando la tasa de contagio a lo largo de los dias. Union de colecciones
caracteristica y pueblo por medio de $lookup*/

db.caracteristica.aggregate([
    { "$match": { "Village/City": "Cádiz" } },
    
    
    { "$lookup": {
      "localField": "Village/City",
      "from": "pueblo",
      "foreignField": "Location",
      "as": "myArray"
    } },
    {
        $unwind: "$myArray"
    },
    { $project : 
        { 
            "Village/City": 1, Tasa: "$myArray.CovidRate", Population: 1 , Day: "$myArray.Day"
        } 
    }
    
    
  ]).pretty()

/*{
        "_id" : 104,
        "Village/City" : "Cádiz",
        "Population" : 116027,
        "Tasa" : 276.7,
        "Day" : ISODate("2020-11-16T23:00:00Z")
}
{
        "_id" : 104,
        "Village/City" : "Cádiz",
        "Population" : 116027,
        "Tasa" : 286.1,
        "Day" : ISODate("2020-11-17T23:00:00Z")
}
{
        "_id" : 104,
        "Village/City" : "Cádiz",
        "Population" : 116027,
        "Tasa" : 283.6,
        "Day" : ISODate("2020-11-18T23:00:00Z")
}*/



/*6       . Se requiere saber la situacion de las ciudades y pueblos mas habitados de la comarca(>50000 hab.),
 tasa de contagio, Nº hab, dia y responsable politico*/

db.caracteristica.aggregate([
    { "$match": { "Population": {$gte : 50000} } },
    
    
    { "$lookup": {
      "localField": "Village/City",
      "from": "pueblo",
      "foreignField": "Location",
      "as": "myArray"
    } },
    {
        $unwind: "$myArray"
    },
    { $project : 
        { 
            "Village/City": 1, Tasa: "$myArray.CovidRate", Population: 1 , Day: "$myArray.Day", "Mayor": 1,
        } 
    }
    
    
  ]).pretty()

/*"_id" : 104,
        "Village/City" : "Cádiz",
        "Population" : 116027,
        "Mayor" : "Adelante Andalucia",
        "Tasa" : 276.7,
        "Day" : ISODate("2020-11-16T23:00:00Z")
}
{
        "_id" : 104,
        "Village/City" : "Cádiz",
        "Population" : 116027,
        "Mayor" : "Adelante Andalucia",
        "Tasa" : 286.1,
        "Day" : ISODate("2020-11-17T23:00:00Z")
}
{
        "_id" : 104,
        "Village/City" : "Cádiz",
        "Population" : 116027,
        "Mayor" : "Adelante Andalucia",
        "Tasa" : 283.6,
        "Day" : ISODate("2020-11-18T23:00:00Z")
}
{
        "_id" : 105,
        "Village/City" : "Chiclana de la Fra.",
        "Population" : 85556,
        "Mayor" : "PSOE",
        "Tasa" : 278.1,
        "Day" : ISODate("2020-11-16T23:00:00Z")
}
{
        "_id" : 105,
        "Village/City" : "Chiclana de la Fra.",
        "Population" : 85556,
        "Mayor" : "PSOE",
        "Tasa" : 288.8,
        "Day" : ISODate("2020-11-17T23:00:00Z")
}
{
        "_id" : 105,
        "Village/City" : "Chiclana de la Fra.",
        "Population" : 85556,
        "Mayor" : "PSOE",
        "Tasa" : 259.2,
        "Day" : ISODate("2020-11-18T23:00:00Z")
}
{
        "_id" : 109,
        "Village/City" : "Pto de Santa María",
        "Population" : 88405,
        "Mayor" : "PP",
        "Tasa" : 319,
        "Day" : ISODate("2020-11-16T23:00:00Z")
}
{
        "_id" : 109,
        "Village/City" : "Pto de Santa María",
        "Population" : 88405,
        "Mayor" : "PP",
        "Tasa" : 317.9,
        "Day" : ISODate("2020-11-17T23:00:00Z")
}
{
        "_id" : 109,
        "Village/City" : "Pto de Santa María",
        "Population" : 88405,
        "Mayor" : "PP",
        "Tasa" : 286.2,
        "Day" : ISODate("2020-11-18T23:00:00Z")
}
{
        "_id" : 111,
        "Village/City" : "San Fernando",
        "Population" : 94979,
        "Mayor" : "PSOE",
        "Tasa" : 245.3,
        "Day" : ISODate("2020-11-16T23:00:00Z")
}
{
        "_id" : 111,
        "Village/City" : "San Fernando",
        "Population" : 94979,
        "Mayor" : "PSOE",
        "Tasa" : 240.1,
        "Day" : ISODate("2020-11-17T23:00:00Z")
}
{
        "_id" : 111,
        "Village/City" : "San Fernando",
        "Population" : 94979,
        "Mayor" : "PSOE",
        "Tasa" : 235.8,
        "Day" : ISODate("2020-11-18T23:00:00Z")*/



/*7          . situacion detallada (tasa de contagio, dia, muerte, infectados) de los pueblos de mas de 50000 hab y con un 
codigo postal mayor a 11160*/


  db.caracteristica.aggregate([
    { "$match": {$and :[{"Population": {$gte : 50000} },
    {"PC": {$gt: 11160}}]}},
    
    
    { "$lookup": {
      "localField": "Village/City",
      "from": "pueblo",
      "foreignField": "Location",
      "as": "myArray"
    } },
    {
        $unwind: "$myArray"
    },
    { $project : 
        { 
            "Village/City": 1, Tasa: "$myArray.CovidRate", Population: 1 , Day: "$myArray.Day", muertes: "$myArray.Fatalities", infectados: "$myArray.Total"
        } 
    }
    
    
  ]).pretty()

  /*"_id" : 109,
        "Village/City" : "Pto de Santa María",
        "Population" : 88405,
        "Tasa" : 319,
        "Day" : ISODate("2020-11-16T23:00:00Z"),
        "muertes" : 24,
        "infectados" : 1448
}
{
        "_id" : 109,
        "Village/City" : "Pto de Santa María",
        "Population" : 88405,
        "Tasa" : 317.9,
        "Day" : ISODate("2020-11-17T23:00:00Z"),
        "muertes" : 24,
        "infectados" : 10
}
{
        "_id" : 109,
        "Village/City" : "Pto de Santa María",
        "Population" : 88405,
        "Tasa" : 286.2,
        "Day" : ISODate("2020-11-18T23:00:00Z"),
        "muertes" : 0,
        "infectados" : 4*/


/* 8           . Debido a los problemas de Barbate se requiere saber toda la informacion recogida en esta base de
datos sobre este pueblo al dia de 17-11-2020*/

db.pueblo.aggregate([
 { "$match": {$and :[{"Location": "Barbate" },
   {
    "Day" : {$lt: new Date ("2020-11-17")}
      }]}},
            
            
 { "$lookup": {
     "localField": "Location",
      "from": "caracteristica",
      "foreignField": "Village/City",
      "as": "myArray"
            } 
        },
         {
            $unwind: "$myArray"
         },
         ]).pretty()


/*"_id" : 1002,
        "Location" : "Barbate",
        "Sanitary District" : "Bahía de Cádiz-La Janda",
        "Day" : ISODate("2020-11-16T23:00:00Z"),
        "Total" : 297,
        "Fatalities" : 3,
        "Recovered" : 141,
        "Population(x1000)" : 22.5,
        "CovidRate" : 355.3,
        "AboveSpanishAverage" : false,
        "myArray" : {
                "_id" : 102,
                "Village/City" : "Barbate",
                "Population" : 22518,
                "PC" : 11160,
                "Mayor" : "AxSí",
                "Intereses" : [
                        "Mojama",
                        "Torre Trafalgar"
                ]
        }
}*/


/*9         .Se necesita buscar en la BD los pueblos que acaban en al y su situación a dia 18-11-2020*/

db.pueblo.aggregate([
 { "$match": {
 $and :[{"Location": {$regex:/al$/ }},
  {"Day" : {$gt: new Date ("2020-11-18")}}, 
     {"Day" :{$lt: new Date ("2020-11-19")}}
      ]
      }},
            
            
     { "$lookup": {
      "localField": "Location",
      "from": "caracteristica",
     "foreignField": "Village/City",
    "as": "myArray"
            } 
        },
         {
            $unwind: "$myArray"
        },
            
            
            
 ]).pretty()


/*
{
        "_id" : 3010,
        "Location" : "Pto Real",
        "Sanitary District" : "Bahía de Cádiz-La Janda",
        "Day" : ISODate("2020-11-18T23:00:00Z"),
        "Total" : 4,
        "Fatalities" : 0,
        "Recovered" : 0,
        "Population(x1000)" : 41.6,
        "CovidRate" : 201.8,
        "AboveSpanishAverage" : false,
        "myArray" : {
                "_id" : 110,
                "Village/City" : "Pto Real",
                "Population" : 41627,
                "PC" : 11510,
                "Mayor" : "PSOE",
                "Intereses" : "iglesia San José"
        }
}

*/


/*10.     Despues de todos los rumores de expansion del virus, se quiere precisar que pueblo sobrepasa la media nacional de tasa de contagio en el area sanitaria
bahia de cadiz-La janda a dia 18-11-2020*/

 db.pueblo.aggregate([
 { "$match": {
      $and :[{"AboveSpanishAverage": true },
      {"Day" : {$gt: new Date ("2020-11-18")}}, 
     {"Day" :{$lt: new Date ("2020-11-19")}}
             ]
        }},
            
            
{ "$lookup": {
  "localField": "Location",
 "from": "caracteristica",
"foreignField": "Village/City",
 "as": "myArray"
            } 
        },
 {
     $unwind: "$myArray"
 },
            
            
            
 ]).pretty()
        
  /*"_id" : 3008,
 "Location" : "Paterna de Rivera",
 "Sanitary District" : "Bahía de Cádiz-La Janda",
 "Day" : ISODate("2020-11-18T23:00:00Z"),
 "Total" : 0,
  "Fatalities" : 0,
  "Recovered" : 0,
 "Population(x1000)" : 5.4,
 "CovidRate" : 511.9,
 "AboveSpanishAverage" : true,
 "myArray" : {
          "_id" : 108,
          "Village/City" : "Paterna de Rivera",
          "Population" : 5470,
         "PC" : 11178,
          "Mayor" : "AxSí",
         "Intereses" : [
               "Caracoles",
                "Torre Cuatro Vientos"
                        ]
                }*
        }*/

