function posToString(pos)
{
	return pos.coords.latitude+", "+pos.coords.longitude;
}

function posArrayToString(posArray)
{
	var res;
	if (posArray.length == 0)
	{
		return "";
	}
	res = posToString(posArray[0]);
	for (var i = 1; i < posArray.length; i++)
	{
		res = res + "<br/>"+posToString(posArray[i]);
	}
	return res;
}
// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function distance(pos1,pos2) 
{
	return calculateDistance(pos1.coords.latitude,pos1.coords.longitude,pos2.coords.latitude,pos2.coords.longitude); 
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371000; // meters
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

function performClustering(inArray){
	var d;
	var result = [];
	var counter = 0;
	var found;

	for (var j=0; j<inArray.length; j++){
	for(var i=0; i<inArray.length; i++){
		if (i==j)
		{
			continue;	
		}
		d= distance(inArray[j],inArray[i]);	
		if (d < 100){
			// Closeness detected, see if it is an existing poi
			found = false;
			for(var k=0; k<result.length; k++)
			{
				d= distance(inArray[i],result[k]);	
				if (d < 100)
				{
					found = true;	
				}
			}	
			if (!found )
			{
				result[counter++] = inArray[i]; 
			}	
		}
	}
	}
	return result;
}
/* 
* divides array of positions with timestamp into periods of "period" duration, returns an array of arrays with the group 
*/
function groupByTime(posArray, period) {
	var i = 0;
	var res = [];
	var temp= _.groupBy(posArray,function(pos){
			// Obtain period:
			return t = Math.floor(pos.timestamp/period)*period;
			},null);
	// TODO Remove this to improve speed!
	for (prop in temp){
		res[i++] = temp[prop];
	}
	return res;
}

// Pass array of arrays of beats, grouped by time, return current centroids
function performTimeClustering(posArray)
{
	var mergedArray = [];
	for (props in posArray){
		mergedArray = mergedArray.concat(performClustering(posArray[props]));
	}
	return performClustering(mergedArray);
}

