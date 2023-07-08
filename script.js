const containerQuote = document.getElementById("container-quote");
const quoteAuthor = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterButton = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quoteBtn");
const loader= document.getElementById("loader");

let apiQuote = [];
 function showLoading(){
   loader.hidden= false;
   containerQuote.hidden=true;
 }
 function hideLoading(){
   loader.hidden= true;
   containerQuote.hidden=false;
 }



// making  function to get random quotes.
function newRandomQuote() {
   showLoading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // If  author is "unknown"
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
  //  if length of quote is greater than 75 words than text-size will be smaller
  if (quote.text.length > 75) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoading(); 
}

async function getQuote() {
   showLoading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const respone = await fetch(apiUrl);
    apiQuote = await respone.json();
    newRandomQuote();
  } catch (error) {}
}
// function for tweet quote using twitter btn.
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;

  window.open(twitterUrl, "_blank");
}

// applying EventListner to the buttons

twitterButton.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newRandomQuote);

// on loading the site we execute this function
getQuote();
// showLoading();
