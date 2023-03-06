var json = []
var wybranaStolica
var kraj
var liczbaPunktow = 0
var liczbaBledow = 0
var pozostalobledow = 5

async function getData() {
  const data = await fetch("https://restcountries.com/v2/all")
  json = await data.json()
  console.log(json)
}

getData()

function losowanie() {
  var max = json.length - 1
  return Math.floor(Math.random() * max);
}

function losujKraje() {
  document.getElementById("interface").innerHTML = ""
  document.getElementById("gra").innerHTML = ""

  kraj = json[losowanie()]
  console.log(kraj)

  var divKraj = document.createElement("div")

  divKraj.setAttribute("id", "kraj")
  divKraj.classList.add("flip-in-diag-2-tl")

  const nazwaKraj = document.createElement("h1")
  nazwaKraj.innerHTML = kraj.name

  const flagaKraj = document.createElement("img")
  flagaKraj.setAttribute("src", kraj.flag)

  var odpowiedz = document.createElement("input")
  odpowiedz.setAttribute("id", "Odpowiedz")
  odpowiedz.setAttribute("onchange", "sprawdzOdp()")

  divKraj.appendChild(nazwaKraj)
  divKraj.appendChild(flagaKraj)
  divKraj.appendChild(odpowiedz)
  document.getElementById("gra").append(divKraj)
  console.log(kraj.capital)

  gra.style.backgroundColor = "darkgray"
  interface.style.backgroundColor = "dimgray"
}

function resetPunktow() {
  liczbaPunktow = 0
  liczbaBledow = 0
  pozostalobledow = 5
  console.log(liczbaPunktow)
  console.log(liczbaBledow)
  console.log(pozostalobledow)
}

function sprawdzOdp() {
  wybranaStolica = Odpowiedz.value
  console.log(wybranaStolica)
  console.log(kraj.capital)
  if (wybranaStolica == kraj.capital) {
    console.log("dobrze")
    setTimeout(losujKraje(), 1000)
    liczbaPunktow++
    console.log(liczbaPunktow)
  }
  else {
    console.warn("zle")
    setTimeout(losujKraje(), 1000)
    liczbaBledow++
    pozostalobledow = pozostalobledow - 1
    console.log(liczbaBledow)
  }
  var interfejsDobrze = document.createElement("h1")
  var interfejsZle = document.createElement("h1")
  interfejsDobrze.setAttribute("id", "interfejsinfo")
  interfejsDobrze.innerHTML = "Twoja ilosc punktow to: " + liczbaPunktow
  interfejsZle.setAttribute("id", "interfejsinfo")
  interfejsZle.innerHTML = "Mozesz popelnic jeszcze: " + pozostalobledow + " bledow"
  interface.appendChild(interfejsDobrze)
  interface.appendChild(interfejsZle)

  if (pozostalobledow === 0) {
    document.getElementById("gra").innerHTML = ""
    document.getElementById("interface").innerHTML = ""
    document.getElementById("gra").style.backgroundColor = "red"
    document.getElementById("interface").style.backgroundColor = "red"
    document.getElementById("gra").style.border = 0
    var przegranaNapis = document.createElement("h1")
    przegranaNapis.innerHTML = "PRZEGRAŁES"
    przegranaNapis.setAttribute("id", "przegrales")
    gra.appendChild(przegranaNapis)
    var przegranaDalej = document.createElement("button")
    przegranaDalej.setAttribute("id", "przegralesdalej")
    przegranaDalej.setAttribute("onclick", "losujKraje()")
    przegranaDalej.setAttribute("onmouseover", "resetPunktow()")

    przegranaDalej.innerHTML = "od nowa"
    interface.appendChild(przegranaDalej)
  }
}