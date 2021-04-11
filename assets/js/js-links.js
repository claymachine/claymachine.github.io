const musicData = "../assets/json/music.json";
const blogData = "../assets/json/blog.json";
var theSongList = null;
var songDataLength = 0;
var songOnLoad = 3;
var songLoadStep = 3;
var theBlogList = null;
var blogDataLength = 0;
var blogOnLoad = 4;
var blogLoadStep = 3;
var myArtistName = 'Clay Machine';

$( document ).ready(function() {
    pinnedMusic(); 
    pinnedBlog(); 
    latestMusic(songOnLoad);
    latestBlog(blogOnLoad);
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
$(document).on("click", "#see-more2", function (event) {
  if (blogOnLoad + blogLoadStep <= blogDataLength) {
    blogOnLoad += blogLoadStep;
  } else {
    blogOnLoad = blogDataLength;
    // $(this).hide();
  }

  latestBlog(blogOnLoad);
  scrollToAnchor("see-more2");
});

function scrollToAnchor(aid) {
  var aTag = $("a[name='" + aid + "']");
  $("html,body").animate({ scrollTop: aTag.offset().top }, "slow");
}



function pinnedMusic() {
    let alreadyPinned = false;
    let hideThisSong = false;

    $.getJSON(musicData,
      function (data) {
        $.each(data.reverse(), function (key, value) {
          var releaseDate = new Date(value.releaseDate);
          var diff = releaseDate - new Date();

          // others artist maximum pinned for 3 days
          if(value.artistName.search(myArtistName) == -1 && (diff/(1000*60*60*24)) < -3)
          { 
            hideThisSong = true;
          } 

          
          if (diff < 0 && alreadyPinned == false && hideThisSong == false) {
            
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

          // hide this song reset
          hideThisSong = false;
        })
      });
}
function pinnedBlog() {
    let alreadyPinned = false;

    $.getJSON(blogData,
      function (data) {
        $.each(data.reverse(), function (key, value) {
          var releaseDate = new Date(value.date);
          var diff = releaseDate - new Date();

          if (diff < 0 && alreadyPinned == false) {
            alreadyPinned = true;

            if(value.tags == "fa fa-pencil-alt")
            {
              let blogList = '';
              blogList += ' <a href="' + value.link + '">';
              blogList += '   <div class="content-link">';
              blogList += '       <p><i class="fa fa-pencil-alt"></i> &nbsp;New Blog Post! </p>';
              blogList += '       <h3>' + value.title + '</h3>';
              blogList += '   </div>';
              blogList += '   <div class="shade"></div>';
              blogList += '   <img class="content-banner" src="">';
              blogList += '</a>';
              $("#pinned-blog").html(blogList);
            }else{
              let blogList = '';
              blogList += ' <a href="' + value.link + '">';
              blogList += '   <div class="content-link">';
              blogList += '       <p><i class="fas fa-fire"></i> &nbsp;New Code! </p>';
              blogList += '       <h3>' + value.title + '</h3>';
              blogList += '   </div>';
              blogList += '   <div class="shade"></div>';
              blogList += '   <img class="content-banner" src="">';
              blogList += '</a>';
              $("#pinned-blog").html(blogList);
            }

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

function latestBlog(blogOnLoad) {
  let blogList = "";
  $.getJSON(blogData, function (data) {
    theBlogList = data.reverse();
    var i;
    for (i = 0; i < blogOnLoad; i++) {
      var value = theBlogList[i];
      blogDataLength = Object.keys(data).length;
      var releaseDate = new Date(value.date);
      var releaseYear = releaseDate.getFullYear();
      var eta = getETA(new Date(), releaseDate);
      var diff = releaseDate - new Date();
      let day3 = 3 * 24 * 60 * 60 * 1000;

      // if already released
      if (diff < 0) {
        blogList += '<a href="' + value.link + '" class="items">';
        blogList += '       <div class="info"><i class="' + value.tags + '"></i></div>';
        blogList += '       <div class="title">' + value.title + "</div>";
        blogList += " </a>";
      }else{
        console.log(diff);
      }
    }

    // write to #latest-music
    if (blogOnLoad < blogDataLength) {
      blogList +=
        '<a id="see-more2" name="see-more2" class="see-more">see more</a>';
    }

    $("#more-update").html(blogList);
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