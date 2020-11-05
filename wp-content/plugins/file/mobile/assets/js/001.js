/**
 * Lloyds Banking Group : Galaxy IB Mobile : Global JS
 * @version 1.0
 */
/*jslint bitwise: true, eqeqeq: true, passfail: false, nomen: false, plusplus: false, undef: true, evil: true */
/*global window, document, DI */

// remove carriage return, line feed or tab characters from a string
String.prototype.clean = function () {
    var regExp = new RegExp('\n\r\t', 'g');
    return this.replace(regExp, ' ');
};

// remove the leading and trailing spaces from a string
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

/**
 * JQuery-esque interface
 */

var $ = $ || (function(w,d){

    var collection = (function(){

        function collection(items, selector){
            if (!(items instanceof Array)) {
                items = [items];
            }
            this.items = items;
            this.selector = selector;
        }

        collection.prototype.each = function(func) {
            for (var i = 0; i < this.items.length; i++) {
                var res = func.apply(this.items[i], [this.items[i], i]);
                if (false === res) {
                    break;
                }
            }
            return this;
        };

        collection.prototype.map = function(func) {
            var res = [];
            this.each(function() {
                res.push(func(this));
            });
            return res;
        };

        collection.prototype.length = function() {
            return this.items.length;
        };

        collection.prototype.exists = function() {
            return this.items.length > 0;
        };

        /**
         * Selectors
         */

        collection.prototype.one = collection.prototype.first = function() {
            return $(this.items[0]);
        };

        /**
         * Events
         */

        collection.prototype.bind = function(event, handler) {
            return this.each(function(){
                if (this.addEventListener) {
                   this.addEventListener(event, handler);
                } else if (this.attachEvent) {
                    this.attachEvent("on" + event, handler);
                }
            });
        };

        collection.prototype.trigger = function(event) {
            return this.each(function() {
                if (!this.fireEvent) {
                    var type = Event;
                    switch (event) {
                        case "click":
                        case "mousedown":
                        case "mouseup":
                        case "mouseover":
                        case "mouseout":
                            type = MouseEvent;
                            break;
                    }
                    if (window[type] != undefined) {
						var evt = new type(event);
					} else {//BUG 55359
						var params = params || { bubbles: false, cancelable: false, detail: undefined };
						var evt = document.createEvent("CustomEvent");
						evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
					}
                    this.dispatchEvent(evt);
                } else {
                    this.fireEvent("on" + event);
                }
            });
        };

        collection.prototype.click = function(handler) {
            return undefined !== handler ? this.bind("click", handler) : this.trigger("click");
        };

        collection.prototype.focus = function() {
            this.items[0].focus();
            return this;
        };

        /**
         * Attributes
         */

        collection.prototype.html = function(val) {
            if (undefined == val) {
                var content = "";
                this.each(function() {
                    content += this.innerHTML;
                });
                return content;
            }
            this.each(function(){
                this.innerHTML = val;
            });
            return this;
        };

        collection.prototype.insertAfter = function(element){
            element = $(element);
            element.items[0].parentNode.insertBefore(this.items[0], element.items[0].nextSibling);

            return this;
        }

        collection.prototype.insertBefore = function(element){
            element = $(element);
            element.items[0].parentNode.insertBefore(this.items[0], element.items[0]);

            return this;
        }

        collection.prototype.text = function(val) {
            if (val) {
                return this.html(val);
            }
            return this.html().replace(/<\/?[A-Za-z]+(?:[A-Za-z\s="'\{\}\:]+)*>/g, ' ');
        };

        collection.prototype.attr = function(key, val) {
            if (key && this.items[0][key]) {
                if (!val) {
                    return this.items[0][key];
                }
                this.items[0][key] = val;
            }
            return this;
        };

        collection.prototype.hasClass = function(className) {
            var res = false;
            this.each(function() {
                var names = this.className.split(" ");
                for (var i in names) {
                    if (names.hasOwnProperty(i) && className == names[i]) {
                         res = true;
                         return false;
                    }
                }
            });
            return res;
        };

        collection.prototype.addClass = function(className) {
            return this.each(function() {
                if (!$(this).hasClass(className)) {
                    this.className = (this.className + ' ' + className).trim();
                }
            });
        };

        collection.prototype.removeClass = function(className) {
            return this.each(function() {
                this.className = this.className.replace(className, "");
            });
        };

        /**
         * Show and Hide
         */

        collection.prototype.hide = function() {
            return this.each(function() {
                this.style.display = "none";
            });
        };

        collection.prototype.show = function() {
            return this.each(function() {
                this.style.display = "";
            });
        };

        collection.prototype.remove = function() {
            this.each(function() {
                this.parentNode.removeChild(this);
            });
        };

        collection.prototype.prepend = function(elem) {

            return this.each(function(){
                this.appendChild(elem);
                this.insertBefore(elem, this.firstChild);
            });
        };

        collection.prototype.val = function() {
            var instance = this.one();
            if (instance) {
                return instance.items[0].value;
            }
            return undefined;
        };

        return collection;

    })();

    function $(selector, context) {
        if (selector instanceof HTMLElement) {
            return new collection(selector);
        } else if (selector instanceof collection && context == undefined) {
            return selector;
        }

        var base = context || d;
        if (!(base instanceof collection)) {
            base = new collection(base);
        }

        var result = [];
        base.each(function(item) {
            var item_type = typeof selector;
            if(item_type === 'string') {
                result.push.apply(result, item.querySelectorAll(selector));
            }
        });

        var res = new collection(result);
        return res;
    };

    $.ajax = function(obj) {

        var method = obj.method || "GET",
            url = obj.url || "",
            handlers = {
                loading: obj.loading,
                success: obj.success,
                failure: obj.failure
            },
            httpRequest = null;

            if (window.XMLHttpRequest) {
                httpRequest = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e) {}
                }
            }

            if (!httpRequest) {
                console.log("Ajax could not be instanitiated");
                return false;
            }

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState < 4) {
                    if (handlers.loading) {
                        handlers.loading.call(httpRequest);
                    }
                } else if (4 == httpRequest.readyState) {
                    if (200 == httpRequest.status) {
                        if (handlers.success) {
                            handlers.success.call(httpRequest, httpRequest.responseText);
                        }
                    } else {
                        if (handlers.failure) {
                            handlers.failure.call(httpRequest, httpRequest.responseText);
                        }
                    }
                }
            };
            httpRequest.open(method, url);
            httpRequest.send();
    };

    return $;

})(window, document);

// Array extensions
(function(){
    if (!Array.prototype.each) {
        Array.prototype.each = function(func) {
            for (var k in this) {
                if (false === func.call(this[k], k, this[k])) {
                    break;
                }
            }
            return this;
        };
    }
})();

/**
 * @namespace Root namespace for holding all objects created for LBG.
 */
var LBGM = window.LBGM || {};

/**
 * @namespace Browser feature detection
 */
LBGM.browserFeatures = window.LBGM.browserFeatures || {};
LBGM.browserFeatures.supported = false;

