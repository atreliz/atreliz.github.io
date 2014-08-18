'use strict';

angular.module('GIApp')
  .controller('example1Ctrl', function ($scope) {

		/*----- BAR CHART ------*/
  				$scope.optionsBAR = {
				    chart: {
				        type: 'discreteBarChart',
				        height: 450,
				        margin : {
				            top: 20,
				            right: 20,
				            bottom: 60,
				            left: 55
				        },
				        x: function(d){ return d.label; },
				        y: function(d){ return d.value; },
				        showValues: true,
				        valueFormat: function(d){
				            return d3.format(',.4f')(d);
				        },
				        transitionDuration: 500,
				        xAxis: {
				            axisLabel: 'X Axis'
				        },
				        yAxis: {
				            axisLabel: 'Y Axis',
				            axisLabelDistance: 30
				        }
				    }
				};

  				$scope.dataBAR = [{
				    key: "Cumulative Return",
				    values: [
				        { "label" : "A" , "value" : -29.765957771107 },
				        { "label" : "B" , "value" : 50 },
				        { "label" : "C" , "value" : 32.807804682612 },
				        { "label" : "D" , "value" : 196.45946739256 },
				        { "label" : "E" , "value" : 20.19434030906893 },
				        { "label" : "F" , "value" : -98.079782601442 },
				        { "label" : "G" , "value" : -13.925743130903 },
				        { "label" : "H" , "value" : -5.1387322875705 },
				        { "label" : "I" , "value" : 5 },
				        { "label" : "J" , "value" : 62.807804682612 },
				        { "label" : "K" , "value" : 16.45946739256 },
				        { "label" : "L" , "value" : 6.19434030906893 },
				    ]
				}];

  				$scope.BARValues=JSON.stringify($scope.dataBAR[0].values, null, 2);
  				console.info($scope.dataBAR);

  				$scope.cambiarBAR = function(newValues) {

					$scope.dataBAR = [{
					    key: "Cumulative Return",
					    values:JSON.parse(newValues, null, 2)
					    }];
			    };


  		/*----- PIE CHART ------*/

		$scope.optionsPIE = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                transitionDuration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.dataPIE = [
            { key: "One",    y: 5   },
            { key: "Two",    y: 2   },
            { key: "Three",  y: 9   },
            { key: "Four",   y: 7   },
            { key: "Five",   y: 4   },
            { key: "Six",    y: 3   },
            { key: "Seven",  y: .5  }
        ];
			$scope.PIEValues=JSON.stringify($scope.dataPIE, null, 2);
			console.info($scope.dataPIE);

		    $scope.cambiarPIE = function(pieNewValues) {
		    	$scope.dataPIE = JSON.parse(pieNewValues, null, 2);
		    	console.log(pieNewValues);
		    };

  })
