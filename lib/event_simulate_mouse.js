Event.simulateMouse = function(element, eventName) {
  var options = Object.extend({
	pointerX: 0,
	pointerY: 0,
	button:  0,
	ctrlKey:  false,
	altKey:   false,
	shiftKey: false,
	metaKey: false,
	bubbles: true,
	cancelable: true,
	keyCode: 0,
	charCode: 0
  }, arguments[2] || {});

  if (document.createEvent) {
	var oEvent = document.createEvent("MouseEvents");
	oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, 
	  options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
	  options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, $(element));
	$(element).dispatchEvent(oEvent);
  }
  else {
	options.clientX = options.pointerX;
	options.clientY = options.pointerY;
	options.keyCode = options.charCode > 0 ? options.charCode : options.keyCode;
	var oEvent = Object.extend(document.createEventObject(), options);
	$(element).fireEvent('on' + eventName, oEvent);
  }

  if(this.mark) Element.remove(this.mark);
  this.mark = document.createElement('div');
  this.mark.appendChild(document.createTextNode(" "));
  document.body.appendChild(this.mark);
  this.mark.style.position = 'absolute';
  this.mark.style.top = options.pointerY + "px";
  this.mark.style.left = options.pointerX + "px";
  this.mark.style.width = "5px";
  this.mark.style.height = "5px";
  this.mark.style.borderTop = "1px solid red";
  this.mark.style.borderLeft = "1px solid red";

  if(this.step)
	alert('['+new Date().getTime().toString()+'] '+eventName+'/'+Test.Unit.inspect(options));
};