LBGM.browserFeatures.sniff = function () {
    if (document.querySelectorAll || window.json) {
        LBGM.browserFeatures.supported = true;
    }
};

LBGM.events = {
    trigger: function (eventName, element) {
        var event;
        if (document.createEvent) {
            event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = 'on' + eventName;
        }

        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent(event.eventType, event);
        }
    }
};

/**
 * @namespace Useful Tools
 */
LBGM.tools = window.LBGM.tools || {};

    // Add class to body to identify presence of JS
    LBGM.tools.addHasJSClass = function () {
        this.addClass(document.querySelector('body'), 'hasJS');
    };

    // check if an element contains a class
    LBGM.tools.hasClass = function (element, className) {
        if (element.nodeType !== 1) {
            return false;
        }
        var myClassName = ' ' + element.className.clean() + ' ';
        return myClassName.indexOf(' ' + className.clean() + ' ') !== -1;
    };

    // add a new class to an element (only if it doesn't already exist)
    LBGM.tools.addClass = function (element, className) {
        if (!this.hasClass(element, className)) {
            element.className = (element.className + ' ' + className).trim();
        }
    };

    // remove a class from an element (only if it exists)
    LBGM.tools.removeClass = function (element, className) {
        if (this.hasClass(element, className)) {
            var myClassName = element.className.replace(className, '');
            myClassName = myClassName.replace('  ', ' ');
            element.className=myClassName;
        }
    };

    /* Insert element after selected */
    LBGM.tools.insertAfter = function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };

    /* Get first child and skip TextNodes */
    LBGM.tools.firstChild = function (referenceNode) {
        var firstChild = referenceNode.firstChild;
        while(firstChild !== null && firstChild.nodeType === 3) {
            firstChild = firstChild.nextSibling;
        }
        return firstChild;

};

/**
 * @namespace Prevent users from duplicate form submissions.
 */
LBGM.preventDuplicateFormSubmission = {

    init: function () {
        this.setForm();
    },

    /**
     * Retrieving all the forms in the page and adding a event
     */
    setForm: function () {
        var formElements    = document.getElementsByTagName('form'),
            formElementSize = formElements.length,
            i = 0;

        for (i; i < formElementSize; i++) {
            formElements[i].addEventListener('submit', LBGM.preventDuplicateFormSubmission.submitOnceDisableClick, false);
        }
    },

    /**
     * Disable current form submit button after first clicked
     */
    submitOnceDisableClick: function (e) {
        // if the form has the 'isDisabled' class, then submit has already been triggered so exit
        if (LBGM.tools.hasClass(this, 'isDisabled')) {
            e.preventDefault();
            return false;
        }
        // add the 'isDisabled' class to the form to block multiple submits
        LBGM.tools.addClass(this, 'isDisabled');

        // submit and return
        return true;
    }
};

/**
 * @namespace Accordion, show and hide content
 */
LBGM.accordion = {

    init: function () {
        var i;
        this.openText = 'Show more';
        this.closeText = 'Show less';
        this.closeClass = 'hide';

        this.accordionList = document.querySelectorAll('.accordion');
        this.accordionLength = this.accordionList.length;

        if (this.accordionLength > 0) {

            for (i = 0; i < this.accordionLength; i++) {
                LBGM.accordion.setAccordion(LBGM.accordion.accordionList[i].querySelectorAll('ol > li'));
            }
        }
    },

    /**
     * This stores all the list items in the accordion list and adds an on click event listener.
     * Then it hides all the containers with a class of "moreDetail".
     */
    setAccordion: function (moreDetailElementList) {

        var moreDetailElementSize = moreDetailElementList.length,
            icon = document.createElement('div'),
            i;

        for (i = 0; i < moreDetailElementSize; i++) {
            var currentElement = moreDetailElementList[i],
                accordionLinks = currentElement.querySelectorAll('a'),
                accordionLinksLength = accordionLinks.length,
                j;

            LBGM.tools.addClass(currentElement, LBGM.accordion.closeClass);

            currentElement.innerHTML = "<div title='"+LBGM.accordion.openText+"' class='icon'></div>" + currentElement.innerHTML;
            currentElement.querySelector('h3').addEventListener('click', this.accordionAnimationClickEvent, false);
            currentElement.querySelector('.icon').addEventListener('click', this.accordionAnimationClickEvent, false);

            for (j = 0; j < accordionLinksLength; j++) {
                accordionLinks[j].addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    location.href = this.getAttribute('href');
                }, false);
            }
        }
    },

    /**
     * This handles the click events generated by the accordion
     */
    accordionAnimationClickEvent: function (e) {
        e.preventDefault();
        e.stopPropagation();

        var eventParent = this.parentNode,
            icon        = eventParent.querySelector('.icon');

        if (LBGM.tools.hasClass(eventParent, LBGM.accordion.closeClass)) {
            LBGM.tools.removeClass(eventParent, LBGM.accordion.closeClass);
            icon.setAttribute('title', LBGM.accordion.closeText);
        } else {
            LBGM.tools.addClass(eventParent, LBGM.accordion.closeClass);
            icon.setAttribute('title', LBGM.accordion.openText);
        }
    }
};

/**
 * @namespace Show and hide input field
 */
LBGM.showHideInput = {
    init: function () {
        this.hideClass      = 'hide';
        // get id of field that need to be toggled
        this.triggerInputs  = document.querySelectorAll('.formFieldEmail input.formEmail');
        this.triggerInputsLength  = this.triggerInputs.length;

        if (this.triggerInputsLength > 0) {
            this.setup();
        }
    },
    setup: function () {
        var triggerInput,triggerParent,hasError,targetInput,i;

        for (i = 0; i < LBGM.showHideInput.triggerInputsLength; i++) {
            triggerInput = LBGM.showHideInput.triggerInputs[i];
            triggerParent = triggerInput.parentNode.parentNode;
            hasError = triggerParent.querySelectorAll('p.formFieldError').length;

            if(hasError === 0) { // only hide email field if no errors
                targetInput = triggerParent.querySelector('.formFieldVerification input');
                targetInput.value = triggerInput.value; // set verify p/word to same (will clear if edited)

                // Storing the original value of the first field
                triggerInput.setAttribute('data-original-value', triggerInput.value);

                triggerInput.addEventListener('keyup', function(){
                    LBGM.showHideInput.checkForChange(triggerInput,targetInput);
                }, false);

                // Hide the second field when page loads
                   LBGM.showHideInput.hideTargetContainer(targetInput);
            }
        }
    },
    checkForChange: function (triggerInput,targetInput) {
        if (triggerInput.value === triggerInput.getAttribute('data-original-value')) {
            targetInput.value = triggerInput.getAttribute('data-original-value'); // reset target input to same value
            LBGM.showHideInput.hideTargetContainer(targetInput);
        }
        else {
            targetInput.value = ""; // remove any value to force re-entry by user
            LBGM.showHideInput.showTargetContainer(targetInput);
        }
    },
    showTargetContainer: function (targetInput) {
        if(targetInput) {
            LBGM.tools.removeClass(targetInput.parentNode, LBGM.showHideInput.hideClass);
        }
    },
    hideTargetContainer: function (targetInput) {
        if(targetInput) {
            LBGM.tools.addClass(targetInput.parentNode, LBGM.showHideInput.hideClass);
        }
    }
};


