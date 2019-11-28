

$(document).ready(function(){

//slide show
var count=0;
var images=["./images/img1.jpeg",
			"./images/img2.jpg",
			"./images/img3.jpeg",
			"./images/img4.jpeg",
			"./images/img5.jpeg",
			"./images/img6.jpeg",
			"./images/img7.jpeg"];







var im=$("#back-img");


count++;


setInterval(function(){

im.fadeOut(1000,function(){
	count=count%7;
	im.css("background-image","url("+images[count]+")");
	im.fadeIn(1000);
	count++;
});
	
	

},4000);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
$.getJSON('codes.json',function(response){

var codeSelectlist=$("#CountryCodeSelect");
$.each(response.result,function(key,value){

	codeSelectlist.append("<option value="+value.code+">"+value.name+"</option>");




})



});


//main
var postMsg=document.getElementById("Test");
postMsg.addEventListener('click',function(){alert('hello');})

var infobutton=document.getElementById("getinfo");
var codebutton=document.getElementById("getcode");
var cn=document.getElementById("Cname");
var zn=document.getElementById("zcode");
var cc=document.getElementById("CountryCodeSelect");
var result_element=$("#result");
var result_image=$("#condition_image");
var city_element=$("#city_name");
var temp_element=$("#temperature");
var humid_element=$("#humid");
var desc_element=$("#des")

var weather_id;
var weather_code;
var unitsys="metric";
result_element.hide();









//find using city name_______________________________________________________________________

infobutton.addEventListener('click',function(){

		document.getElementById("errormsg").innerHTML="";

var city=cn.value;



var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unitsys+"&appid=afdf934e2ec8e5f996948d5a1ea74455";

$.get(url,function(response){


fillData(response);


}).fail(function(){

	document.getElementById("errormsg").innerHTML="City not found";
	
});
});

//____________________________________________________________________________________________



//reset________________________________________________________________________________
cn.addEventListener('input',function() {
	document.getElementById("errormsg").innerHTML="";
	resetResult();
});
	
cc.addEventListener('click',function(){
	document.getElementById("errormsg").innerHTML="";
});

//______________________________________________________________________________________



//find using city zip code_____________________________________________________________
codebutton.addEventListener('click',function (){
	document.getElementById("errormsg").innerHTML="";

var zip=zn.value;
 var czip=cc.value;

 if(czip=="Select Country" || zip==null)
 	alert("please select a country");
 else{
var url="https://api.openweathermap.org/data/2.5/weather?zip="+zip+","+czip+"&units="+unitsys+"&appid=afdf934e2ec8e5f996948d5a1ea74455";
}
console.log("final url"+url);

$.get(url,function(response){

fillData(response);

}).fail(function(){

	document.getElementById("errormsg").innerHTML="City not found";
	
});

});
//__________________________________________________________________________________________


//______________________________________________________________
//reset
zn.addEventListener('input',function() {
	document.getElementById("errormsg").innerHTML="";
	resetResult();
});
//_________________________________________________________________


function loadImage(wid)
{

weather_code=getWeatherType(wid);

let url="./images/"+weather_code+".png";

result_image.attr("src",url);

}


function getWeatherType(code){


	switch(code)
	{
		case 2:return "Storm";
				break;
		case 3:return "Drizzle";
				break;
		case 5:return "Rain";
				break;
		case 6:return "Snow";
				break;
		case 7:return "Sfm";
				break;
		case 8:return "clear";
				break;
		default:return "error";
	}

}

//reset result
function resetResult() {

city_element.html("");
temp_element.html("");
humid_element.html("");
desc_element.html("");
result_image.attr("src","");
result_element.hide();
}



function fillData(res)
{

//weather image
weather_id=parseInt(res.weather[0].id);
weather_id=parseInt(weather_id/100);
loadImage(weather_id);


//weather data
var temperature=res.main.temp;
var humid=res.main.humidity;
var desc=res.weather[0].description;
var c=res.name;


//uploading the data
city_element.html(c);
temp_element.html(temperature);
humid_element.html(humid);
desc_element.html(desc);



result_element.toggle(300);

}






//unit selection
var cel=document.getElementById("celcius");
var farh=document.getElementById("fahrenheit");

cel.addEventListener("click",function(){
	cel.style.borderBottomWidth="2px";
	farh.style.borderBottomWidth="0px";
	unitsys="metric";
	toCelcius();

});

farh.addEventListener("click",function(){
	cel.style.borderBottomWidth="0px";
	farh.style.borderBottomWidth="2px";
	unitsys="imperial";
	toFahrenheit();
});

//unit conversion

function toFahrenheit()
{
	var ftemp=parseInt(temp_element.html());
	ftemp=parseFloat((ftemp*(9/5))+32);
	ftemp=parseInt(ftemp*100);
	ftemp=parseFloat(ftemp/100);
	temp_element.html(ftemp);
}

function toCelcius()
{
	var ctemp=parseInt(temp_element.html());
	ctemp=parseFloat((ctemp-32)*(5/9));
	ctemp=parseInt(ctemp*100);
	ctemp=parseFloat(ctemp/100);
	temp_element.html(Math.round(ctemp));

}


//end
});
