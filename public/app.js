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
  var myAlbums = JSON.parse(responseString).albums.items;

  var albumObjects = [];

  myAlbums.forEach(function(item){
    var albumName = item.name;
    var artist = item.artists[0].name;
    var albumCover = item.images[0].url;

    var album = new Album(albumName, artist, albumCover);
    albumObjects.push(album);
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
  var input = document.querySelector("#search-query");
  var url = getUrl(input.value);
  makeRequest(url, processResults);
};

var app = function(){
  var button = document.querySelector('button');
  button.onclick = handleBtnClick;
}

window.onload = app;