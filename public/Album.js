var Album = function(albumName, artist, coverImg){
  this.albumName = albumName;
  this.artist = artist;
  this.coverImg = coverImg;
};

Album.prototype = {
  getHtml: function(){
    var wrapper = this.getDivWrapper();
    var artist = this.getArtistPara();
    var albumName = this.getAlbumNamePara();
    var coverImg = this.getCoverImg();

    wrapper.appendChild(artist);
    wrapper.appendChild(albumName);
    wrapper.appendChild(coverImg);
    
    return wrapper;
  },
  getDivWrapper: function(){
    return document.createElement('div');
  },
  getArtistPara: function(){
    var p = document.createElement('p');
    p.innerText = this.artist;
    return p;
  },
  getAlbumNamePara: function(){
    var p = document.createElement('p');
    p.innerText = this.albumName;
    return p;
  },
  getCoverImg: function(){
    var img = document.createElement('img');
    img.src = this.coverImg;
    return img;
  }
};