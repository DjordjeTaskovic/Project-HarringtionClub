window.onerror = function (msg, url, line) {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + line
    ].join(' - ');
    console.log(message);
  return false;
};
$(document).ready(function(){

  let product;

  function Pozoviprekoajaxa(jsonlink,nazivfungcije){
    $.ajax({
      url:jsonlink,
      type:"get",
      dataType:"json",
      success:function(podaci){
        nazivfungcije(podaci);
      },
      error:function(xhr,error,status)
    {console.log(error)}
      
    });
  }
  $.ajax({
  url:"json/Gallery.json",
  type:"get",
  dataType:"json",
  success:function(gall){
    product = gall;
    Prikazigaleriju(gall);//galeispis
    booking(gall);
   openmodal(gall);//modal
   modalispis(gall);//modelispis
  },
  error:function(xhr,error,status)
{console.log(error)}
  });

//Provera podataka forme
forma();
function forma(){
  if($(".forma").length){
    let podaciForme = [];
  let Dugme = $('#dugme');

Dugme.on('click',function(){
  let fname = $('#firstname');
  let lname = $('#lastname');
  let email = $('#email');
  let password = $('#password');
  let datum = $('#datum');
  let ddl=$("#ddlprof");
let fnameRe=/^[A-Z]\w{1,9}$/;//Tonmawwq{8 karaktera}
let lnameRe=/^\w{2,13}(\w{2,13})*$/;//Tonmawwq{12 karaktera}
let emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;//test@gmail.edu.com
let passRe=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;//min 8 karaktera, i jedan broj i jedno slovo:

  var spremno = true;
    function Proveriparametar(parametar,regex,primer) {
      if(parametar.val() == ''){ 
        spremno = false;
        parametar.val("");
        parametar.next().text('The field can not be empty.');
    }
     else if(!regex.test( parametar.val() ) ) {
      parametar.val("");
      parametar.next().text('Eg:'+primer);
    }
     else{
        podaciForme.push(parametar.val());
        parametar.next().text('');
        }
    }//proveri
    Proveriparametar(fname,fnameRe,"Nathaniel");
    Proveriparametar(lname,lnameRe,"Woodenstock");
    Proveriparametar(email,emailRe,"test@gmail.edu.com");
    Proveriparametar(password,passRe,"Thisismypasshere9");
  
    //datum i profesija
    if(datum.val() =='') { 	 
      spremno = false;
      datum.val("");
      datum.next().text('You have to choose a date.');
      }
      else{
        podaciForme.push(datum.val());
        datum.next().text('');
      }
      if(ddl.val() == 0){ 
        spremno = false;
        ddl.next().text('You have to select something.');
        }
        else{
          podaciForme.push(ddl.val());
        ddl.next().text('');
        }
      if(spremno){
        console.log("Podaci su uspesno provereni izrazima.")
        $("#poruka").html("You have become a member!");
      }

});
 }

}//forma
FormStorge();
function FormStorge(){

  $("#button_contact").click(function() {
    var ime = $("#contactName");
    var email = $("#contactEmail");
    var poruka = $("#contactMessage");

    var spremno = true;
    let nameRe=/^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
    let emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let store = [];
    function Proveriparametar(parametar,regex,primer) {
      if(parametar.val() == ''){ 
        spremno = false;
        parametar.val("");
        parametar.next().text('The field can not be empty.');
    }
     else if(!regex.test( parametar.val())){
      spremno = false;
      parametar.val("");
      parametar.next().text('Eg:'+ primer);
    }
     else{
       parametar.next().text('');
       store.push(parametar.val());
        }
    }//proveri
    Proveriparametar(ime,nameRe,"Nathaniel Baker");
    Proveriparametar(email,emailRe,"freepost@gmail.com");

    //poruka
    if(poruka.val() == ''){ 
      spremno = false;
      poruka.val("");
      poruka.next().text('The field can not be empty.');
  }
   else{
    poruka.next().text('');
    store.push(poruka.val());
      }


   if(spremno){

    var ime = $("#contactName").val();
    var email = $("#contactEmail").val();
    var poruka = $("#contactMessage").val();

    store = ({ ime, email, poruka});
   console.log(store, "Podaci su upisani u localStorage.");

     $('#contact-message').html('Your contact message has been send!');

    localStorage.setItem("podaci_contact",JSON.stringify(store));
   }

    });

}
meni();
function meni(){
  Pozoviprekoajaxa("json/Meni.json", prikazfnameni);
	
	function prikazfnameni(data){
    var ul = document.createElement("ul");
    ul.classList.add('navbar-nav','ml-auto','font-weight-bold');
        let ispis="";
          if($(".forma").length || $("#author").length ||  $("#cart-ispis").length ){
            for(let i in data){
              ispis+=`  
                  <li class="nav-item">
                  <a class="nav-link" href="index.html${data[i].putanja}">${data[i].naziv}</a>
                  </li>`
                   }
             }
          else{
            for(let i in data){
              ispis+=`  
                  <li class="nav-item">
                  <a class="nav-link" href="${data[i].putanja}">${data[i].naziv}</a>
                  </li>`
                   }
          }
          ul.innerHTML+=ispis;
         // console.log(ul)
		   var Nav = document.querySelector('#navbarNav');
		     Nav.append(ul);


}// meni prikaz

 // fixed navbar
 fixedNav(); 
 function fixedNav(){
  $(window).scroll(function(){
    var sticky = $('#start'),
    scroll = $(window).scrollTop();
  
    if (scroll < 500){
      $('.navbar').removeClass('fixednav');
    } 
    else if (scroll >= 500){
      $('.navbar').addClass('fixednav');
    } 
  });
 }


}//meni
intro();
function intro(){

  Pozoviprekoajaxa("json/Intro.json", prikaziCourse);
	
	function prikaziCourse(data){

        let ispis="";
        for (let i in data) {
            ispis+=`<div class="col-md-5  coursein d-flex justify-content-center">
            <a href="${data[i].putanja}" data-target="_blank" class="zumiranje">
             <img src="${data[i].putanja}"  alt="${data[i].nazivslike}"/></a>
            </div>
            <div class="col-md-5">
              <h1>${data[i].naslov}</h1>
              <br>
              <p>${data[i].opis.textprvi}
              </p>
               <p id= "promenatext">
                  ${data[i].opis.textdrugi}
                     </p>
                  <hr class="whiteline2"/>
                  <div class="d-flex justify-content-center">
                   <button id="showmore" class="btn btn-secondary btn-md dugme2" >Show more..</button>
                 </div>
            </div>`
        }
        //console.log(ispis)

        if($('#course').length){
          var Course = document.querySelector("#course>.row");
         Course.innerHTML=ispis;
         }
         //hide some text 
         var texttohide = $('#promenatext');
         texttohide.hide();
         var more = $('#showmore').on("click",function() {
          texttohide.toggle("2000");
         })

	}

}
services();
function services(){
  Pozoviprekoajaxa("json/Services.json", Prikaziservise);
	
	function Prikaziservise(data){

        let ispis="";
        for (let i in data) {
            ispis+=`
            <div class="col-lg-3 col-md-5 col-sm-12 services">
            <div class="col-12 bg-white">
                  <h3>${data[i].naslov}</h3>
                  <hr class="heading-underline"/>
                  <p>${data[i].opis}</p>
              </div>
               <div class="col-12 p-0 zumiranje">
                      <a><img class="img-fluid" src="${data[i].putanja}" alt="${data[i].nazivslike}"/>
                      </a>
              </div>
        
            </div> `
        }
        //console.log(ispis)
        if($("#sevicesinner").length){
          var Divservis = document.querySelector("#sevicesinner");
        Divservis.innerHTML=ispis;
        }
        
    }
    

}
function Prikazigaleriju(data){
      let ispis="";
      for (let i in data){

          ispis+=`
          <div class="col-lg-4 col-md-6 gallery-item card${data[i].dugmeid} filter${data[i].filterisanje}">
          <div class="gallery-wrap">
              <img src="img/gallery/${data[i].slika}" class="img-fluid" alt="${data[i].nazivslike}">
                  <div class="gallery-info">
                      <h4>${data[i].naziv}</h4>
                      <p>${data[i].skraceniopis}</p>
                      <div class="gallery-links">
                      <a href="#gallery" class="modal-btn"
                       data-id="${data[i].dugmeid}"><b>View more</b></a>
                      </div>
                  </div>
          </div>
          <div class='gallery-desc'>
              <button class="btn dugme3 cart-btn" data-id="${data[i].dugmeid}">
              <i class="fa fa-external-link" aria-hidden="true">
              </i>Book now</button>
              <p>Price:$${data[i].cena}</p>
          </div>
      </div>`
      }
      //console.log(ispis)
      if($(".galleryispis").length){
        var Divgallery = document.querySelector(".galleryispis > .row");
      //console.log(Divgallery)
      Divgallery.innerHTML=ispis;
    }
}//galle
Pozoviprekoajaxa("json/FilterGall.json",Prikazibuttons);
  function Prikazibuttons(data){
    let ispis="";
    for (let i in data){
      if(i==0){
        ispis+=`<li data-id="${data[i].filter}" class='filter-active'>${data[i].filternaziv}</li>`
      }else{
        ispis+=`<li data-id="${data[i].filter}">${data[i].filternaziv}</li>`
      }
     }
    ispis+=`
    <a name="sortiraj" id="gallery-sort">
    <p>Sort by Price<i class="fas fa-arrow-down"></i></p>
        <div id="option-div">
        <p class="option-item" id="LH">Lower<i class="fa fa-arrow-right" aria-hidden="true"></i>Higher</p>
        <p class="option-item" id="HL">Higher<i class="fa fa-arrow-right" aria-hidden="true"></i>Lower</p>
          </div>
    </a>
    <li><a href="booking.html"><i class="fas fa-shopping-cart mr-3"></i>Your Booking's</a></li>
  `
 if($("#gallery-flters").length){
    var Divfilters = $("#gallery-flters > ul");
    Divfilters.prepend(ispis);
  }

  //Sort DDL 
  $("#option-div").hide();
  $("#gallery-sort").click(function(){
    $("#option-div").toggle("2000");
  });
//sortiranje po ceni
SortiranjepoCeni();
function SortiranjepoCeni(){
  var ddloption = $("#option-div > .option-item");
 // console.log('nestio')

  ddloption.on("click",function(){
    var id = $(this).attr("id");
     console.log(id)//LH-----HL
    
     var noviniz;
   if(id == "LH")
   {
    noviniz = product.sort(function (a, b) {
      if (a.cena < b.cena) return -1;
      if (a.cena > b.cena) return 1;
    });
   }
   else if(id == "HL")
   {
    noviniz = product.sort(function (a, b) {
      if (a.cena < b.cena) return 1;
      if (a.cena > b.cena) return -1;
        });
   }
   console.log(noviniz)
  Prikazigaleriju(noviniz);
 
   })//event
  
}
}//buttons 
about();
function about(){
  Pozoviprekoajaxa("json/About.json", prikaziAbout);

	function prikaziAbout(data){
        let ispis = "";
          for(let i in data){
            ispis+=`
            <div class="col-md-4 about-item">
            <h3>${data[i].naslov}</h3>
            <p class="lead">${data[i].text}</p><br>
            <hr class="whiteline2"/>

          </div>`
          }
        //ispisivanje
		   if($("#about").length){
        var Divabout = document.querySelector('#about>.dark-background>.row');
        Divabout.innerHTML+=ispis;
       }
       // console.log(ispis)
         
		
	}
}
//FUngcija modalispis
function modalispis(mod){
  var ispis ="";
   for (var i in mod){
    ispis+=`
    <div class="popup-modal modal-div card${mod[i].dugmeid}">	

    <div class="col-12 p-0 media">
      <img src="img/gallery/${mod[i].slika}" alt="${mod[i].slikanaziv}" class="img-fluid"/>
    </div>      	

  <div class="col-12 description-box">
     <h4>${mod[i].naziv}</h4>		
     <p>${mod[i].filterisanje}</p>
     <p>${mod[i].siriopis}</p>
     
  </div>
  <div class="col-12 price-box">
  </div>
    <div class="col-12 p-0 link-box">
     <a href="#gallery" class="popup-modal-dismiss">Close</a>
    </div>		      

</div>
    `
   }
    if($('.modal-in').length){
      var Divmodal = document.querySelector(".modal-in");
    Divmodal.innerHTML=ispis;
    }
//console.log(ispis)
//console.log("ispismodal")

 }
 members();
function members(){
  Pozoviprekoajaxa("json/Members.json", prikaziOsnivace);
   
	function prikaziOsnivace(data){
        let ispis = "";
          for(let i in data){
           if(i==2||i==3){
            ispis+=`<div class="col-lg-6 col-md-12 members">
            <div class="row" data-id="${data[i].id}">
               
              <div class="col-md-8">
                <blockquote>
                  <i class="fas fa-quote-left"></i>
                  ${data[i].opis}
                  <hr class="members-hr"/>
                  <p class="font-italic members-name"> ${data[i].potpis}</p>
                </blockquote>
              </div>
              <div class="col-md-4 col-sm-10 zumiranje">
              <img src="${data[i].putanja}" alt="${data[i].nazivslike}"/>
            </div>
              
            </div>
          </div> `

           }
           else{
            ispis+=`<div class="col-lg-6 col-md-12 members">
            <div class="row" data-id="${data[i].id}">
                <div class="col-md-4 zumiranje">
                    <img src="${data[i].putanja}" alt="${data[i].nazivslike}"/>
                  </div>
              <div class="col-md-8">
                <blockquote>
                  <i class="fas fa-quote-left"></i>
                  ${data[i].opis}
                  <hr class="members-hr"/>
                  <p class="font-italic members-name"> ${data[i].potpis}</p>
                </blockquote>
              </div>
              
            </div>
          </div> `
           }
          }
       // console.log(ispis)
       if($("#members").length){
        var Divosnivaci=document.querySelector("#members>.narrow>.row");
        Divosnivaci.innerHTML=ispis;
       }
       
       
 }
}
utilities();
function utilities(){
  Pozoviprekoajaxa("json/Utilities.json", prikaziVozila);

	function prikaziVozila(data){
        let ispis = [];
          for(let i in data){
          if(i==0){
            ispis+=`<div class="carousel-item active">
            <img class="d-block w-75  m-auto" src="${data[i].putanja}" alt="${data[i].slika}">
            <div class="carousel-caption d-none d-md-block slidertext">
                <h5 class="display-3">${data[i].naziv}</h5>
                <p>${data[i].opis}</p>
              </div>
          </div> `
          }
          else{
            ispis+=`<div class="carousel-item">
            <img class="d-block w-75  m-auto" src="${data[i].putanja}" alt="${data[i].slika}">
            <div class="carousel-caption d-none d-md-block slidertext">
                <h5 class="display-3">${data[i].naziv}</h5>
                <p>${data[i].opis}</p>
              </div>
          </div> `
          }
          }
      // console.log(ispis)
      if($(".carousel-inner").length){
        var divvozilo =document.querySelector(".carousel-inner");
       divvozilo.innerHTML=ispis;
      }
    }
}
//filter
Pozoviprekoajaxa("json/FilterGall.json",newgallniz);
function newgallniz(){
var filter = $("#gallery-flters > ul > li");
//console.log("li",filter)
var gallediv = $(".galleryispis");
filter.on("click",function (){
  id = $(this).attr('data-id');
  console.log("filterid",id)
  const noviniz = product.filter(function(item) {
    if(item.filterisanje == id){
      return item;
     }
   });
 // console.log("noviniz",noviniz)
  if(id=='all'){
    Prikazigaleriju(product);
  }else{
    Prikazigaleriju(noviniz);
  }
   });
  }


 //MODAL
function openmodal(){
    var modaldugme = $(".modal-btn");
  //  console.log(modaldugme)
    // console.log("hello")

     var modal = $("#my-modal");
     modaldugme.click(function (){

       var ID = $(this).attr("data-id");
       console.log(ID)
       modal.show();

     $('.modal-div').hide();
     $('.card'+ID).show("2000")
     })
   
   $(".close").click(function(){
     modal.hide();
   });
   $("#my-modal").click(function(){
     modal.hide();
   })
   
}


function booking(){
  //console.log("carttest")
function postavikolacic(name, value, days){
  let datum = new Date();
  datum.setTime(datum.getTime() + (days*24*60*60*1000));
  let expires = "expires=" + datum.toUTCString();
  document.cookie = name + "=" + value + ";" + expires; 
}
$(".cart-btn").on("click",function(){
  alert('You have booked the selection.');
   var id = $(this).data('id');
   console.log(id)
  var item = document.querySelector('.card'+id);
//gallery-item
  var cena = item.querySelector('.gallery-desc').querySelector('p').textContent.split('$')[1];
  var naziv = item.querySelector('h4').textContent;
  var opis = item.querySelector('p').textContent;
  var slika = item.querySelector('img').getAttribute("src").split('/')[2];
  // img/gallery/nesto
  console.log(cena,naziv,opis,slika);
  let cart = [];
  const booking = document.cookie.split("; ")[0];
 // console.log(booking);
  if(booking){
    cart = JSON.parse(booking.split("=")[1]);
  }
  if(cart.some(x => x.naziv == naziv)) {
    var found = cart.find(x => x.naziv == naziv);
      found.kolicina++;
      
       var incena = found.cena;
      var inkol = found.kolicina;
      
      console.log(incena,inkol);
      if(inkol > 1){
        alert("You cannot select the same room more times.");
        found.kolicina = 1;
      }
      console.log(found.kolicina);
  } 
  
  else 
  {
    cart.push({naziv,opis,slika, cena, kolicina: 1});
  }
  postavikolacic("booking", JSON.stringify(cart), 4);
  // Niz pretvaramo u string.

})//event
upisikolacic();
  function upisikolacic(){
    const booking = document.cookie.split(";")[0];
   
    if(booking){
      var cookievrednosti =  JSON.parse(booking.split("=")[1]);
      console.log(cookievrednosti);
            let ispis = '';
          for(const item of cookievrednosti){
            ispis+=`<tr class="cart-item">
                    <td><h4>${item.naziv}</h4></td>
                    <td><p>${item.opis}</p></td>
                    <td class="d-flex justify-content-center">
                    <img src="img/gallery/${item.slika}" 
                    alt="cartslika" class="w-25">
                    </td>
                    <td><h4>$${item.cena}</h4></td>
                  <td><h4>${item.kolicina}</h4></td>
                  </tr>
                   `;
                  }
     
              if($('#cart-ispis').length){
                var div = document.querySelector('#cart-ispis');
                      div.innerHTML = ispis;
              }
      
                $('.cart-obrisi').click(function () {
                     postavikolacic("booking", null, -1);
                     upisikolacic();
                  });

         }//if(booking)
         else{
                 ispis = "<td><h5>Your list is empty.</h5></td>"
                if($('#cart-ispis').length){
                   var div = document.querySelector('#cart-ispis');
                 div.innerHTML = ispis;
                   }
            }//else
}

}
});//ready