/**
 * @namespace Disable/Enable form fields.
 */
LBGM.disableEnableFormFields = {

    init: function () {
        var checkboxGroups = document.querySelectorAll('.disableEnableCheckbox');
        var checkbox,
            checkboxGroup;

        for (var i=checkboxGroups.length; i--;){
            checkboxGroup = checkboxGroups[i];
            checkbox = checkboxGroup.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function(){ LBGM.disableEnableFormFields.setEnabledDisabledStateFromCheckbox( checkbox, checkboxGroup ); }, false);
        }

        this.radioButton       = document.querySelectorAll('.radioFieldPanel input[type="radio"]:first-child');
        this.radioButtonLength = this.radioButton.length;

        if(this.radioButton.length > 1) {
            for (var i = 0; i < this.radioButtonLength; i++) {
                if (this.radioButton[i].checked ) {
                    LBGM.disableEnableFormFields.setEnabledDisabledState(null, this.radioButton[i]);
                }
                this.radioButton[i].addEventListener('change', LBGM.disableEnableFormFields.setEnabledDisabledState, false);
            }
        }
    },
    setEnabledDisabledState: function (e, target) {
        // determine the radio buton - either directly passed using target, else extract target from the event object
        target = target || e.target;

        for (var i = 0; i < LBGM.disableEnableFormFields.radioButtonLength; i++) {
            /* Get all fields to be disabled or enabled */
            if (LBGM.disableEnableFormFields.radioButton[i].name === target.name){

                var fieldParent     = LBGM.disableEnableFormFields.radioButton[i].parentNode,
                    fields          = fieldParent.querySelectorAll('input, textarea, select'),
                    fieldsLength    = fields.length,
                    currentParent   = target.parentNode;

                for(var j = 0; j < fieldsLength; j++) {
                    if(LBGM.disableEnableFormFields.radioButton[i] !== fields[j]){
                        if (currentParent === fieldParent) {
                            fields[j].removeAttribute('disabled');
                            fields[j].style.opacity = '1';
                        }
                        else {
                            fields[j].setAttribute('disabled', 'disabled');
                            fields[j].style.opacity = '.75';
                        }
                    }
                }
            }
        }
    },
    setEnabledDisabledStateFromCheckbox: function (checkbox, checkboxGroup) {

        var inputs = checkboxGroup.querySelectorAll('input[type="text"]');

        for (var i=inputs.length;i--;){
            if (checkbox.checked){
                inputs[i].setAttribute('disabled', 'disabled');
                inputs[i].style.opacity = '.75';
            } else {
                inputs[i].removeAttribute('disabled');
                inputs[i].style.opacity = '1';
            }
        }

    }
};

/**
 * @namespace Auto select radio button
 */
LBGM.autoSelectRadio = {

    init: function () {
        if(document.getElementById('formAmount')!=null & document.getElementById('formAmount')!=undefined){
            this.autoTextBox = document.getElementById('formAmount');
            this.autoTextBox.addEventListener('click', LBGM.autoSelectRadio.autoSelectTextBox, false);
        }
        if(document.getElementById('formDateDay')!=null & document.getElementById('formDateDay')!=undefined){
            this.autoDropDownDay = document.getElementById('formDateDay');
            this.autoDropDownDay.addEventListener('click', LBGM.autoSelectRadio.autoSelectDropDown, false);
        }
        if(document.getElementById('formDateMonth')!=null & document.getElementById('formDateMonth')!=undefined){
            this.autoDropDownMonth = document.getElementById('formDateMonth');
            this.autoDropDownMonth.addEventListener('click', LBGM.autoSelectRadio.autoSelectDropDown, false);
        }
        if(document.getElementById('formDateYear')!=null & document.getElementById('formDateYear')!=undefined){
            this.autoDropDownYear = document.getElementById('formDateYear');
            this.autoDropDownYear.addEventListener('click', LBGM.autoSelectRadio.autoSelectDropDown, false);
        }
    },
    autoSelectTextBox: function () {
        this.parentNode.firstElementChild.checked = true;
    },
    autoSelectDropDown: function () {
        this.parentElement.parentNode.parentNode.firstElementChild.checked = true;
    }
};

/**
 * @namespace Display Balance
 */
LBGM.displayBalance = {

    init: function () {

        if(document.getElementsByClassName('formAccountTo')[0]!=null && document.getElementsByClassName ('formAccountTo')[0]!=undefined){

            this.fromAccount = document.getElementsByClassName ('formAccountTo')[0];
            if(accountDetails && this.fromAccount){
                LBGM.displayBalance.showBalance(document.getElementsByClassName('formAccountTo')[0].value);
                this.fromAccount.addEventListener('change', function(){LBGM.displayBalance.showBalance(document.getElementsByClassName('formAccountTo')[0].value);}, false);
            }
        }

    },

    showBalance: function (val) {
        var dropdownVal = LBGM.displayBalance.populateBalance(accountDetails,val);
          if(dropdownVal !=undefined){
            document.getElementsByClassName('accountDetails')[0].style.display = "block";
            document.getElementsByClassName('balanceValue')[0].innerHTML = dropdownVal.balance;
            document.getElementsByClassName('moneyAvailable')[0].innerHTML = dropdownVal.moneyAvailable;
          }
          else{
            document.getElementsByClassName('accountDetails')[0].style.display = "none";
            document.getElementsByClassName('balanceValue')[0].innerHTML = "";
            document.getElementsByClassName('moneyAvailable')[0].innerHTML = "";
          }

    },
    populateBalance: function(accountDetails,val){
        for(var i in accountDetails){
            for(var j in accountDetails[i]){
                if(j === val){
                    var dropdownVal = {};
                    dropdownVal.balance = accountDetails[i][j].accountBalance;
                    dropdownVal.moneyAvailable = accountDetails[i][j].availableFunds;
                    return dropdownVal;
                }
            }

        }

    }
};

/*
    Sean Thompson - populate a username box with one of the username suggestions when a username is taken
*/
LBGM.usernamePopulator = {
    init : function() {

        var username_list = document.querySelector('.username-check .suggestions');

        if (username_list) {
            username_list.onmousedown = function(event) {
                event.preventDefault();
                var event_target = event ? event.target : window.event.srcElement;

                if(event_target.tagName == 'A') {
                    var input_box = document.querySelector('input.userNameSelectToolTarget');
                    input_box.value = event_target.innerHTML;
                }
            };
        }
// - approached this bug in a more masterful way.  Moved the inline JS to global.js Hopefully this solution meets the requirements
    }
},

/**
 * @namespace Section Hotspot
 */
