const musicData = "assets/json/music.json";
var theSongList = null;
var songDataLength = 0;
var songOnLoad = 4;
var songLoadStep = 3;

$( document ).ready(function() {
    latestMusic(songOnLoad);
});



$(document).on("click", "#see-more", function (event) {
    if(songOnLoad+songLoadStep <= songDataLength ){
        songOnLoad += songLoadStep;
    }else{
        songOnLoad = songDataLength;
        // $(this).hide();
    }
  
    latestMusic(songOnLoad);
    scrollToAnchor("see-more");
});

function scrollToAnchor(aid) {
  var aTag = $("a[name='" + aid + "']");
  $("html,body").animate({ scrollTop: aTag.offset().top }, "slow");
}




function latestMusic(songOnLoad) {
  let songList = "";
  $.getJSON(musicData, function (data) {
    theSongList = data.reverse();
    var i;
    for (i = 0; i < songOnLoad; i++) {
      var value = theSongList[i];
      songDataLength = Object.keys(data).length;
      var releaseDate = new Date(value.releaseDate);
      var releaseYear = releaseDate.getFullYear();
      var eta = getETA(new Date(), releaseDate);
      var diff = releaseDate - new Date();
      let day3 = 3 * 24 * 60 * 60 * 1000;

      // if hd artwork exist
      let artwork = value.artwork;
      try {
          if(value.artworkHd != undefined){
            artwork = value.artworkHd;
          }
      }catch(err) {console.log(err)}

      // if back artwork exist
      let backArtwork = artwork;
      try {
          if (value.backArtwork !== undefined) {
            backArtwork = value.backArtwork;
          }
      }catch(err) {console.log(err)}

      // if back artwork exist
      let trackCommentary = 'Music Produced &amp; Mastered by ' + value.artistName + '<br/>Written by ' + value.artistName + '<br/>Mixed by ' + value.artistName + '';
      try {
          if (value.commentary !== undefined) {
            trackCommentary = value.commentary;
          } 
      }catch(err) {console.log(err)}

      
      // if back artwork exist
      let valueInfo = '';
      try {
          if (value.info !== "") {
            valueInfo = ' [' + value.info + ']';
          }
      }catch(err) {console.log(err)}

      // from hiddenFromHome
      let hiddenFromHome = false;
      try {
          if (value.hiddenFromHome !== undefined) {
            hiddenFromHome =  true;
          }
      }catch(err) {console.log(err)}

      // if already released
      if(hiddenFromHome == false){
        if (diff < 0) {
            songList += '    <div class="row song">';
            songList += '       <div class="col album-art ">';
            songList += '          <div id="card" class="card">';
            songList += '             <div class="card-face card-backing">';
            songList += '                <img src="' + artwork + '" alt="Front Cover of ' + value.songTitle + ' by ' + value.artistName + '">';
            songList += '             </div>';
            songList += '             <div class="card-face card-front">';
            songList += '                <img src="' + backArtwork + '" alt="Back Side Cover of ' + value.songTitle + ' by ' + value.artistName + '">';
            songList += '             </div>';
            songList += '          </div>';
            songList += '       </div>';
            songList += '       <div class="col">';
            songList += '          <div class="song-title">' + value.songTitle + valueInfo + '</div>';
            songList += '          <div class="artist-album">';
            songList += '             <span class="artist">' + value.artistName + '</span>';
            songList += '             <span class="dot"></span>';
            songList += '             <span class="album">' + value.albumName + ' (' + releaseYear + ')</span>';
            songList += '          </div>';
            songList += '          <div class="commentary hide">';
            songList += '             <span>About this Song :</span>';
            songList += '             <p>';
            songList += '                ' + trackCommentary + ' ';
            songList += '             </p>';
            songList += '          </div>';
            songList += '          <a href="' + value.link + '">';
            songList += '             <div class="button-container-2">';
            songList += '                <span class="mas">Listen</span>';
            songList += '                <button type="button" name="Hover">Listen</button>';
            songList += '             </div>';
            songList += '          </a>';
            songList += '       </div>';
            songList += "    </div>";
        } else {
            if (diff > day3) {
            // far for coming soon are hidden
            } else {
            // coming soon here
            songList += '    <div class="row song unreleased">';
            // songList += '       <div class="release-eta">Premieres in ' + eta + "</div>";
            songList += '       <div class="col album-art ">';
            songList += '          <div id="card" class="card">';
            songList += '             <div class="card-face card-backing">';
            songList += '                <img src="' + artwork + '" alt="Front Cover of ' + value.songTitle + ' by ' + value.artistName + '">';
            songList += '             </div>';
            songList += '             <div class="card-face card-front">';
            songList += '                <img src="' + backArtwork + '" alt="Back Side Cover of ' + value.songTitle + ' by ' + value.artistName + '">';
            songList += '             </div>';
            songList += '          </div>';
            songList += '       </div>';
            songList += '       <div class="col">';
            songList += '          <div class="song-title">' + value.songTitle + valueInfo + '</div>';
            songList += '          <div class="artist-album">';
            songList += '             <span class="artist">' + value.artistName + '</span>';
            songList += '             <span class="dot"></span>';
            songList += '             <span class="album">' + value.albumName + ' (' + releaseYear + ')</span>';
            songList += '          </div>';
            songList += '          <div class="commentary hide">';
            songList += '             <span>About this Song :</span>';
            songList += '             <p>';
            songList += '                ' + trackCommentary + ' ';
            songList += '             </p>';
            songList += '          </div>';
            songList += '          <a href="#">';
            songList += '             <div class="eta">';
            songList += "               Premieres in " + eta ;
            songList += '             </div>';
            songList += '          </a>';
            songList += '       </div>';
            songList += "    </div>";

  
            }
        }
        }
    }

    // write to #latest-music
    if ((songOnLoad < songDataLength)) {
      songList += '<a id="see-more" name="see-more" class="see-more">see more</a>';
    }
    
    $("#song-list").html(songList);
  });
}


function getETA(date_future, date_now) {
  // get total seconds between the times
  var delta = Math.abs(date_future - date_now) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required]

  // if days 0
  if (days > 0){
    return days + " days ";
  }else{
      if(hours > 0){
        return hours + " hours " + minutes + " minutes";
      }else{
        return  minutes + " minutes";
      }
      
  }
  
}