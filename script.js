//Sets up the table in the page
let request = new XMLHttpRequest();
let url = "publiccomp.json";
request.open("GET", url, true);
request.onload = function(){
    //Begin accessing JSON data here. Data stored in request.response
    let data = JSON.parse(this.response);
    let place = document.getElementById('list');
    let row = null;
    let placeCounter = 0;
    let i=0;
    if (request.status >= 200 && request.status <400){
        data.forEach(Prop_ID => {
            if (placeCounter % 1 == 0){
                row=document.createElement('tr');
                row.id = "tr";
                place.appendChild(row);
                i++;
                coordConv(Prop_ID.address, i);
            }
                
                let card = document.createElement('td');
                card.className = "name";
                card.innerHTML = Prop_ID.name;
                row.appendChild(card);
                
                let card2 = document.createElement('td');
                card2.className = "address";
                card2.innerHTML = Prop_ID.address;
                row.appendChild(card2);
                
                let card3 = document.createElement('td');
                card3.className = "phone";
                    if (Prop_ID.phone == null){
                    card3.innerHTML = "Not Available";
                    }
                    else{
                    card3.innerHTML = Prop_ID.phone;
                    }
                row.appendChild(card3);
                
                let card4 = document.createElement('td');
                card4.className = "distance";
                card4.id="distance" + i;
                card4.innerHTML = "Distance: " ;
                row.appendChild(card4);
            placeCounter++;
            });
        }
    };
request.send();

//key1=415449d248c8429d95aa89ee6a1e8131
//key2=7f5bd8c2d746484fb5bd839d4f9bcc9b
//key3=7f2ae91b109742f7962bd18f68cc432d
//key4=bf598a5158604e82adbcd0b1af7fd995

//This function is connected to the data table at the top that is automatically created as the page opens up
function coordConv(address,i){
    let api = "https://api.opencagedata.com/geocode/v1/json?q=&key=7f5bd8c2d746484fb5bd839d4f9bcc9b&pretty=1";
    let place = api.substr(0,api.indexOf("=")+1);
    let placestop = api.substr(api.indexOf("&")+1);
    let address2 = place + address + "&" + placestop;
    let url = address2;
    let request2 = new XMLHttpRequest();
    request2.open("GET", url, true);
    request2.onload = function(){
    let data = JSON.parse(this.response);
    let distance = document.getElementById('distance' + i);
    if (request2.status >= 200 && request2.status <400){
        let lat2 = data.results[0].geometry.lat;
        let lon2 = data.results[0].geometry.lng;
        let url2 = document.location.href;
        let lat1 = url2.substring(112, url2.indexOf("%"));
        let lon1 = url2.substr(url2.indexOf("%")+3);  
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            let radlat1 = Math.PI * lat1/180;
            let radlat2 = Math.PI * lat2/180;
            let theta = lon1-lon2;
	        let radtheta = Math.PI * theta/180;
	        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	        if (dist > 1) {
	            dist = 1;
	        }
	        dist = Math.acos(dist);
	        dist = dist * 180/Math.PI;
	        dist = dist * 60 * 1.1515;
	        let convmiles = dist;
	        console.log(isNaN(convmiles));
	        
	        if (isNaN(convmiles) == true){
	            distance.innerHTML = "Not Available";
	        }
	        else if (convmiles > 10){
	            let miles = convmiles.toString().substr(0,5);
	            distance.innerHTML = miles + " miles";
	        }
	        else{
	            let miles = convmiles.toString().substr(0,4);
	            distance.innerHTML = "0" + miles + " miles";
		    
		       }
        }
    }
    };
    request2.send(); 
}

//This sorts the table by ascending and decending values.
function sort(ascending, columnClassName, tableId) {
    let tbody = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");
    let unsorted = true;
    while (unsorted) {
        unsorted = false;
        for (let r = 0; r < rows.length - 1; r++) {
            let row = rows[r];
            let nextRow = rows[r + 1];
            let value = row.getElementsByClassName(columnClassName)[0].innerHTML;
            let nextValue = nextRow.getElementsByClassName(columnClassName)[0].innerHTML;
            value = value.replace(',', '.'); // in case a comma is used in float number
            nextValue = nextValue.replace(',', '.');
            if (!isNaN(value)) {
                value = parseFloat(value);
                nextValue = parseFloat(nextValue);
            }
            if (ascending ? value > nextValue : value < nextValue) {
                tbody.insertBefore(nextRow, row);
                unsorted = true;
            }
        }
    }
}

function submission(){
    document.getElementById("submit").disabled = true;
    let inpute = document.getElementById("form").value;
    let api = "https://api.opencagedata.com/geocode/v1/json?q=&key=7f5bd8c2d746484fb5bd839d4f9bcc9b&pretty=1";
    let place = api.substr(0,api.indexOf("=")+1);
    let placestop = api.substr(api.indexOf("&")+1);
    let address2 = place + inpute + "&" + placestop;
    let url = address2;
    let request3 = new XMLHttpRequest();
    request3.open("GET", url, true);
    request3.onload = function(){
    let data = JSON.parse(this.response);
        if (request3.status >= 200 && request3.status <400){
        let newlatlon = data.results[0].geometry.lat + "," + data.results[0].geometry.lng;
        url = 'https://preview.c9users.io/ttu8461/final-project/table.html?_c9_id=livepreview2&_c9_host=https://ide.c9.io/name=' + encodeURIComponent(newlatlon);
        document.location.href = url;
        }
    };
    request3.send();
}