//---scatterChartCtrl
  .controller('example2Ctrl', function ($scope) {

  				$scope.optionsscatterChart = {
		            chart: {
		                type: 'scatterChart',
		                height: 450,
		                color: d3.scale.category10().range(),
		                scatter: {
		                    onlyCircles: true
		                },
		                showDistX: true,
		                showDistY: true,
		                tooltipContent: function(key) {
		                    return '<h3>' + key + '</h3>';
		                },
		                transitionDuration: 350,
		                xAxis: {
		                    axisLabel: 'X Axis',
		                    tickFormat: function(d){
		                        return d3.format('.02f')(d);
		                    }
		                },
		                yAxis: {
		                    axisLabel: 'Y Axis',
		                    tickFormat: function(d){
		                        return d3.format('.02f')(d);
		                    },
		                    axisLabelDistance: 50
		                }
		            }
		        };



		        //$scope.datascatterChart = $scope.generateData(4,40);

		        /* Random Data Generator (took from nvd3.org) */
		         $scope.generateData =function(SCgroups, SCpoints){
		         	var groups= SCgroups ? SCgroups:4;
		         	var points= SCpoints ? SCpoints:400;
		            var data = [],
		                //shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
		                shapes = ['circle'],
		                random = d3.random.normal();

		            for (var i = 0; i < groups; i++) {
		                data.push({
		                    key: 'Group ' + i,
		                    values: []
		                });

		                for (var j = 0; j < points; j++) {
		                    data[i].values.push({
		                        x: random()
		                        , y: random()
		                        , size: Math.random()
		                        , shape: shapes[j % 6]
		                    });
		                }
		            }
		            //return data;
		            $scope.datascatterChart=data;
		            $scope.newData=[];

		            for (var i=0;i<data.length;i++){
		            	$scope.newData[i]=JSON.stringify(data[i], null, 2);//data[i];
		            }

		            //console.log($scope.newData);
		            //$scope.datascatterChartTextarea=JSON.stringify(data, null, 2);
		        }

		        $scope.generateData(4,40);
		        

		        /*$scope.$watch('newData', function (oldValue, newValue) {
				    console.log(oldValue, newValue);
				});*/


				    $scope.cambiarScatter = function(ChangedData) {
				    	//console.info(ChangedData);
				    	//console.info(ChangedData.length);
				    	var renewData=[];
				    	for(var i=0;i<ChangedData.length;i++){
				    		renewData.push(JSON.parse(ChangedData[i]));
				    	}
				    	$scope.datascatterChart = renewData;//JSON.parse(newData, null, 2);
				    	
				    };

  })
  .controller('example3Ctrl', function ($scope) {

	  	var fullDataPerDay=[
			    {
			        day: "2012-01-01",
			        key: "2012-01-01",
			        values: [
			            {"label":"ES","value": 3},
			            {"label":"FR","value": 5},
			            {"label":"US","value": 2},
			            {"label":"UK","value": 8},
			            {"label":"GE","value": 1}
			        ]
			    },
			   {
			        day: "2012-01-02",
			        key: "2012-01-02",
			        values: [
			            {"label":"ES","value": 30},
			            {"label":"FR","value": 40},
			            {"label":"US","value": 20},
			            {"label":"UK","value": 80},
			            {"label":"GE","value": 50}
			        ]
			    },
			    {
			        day: "2012-01-03",
			        key: "2012-01-03",
			        values: [
			            {"label":"ES","value": 20},
			            {"label":"FR","value": 60},
			            {"label":"US","value": 70},
			            {"label":"UK","value": 20},
			            {"label":"GE","value": 90}
			        ]
			    },
			    {
			        day: "2012-01-04",
			        key: "2012-01-04",
			        values: [
			            {"label":"ES","value": 30},
			            {"label":"FR","value": 20},
			            {"label":"US","value": 50},
			            {"label":"UK","value": 90},
			            {"label":"GE","value": 20}
			        ]
			    },
			    {
			        day: "2012-01-05",
			        key: "2012-01-05",
			        values: [
			            {"label":"ES","value": 50},
			            {"label":"FR","value": 40},
			            {"label":"US","value": 70},
			            {"label":"UK","value": 80},
			            {"label":"GE","value": 20}
			        ]
			    },
	    ];

	    /* 1 -- BAR CHART Date changing per time -- */

		//calculate size= number of dates
	    $scope.daysSize=fullDataPerDay.length;
	    console.log("$scope.daysSize: "+$scope.daysSize);

	    //Load last date
	    var lastDate=fullDataPerDay[ $scope.daysSize-1].day;
	    var lastDatePosition= $scope.daysSize-1;
		console.log("LOAD LAST DAY: "+lastDatePosition);

	    $scope.choosenDate=fullDataPerDay[ $scope.daysSize-1].day;
	    console.log("$scope.choosenDate: "+$scope.choosenDate);

	     //Load all dates on scope
	    $scope.fullDataPerDay=fullDataPerDay;
  		$scope.BARValues=JSON.stringify($scope.fullDataPerDay, null, 2);




	    		/*----- BAR CHART ------*/


  				$scope.optionsPerDay = {
				    chart: {
				        type: 'discreteBarChart',
				        height: 450,
				        margin : {
				            top: 20,
				            right: 20,
				            bottom: 60,
				            left: 100
				        },
				         dispatch: { //on events
				         	beforeUpdate: function(e){ console.log("beforeUpdate");  console.log(e);},
		                    stateChange: function(e){ console.log("stateChange");    console.log(e);},
		                    changeState: function(e){ console.log("changeState");    console.log(e);},
		                    tooltipShow: function(e){ console.log("tooltipShow");    console.log(e);},
		                    tooltipHide: function(e){ console.log("tooltipHide");    console.log(e);},
		                    brush: function(e){ console.log("brush");                console.log(e);}
		                },
				        x: function(d){ return d.label; },
				        y: function(d){ return d.value; },
				        showValues: true,
				        tooltips:false,
				        tooltipContent:function ( key,x,y,e,graph) { //on tooltip
					        return '<h3>' + x + '</h3>' +
					               '<p>' +  y + '</p>'+
					               '<p>' +  key + '</p>'+
					               '<p>' +  e + '</p>'+
					               '<p>' +  graph + '</p>'
					     },
				        valueFormat: function(d){
				            return d;//d3.format(',2d')(d);
				        },
				        transitionDuration: 300,
				        xAxis: {
				            axisLabel: 'Countries'
				        },
				        yAxis: {
				            axisLabel: 'Visitors',
				            axisLabelDistance: 1
				        },
				        callback: function(chart){
		                    console.log("!!!callback ath Chart Done!!!");
		                    d3.selectAll(".nv-bar").on('click', function(e){
					            console.info("click done!"+$scope.dataPerDay.length);
					            console.info(e);
					            console.info($scope.dataPerDay[0].values);
					            
								for(var u=0;u<$scope.dataPerDay[0].values.length;u++){
									console.info("************");
									console.info($scope.dataPerDay[0].values[u]);
									if($scope.dataPerDay[0].values[u].label==e.label){
										//alert(u);
										$("#chart2 .nv-group.nv-series-"+u).toggle();
									}

								}

					            //$("#chart2 .nv-group.nv-series-"+u).toggle();
					            //$("#chart2 ").toggle();
					        });
		                }
				    }
				};




		//change data on bar chart
			$scope.loadData = function(datePosition) {
				console.log("LOAD: "+datePosition);
				$scope.choosenDatePos=datePosition;
				$scope.choosenDate=fullDataPerDay[datePosition].day;
		    	$scope.dataPerDay=new Array(fullDataPerDay[datePosition]);//Needs to be an array
		    	$scope.dataPerDaySTR=JSON.stringify($scope.dataPerDay, null, 1);
		    	console.log($scope.dataPerDay);
		    	
		    };


			//Start loading Data
		    $scope.loadData(lastDatePosition);





		    /* 2 -- BAR CHART ALL DATA AT THE SAME TIME, grouped by countries -- */
		      	$scope.optionsAllDates = {
				    chart: {
				        type: 'multiBarChart',
				        height: 450,
				        margin : {
				            top: 20,
				            right: 20,
				            bottom: 60,
				            left: 100
				        },
				        x: function(d){ return d.label; },
				        y: function(d){ return d.value; },
				        showValues: true,
				        valueFormat: function(d){
				            return d;//d3.format(',2d')(d);
				        },
				        transitionDuration: 300,
				        xAxis: {
				            axisLabel: 'Countries'
				        },
				        yAxis: {
				            axisLabel: 'Visitors',
				            axisLabelDistance: 1
				        }
				    }
				};
		    $scope.dataAllDates=fullDataPerDay;
		    console.info($scope.dataAllDates);



		    /*CHART LINE -- ALL DATA AT THE SAME TIME*/

		    $scope.optionsLineChart = {
	            chart: {
	                type: 'cumulativeLineChart',
	                height: 450,
	                margin : {
	                    top: 20,
	                    right: 20,
	                    bottom: 60,
	                    left: 65
	                },
	                x: function(d){ return d[0]; },
	                y: function(d){ return d[1]/100; },
	                //average: function(d) { return d.mean/100; },

	                //color: d3.scale.category10().range(),
	                transitionDuration: 300,
	                useInteractiveGuideline: true,
	                clipVoronoi: false,

	                xAxis: {
	                    axisLabel: 'Dates',
	                    tickFormat: function(d) {
	                        return d;//d3.format(',.1%')(d);
	                    },
	                    showMaxMin: false,
	                    staggerLabels: true
	                },

	                yAxis: {
	                    axisLabel: 'Countries',
	                    tickFormat: function(d){
	                        return d*100;//d3.format(',.1%')(d);
	                    },
	                    axisLabelDistance: 20
	                }
	            }
	        };


		//--Creating the data fron the other json
			var dataLineAllDates=[];

			//create main data structure
			//using first element to detect languages
			for(var j=0;j<fullDataPerDay[0].values.length;j++){
						dataLineAllDates.push( {"key":fullDataPerDay[0].values[j].label, "values":[ [0,0] ] } );

					}

			//looking for elements to fill the main data structure per language
			for(var i=0;i<fullDataPerDay.length;i++){
				
					console.log(fullDataPerDay[i].day);
					console.log(fullDataPerDay[i].values);
						



					for(var k=0;k<fullDataPerDay[i].values.length;k++){
						console.log(fullDataPerDay[i].values[k]);
						//console.log(fullDataPerDay[i].values[k].label);
						//console.log(fullDataPerDay[i].values[k].value);

							if(dataLineAllDates[k].key==fullDataPerDay[i].values[k].label){
								console.log(fullDataPerDay[i].day);
								//I nned this ugly trick because the format is not a date
								var date=parseInt(fullDataPerDay[i].day.replace("2012-01-0",""));

								//console.log(fullDataPerDay[i].values[k].label);
								//console.log(fullDataPerDay[i].values[k].value);
								dataLineAllDates[k].values.push( [date,fullDataPerDay[i].values[k].value]  );

							}
						
					
					}
				
					//dataLineAllDates.push(fullDataPerDay[i].values);
		    }
		    console.info(dataLineAllDates);
		   
		   $scope.dataLineChart=dataLineAllDates;
		   $scope.dataLineChartSTR=JSON.stringify(dataLineAllDates, null, 1);

			//example of data
	        /*$scope.dataLineChart = [
	            {
	                key: "ES",
	                values: [ [ 0 , 0], [ 1 , 2] , [ 2 , 4] , [ 3 ,1] , [ 4 , 2] , [ 5 , 1]   ]
	                ,
	                mean: 250
	            },
	            {
	                key: "FR",
	                values: [ [ 6 , 10.612245065736], [ 5 , -0.77078283705125] , [ 4 , -1.8356366650335] , [ 3 , -5.3121322073127] , [ 2 , -4.9320975829662] , [ 1 , -3.9835408823225]   ]
	                ,
	                mean: -60
	            },
	            {
	                key: "UK",
	                mean: 125,
	                values: [ [ 6 , 25.612245065736], [ 5 , -3.7454058855943] , [ 4 , -3.6096667436314] , [ 3 , -0.8440003934950]  , [ 2 , 3.5874194844361] , [ 1 , 13.742776534056]  ]
	            },
	            {
	                key: "US",
	                values: [ [ 6 , 7.612245065736], [ 5 , -1.7798428181819] , [ 4 , -0.36883324836999] , [ 3 , 1.7312581046040]  , [ 2 , -1.5396564170877] , [ 1 , -0.16867791409247] ]
	            } 
	        ];*/
	       
  })
