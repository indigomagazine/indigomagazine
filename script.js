$(document).ready(function() {
  //this func is to change the tabs. for example, clicking on the about tab will only change the content of the page, it won't change the whole page. The top part (nav bar + logo) and bottom part (contact us) stays the same.
  $("a").click(function() {
    if ($(this).hasClass("LOGO")) {
      window.location.reload();//$(".content-box").load("HOME.html");
    } else if ($(this).text() == 'PEOPLE\'S PICK') {
      $(".content-box").load("PEOPLESPICK.html");
    } else if ($(this).text() == 'THE CULTURE') {
      $(".content-box").load("THECULTURE.html");
    } else if ($(this).text() == 'VISUAL ARTS') {
      $(".content-box").load("FREEVISUALSERIES.html");

      // loads article1.html when an <a> tag with class="article1" is clicked free-img
    } else if ($(this).hasClass("article1")) {
      $(".content-box").load("Articles/article1.html");
    }else if ($(this).hasClass("free-img")) {
      $(".content-box").load("FREEVISUALSERIES.html");
    } else if ($(this).hasClass("article2")) {
      $(".content-box").load("Articles/article2.html");
    } else if ($(this).hasClass("article3")) {
      $(".content-box").load("Articles/article3.html");
    } else if ($(this).hasClass("article4")) {
      $(".content-box").load("Articles/article4.html");
    } else if ($(this).hasClass("article5")) {
      $(".content-box").load("Articles/article5.html");
    } else if ($(this).hasClass("article6")) {
      $(".content-box").load("Articles/article6.html");
    } else if ($(this).hasClass("article7")) {
      $(".content-box").load("Articles/article7.html");
    } else if ($(this).hasClass("article8")) {
      $(".content-box").load("Articles/article8.html");
    } else if ($(this).hasClass("7deadlySins")) {
      $(".content-box").load("Articles/7deadlySins.html");
    } else if ($(this).hasClass("article9")) {
      $(".content-box").load("Articles/article9.html");
    } else if ($(this).hasClass("DoHumansLiveInFear")) {
      $(".content-box").load("Articles/doHumansLiveInFear.html");
    }else if ($(this).hasClass("ghostOfMidterms")) {
      $(".content-box").load("Articles/GhostOfMidterms.html");
    } else if ($(this).hasClass("lostMuseum")) {
      $(".content-box").load("Articles/IThinkILostTheMuseum.html");
    }
      else if ($(this).hasClass("transnessInHorror")) {
      $(".content-box").load("Articles/TransnessInHorror.html");
    }
      else if ($(this).hasClass("theLittleDagger")) {
      $(".content-box").load("Articles/TheLittleDagger.html");
    }
    else if ($(this).hasClass("ofCreaturesWhoWhisper")) {
      $(".content-box").load("Articles/ofCreaturesWhoWhisper.html");
    }
    else if ($(this).hasClass("veniVidi")) {
    $(".content-box").load("Articles/veniVidiTimui.html");
    }
    else if ($(this).hasClass("medusa")) {
    $(".content-box").load("Articles/medusa.html");
    }
    else if ($(this).hasClass("fallacy")) {
    $(".content-box").load("Articles/fallacy.html");
    }
    else if ($(this).hasClass("psych")) {
    $(".content-box").load("Articles/psychOfFear.html");
    }
    else if ($(this).hasClass("haunted")) {
    $(".content-box").load("Articles/haunted.html");
    }
    else if ($(this).hasClass("manjiri")) {
      $(".content-box").load("Articles/Manjeri.html");
      }
    else {
      $(".content-box").load($(this).text() + ".html");
    }
  })


  // Initialize and add the map
  function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }


  //image overlay



  // slideshow


  // flipbook
  // References to DOM Elements
  const prevBtn = document.querySelector("#prev-btn");
  const nextBtn = document.querySelector("#next-btn");
  const book = document.querySelector("#book");

  const paper1 = document.querySelector("#p1");
  const paper2 = document.querySelector("#p2");
  const paper3 = document.querySelector("#p3");
  const paper4 = document.querySelector("#p4");
  const paper5 = document.querySelector("#p5");
  const paper6 = document.querySelector("#p6");

  // Event Listener
  prevBtn.addEventListener("click", goPrevPage);
  nextBtn.addEventListener("click", goNextPage);

  // Business Logic
  let currentLocation = 1;
  let numOfPapers = 6;
  let maxLocation = numOfPapers;

  function openBook() {
    book.style.transform = "translateX(0%)";
    prevBtn.style.transform = "translateX(0vmax)";
    nextBtn.style.transform = "translateX(0vmax)";
  }

  function closeBook(isAtBeginning) {
    if (isAtBeginning) {
      book.style.transform = "translateX(0%)";
    } else {
      book.style.transform = "translateX(0%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
  }

  function goNextPage() {
    if (currentLocation < maxLocation) {
      switch (currentLocation) {
        case 1:
          openBook();
          paper1.classList.add("flipped");
          paper1.style.zIndex = 1;
          break;
        case 2:
          paper2.classList.add("flipped");
          paper2.style.zIndex = 2;
          break;
        case 3:
          paper3.classList.add("flipped");
          paper3.style.zIndex = 3;
          break;
        case 4:
          paper4.classList.add("flipped");
          paper4.style.zIndex = 4;
          break;
        case 5:
          paper5.classList.add("flipped");
          paper5.style.zIndex = 5;
          break;
        case 6:
          paper6.classList.add("flipped");
          paper6.style.zIndex = 6;
          closeBook(false);
          break;
        default:
          throw new Error("unkown state");
      }
      currentLocation++;
    }
  }

  function goPrevPage() {
    if (currentLocation > 1) {
      switch (currentLocation) {
        case 2:
          closeBook(true);
          paper1.classList.remove("flipped");
          paper1.style.zIndex = 6;
          break;
        case 3:
          paper2.classList.remove("flipped");
          paper2.style.zIndex = 5;
          break;
        case 4:
          paper3.classList.remove("flipped");
          paper3.style.zIndex = 4;
          break;
        case 5:
          paper4.classList.remove("flipped");
          paper4.style.zIndex = 3;
          break;
        case 6:
          paper5.classList.remove("flipped");
          paper5.style.zIndex = 2;
          break;
        case 7:
          openBook();
          paper6.classList.remove("flipped");
          paper6.style.zIndex = 1;
          break;
        default:
          throw new Error("unkown state");
      }

      currentLocation--;
    }
  }

});
