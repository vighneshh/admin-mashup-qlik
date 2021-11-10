/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var app,
prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(2) + ' K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(2) + ' M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

require( ["js/qlik"], function ( qlik ) {

	var global = qlik.getGlobal(config);
	

	var app = qlik.openApp('Consumer Sales.qvf', config);

	
	// console.log(app);
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );




	






	
		// 	app.visualization.create(
		// 	  'barchart',
		// 	  [
		// 	    "City",
		// 	    "=Sum(Sales)"
		// 	  ],
		// 	  {
		// 	    "showTitles": true,
		// 	    "title": "Sales By City"
		// 	  }
		// 	).then(function(vis){
		// 	  vis.show("barchart");
		// 	});

		// 	app.visualization.create(
		// 	  'linechart',
		// 	  [
		// 	    "City",
		// 	    "=Sum(Sales)"
		// 	  ],
		// 	  {
		// 	    "showTitles": true,
		// 	    "title": "Sales By City"
		// 	  }
		// 	).then(function(vis){
		// 	  vis.show("linechart");
		// 	});
		// // createViz(res, app, "barchart");
		// // createViz(res2, app, "linechart");

		// // 	 function setTitle ( model, elemid ) {
		// // 	//have we got a title??
		// // 	if ( model.layout.title ) {
		// // 		//set the text of all links to this element to the title
		// // 		$( 'a[href="#' + elemid + '"]' ).html( model.layout.title );
		// // 	}
		// // }

		
		
		app.getObject('dNmwJzh').then( function ( reply ) {
			
			var value = reply.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
			var title = reply.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			// console.log(reply.layout.qHyperCube.qMeasureInfo[0])
			$('#kpi1').text(numFormatter(value));
		   $('#kpitext1').text(title);
		} );

		app.getObject('yJChy').then( function ( reply ) {
			
			var value = reply.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
			var title = reply.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			// console.log(reply.layout.qHyperCube.qMeasureInfo[0])
			$('#kpi2').text(numFormatter(value));
		   $('#kpitext2').text(title);
		} );

		app.getObject('dNmwJzh').then( function ( reply ) {
			
			var value = reply.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
			var title = reply.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			// console.log(reply.layout.qHyperCube.qMeasureInfo[0])
			$('#kpi3').text(numFormatter(value));
		   $('#kpitext3').text(title);
		} );

		app.getObject('yJChy').then( function ( reply ) {
			
			var value = reply.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
			var title = reply.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			// console.log(reply.layout.qHyperCube.qMeasureInfo[0])
			$('#kpi4').text(numFormatter(value));
		   $('#kpitext4').text(title);
		} );




		app.getObject('GqPnAjc').then( function ( reply ) {
			// console.log(reply.layout.qHyperCube.qDataPages[0].qMatrix[0]);
			var data = reply.layout.qHyperCube.qDataPages[0].qMatrix[0];
			values = [];
			data.forEach(function(d){
				// console.log(d);
				values.push(d.qNum);
			});

			var title1 = reply.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			var title2 = reply.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle;

			if(values[0] <= values[1]){
				$('#kp1').css("color", "red");
				$('#per').css("color", "red");
				var sign = '▼';
			}
			else{
				$('#kp2').css("color", "red");
				var sign = '▲';
				$('#per').css("color", "#4755AB");
			}

			$('#kp1').text(numFormatter(values[0]));
		    $('#kptext1').text(title1+':');

		    $('#kp2').text(numFormatter(values[1]));
		    $('#kptext2').text(title2+':');

			per = (values[0] - values[1])/(values[0]+values[1]);
			per2 = per*100;
			console.log((per2).toFixed(2));

			$('#per').text(sign+(per2).toFixed(2));

			
		} );


		app.getObject('GqPnAjc').then( function ( reply ) {
			// console.log(reply.layout.qHyperCube.qDataPages[0].qMatrix[0]);
			var data = reply.layout.qHyperCube.qDataPages[0].qMatrix[0];
			values = [];
			data.forEach(function(d){
				// console.log(d);
				values.push(d.qNum);
			});

			var title1 = reply.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			var title2 = reply.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle;

			if(values[0] <= values[1]){
				$('#kp3').css("color", "red");
				$('#per2').css("color", "red");
				var sign = '▼';
			}
			else{
				$('#kp4').css("color", "red");
				var sign = '▲';
				$('#per2').css("color", "#4755AB");
			}

			$('#kp3').text(numFormatter(values[0]));
		    $('#kptext3').text(title1+':');

		    $('#kp4').text(numFormatter(values[1]));
		    $('#kptext4').text(title2+':');

			per = (values[0] - values[1])/(values[0]+values[1]);
			per2 = per*100;
			console.log((per2).toFixed(2));

			$('#per2').text(sign+(per2).toFixed(2));

			
		} );

		

	//callbacks -- inserted here --
	//open apps -- inserted here --

	//get objects -- inserted here --

	
	
	
	
	app.getObject('linechart','XNTGgf');
	
	
	
	app.getObject('barchart','ajnTBZ');
	
	//create cubes and lists -- inserted here --

} );