LBGM.sectionHotspot = {

    init: function () {
        /* For sale promo */
        this.confirmMessage     = DI.lang.compareAndBuy.messages.popUpWarn;
        this.promoList          = document.querySelectorAll('.compareDetail h3 a, .withImage a img');
        this.promoListLength    = this.promoList.length;

        /* For smartRewards */
        this.offerList       = document.querySelectorAll('.smartRewardsPanel .hotspot li, .smartRewardsPanel td:nth-child(4)');
        this.offerListLength = this.offerList.length;

        /* For sale promo */
        if(this.promoListLength > 0) {
            for (var i = 0; i < this.promoListLength; i++) {
                this.promoList[i].addEventListener('click', LBGM.sectionHotspot.offerActivation, false);
            }
        }

        /* For smartRewards & table*/
        if(this.offerListLength > 0) {
            for (var o = 0; o < this.offerListLength; o++) {
                /* For a table get parents tr, othewise get li */
                var currentItem = (this.offerList[o].nodeName.toLowerCase() === 'td') ? this.offerList[o].parentNode : this.offerList[o];
                currentItem.addEventListener('click', LBGM.sectionHotspot.standardActivation, false);
                currentItem.setAttribute('data-link-href', this.offerList[o].querySelector('a.moreDetails').getAttribute('href'));
            }
        }
    },
    offerActivation: function (e) {
        if (window.confirm(LBGM.sectionHotspot.confirmMessage)) {
            window.location = this.querySelector('h3 a').getAttribute('href');
        }
        else {
            e.preventDefault();
            e.stopPropagation();
        }
    },
    standardActivation: function (e) {
        window.location = this.getAttribute('data-link-href');
    }
};

/**
 * Displays a confirmation popup before visiting an external link
 */
LBGM.desktopLinkPopup = {
    confirmMessage :{},

     init: function(){
        // define elements to hijack
        var links = document.querySelectorAll(".generic-menu p a.blockLink, .newwin");

        // check for DIs exisitance
        if (DI){
           LBGM.desktopLinkPopup.confirmMessage = DI.lang.compareAndBuy.messages.popUpWarn;
        }
        else { LBGM.desktopLinkPopup.confirmMessage = "";}

        for (var i=links.length; i--;) {
            links[i].addEventListener("click", LBGM.desktopLinkPopup.link_click, false);

        }

    },

    link_click: function(e){

        e.preventDefault();
        return false;

        if (window.confirm(LBGM.desktopLinkPopup.confirmMessage)){
            window.open = (this.getAttribute("href"), "_blank");
        }

    }




};

LBGM.frameKill = function() {
    if (top !== self){
        top.location.href=self.location.href;
    }
}

/**
* Display VEF transactions
*/
LBGM.displayVefTransactions = {

    init: function() {
    var ajaxDataCall = 0;

        $(".vef-view-funds .vef-get, .vef-view-funds ol li .icon").click(function(e) {
        if (ajaxDataCall === 0) {
        ajaxDataCall = 1;
        makeRequest(DI.lang.vef.ajax.url);
        }
        e.preventDefault();
        });
        var httpRequest;

        function makeRequest(url) {
            if (window.XMLHttpRequest) { // moz, safari, etc
                httpRequest = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch(e) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch(e) {}
                }
            }

            if (!httpRequest) {
                return false;
            }

            httpRequest.onreadystatechange = responseContents;
            httpRequest.open('GET', url);
            httpRequest.send();
        }

        function responseContents() {
        // loading state - add spinner icon
        if (httpRequest.readyState === 1 || httpRequest.readyState === 2 || httpRequest.readyState === 3) {
        $(".vef-statement").html("<img id='vef-loading' class='vef-loading' src='" + DI.lang.vef.ajax.loadingUrl + "' style='display: block; margin:0 auto;' />");
        }

        // request complete and response is ready
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var responseData = httpRequest.responseText;

                    if (responseData.length > 0) { // check if there are any transactions
                        var delegate = document.createElement("div");
                        delegate.innerHTML = responseData;
                        var vefTransactionsGroup = delegate.getElementsByClassName('vef-transactions');

                        for (var i = 0; i < vefTransactionsGroup.length; i++) {
                            var paragraphs = vefTransactionsGroup[i].querySelectorAll("p");

                var className = vefTransactionsGroup[i].className,
                startVal = className.lastIndexOf('num-rows-'),
                rowVal = className.substring(startVal),
                maxTransactions;

                            if (startVal!=-1) {
                                if(rowVal.lastIndexOf(" ")!=-1){
                                    // if there is an extra class after num-rows-
                                    maxTransactions = rowVal.substring(rowVal.lastIndexOf('-')+1,rowVal.lastIndexOf(" "));
                                }
                                else {
                                    maxTransactions = rowVal.substring(rowVal.lastIndexOf('-')+1);
                                }
                            }
                            else { // max transactions set here incase on page value not set or found
                                maxTransactions = 5;
                            }

                            if (paragraphs.length > maxTransactions) { // if number of transactions is higher than max number
                                var holder = document.createElement("div");
                                holder.className = "hidden-transactions";
                                holder.style.display = "none";
                                for (var e = maxTransactions; e < paragraphs.length; e++) {
                                    holder.appendChild(paragraphs[e]);
                                }
                                vefTransactionsGroup[i].appendChild(holder);
                var link = (function(target){
                    var link = document.createElement("a");
                    link.href = DI.lang.vef.ajax.offerShowHideUrl;
                    link.className = "toggle-hide";
                    link.innerHTML = DI.lang.vef.ajax.messages.showTransactions;
                    return link;
                })(vefTransactionsGroup[i]);
                link = vefTransactionsGroup[i].appendChild(link);
                link.onclick = (function(target) {
                    return function(e) {
                    var res = target.getElementsByClassName("hidden-transactions")[0];
                                        var show = (getComputedStyle(res) || res.style).display == "none";
                                        res.style.display = show ? "block" : "none";
                                        this.innerHTML = show ? DI.lang.vef.ajax.messages.hideTransactions : DI.lang.vef.ajax.messages.showTransactions;
                    e.preventDefault();
                    };
                                })(vefTransactionsGroup[i]);
                }

                        }

            // remove loading icon
            var vefLoadingIcon;
            while (vefLoadingIcon = document.getElementById('vef-loading')) {
                vefLoadingIcon.parentNode.removeChild(vefLoadingIcon);
            }

            // add content
                        document.querySelectorAll(".vef-statement")[0].appendChild(delegate);
                    }

                }
            }
        }
    }
};
LBGM.toggleMenu = {
    init: function(){
        var openClass = 'open';
        $('.toggle-header').click(function(e){
            e.preventDefault();
            if(LBGM.tools.hasClass(document.getElementById('user-menu'),openClass)){
                LBGM.tools.removeClass(document.querySelectorAll('.toggle-header')[0], openClass);
                LBGM.tools.removeClass(document.getElementById('user-menu'), openClass);
            }
            else {
                LBGM.tools.addClass(document.querySelectorAll('.toggle-header')[0], openClass);
                LBGM.tools.addClass(document.getElementById('user-menu'), openClass);
            }

        });
    }
};
/*Appointment booking interactive table - SD Thompson*/
LBGM.appointmentBookings = {
    init : function () {
        //do stuff if an appointment booker is on the page
        if(document.querySelector(".oabSwiper")) {
            var labelElements = document.querySelectorAll(".oabSwiper ol li label");
            for (var i = 0; i < labelElements.length; i++) {
                var labeltxt = labelElements[i].innerHTML;
                var parentLI = labelElements[i].parentNode;
                var is_radio_selected = parentLI.querySelectorAll('input[type=radio]')[0].checked;

                var newLink = document.createElement('a');
                var att = document.createAttribute('href');
                att.value = "#";
                newLink.setAttributeNode(att);
                newLink.innerHTML = labeltxt;
                newLink.onclick = function (e) {
                    e.preventDefault();
                    LBGM.appointmentBookings.appointment_time_click_event(this);
                }

                if(is_radio_selected) {
                    newLink.className = "selected";
                }
                parentLI.appendChild(newLink);

                //hide the old radio and label
                var hider = document.createAttribute('style');
                hider.value = "display:none;";
                parentLI.querySelectorAll('input[type=radio]')[0].setAttributeNode(hider);
                hider = document.createAttribute('style');
                hider.value = "display:none;";
                parentLI.querySelectorAll('label')[0].setAttributeNode(hider);
            }

            //next and previous clicks
            /*
            document.querySelector('a.oab-go-left').onclick = function(e) {
                e.preventDefault();
                var all_slides = document.querySelectorAll('.oabSwiper');
                var current_slide = document.querySelector('.oabSwiper.show');

                console.log(current_slide);
            }
            */
        }
    },
    appointment_time_click_event : function(clicked_element) {
        var linkses = document.querySelectorAll('.oabSwiper ol li a');

        //remove the "selected" class from all the links
        for(var i = 0; i < linkses.length; i++) {
            linkses[i].className="";
        }
        clicked_element.className = "selected";

        //now check the radio box
        var parental = clicked_element.parentNode;
        parental.querySelector('input[type=radio]').checked = true;
    }
};
LBGM.splitLongTitle = {
    init : function(){
        var searchString = '(Step';
        var elements = document.querySelectorAll('#headerInner h1')
        for (var i = 0; i < elements.length; i++) {
         if (elements[i].innerHTML.indexOf(searchString) !== -1) {
             elements[i].innerHTML = elements[i].innerHTML.replace('(Step','<br/>(Step');
         }
        }
    }
};


