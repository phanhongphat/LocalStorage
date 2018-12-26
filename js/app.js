

//add event save tweet
document.querySelector('#form').addEventListener('submit',newTweet);
document.querySelector('#tweet-list').addEventListener('click',removeTweet);
document.addEventListener('DOMContentLoaded', localStorageOnLoad);

function newTweet(e){
	e.preventDefault();

	//read content of the textarea
	const text = document.querySelector('#tweet').value;

	const li = document.createElement('li');
	//add content to <div> My tweet
	li.textContent = text;
	const addTweet = document.querySelector('#tweet-list').appendChild(li);

	//remove button
	const remove = document.createElement('a');
	remove.textContent = 'X';
	remove.classList = 'remove-tweet';
	li.appendChild(remove);

	//add tweet to localstorage 
	addTweetLocalStorage(text);
}
	//add remove event to button
function removeTweet(e){
	e.preventDefault();
	if(e.target.classList.contains('remove-tweet')){
		e.target.parentElement.remove();
	}

	removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(text){
	let tweets = getTweetsLocalStorage();
	//add the tweet into the array tweets
	tweets.push(text);

	//convert tweets array to string 
	localStorage.setItem('tweets',JSON.stringify(tweets));
}

function getTweetsLocalStorage(){
	let data;
	const tweetsLS = localStorage.getItem('tweets');

	//get values tweets
	if(tweetsLS === null){
		data = [];
	} else {
		data = JSON.parse(tweetsLS);
	}
	return data;
}

function localStorageOnLoad() {
	let info = getTweetsLocalStorage();

	//loop to print values from localStorage
	info.forEach(function(text){
		const li = document.createElement('li');
		//add content to <div> My tweet
		li.textContent = text;
		document.querySelector('#tweet-list').appendChild(li);

		//remove button
		const remove = document.createElement('a');
		remove.textContent = 'X';
		remove.classList = 'remove-tweet';
		li.appendChild(remove);
	});
}

function removeTweetLocalStorage(text) {
	//get array tweets from local storage
	let tweets = getTweetsLocalStorage();

	//remove X from each line
	const tweetDelete = text.substring(0,text.length -1);
	console.log(text);

	tweets.forEach(function(tweetLS,index){
		if(tweetDelete === tweetLS){
			tweets.splice(index, 1);
		}
	});
	//save data 
	localStorage.setItem('tweets', JSON.stringify(tweets));
}