//---Grapth
  .controller('example4Ctrl', function ($scope) {


		/*$scope.nodes=[
				{x:400,y:120,value:10,color:"red"},
				{x:100,y:100,value:10,color:"green"},
				{x:300,y:200,value:15,color:"blue"},
				{x:200,y:50,value:10,color:"pink"},
				{x:50,y:50,value:10,color:"pink"},
				{x:70,y:150,value:10,color:"pink"},
				{x:450,y:250,value:10,color:"pink"},
		];

		$scope.edges=[
				{x1:400,y1:120,x2:100,y2:100},
				{x1:300,y1:200,x2:200,y2:50},
				{x1:50,y1:50,x2:70,y2:150},
				{x1:450,y1:250,x2:70,y2:150},
		];

		$scope.Grafo={"nodes":$scope.nodes,"edges":$scope.edges};*/

		$scope.GrapthSize={"w":"800","h":"400"}
		//--Adding scale vertical and horizontal
		$scope.Wscale=[];
		$scope.Hscale=[];
		var line_each=10;

		//building rules
		for (var i=0;i<=$scope.GrapthSize.w/line_each;i++){
			$scope.Wscale.push(i*50);
		}

		for (var i=0;i<=$scope.GrapthSize.h/line_each;i++){
			$scope.Hscale.push(i*50);
		}

		$scope.showRule="show";





		var initGrafo={
			"nodes":
					[
						{id:"N0",x:450,y:250,value:25,color:"pink",shape:"images/star.png"},
						{id:"N1",x:400,y:120,value:15,color:"red",shape:"images/star.png"},
						{id:"N2",x:100,y:100,value:35,color:"green",shape:"images/star.png"},
						{id:"N3",x:120,y:200,value:25,color:"blue",shape:"images/heart.png"},
						{id:"N4",x:200,y:50,value:26,color:"pink",shape:"images/star.png"},
						{id:"N5",x:50,y:250,value:23,color:"pink",shape:"images/earth.png"},
						{id:"N6",x:70,y:150,value:30,color:"black",shape:"images/heart.png"},
						{id:"N7",x:350,y:20,value:25,color:"blue",shape:"images/star.png"},
						{id:"N8",x:400,y:250,value:13,color:"blue",shape:"images/heart.png"},
						{id:"N9",x:450,y:30,value:21,color:"blue",shape:"images/heart.png"},
						{id:"N10",x:760,y:350,value:25,color:"blue",shape:"images/heart.png"},
						{id:"N11",x:7900,y:50,value:5,color:"blue",shape:"images/earth.png"},
						{id:"N12",x:345,y:90,value:22,color:"blue",shape:"images/heart.png"},
						{id:"N13",x:210,y:380,value:11,color:"blue",shape:"images/star.png"},
						{id:"N14",x:40,y:120,value:22,color:"blue",shape:"images/earth.png"},
						{id:"N15",x:275,y:450,value:15,color:"blue",shape:"images/heart.png"},
						{id:"N16",x:573,y:300,value:24,color:"blue",shape:"images/star.png"},
						{id:"N17",x:777,y:210,value:25,color:"blue",shape:"images/earth.png"},
						
					],
			"edges":[
						{id:"E0",x1:70,y1:150,x2:100,y2:100,color:"green",stroke:"3px",dasharray:"5,5"},
						{id:"E1",x1:400,y1:120,x2:100,y2:100,color:"green",stroke:"3px",dasharray:"5,5"},
						{id:"E2",x1:210,y1:380,x2:200,y2:50,color:"black",stroke:"2px",dasharray:"10,10"},
						{id:"E3",x1:50,y1:50,x2:70,y2:150,color:"orange",stroke:"8px",dasharray:"20,10,5,5,5,10"},
						{id:"E4",x1:450,y1:250,x2:70,y2:150,color:"green",stroke:"5px",dasharray:"5,5"},
					]
		};

		//option by nodes
		var initGrafo2={
			"nodes":
					[
						{id:"N0",x:450,y:250,value:25,color:"pink",shape:"images/star.png"},
						{id:"N1",x:400,y:120,value:15,color:"red",shape:"images/star.png"},
						{id:"N2",x:100,y:100,value:35,color:"green",shape:"images/star.png"},
						{id:"N3",x:300,y:200,value:25,color:"blue",shape:"images/heart.png"},
						{id:"N4",x:200,y:50,value:20,color:"pink",shape:"images/star.png"},
						{id:"N5",x:50,y:50,value:20,color:"pink",shape:"images/earth.png"},
						{id:"N6",x:70,y:150,value:30,color:"black",shape:"images/heart.png"},
						
					],
			"edges":[
						{id:"E0",s:"N0",d:"N1",color:"green",stroke:"3px",dasharray:"5,5"},
						{id:"E1",s:"N0",d:"N2",color:"green",stroke:"3px",dasharray:"5,5"},
						{id:"E2",s:"N1",d:"N3",color:"black",stroke:"2px",dasharray:"10,10"},
						{id:"E3",s:"N3",d:"N4",color:"orange",stroke:"8px",dasharray:"20,10,5,5,5,10"},
						{id:"E4",s:"N5",d:"N6",color:"green",stroke:"5px",dasharray:"5,5"},
					]
		};
		$scope.Grafo=initGrafo;

		//Load node on click
		$scope.loadNode = function(node) {
		    	$scope.selectedNodeData = node;
		 };

		//Load Edge on click
		 $scope.loadEdge = function(edge) {
		    	$scope.selectedEdgeData = edge;
		 };

		//textarea editable JSON
		$scope.GrafoSTR=JSON.stringify($scope.Grafo, null, 1);
	    $scope.changeGRafo = function(ChangedData) {
	    	$scope.Grafo = JSON.parse(ChangedData, null, 1);
	    };



		


	    /*FILTERS*/

		//Filter per node shape
	    $scope.shapes=[true,true,true];
	    	$scope.$watch('shapes', function(newValue, oldValue) {
	    		console.log(newValue);
	     		if(newValue[0]==false){
	     			console.log("hide");
	    			$("#grafo .nodes image[shape='images/star.png']").hide();	
	    		}else{
	    			console.log("show");
	    			$("#grafo .nodes image[shape='images/star.png']").show();
	    		}

	    		if(newValue[1]==false){
	    			$("#grafo .nodes image[shape='images/heart.png']").hide();
	    			
	    		}else{
	    			$("#grafo .nodes image[shape='images/heart.png']").show();
	    		}

	    		if(newValue[2]==false){
	    			$("#grafo .nodes image[shape='images/earth.png']").hide();
	    		}else{
	    			$("#grafo .nodes image[shape='images/earth.png']").show();
	    		}
             
           }, true);


	    	
	    	//Filter by pos
	    	$scope.$watch('nodePosFilter', function(newValue, oldValue) {
	    		$("#grafo .nodes image").show();
	     		if(newValue=="range1"){
	    			$("#grafo .nodes image").each(function( n) {
	    				var x=$("#grafo .nodes image").eq(n)[0].getAttribute("x");
	    				console.log(x);
	    				if(x<280 || x>430 ){
	    					$("#grafo .nodes image").eq(n).hide();
	    				}
					});
	    		}else if(newValue=="range2"){
	    			$("#grafo .nodes image").each(function( n) {
	    				var y=$("#grafo .nodes image").eq(n)[0].getAttribute("y");
	    				console.log(y);
	    				if(y<190 || y>300 ){
	    					$("#grafo .nodes image").eq(n).hide();
	    				}
					});
	    		}
             
           });

	    	//Change color by pos
	    	$scope.$watch('ColorNodePosFilter', function(newValue, oldValue) {
	    			$("#grafo .nodes image").each(function( n) {
	    				var init_shape=$("#grafo .nodes image").eq(n)[0].getAttribute("shape").replace("-red.png",".png");
	    				//$("#grafo .nodes image").eq(n)[0].setAttribute("shape",init_shape);
	    				$scope.Grafo.nodes[n].shape=init_shape;
	    				console.log("INIT SHAPE");
	    				console.log(init_shape);


	    				var x=$("#grafo .nodes image").eq(n)[0].getAttribute("x");
	    				var y=$("#grafo .nodes image").eq(n)[0].getAttribute("y");
	    				

	    				//console.log(x);
	    				if(newValue=="range1" && x>280 && x<430 ){
	    					var new_shape=$scope.Grafo.nodes[n].shape.replace(".png","-red.png");
	    					//$("#grafo .nodes image").eq(n)[0].setAttribute("shape",shape);
	    					console.log(new_shape);
	    					$scope.Grafo.nodes[n].shape=new_shape;
	    				}else if(newValue=="range2" && y>190 && y<300 ){
	    					var new_shape=$scope.Grafo.nodes[n].shape.replace(".png","-red.png");
	    					//$("#grafo .nodes image").eq(n)[0].setAttribute("shape",shape);
	    					console.log(new_shape);
	    					$scope.Grafo.nodes[n].shape=new_shape;
	    				}
					});
             
           });

		//Filter per node VS edges
	    $scope.edgesVSnodes="both";

	     $scope.$watch('edgesVSnodes', function(newValue, oldValue) {
	     	if(newValue=="nodes"){
	    			$("#grafo .nodes").show();
	    			$("#grafo .edges").hide();

	    		}else if(newValue=="edges"){
	    			$("#grafo .nodes").hide();
	    			$("#grafo .edges").show();
	    		}else{
	    			$("#grafo .nodes").show();
	    			$("#grafo .edges").show();
	    		}
             
           });


	    	$scope.filterEdgesVSnodes = function(filter) {
	    		if(filter=="nodes"){
	    			$("#grafo .nodes").show();
	    			$("#grafo .edges").hide();

	    		}else if(filter=="edges"){
	    			$("#grafo .nodes").hide();
	    			$("#grafo .edges").show();
	    		}else{
	    			$("#grafo .nodes").show();
	    			$("#grafo .edges").show();
	    		}
	    	};

  })
  .controller('example5Ctrl', function ($scope) {

	    //Load it on view
			$scope.GrapthSize={w:650,h:500};
			$scope.GrapthScale={w:200,h:150};


		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min)) + min;
		}

	  	$scope.generategrafo=function(nodes,edges){

	  		var grafo={nodes:[],edges:[]};
	  		for (var n=0;n<nodes;n++){
	  			grafo.nodes.push({ name: "Nodo"+n, id:"ID"+n, val:5, color:"blue", x:getRandomInt(0,$scope.GrapthSize.w), y:getRandomInt(0,$scope.GrapthSize.h),  fixed:true});
	  		}

	  		for (var e=0;e<edges;e++){
	  			grafo.edges.push({ source: "ID"+getRandomInt(0,nodes), target: "ID"+getRandomInt(0,nodes) , color:"red",   width:"1",  shape:"0,0"});
	  		}


	  		console.info("generategrafo");
	  		console.log(grafo);
	  		$scope.Grafo=grafo;
	  		
	  	}

		//DEFAULT VALUES TO PAINT
			var dataInit = {
					nodes: [
		              { name: "Nodo 1", id:"ID1", val:5, color:"blue", x:139, y:100,  fixed:false},
		              { name: "Nodo 2", id:"ID2", val:5,  color:"green", x:20,  y:320,  fixed:true},
		              { name: "Nodo 3", id:"ID3", val:5, color:"green", x:300, y:446, fixed:true},
		              { name: "Nodo 4", id:"ID4", val:5, color:"blue", x:239, y:86, fixed:true}
		         
					],
					edges: [
		              { source: "ID1", target: "ID2" , color:"black", width:"1",  shape:"10,10"},
		              { source: "ID2", target: "ID3" , color:"red",   width:"1",  shape:"0,0"}
					]
				};




			

			 var svg;

			//$scope.Grafo=dataInit;  //cone sto cargo el default
			$scope.generategrafo(50,60); //Con esto cargo un random generado

			//$scope.total={nodes:$scope.Grafo.nodes.length,edges:$scope.Grafo.edges.length};
		    
		    //$scope.GrafoSTR=JSON.stringify($scope.Grafo, null, 1);
			

					
			 //var data = $scope.Grafo.nodes.slice();
			  //var data = $scope.Grafo;

			//AUX FUNCTIONS
			function findNodeByID(source,target,val){

				for(var i=0;i<source.length;i++){
					//console.log(source[i]);
					if(source[i].id==target){
						//console.log(source[i][val]);
						return source[i][val];
					}
				}
			}

			//FIND CONNECTIONS of A NODE
			$scope.nodeConnections=function(node){
				console.log(id);
				var id=node.id;
				$scope.nodeEdgesTO=[];
				$scope.nodeEdgesFROM=[];
				$scope.nodeNodesID=[];
				$scope.nodeNodes=[];

				for(var i=0;i<$scope.Grafo.edges.length;i++){
					if($scope.Grafo.edges[i].source==id ){
						console.log($scope.Grafo.edges[i]);
						$scope.nodeEdgesFROM.push($scope.Grafo.edges[i]);
						$scope.nodeNodesID.push($scope.Grafo.edges[i].target);


					}else if($scope.Grafo.edges[i].target==id ){
						console.log($scope.Grafo.edges[i]);
						$scope.nodeEdgesTO.push($scope.Grafo.edges[i]);
						$scope.nodeNodesID.push($scope.Grafo.edges[i].source);
					}
		
				}

				for(var i=0;i<$scope.Grafo.nodes.length;i++){
					for(var j=0;j<$scope.nodeNodesID.length;j++){
							if($scope.Grafo.nodes[i].id==$scope.nodeNodesID[j] ){
								console.log($scope.Grafo.nodes[i]);
								$scope.nodeNodes.push($scope.Grafo.nodes[i]);
							}
					}
				}

				

			};


			$scope.loadData=function(newdata){
				 //data.splice(0, 1);
				 
				

				var data=newdata;//.push($scope.Grafo[0]);
				//data= JSON.parse(JSON.stringify(newdata));
				console.info("loadData");
				console.info(data);




				//drawing edges
				var line = svg.selectAll("line").data(data.edges);

					line.exit().remove();

					line.enter().append("line");

					line
						.attr("class", "line")
						.attr("stroke", function(d) { return d.color; })
						.attr("stroke-width", function(d) { return d.width; })
						.attr("stroke-dasharray", function(d) { return d.shape; })
						.attr("marker-end", 'url(#head)' )
						.attr("x1", function(d) { return findNodeByID(data.nodes,d.source,"x");  })
						.attr("y1", function(d) { return findNodeByID(data.nodes,d.source,"y");  })
						.attr("x2", function(d) { return findNodeByID(data.nodes,d.target,"x");  })
						.attr("y2", function(d) { return findNodeByID(data.nodes,d.target,"y");  });

				//drawing arrows
					svg.append("svg:defs"); //maybe this will not be here, but is working

					var marker = svg.selectAll("marker").data(data.edges);

					marker.exit().remove();

					marker.enter().append("marker");

					marker
					    .attr("id", "head")
					    .attr("refX", "0.1")
					    .attr("refY", "2")
					    .attr("markerWidth", 2)
					    .attr("markerHeight", 4)
					    .attr("orient", "auto")
					    .append("svg:path")
					    .attr("fill", "black")
					    .attr("d", "M0,0 V4 L2,2 Z"); 	


				//drawing NODES
				var circle = svg.selectAll("circle").data(data.nodes);

					circle.exit().remove();

					circle.enter().append("circle");

					circle
					    .attr("cursor", "pointer")
					   .attr("name", function(d) { return d.name })
					   .attr("fill", function(d) { return d.color })
					   .attr("r", function(d) { return d.val })
					   .attr("cx", function(d) { return d.x })
					   .attr("cy", function(d) { return d.y });

					circle
						.on("click", function(a,b,c) {   	
						   	 $scope.$apply(function () {
					            $scope.nodeAttrs=a;
					            $scope.nodeConnections(a);
					            $scope.menu='results';
					        });
					   })
						.on("mouseover", function(a,b,c) {   
							console.log("IN: "+a.id);	
						   	 $scope.$apply(function () {
					            $scope.nodeHover=a;
					            
					        });
					   })
						.on("mouseleave", function(a,b,c) {  
							console.log("OUT: "+a.id);
							
						   	 $scope.$apply(function () {
					            $scope.nodeHover=a;
					        });
					   });

				//adding forces
				/*
					var force = d3.layout.force()
					.nodes(newdata.nodes)
					.links(newdata.edges)
					.gravity(0.05)
		            .distance(100)
		            .charge(-100)
					.size([$scope.GrapthSize.w,$scope.GrapthSize.h])
					.start();	*/

			$scope.total={nodes:$scope.Grafo.nodes.length,edges:$scope.Grafo.edges.length};
		    
		    $scope.GrafoSTR=JSON.stringify($scope.Grafo, null, 1);


			}

			//hover on cirles with Jquery



			$scope.draw=function(sizeNew,dataNew){
				//$scope.value=dataNew[0];

				var h=sizeNew.h, w =sizeNew.w;

				 // var data = dataNew.slice()
				  //var format = d3.time.format("%a %b %d %Y")

				  

				//Scales
				  /*

				  var newy = function(d) {  return d.y }
				  var newx = function(d) { return d.x }

				  var x = d3.scale.linear()
				    .range([0, $scope.GrapthScale.w])
				    .domain(d3.extent(data, newx));

				  var y = d3.scale.linear()
				    .range([0, $scope.GrapthScale.h])
				    .domain(d3.extent(data, newy));*/
				  
				  svg = d3.select("#svgContentD3").append("svg:svg")
				  .attr("width", w)
				  .attr("height", h);

				  //creating axis


				  //And load data
				  $scope.loadData(dataNew);

			};

			$scope.change=function(ChangedData){
				$scope.Grafo=JSON.parse(ChangedData, null, 1);
				console.info("data changed");
			}


			//Only First Time, will create the SVG and load Data
			$scope.draw($scope.GrapthSize,$scope.Grafo);

			  $scope.quaiks=function(nodes,vertex){

			  		$scope.generategrafo(nodes,vertex);
			  		$scope.GrafoSTR=JSON.stringify($scope.Grafo, null, 1);
			  		$scope.loadData($scope.Grafo);
			  		//$scope.draw($scope.GrapthSize,$scope.Grafo);


			  	}


  })
  .controller('example6Ctrl', function ($scope) {


  var w = 500,
      h = 500;
	var svg = d3.select("#svgContentD3")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .attr('preserveAspectRatio', 'xMinYMin slice') 
                  .append('g');
	var dataSet = {
			nodes: [
              { name: "Sara", id:"1", val:5, color:"red", x:239.31191418045182, y:296.78520431471384, fixed:false},
              { name: "Raul", id:"2",  val:5, color:"red", x:261.1651006560272, y:200.78448049334696, fixed:false},
              { name: "Stefano", id:"3", val:5, color:"blue",  fixed:false},
              { name: "Michele", id:"4",  val:5, color:"blue", fixed:false}
			],
			edges: [
              { source: 0, target: 1 ,color:"blue",   width:"1",  shape:"0,0"},
              { source: 1, target: 0 ,color:"green",   width:"1",  shape:"0,0"},
              { source: 1, target: 2 ,color:"red",   width:"1",  shape:"10,10"},
              { source: 2, target: 1 ,color:"black",   width:"1",  shape:"20,0"},
              { source: 2, target: 3 ,color:"red",   width:"1",  shape:"0,0"}
			]
		};
	
		var force = self.force = d3.layout.force()
			.nodes(dataSet.nodes)
			.links(dataSet.edges)
			.gravity(0.01)
            .distance(100)
            .charge(-10)
			.size([w,h])
			.start();

		var link = svg.selectAll(".link")
			.data(dataSet.edges)
			.enter().append("line")
			.attr("class", "link")
			.attr("stroke", function(d) { return d.color; })
			.attr("stroke-width", function(d) { return d.width; })
			.attr("stroke-dasharray", function(d) { return d.shape; })
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
  
		/*var node_drag = d3.behavior.drag()
			.on("dragstart", dragstart)
			.on("drag", dragmove)
			.on("dragend", dragend);*/

        var node = svg.selectAll("circle")
			.data(dataSet.nodes)
			.enter().append("circle")
			.attr("class", "node")
			.attr("fill", function(d) { return d.color; })
			.attr("r", function(d) { return d.val; })
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
			//.call(node_drag);
  


  });
