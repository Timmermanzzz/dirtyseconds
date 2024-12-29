export const wordsList = [
  // Sport & Spel
  "voetbal", "tennis", "hockey", "zwemmen", "schaatsen",
  "basketbal", "volleybal", "schaken", "dammen", "rennen",
  
  // Dieren
  "olifant", "giraffe", "leeuw", "tijger", "aap",
  "pinguïn", "dolfijn", "walvis", "zeehond", "krokodil",
  
  // Eten & Drinken
  "pizza", "pasta", "hamburger", "friet", "sushi",
  "koffie", "thee", "limonade", "water", "wijn",
  
  // Voorwerpen
  "telefoon", "computer", "televisie", "lamp", "tafel",
  "stoel", "bank", "bed", "kast", "spiegel",
  
  // Vervoer
  "auto", "fiets", "bus", "trein", "vliegtuig",
  "boot", "helikopter", "scooter", "skateboard", "step",
  
  // Beroepen
  "dokter", "leraar", "politie", "brandweer", "kok",
  "piloot", "kapper", "bakker", "slager", "kunstenaar",
  
  // Natuur
  "boom", "bloem", "gras", "berg", "strand",
  "zee", "rivier", "maan", "zon", "ster",
  
  // Kleding
  "broek", "trui", "jas", "schoenen", "sokken",
  "muts", "sjaal", "handschoenen", "jurk", "rok"
]

export const getRandomWords = (count) => {
  const shuffled = [...wordsList].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
} 