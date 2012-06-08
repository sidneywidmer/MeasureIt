if(app.documents.length > 0)
{
	/**
	 * get all Layers of the 'mi_lines' group and
	 */
	
    var doc = app.activeDocument;
    var miLayer = doc.layerSets["mi_lines"];
	var allLayers = miLayer.artLayers;
	var newLayerSetRef = doc.layerSets.add()
	
	/**
	 * loop the selected layers
	 * and measure their width
	 */
	
	for (var i=allLayers.length;i--;)
	{
	  	var cLayer=allLayers[i];
	
		var bounds = cLayer.bounds;
		
		var point1 = {
			x: bounds[0],
			y: bounds[1]
		}
		
		var point2 = {
			x: bounds[2],
			y: bounds[3]
		}
		
		var textCoords = _calculateTextCenter(point1, point2);
		
		var layerWidth = Number(bounds[2] - bounds[0]);
		var layerHeight = Number(bounds[3] - bounds[1]);
		var layerName = cLayer.name;
		
		//add text
		var textLayerRef = newLayerSetRef.artLayers.add()
		textLayerRef.kind = LayerKind.TEXT;
		var textItemRef = textLayerRef.textItem;
		
		//set color to the currently selected foreground color
		textItemRef.color = app.foregroundColor;
		
		//size, justification
		textItemRef.size = 11;
		textItemRef.justification = Justification.CENTER;
		textItemRef.kind = TextType.PARAGRAPHTEXT;
		
		if(layerWidth > layerHeight)
		{
			//layer is horizontal
			textItemRef.contents = layerWidth;
			textLayerRef.name = layerWidth;
			textCoords.y -= 10;
			textCoords.x -= parseInt(textItemRef.width / 2);
		}
		else
		{
			//layer is vertical
			textItemRef.contents = layerHeight;
			textLayerRef.name = layerHeight;
			textCoords.x -= 24;
			textCoords.y -= parseInt(textItemRef.height / 2);
		}
		
		//set posiiton of text
		textItemRef.position = Array(textCoords.x, textCoords.y);
		
	}
}

/**
 * Function to calculate the 
 * centered coordinates of two points
 */
function _calculateTextCenter(point1, point2)
{
	var xs = 0;
	var ys = 0;
	
	xs = Math.round((point2.x + point1.x) / 2);
	ys = Math.round((point2.y + point1.y) / 2);

	return {x: xs, y: ys};
}