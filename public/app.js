var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var getUrl = function(query){
  var url = "https://api.spotify.com/v1/search?q=";
  url += query;
  url += "&type=album";
  return url;
};

var processResults = function(){
  var responseString = this.responseText;
  var albums = JSON.parse(responseString).albums.items;

  var albumObjects = albums.map(function(item){
    var albumName = item.name;
    var artist = item.artists.map(function(artist){ return artist.name }).join(" / ");
    var albumCover = item.images[0].url;

    return new Album(albumName, artist, albumCover);
  }); 

  populateList(albumObjects);
};

var populateList = function(albums){
  var albumsDiv = document.getElementById('albums');
  albumsDiv.innerText = "";

  albums.forEach(function(myAlbum){
    var albumDiv = myAlbum.getHtml();
    albumsDiv.appendChild(albumDiv);
  });
};

var handleBtnClick = function(){
  var value = document.querySelector("#search-query").value;
  
  if(!value) return alert("Gonnae enter a search term?");

  var url = getUrl(value);
  makeRequest(url, processResults);
};

var app = function(){
  var button = document.querySelector('button');
  button.onclick = handleBtnClick;
}

window.onload = app;