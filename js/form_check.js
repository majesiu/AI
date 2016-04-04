function isEmpty(p){
	if(p.length == 0) return true
		if(isWhiteSpace(p) == true) return true
			else return false
		}

function showElement(e) {
	document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
	document.getElementById(e).style.visibility = 'hidden';
}


function checkString(p,t){
	if(isEmpty(p)) {
		alert(t)
		return true
	}	
	else return false

}

function checkStringAndFocus(obj, msg) {
	var str = obj.value;
	var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
	if (isWhiteSpace(str) || isEmpty(str)) {
		document.getElementById(errorFieldName).innerHTML = msg;
		obj.focus();
		return true;
	}
	else {
		startTimer(errorFieldName);
		return false;
	}
}

function checkEmail(str) {
	if (isWhiteSpace(str)) {
		alert("Podaj właściwy e-mail");
		return false;
	}
	else {
		var at = str.indexOf("@");
		if (at < 1) {
			alert("Nieprawidłowy e-mail");
			return false;
		}
		else {
			var l = -1;
			for (var i = 0; i < str.length; i++) {
				var c = str.charAt(i);
				if (c == ".") {
					l = i;
				}
			}
			if ((l < (at + 2)) || (l == str.length - 1)) {
				alert("Nieprawidłowy e-mail");
				return false;
			}
		}
		return true;
	}
}

function checkEmailRegEx(str) {
	var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
	if (email.test(str))
		return true;
	else {
		alert("Podaj właściwy e-mail");
		return false;
	}
}

function checkZIPCodeRegEx(str) {
	var zipcode = /[0-9]{2}-[0-9]{3}/;
	if(zipcode.test(str)) {
		document.getElementById("kod").innerHTML = "OK";
		document.getElementById("kod").className = "green";
		return false
	}
	else {
		document.getElementById("kod").innerHTML = "Nope";
		document.getElementById("kod").className = "red";
		return true
	}
}

var errorField = "";
function startTimer(fName) {
	errorField = fName;
	window.setTimeout("clearError(errorField)", 2000);
}
function clearError(objName) {
	document.getElementById(objName).innerHTML = "";
}

function validate(f){
	if(	checkStringAndFocus(f.elements["f_imie"],"Podaj imię!") ||
		checkStringAndFocus(f.elements["f_nazwisko"],"Podaj nazwisko!") ||
		checkStringAndFocus(f.elements["f_kod"],"Podaj kod!") ||
		checkStringAndFocus(f.elements["f_ulica"],"Podaj ulicę!") ||
		checkStringAndFocus(f.elements["f_miasto"],"Podaj miasto!") ||
		(!checkZIPCodeRegEx(f.elements["f_email"].value))) {
			var els = f.elements
			for (var i = 0, el; el = els[i++];){
				el.className = "wrong";
			}
			return false
	}
	else return true
}

function isWhiteSpace(str) {
	var ws = "\t\n\r ";
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if (ws.indexOf(c) == -1) {
			return false;
		}
	}
	return true;
}

function alterRows(i, e) {
	if (e) {
		if (i % 2 == 1) {
			e.setAttribute("style", "background-color: Aqua;");
		}
		e = e.nextSibling;
		while (e && e.nodeType != 1) {
			e = e.nextSibling;
		}
		alterRows(++i, e);
	}
}

function nextNode(e) {
	while (e && e.nodeType != 1) {
		e = e.nextSibling;
	}
	return e;
}
function prevNode(e) {
	while (e && e.nodeType != 1) {
		e = e.previousSibling;
	}
	return e;
}
function swapRows(b) {
	var tab = prevNode(b.previousSibling);
	var tBody = nextNode(tab.firstChild);
	var lastNode = prevNode(tBody.lastChild);
	tBody.removeChild(lastNode);
	var firstNode = nextNode(tBody.firstChild);
	tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
 if (form.value.length > maxSize)
 form.value = form.value.substring(0, maxSize);
 else
 msg.innerHTML = maxSize - form.value.length;
}