window.onload = function() {
	loadPlaylist();
}

function loadPlaylist() {
	var requestParams = {
		'part': 'snippet',
		'mine': true,
		// 'key':'904085981881-hc7lbkqffif298g3nginv5p1011k6g0f.apps.googleusercontent.com',
	};

	// var xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = function() {
	// 	if (xhr.readyState == 4 && xhr.status == 200) {
	// 		document.getElementById("demo").innerHTML = xhr.responseText;
	// 	}
	// }; // Implemented elsewhere.
	// console.log("https://www.googleapis.com/youtube/v3/playlists" + "?" + jsonToGetParams(requestParams));
	// xhr.open("GET", "https://www.googleapis.com/youtube/v3/playlists" + "?" + jsonToGetParams(requestParams), true);
	// xhr.send();

	xhrWithAuth('https://www.googleapis.com/youtube/v3/playlists" + "?" + jsonToGetParams(requestParams)', function(a, b, c) {
		console.log(a);
		console.log(b);
		console.log(c);
	})

}

function jsonToGetParams(jsonObject) {
	return Object.keys(jsonObject).map(function(k) {
		return encodeURIComponent(k) + '=' + encodeURIComponent(jsonObject[k])
	}).join('&')
}

// @corecode_begin getProtectedData
function xhrWithAuth(url, callback) {
	var access_token;
	var retry = false;
	getToken();

	function getToken() {
		chrome.identity.getAuthToken({ interactive: false }, function(token) {
			if (chrome.runtime.lastError) {
				callback(chrome.runtime.lastError);
				return;
			}
			access_token = token;
			alert(token);
			// requestStart();
		});
	}

	function requestStart() {
		var xhr = new XMLHttpRequest();
		xhr.open(get, url);
		xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
		xhr.onload = requestComplete;
		xhr.send();
	}

	function requestComplete() {
		if (this.status == 401 && retry) {
			// retry = false;
			// chrome.identity.removeCachedAuthToken({ token: access_token },
			// 	getToken);
		} else {
			callback(null, this.status, this.response);
		}
	}
}

