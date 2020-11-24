const musicData = "../assets/json/music.json";
var theSongList = null;
var songDataLength = 0;
var songOnLoad = 4;
var songLoadStep = 3;

$( document ).ready(function() {
    latestMusic(songOnLoad);
    pinnedMusic(); 
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



function pinnedMusic() {
    let alreadyPinned = false;

    $.getJSON(musicData,
      function (data) {
        $.each(data.reverse(), function (key, value) {
          var releaseDate = new Date(value.releaseDate);
          var diff = releaseDate - new Date();

          if (diff < 0 && alreadyPinned == false) {
            console.log(value.songTitle);
            alreadyPinned = true;

            let songList = '';
            songList += ' <a href="' + value.link + '">';
            songList += '   <div class="content-link">';
            songList += '       <h3>Stream "' + value.songTitle + '" now</h3>';
            songList += '       <p>The latest tunes from <b>'+ value.artistName+'</b></p>';
            songList += '   </div>';
            songList += '   <div class="shade"></div>';
            songList += '   <img class="content-banner" src="'+value.banner+'">';
            songList += '</a>';
            $("#pinned-music").html(songList);
          }
        })
      });
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

      // if already released
      if (diff < 0) {
        songList += '<a href="' + value.link + '" class="items">';
        songList += '     <div class="album-art">';
        songList += '         <img src="' + value.artwork + '">';
        // if there's song info
        if (value.info != "") {
          songList += '       <div class="info">' + value.info + "</div>";
        }
        songList += "     </div>";

        songList += '     <div class="content-link">';
        songList += "         <h3>" + value.songTitle + "</h3>";
        songList +=
          "         <p>" +
          value.artistName +
          " &#183; " +
          value.albumName +
          " &#183; " +
          releaseYear +
          "</p>";
        songList += "     </div>";
        songList += " </a>";
      } else {
        if (diff > day3) {
          // far for coming soon are hidden
        } else {
          // coming soon here
          songList += '<a href="#" class="items unreleased">';
          songList +=
            '     <div class="release-eta">Premieres in ' + eta + "</div>";
          songList += '     <div class="album-art">';
          songList += '         <img src="' + value.artwork + '">';
          // if there's song info
          if (value.info != "") {
            songList += '       <div class="info">' + value.info + "</div>";
          }
          songList += "     </div>";

          songList += '     <div class="content-link">';
          songList += "         <h3>" + value.songTitle + "</h3>";
          songList +=
            "         <p>" +
            value.artistName +
            " &#183; " +
            releaseYear +
            "</p>";
          songList += "     </div>";
          songList += " </a>";
        }
      }
    }

    // write to #latest-music
    if ((songOnLoad < songDataLength)) {
      songList += '<a id="see-more" name="see-more" class="see-more">see more</a>';
    }
    
    $("#latest-music").html(songList);
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