/*
 * @namespace DOMContentLoaded functions
 */
LBGM.ready = function () {

    // private collection of DOMContentLoaded event handlers
    var listeners = [];
    return {
        // adds new listeners to the array
        addListener : function (listener) {
            listeners[listeners.length] = listener;
        },
        // iterates through listeners array and runs functions
        init : function () {
            var i;
            for (i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        }
    };
}();

LBGM.smartRewards = LBGM.smartRewards || {};

LBGM.smartRewards.clickableAccountOverview = (function(){

    function init() {
        $(".rewardAccountItem").click(function() {
            $("h2 a", this).click();
        });
    }

    return {
        init: init
    };
})();

LBGM.goAjax = {

    create: function(method, url, loadingFunc, successFunc, failureFunc) {
        return $.ajax({
            method: method,
            url: url,
            loading: loadingFunc,
            success: successFunc,
            failure: failureFunc
        });
    }
};

/**
 * Serialize
 * Usage - console.log(serialize({foo: "hi there", bar: { blah: 123, quux: [1, 2, 3] }}));
 */
LBGM.serialize = {

    init: function(obj, prefix) {
        return "?" + LBGM.serialize.inner(obj, prefix);
    },

    inner: function(obj, prefix) {
        var str = [];
        for(var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                LBGM.serialize.inner(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }

};
// To use the code, fire LBGM.appBanner.init() on document ready

LBGM.appBanner = function(){

    var bannerEl;

    function getOS(){
        var mobileOS;

        if (navigator.userAgent.match(/Android/i) !== null) {
            mobileOS = 'android';
        }

        return mobileOS;
    }

    function closeBanner(){
        bannerEl.style.display = "none";
        LBGM.tools.removeClass(document.body, "app-banner-open");
    }

    function openBanner(){
        bannerEl.style.display = "block";
        LBGM.tools.addClass(document.body, "app-banner-open");
    }

    function init(){
        var closeEl;
        bannerEl = document.querySelectorAll(".app-banner");

        if (!bannerEl.length){ 
            return;
        }

        bannerEl = bannerEl[0];

        //if (getOS() === 'android'){
            closeEl = document.createElement('a');
            closeEl.className = 'close';
            closeEl.title = 'Hide App Link';
            closeEl.href = '#';
            closeEl.innerHTML ='<span>x</span>';

            bannerEl.appendChild(closeEl);

            openBanner();

            closeEl.addEventListener("click", function(e){
                e.preventDefault();
                closeBanner();
            }, false);
        //}
    }

    return {
        init: init
    }

}();



/**
 * @namespace actionMenu, show and hide content
 */

LBGM.actionMenu = (function(){

    function init(element) {
		var actionList = document.querySelectorAll("ul.actionMenuList li").length;
		var actionMenuListItem = document.getElementsByClassName('actionMenuList')[0];
		if(actionMenuListItem){
			var actionHeight = actionMenuListItem.offsetHeight;
		}
		var actionMenuView = ".viewMoreActions";
		var actionMenuShow = ".viewMoreActions .actionMenuShow";
		var actionMenuHide = ".viewMoreActions .actionMenuHide";
		var actionMenuHide = ".viewMoreActions .actionMenuHide";
		var clicked = true;
		var actionCount = 2;
		if(actionList > actionCount){
			actionMenuListItem.style.height= 0;
			$(actionMenuView).show();
		}
		$(actionMenuView).bind('click', function(e) {
			 if (clicked) {
					e.preventDefault();
					$(actionMenuShow).show();
					$(actionMenuHide).hide();
					$('.actionMenuList').removeClass("slideupAction").addClass("slidedownAction");
					actionMenuListItem.style.height= actionHeight + 'px';
					clicked = false;
				}
			else{
					e.preventDefault();
					$('.actionMenuList').removeClass("slidedownAction").addClass("slideupAction");
					actionMenuListItem.style.height= 0;
					$(actionMenuShow).hide();
					$(actionMenuHide).show();
					clicked = true;
				}
			});
    }
    return {
        init: init
    };
})();


// ensure we have support for 'addEventListener'
if (document.addEventListener) {

    // run the LBGM.browserFeatures checker first
    LBGM.browserFeatures.sniff();
    // add the following to the LBGM.ready listeners array
    LBGM.ready.addListener(function () {
        "use strict";
        LBGM.preventDuplicateFormSubmission.init();
        LBGM.frameKill();

        if (LBGM.browserFeatures.supported) {
            LBGM.tools.addHasJSClass();
            LBGM.accordion.init();
            LBGM.showHideInput.init();
            LBGM.disableEnableFormFields.init();
            LBGM.autoSelectRadio.init();
            LBGM.sectionHotspot.init();
            LBGM.displayBalance.init();
            LBGM.toggleMenu.init();
            //LBGM.desktopLinkPopup.init();
            // hide browser bar and scroll straight to content
            window.scrollTo(0,1);
            LBGM.usernamePopulator.init();
            LBGM.displayVefTransactions.init();
            LBGM.smartRewards.clickableAccountOverview.init();
            LBGM.appointmentBookings.init();
            LBGM.splitLongTitle.init();
            LBGM.serialize.init();
			LBGM.actionMenu.init();
			LBGM.appBanner.init();

            // Setup Questions
            (function(){

                $(".setupQs").each(function() {
                    var context = this;
                    $(".qSbtBtn", context).hide();
                    var manager = new QuestionManager(context, function() {
                        $(".qSbtBtn", context).show();
                    }, {});
                });
            })();

        }

    });

    document.addEventListener('DOMContentLoaded', LBGM.ready.init, false);
}
$(".top-of-page").click(function (e) {
	e.preventDefault();
	window.scrollTo(500,0);
});
function gotoTop() { //This is hear and please do not remove this yet (Calvin K). It is here as there may be a number of pages that have a reference to this page, though that reference was replaced by the above.
};
var Validatable = (function($){

	function validatable(element) {
		for (var prop in this.__proto__) {
			element.__proto__[prop] = this.__proto__[prop];
		}
	};

	validatable.prototype.getValidators = function() {
		var validators = [];
		var className = this.className;
		var matches = null;
		var re = /validate\-[A-Za-z\-]+/g;
		while ((matches = re.exec(className)) !== null) {
			var pieces = matches[0].split("-");
			var validator = "";
			for (var i = 0; i < pieces.length; i++) {
				validator += pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
			}
			if (Validatable[validator]) {
				validators.unshift(validator);
			}
		}
		return validators;
	};

	validatable.prototype.validate = function() {
		
		var elements;
		if (this instanceof HTMLInputElement
		 || this instanceof HTMLSelectElement
		 || this instanceof HTMLButtonElement) {
			elements = $(this).items;
		} else {
			elements = $("input, select, button", this).items;
		}

		Validatable.HideError(this);

		var validators = this.getValidators(),
			isValid = true;

		for (var i in validators) {
			if (validators.hasOwnProperty(i)) {
				isValid &= Validatable[validators[i]](elements);
			}
		}

		if (isValid){
			Validatable.HideError(this);
		}

		return isValid;
	};

	return validatable;

})($);



Validatable.ValidateEqual = function(elements) {
	var isValid = true,
		isThisValid = true;
	if (elements.length < 2) {
		return true;
	}
	for (var i = 1; i < elements.length; i++) {
		isThisValid = $(elements[i - 1]).val() == $(elements[i]).val();
		if (!isThisValid){
			Validatable.HideError(elements[i]);
			Validatable.ShowError(elements[i-1], DI.lang.validation.errors.ValidateEqual);
		}
		isValid &= isThisValid;
	}
	return isValid;
};


Validatable.ValidateEmail = function(elements) {
var isValid = true,
		isThisValid = true;
	for (var i = 0; i < elements.length; i++) {
		isThisValid = (function(elem){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		return re.test(elem.value || false);
		})(elements[i]);
		if (!isThisValid){
			Validatable.HideError(elements[i]);
			Validatable.ShowError(elements[i], DI.lang.validation.errors.ValidateEmail);
		}
		isValid &= isThisValid;
	}
	return isValid;
};

Validatable.ValidateRequired = function(elements) {
	var isValid = true,
		isThisValid = true;

	for (var i = 0; i < elements.length; i++) {
		isThisValid = elements[i].value != "";
		if (!isThisValid){
			Validatable.HideError(elements[i]);
			Validatable.ShowError(elements[i], DI.lang.validation.errors.ValidateRequired);
		}
		isValid &= isThisValid;
	}

	return isValid;
};

Validatable.ShowError = function(element, message) {
	var html = document.createElement("div");
	$(html).addClass("errorMessage");
	html.innerHTML = message;
	$(element).addClass("error");
	$(html).insertAfter(element);
}

Validatable.HideError = function(element) {
	$("input", element).removeClass("error");
	$("div.errorMessage", element.parentNode).remove();
}

$(".validate").each(function() {
	new Validatable(this);
});;
var LBG = (typeof LBG == "undefined") ? {} : LBG;

LBG.Events = function(){

	return {

		listen: function(object, event, handler, scope){
			handler = {
				func: handler,
				scope: scope || object
			};

			object._events = object._events || {};
			object._events[event] = object._events[event] || [];
			object._events[event].push(handler);
		},

		trigger: function(object, event, args){
			var handler;

			if (object._events && object._events[event]){
				if (Object.prototype.toString.call( args ) !== '[object Array]' ){
					args = [args];
				}

				for (var i = 0; i < object._events[event].length; i++) {
					handler = object._events[event][i];
					handler.func.apply(handler.scope, args);
				}
			}
		}

	}

}();
;
var QuestionSelectors = {
        email: {
            container: ".cpEmail",
            content: ".cpVal"
        },
        confirmationEmail: {
            container: ".cpConfirmationEmail",
            content: ".confirmVal"
        },
        reenterEmail: {
            container: ".cpReenterEmail",
            content: ".reenterEmailVal"
        },
        marketingConsent: {
            container: ".cpMarketingConsent"
        },
        content: {
            container: ".qContent",
            button: ".qContent .lnkLev1 a",
            buttons: ".qContent .lnkLev1, .qContent .lnkLev2"
        },
        confirmation: {
            container: ".qConfirm",
            button: ".qConfirm .lnkLev1 a"
        },
        cancel: {
            buttons: ".qConfirm .lnkLev2 a, .qContent .lnkLev2 a",
            container: ".qNo"
        },
        change: {
            button: ".qNo a"
        },
        response: {
            container: ".qResponse"
        },
        question: {
            container: ".qQuestion"
        },
        completed: {
            button: ".qSbtBtn"
        }
    },
    QuestionEvents = {
          hide: "answered",
        change: "amend"
    },
    QuestionState = {
          unanswered: "state-unanswered",   // Initial state
        confirmation: "state-confirmation", // Confirm
            answered: "state-answered",     // Collapsed - answered "Yes"
              passed: "state-passed",       // Collapsed - answered "No"
             loading: "state-loading"       // Executing AJAX
    };

var Question = (function($, ajax) {
    
    function question(element, ajaxData) {
        this.element = element;
        this.ajaxData = ajaxData;
        this.answered = false;
        if ($(this.element).hasClass(QuestionState.answered)){
            this._setState(QuestionState.answered);
            this.answered = true;
            this._hide();
        } else {
            this._setState(QuestionState.unanswered);
        }
        this._bind();
    }

    question.selectors = QuestionSelectors;

    // PRIVATE INTERFACE

    question.prototype._bind = function() {

        var self = this;
        $(QuestionSelectors.content.button, this.element).click(function(e) {
            e.preventDefault();
            self._showConfirmation();
        });

        // User presses "confirm"
        $(QuestionSelectors.confirmation.button, this.element).click(function(e) {
            e.preventDefault();
            if (self._confirm()) {
                self._setState(QuestionState.loading);
            }
        });
        
        // User presses "no"
        $(QuestionSelectors.cancel.buttons, this.element).click(function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            self._setState(QuestionState.passed);
            self._hide();
            self._hideError();
            window.scrollTo(0, self.element.offsetTop - 20);
        });

        // User presses "change"
        $(this.element).click(function(e) {
            if (self.getState() == QuestionState.passed && !$(self.element).hasClass("open")) {
                e.preventDefault();
                $(QuestionSelectors.completed.button).hide();
                self.answered = false;
                self.previouslyAnswered = true;
                self._setState(QuestionState.confirmation);
                $(self.element).trigger(QuestionEvents.change);
            }
        });
    };

    question.prototype._showContent = function() {
        $(this.element).addClass("open");
    };

    question.prototype._showConfirmation = function() {
        this._setState(QuestionState.confirmation);
    };
    
    question.prototype._setState = function(state) {
        var cls = this.element.className;
        cls = cls.replace(/\s*state\-[a-zA-Z0-9\-]+/g, "");
        this.element.className = cls;
        $(this.element).addClass(state);
    };
    
    question.prototype._startLoading = function() {
        this._setState(QuestionState.loading);
        window.scrollTo(0, this.element.offsetTop - 20); 
        LBG.Events.trigger(this, "loading", this);
    };
    
    question.prototype._stopLoading = function() {
        this._setState(QuestionState.answered);
    };

    question.prototype._confirm = function() {

        var self = this;
        // TODO AJAX

        var isValid = true;

        $(".validate", self.element).each(function() {
            isValid &= this.validate();
        });

        if (!isValid) {
            this._showError();
            return;
        } else {
            this._hideError();
        }

        var formData = this.ajaxData || {};

        var mdlVal = $(".qSetupMdl", this.element).text();
        var vidVal = $(".qSetupVid", this.element).text();   
        formData.mdl = mdlVal;
        formData.vid = vidVal;

        // Validate fields
        if ($(".state-invalid", this.element).length() > 0) {
            $(".state-invalid", this.element).first().focus();
            return false;
        }

        $("input, select", this.element).each(function() {
            if ("radio" !== $(this).attr("type")
             || this.checked) {
                formData[this.name] = this.value;
            }
        });

        var qUrl = LBGM.serialize.init(formData);

        this._startLoading();

        $.ajax({
            url: DI.lang.setupQs.ajax.url + qUrl,
            success: function(res) {
                //window.setTimeout(function(){
                    self._stopLoading();
                    $(QuestionSelectors.response.container, self.element).html(res); 
                    self._setState(QuestionState.answered)
                    self._hide();
                //}, 2000);                  
            },
            failure: function() {
                self._stopLoading();
                $(QuestionSelectors.question.container, self.element).addClass("hide");
            }
        });

        return true;
    };

    question.prototype._hide = function() {
       $(this.element).trigger(QuestionEvents.hide);
       this.answered = true;
       this.hide(); 
    };

    question.prototype._showError = function() {
        var html;

        if ($(".msgError", this.element).items.length == 0){
            html = document.createElement('div');
            $(html).addClass("msgError");
            html.innerHTML = '<div class="msgTL">' +
                                '<div class="msgTR">' +
                                    '<div class="msgBR">' +
                                        '<div class="msgBL">' +
                                            '<p class="msgP">' + DI.lang.validation.errors.formErrors + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

            $(html).insertAfter($("div", this.element).items[0]);
        }
        $(".msgError", this.element).items[0].style.display = "block";
        window.scrollTo(0, this.element.offsetTop - 20);
    };

    question.prototype._hideError = function() {
        if ($(".msgError", this.element).items.length){
            $(".msgError", this.element).items[0].style.display = "none";
        }
    };

    // PUBLIC INTERFACE

    question.prototype.bind = function(evt, handler) {
        $(this.element).bind(evt, handler);
        return this;
    };

    question.prototype.hide = function() {
        $(this.element).removeClass("open");

        if (this.previouslyAnswered && this.getState() != QuestionState.answered){
            this._setState(QuestionState.passed);
        }
        if (this.getState() == QuestionState.confirmation) {
            if (this.isAnswered()) {
                this._setState(QuestionState.passed);
            } else {
                this._setState(QuestionState.unanswered);
            }
        }
        return this;
    };

    question.prototype.isAnswered = function() {
        return this.answered;
    };
    
    question.prototype.getState = function() {
        for (var key in QuestionState) {
            if (QuestionState.hasOwnProperty(key)) {
                if ($(this.element).hasClass(QuestionState[key])) {
                    return QuestionState[key];
                }
            }
        }
        return QuestionState.unanswered;
    };

    question.prototype.show = function() {
        if ($(QuestionSelectors.content.container, this.element).exists()) {
            this._showContent();
        } else {
            this._showConfirmation();
        }
        return this;
    };

    return question;

})($);

var EmailQuestion = (function($, Question) {

    function question(element, ajaxData) {
        var self = this;

        this.element = element;
        this.ajaxData = ajaxData;
        this.answered = false;
        if ($(this.element).hasClass(QuestionState.answered)){
            this.answered = true;
            this._setState(QuestionState.answered);
            this._hide();
        } else {
            this._setState(QuestionState.unanswered);
        }
        this._bind();

        var click_handler = function() {
            LBG.Events.trigger(self, "focus", [self, this]);
        };

        var change_handler = function() {
            LBG.Events.trigger(self, "change", [self, this]);
        }

        $("input", this.element).bind("click", click_handler);
        $("input", this.element).bind("change", change_handler);

    }

    question.prototype = Question.prototype;

    question.prototype._startLoading = function() {
        this._setState(QuestionState.loading);
        window.scrollTo(0, this.element.offsetTop - 20); 
        LBG.Events.trigger(this, "loading", this);
    };

    return question;

})($, Question);;
var QuestionManager = (function($) {

    var settings = {
        scrollOffset: 20
    };

    // Is questionClass binding us too tightly to the implementation?
    function manager(context, completeCallback, ajaxData) {

        var questions = [],
            self = this;

        $(".setupQ", context).each(function(item, i){
            var questionClass = $(this).hasClass("email-question") ? EmailQuestion : Question,
                obj = new questionClass(this, ajaxData);
            
            questions.push(obj);

            if (questionClass == EmailQuestion){
                self.emailQuestion_ready(obj);
                LBG.Events.listen(obj, "focus", self.emailQuestion_focus, self);
                LBG.Events.listen(obj, "change", self.emailQuestion_change, self);
            }

            // On first question, scroll to top of page when in loading state
            // On last question, scroll to top of page once question is completed
            var scrollToTop = function(){
                window.scrollTo(0, 0);
            }

            if (i==0) {
                LBG.Events.listen(obj, "loading", scrollToTop);
            } else if (i==$(".setupQ", context).items.length - 1){
                obj.bind("answered", scrollToTop);
                obj.bind("passed", scrollToTop);
            }

            
    var scrollToTop = function(){
        window.scrollTo(0, 0);
    }

    if (i==0) {
        LBG.Events.listen(obj, "loading", scrollToTop);
    } else if (i==$(".setupQ", context).items.length - 1){
        obj.bind("answered", scrollToTop);
        obj.bind("passed", scrollToTop);
    }

        });
        
        $('.setupQs .qNo .change').click(function() {
           $('.setupQs .qConfirm p.formFieldError').remove();
            $('.setupQs .qConfirm input').removeClass('error');
        });
        
        if (0 == questions.length) {
            return false;
        }

        this.completeCallback = completeCallback;

        this.currentQuestion =  -1;
        this.questions = questions;

        this.questions.each(function(k) {
            
            this.bind("answered", function() {
                self.getNextQuestion();
            });

            this.bind("amend", function() {
                self.currentQuestion = parseInt(k) - 1;
                self.getNextQuestion();
            });

        });

        this.getNextQuestion();
    };

    manager.prototype.getNextQuestion = function() {
        
        var found = false;
        
        while (!found) {
            this.currentQuestion++;
            if (undefined == this.questions[this.currentQuestion]) {
                break;
            }
            if (!this.questions[this.currentQuestion].isAnswered()) {
                found = true;
            }
        }
        
        for (var key in this.questions) {
            if (this.questions.hasOwnProperty(key)) {
                if (key == this.currentQuestion) {
                    this.questions[key].show();    
                } else {
                    this.questions[key].hide();
                }
            }
        }
        
        if (!found) {
            this.completeCallback();
        }
        
        return this;
    };

    manager.prototype.emailQuestion_ready = function(obj){

        var emailEl = $(".cpVal", obj.element),
            confirmEmailEl = $(".cpConfirmationEmail", obj.element),
            marketingEl = $(".cpMarketingConsent", obj.element),
            marketingRadioEls = $("input", marketingEl);

        if (emailEl.items.length && confirmEmailEl.items.length && emailEl.items[0].value != ""){
            confirmEmailEl.hide();
            $("input", confirmEmailEl).items[0].value = emailEl.items[0].value;

            if (marketingRadioEls.items.length && marketingRadioEls.items[0].checked){
                marketingEl.hide();
            }
        }

    };

    manager.prototype.emailQuestion_focus = function(obj, el){

        var marketingEl = $(".cpMarketingConsent", obj.element),
            marketingRadioEls = $("input", marketingEl);

        if ($(el).hasClass("cpVal")){
            var is_display_none = $(".cpConfirmationEmail",obj.element).items[0].getAttribute('style');
            if(is_display_none == "display: none;") {
                $(".cpConfirmationEmail input", obj.element).items[0].value = "";
            }
            $(".cpConfirmationEmail", obj.element).show();
            
            marketingEl.show();
            marketingRadioEls.items[0].checked = null;
            marketingRadioEls.items[1].checked = true;
        }

    };

    manager.prototype.emailQuestion_change = function(obj, el){

        this.emailQuestion_focus(obj, el);

        if ($(el).hasClass("cpVal")){
            $(".cpConfirmationEmail input", obj.element).focus();
        }

    };

    return manager;

})($);;
var Validation = (function($){

	function validation(element) {
		for (var prop in this.__proto__) {
			element.__proto__[prop] = this.__proto__[prop];
		}
	};

	validation.prototype.getValidators = function() {
		var validators = [];
		var className = this.className;
		var matches = null;
		var re = /validate\-[A-Za-z\-]+/g;
		while ((matches = re.exec(className)) !== null) {
			var pieces = matches[0].split("-");
			var validator = "";
			for (var i = 0; i < pieces.length; i++) {
				validator += pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
			}
			if (Validation[validator]) {
				validators.unshift(validator);
			}
		}
		return validators;
	};

	validation.prototype.validate = function() {
		
		var elements;
		if (this instanceof HTMLInputElement
		 || this instanceof HTMLSelectElement
		 || this instanceof HTMLButtonElement) {
			elements = $(this).items;
		} else {
			elements = $("input, select, button", this).items;
		}

		Validation.HideErrors(this);

		var validators = this.getValidators(),
			isValid = true;

		for (var i in validators) {
			if (validators.hasOwnProperty(i)) {
				isValid &= Validation[validators[i]](elements);
			}
		}

		return isValid;
	};

	return validation;

})($);



Validation.ValidateEqual = function(elements) {
	var isValid = true,
		isThisValid = true;
	if (elements.length < 2) {
		return true;
	}
	for (var i = 1; i < elements.length; i++) {
		isThisValid = $(elements[i - 1]).val() == $(elements[i]).val();
		if (!isThisValid){
			Validation.HideError(elements[i]);
			Validation.ShowError(elements[i], DI.lang.validation.errors.ValidateEqual);
		}
		isValid &= isThisValid;
	}
	return isValid;
};


Validation.ValidateEmail = function(elements) {
	var isValid = true,
		isThisValid = true;
	for (var i = 0; i < elements.length; i++) {
		isThisValid = (function(elem){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		return re.test(elem.value || false);
		})(elements[i]);
		if (!isThisValid){
			Validation.HideError(elements[i]);
			Validation.ShowError(elements[i], DI.lang.validation.errors.ValidateEmail);
		}
		isValid &= isThisValid;
	}
	return isValid;
};

Validation.ValidateRequired = function(elements) {
	var isValid = true,
		isThisValid = true,
		isRadioChecked,
		lastRadioEl;

	for (var i = 0; i < elements.length; i++) {

		isThisValid = true;

		if (elements[i].type=="radio"){
			if (!isRadioChecked){
				isRadioChecked = elements[i].checked;
			}
			lastRadioEl = elements[i];
		} else {
			isThisValid = elements[i].value != "";
		}

		if (!isThisValid){
			Validation.HideError(elements[i]);
			Validation.ShowError(elements[i], DI.lang.validation.errors.ValidateRequired);
		}

		isValid &= isThisValid;
	}

	if (isRadioChecked === false){
		isValid &= isRadioChecked;
		Validation.ShowError(lastRadioEl, DI.lang.validation.errors.ValidateRequiredRadio);
	}

	return isValid;
};

Validation.ShowError = function(element, message) {
	var html = document.createElement("p");
	$(html).addClass("formFieldError");
	html.innerHTML = message;
	$(element).addClass("error");
	$(html).insertBefore(element);
}

Validation.HideError = function(element) {
	$("input", element).removeClass("error");
	$("p.formFieldError", element.parentNode).remove();
}

Validation.HideErrors = function(element) {
	$("input", element).removeClass("error");
	$("p.formFieldError", element).remove();
}

$(".validate").each(function() {
	new Validation(this);
});;
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();