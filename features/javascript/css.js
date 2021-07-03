var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Common                = WebDeveloper.Common || {};
WebDeveloper.Common.requestTimeout = 10000;

// Adds a class to an element
WebDeveloper.Common.addClass = function(element, className)
{
  // If the element and class name are set and the element does not already have this class
  if(element && className && !WebDeveloper.Common.hasClass(element, className))
  {
    // If the classes are on an SVG
    if(element.className instanceof SVGAnimatedString)
    {
      element.className.baseVal = (element.className.baseVal + " " + className).trim();
    }
    else
    {
      element.className = (element.className + " " + className).trim();
    }
  }
};

// Adjusts the position of the given element
WebDeveloper.Common.adjustElementPosition = function(element, xPosition, yPosition, offset)
{
  // If the element is set
  if(element)
  {
    var contentWindow = WebDeveloper.Common.getContentWindow();
    var innerHeight   = contentWindow.innerHeight;
    var innerWidth    = contentWindow.innerWidth;
    var offsetHeight  = element.offsetHeight;
    var offsetWidth   = element.offsetWidth;
    var offsetX       = contentWindow.pageXOffset;
    var offsetY       = contentWindow.pageYOffset;

    // If the x position is less than 0
    if(xPosition < 0)
    {
      xPosition = 0;
    }

    // If the y position is less than 0
    if(yPosition < 0)
    {
      yPosition = 0;
    }

    // If the element will fit at the x position
    if(xPosition + offsetWidth + offset + 5 < innerWidth + offsetX)
    {
      element.style.left = xPosition + offset + "px";
    }
    else
    {
      element.style.left = innerWidth + offsetX - offsetWidth - offset + "px";
    }

    // If the element will fit at the y position
    if(yPosition + offsetHeight + offset + 5 < innerHeight + offsetY)
    {
      element.style.top = yPosition + offset + "px";
    }
    else
    {
      element.style.top = innerHeight + offsetY - offsetHeight - offset + "px";
    }
  }
};

// Adjusts the position of the given element
WebDeveloper.Common.appendHTML = function(html, element, contentDocument)
{
  // If the HTML, element and content document are set
  if(html && element && contentDocument)
  {
    var htmlElement = contentDocument.createElement("div");

    htmlElement.innerHTML = html;

    // While there children of the HTML element
    while(htmlElement.firstChild)
    {
      element.appendChild(htmlElement.firstChild);
    }
  }
};

// Returns true if the array contains the element
WebDeveloper.Common.contains = function(array, element)
{
  // If the array and element are set
  if(array && element)
  {
    try
    {
      // If the element does not exist in the array
      if(array.indexOf(element) == -1)
      {
        return false;
      }

      return true;
    }
    catch(exception)
    {
      // Loop through the array
      for(var i = 0, l = array.length; i < l; i++)
      {
        // If the element is found
        if(array[i] == element)
        {
          return true;
        }
      }
    }
  }

  return false;
};

// Removes all child elements from an element
WebDeveloper.Common.empty = function(element)
{
  // If the element is set
  if(element)
  {
    var childElements = element.childNodes;

    // Loop through the child elements
    while(childElements.length)
    {
      element.removeChild(childElements[0]);
    }
  }
};

// Returns true if a string ends with another string
WebDeveloper.Common.endsWith = function(string, endsWith)
{
  return new RegExp(endsWith + "$").test(string);
};

// Formats dimensions
WebDeveloper.Common.formatDimensions = function(width, height, locale)
{
  // If the width and height are set
  if(width && height)
  {
    return locale.width + " = " + width + "px " + locale.height + " = " + height + "px";
  }
  else if(width)
  {
    return locale.width + " = " + width + "px";
  }
  else if(height)
  {
    return locale.height + " = " + height + "px";
  }

  return "";
};

// Returns a chrome URL
WebDeveloper.Common.getChromeURL = function(url)
{
  return chrome.extension.getURL(url);
};

// Returns the current content document
WebDeveloper.Common.getContentDocument = function()
{
  return document;
};

// Returns the current content window
WebDeveloper.Common.getContentWindow = function()
{
  return window;
};

// Returns a CSS primitive value
WebDeveloper.Common.getCSSPrimitiveValue = function(type)
{
  var cssPrimitiveValueExists = false;

  // Try to access the CSS primitive value
  try
  {
    // If the CSS primitive value exists
    if(CSSPrimitiveValue)
    {
      cssPrimitiveValueExists = true;
    }
  }
  catch(exception)
  {
    // Ignore
  }

  // Switch on the style property
  switch(type)
  {
    case "IDENT":
      return cssPrimitiveValueExists ? CSSPrimitiveValue.CSS_IDENT : 21;
    case "NUMBER":
      return cssPrimitiveValueExists ? CSSPrimitiveValue.CSS_NUMBER : 1;
    case "RGBCOLOR":
      return cssPrimitiveValueExists ? CSSPrimitiveValue.CSS_RGBCOLOR : 25;
    case "URI":
      return cssPrimitiveValueExists ? CSSPrimitiveValue.CSS_URI : 20;
    default:
      return null;
  }
};

// Returns a CSS property
WebDeveloper.Common.getCSSProperty = function(property)
{
  return property;
};

// Returns the CSS text from a property
WebDeveloper.Common.getCSSText = function(property)
{
  // If the property is set
  if(property)
  {
    // If the property has CSS text
    if(property.cssText)
    {
      return property.cssText;
    }

    return property;
  }

  return null;
};

// Returns the CSS URI from a property
WebDeveloper.Common.getCSSURI = function(property)
{
  // If the property is set
  if(property)
  {
    // If the property has a primitive type
    if(property.primitiveType)
    {
      return property.getStringValue();
    }
    else
    { // eslint-disable-line no-else-return
      var urlRegularExpression = /(?:\(['|"]?)(.*?)(?:['|"]?\))/;
      var uri                  = urlRegularExpression.exec(property);

      // If the uri was found
      if(uri)
      {
        return uri[1];
      }
    }
  }

  return null;
};

// Returns the document body element
WebDeveloper.Common.getDocumentBodyElement = function(contentDocument)
{
  // If there is a body element
  if(contentDocument.body)
  {
    return contentDocument.body;
  }
  else
  { // eslint-disable-line no-else-return
    var bodyElement = contentDocument.querySelector("body");

    // If there is a body element
    if(bodyElement)
    {
      return bodyElement;
    }
  }

  return contentDocument.documentElement;
};

// Returns the document head element
WebDeveloper.Common.getDocumentHeadElement = function(contentDocument)
{
  var headElement = contentDocument.querySelector("head");

  // If there is a head element
  if(headElement)
  {
    return headElement;
  }

  return contentDocument.documentElement;
};

// Returns all of the images in the document
WebDeveloper.Common.getDocumentImages = function(contentDocument)
{
  var uniqueImages = [];

  // If the content document is set
  if(contentDocument)
  {
    var computedStyle = null;
    var image         = null;
    var images        = [];
    var node          = null;
    var styleImage    = null;
    var treeWalker    = contentDocument.createTreeWalker(contentDocument, NodeFilter.SHOW_ELEMENT, null, false);

    // While the tree walker has more nodes
    while((node = treeWalker.nextNode()) !== null)
    {
      // If this is an image element
      if(node.tagName.toLowerCase() == "img")
      {
        images.push(node);
      }
      else if(node.tagName.toLowerCase() == "input" && node.src && node.type && node.type.toLowerCase() == "image")
      {
        image     = new Image();
        image.src = node.src;

        // If this is not a chrome image
        if(image.src.indexOf("chrome://") !== 0)
        {
          images.push(image);
        }
      }
      else if(node.tagName.toLowerCase() == "link" && node.href && node.href.indexOf("chrome://") !== 0 && node.rel && node.rel.indexOf("icon") != -1)
      {
        image     = new Image();
        image.src = node.href;

        images.push(image);
      }
      else
      {
        // Try to get the computed styles
        try
        {
          computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);
        }
        catch(exception)
        {
          // Ignore
        }

        // If the computed style is set
        if(computedStyle)
        {
          styleImage = WebDeveloper.Common.getCSSProperty(WebDeveloper.Common.getPropertyCSSValue(computedStyle, "background-image"));

          // If this element has a background image and it is a URI
          if(WebDeveloper.Common.isCSSURI(styleImage))
          {
            image     = new Image();
            image.src = WebDeveloper.Common.getCSSURI(styleImage);

            // If this is not a chrome image
            if(image.src.indexOf("chrome://") !== 0)
            {
              images.push(image);
            }
          }

          styleImage = WebDeveloper.Common.getPropertyCSSValue(computedStyle, "list-style-image");

          // If this element has a list style image and it is a URI
          if(WebDeveloper.Common.isCSSURI(styleImage))
          {
            image     = new Image();
            image.src = WebDeveloper.Common.getCSSURI(styleImage);

            // If this is not a chrome image
            if(image.src.indexOf("chrome://") !== 0)
            {
              images.push(image);
            }
          }
        }
      }
    }

    images.sort(WebDeveloper.Common.sortImages);

    // Loop through the images
    for(var i = 0, l = images.length; i < l; i++)
    {
      image = images[i];

      // If this is not the last image and the image is the same as the next image
      if(i + 1 < l && image.src == images[i + 1].src)
      {
        continue;
      }

      uniqueImages.push(image);
    }
  }

  return uniqueImages;
};

// Get the position of an element
WebDeveloper.Common.getElementPosition = function(element, xPosition)
{
  var position = 0;

  // If the element is set
  if(element)
  {
    var elementOffsetParent = element.offsetParent;

    // If the element has an offset parent
    if(elementOffsetParent)
    {
      // While there is an offset parent
      while((elementOffsetParent = element.offsetParent) !== null)
      {
        // If getting the x position
        if(xPosition)
        {
          position += element.offsetLeft;
        }
        else
        {
          position += element.offsetTop;
        }

        element = elementOffsetParent;
      }
    }
    else if(xPosition)
    {
      position = element.offsetLeft;
    }
    else
    {
      position = element.offsetTop;
    }
  }

  return position;
};

// Get the x position of an element
WebDeveloper.Common.getElementPositionX = function(element)
{
  return WebDeveloper.Common.getElementPosition(element, true);
};

// Get the y position of an element
WebDeveloper.Common.getElementPositionY = function(element)
{
  return WebDeveloper.Common.getElementPosition(element, false);
};

// Returns the text from an element
WebDeveloper.Common.getElementText = function(element)
{
  var elementText = "";

  // If the element is set
  if(element)
  {
    var childNode     = null;
    var childNodes    = element.childNodes;
    var childNodeType = null;

    // Loop through the child nodes
    for(var i = 0, l = childNodes.length; i < l; i++)
    {
      childNode   = childNodes[i];
      childNodeType = childNode.nodeType;

      // If the child node type is an element
      if(childNodeType == Node.ELEMENT_NODE)
      {
        elementText += WebDeveloper.Common.getElementText(childNode);
      }
      else if(childNodeType == Node.TEXT_NODE)
      {
        elementText += childNode.nodeValue + " ";
      }
    }
  }

  return elementText;
};

// Returns the number of occurrences of a substring in a string
WebDeveloper.Common.getOccurrenceCount = function(string, substring)
{
  var count = 0;

  // If the string and substring are set
  if(string && substring)
  {
    var position = 0;
    var shift    = substring.length;

    // While the substring was found
    while(position != -1)
    {
      position = string.indexOf(substring, position);

      // If the substring was found
      if(position != -1)
      {
        position += shift;

        count++;
      }
    }
  }

  return count;
};

// Gets the property CSS value for a computed style
WebDeveloper.Common.getPropertyCSSValue = function(computedStyle, property)
{
  var cssProperty = null;

  // If the computed style is set
  if(computedStyle)
  {
    // Try to get the computed style (fails in newer versions of Chrome)
    try
    {
      cssProperty = computedStyle.getPropertyCSSValue(property);
    }
    catch(exception)
    {
      cssProperty = computedStyle.getPropertyValue(property);
    }
  }

  return cssProperty;
};

// Gets the content from a URL
WebDeveloper.Common.getURLContent = function(urlContentRequest, errorMessage, configuration)
{
  var url = urlContentRequest.url;

  // If the URL is not entirely generated
  if(url.indexOf("wyciwyg://") !== 0)
  {
    // Try to download the file
    try
    {
      var request = new XMLHttpRequest();

      request.timeout = WebDeveloper.Common.requestTimeout;

      request.onreadystatechange = function()
      {
        // If the request completed
        if(request.readyState == 4)
        {
          WebDeveloper.Common.urlContentRequestComplete(request.responseText, urlContentRequest, configuration);
        }
      };

      request.ontimeout = function()
      {
        WebDeveloper.Common.urlContentRequestComplete(errorMessage, urlContentRequest, configuration);
      };

      request.open("get", url);
      request.send(null);
    }
    catch(exception)
    {
      WebDeveloper.Common.urlContentRequestComplete(errorMessage, urlContentRequest, configuration);
    }
  }
};

// Returns the contents of the given URLs
WebDeveloper.Common.getURLContents = function(urlContentRequests, errorMessage, callback)
{
  var urlContentRequestsRemaining = urlContentRequests.length;
  var configuration               = { callback: callback, urlContentRequestsRemaining: urlContentRequestsRemaining };

  // Loop through the URL content requests
  for(var i = 0, l = urlContentRequests.length; i < l; i++)
  {
    WebDeveloper.Common.getURLContent(urlContentRequests[i], errorMessage, configuration);
  }
};

// Returns true if an element has the specified class
WebDeveloper.Common.hasClass = function(element, className)
{
  // If the element and class name are set
  if(element && className)
  {
    var classes = element.className;

    // If the classes are on an SVG
    if(classes instanceof SVGAnimatedString)
    {
      classes = classes.baseVal;
    }

    classes = classes.split(" ");

    // Loop through the classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      // If the classes match
      if(className == classes[i])
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if the item is in the array
WebDeveloper.Common.inArray = function(item, array)
{
  return WebDeveloper.Common.positionInArray(item, array) != -1;
};

// Includes JavaScript in a document
WebDeveloper.Common.includeJavaScript = function(url, contentDocument, callback)
{
  var scriptElement = contentDocument.createElement("script");

  // If a callback is set
  if(callback)
  {
    var load = (function(callbackFunction)
    {
      var handler = function()
      {
        callbackFunction();

        scriptElement.removeEventListener("load", handler, true);
      };

      return handler;
    })(callback);

    scriptElement.addEventListener("load", load, true);
  }

  scriptElement.setAttribute("src", WebDeveloper.Common.getChromeURL(url));
  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(scriptElement);
};

// Inserts the given child after the element
WebDeveloper.Common.insertAfter = function(child, after)
{
  // If the child and after are set
  if(child && after)
  {
    var nextSibling = after.nextSibling;
    var parent      = after.parentNode;

    // If the element has a next sibling
    if(nextSibling)
    {
      parent.insertBefore(child, nextSibling);
    }
    else
    {
      parent.appendChild(child);
    }
  }
};

// Inserts the given element as the first child of the element
WebDeveloper.Common.insertAsFirstChild = function(element, child)
{
  // If the element and child are set
  if(element && child)
  {
    // If the element has child nodes
    if(element.hasChildNodes())
    {
      element.insertBefore(child, element.firstChild);
    }
    else
    {
      element.appendChild(child);
    }
  }
};

// Returns true if the ancestor element is an ancestor of the element
WebDeveloper.Common.isAncestor = function(element, ancestorElement)
{
  // If the element and ancestor element are set
  if(element && ancestorElement)
  {
    var parentElement = null;

    // Loop through the parent elements
    while((parentElement = element.parentNode) !== null)
    {
      // If the parent element is the ancestor element
      if(parentElement == ancestorElement)
      {
        return true;
      }

      element = parentElement;
    }
  }

  return false;
};

// Returns true if this CSS property is a URI
WebDeveloper.Common.isCSSURI = function(property)
{
  // If the property is set
  if(property)
  {
    // If the property has a primitive type
    if(property.primitiveType)
    {
      // If the property primitive type is a URI
      if(property.primitiveType == WebDeveloper.Common.getCSSPrimitiveValue("URI"))
      {
        return true;
      }
    }
    else
    {
      var urlRegularExpression = /(?:\(['|"]?)(.*?)(?:['|"]?\))/;
      var uri                  = urlRegularExpression.exec(property);

      // If the uri was found
      if(uri)
      {
        return true;
      }
    }
  }

  return false;
};

// Logs a message
WebDeveloper.Common.log = function(message, exception)
{
  // If an exception is set
  if(exception)
  {
    console.warn(message, exception); // eslint-disable-line no-console
  }
  else
  {
    console.warn(message); // eslint-disable-line no-console
  }
};

// Returns the position if the item is in the array or -1 if it is not
WebDeveloper.Common.positionInArray = function(item, array)
{
  // If the array is set
  if(array)
  {
    // Loop through the array
    for(var i = 0, l = array.length; i < l; i++)
    {
      // If the item is in the array
      if(array[i] == item)
      {
        return i;
      }
    }
  }

  return -1;
};

// Removes a class from an element
WebDeveloper.Common.removeClass = function(element, className)
{
  // If the element and class name are set
  if(element && className)
  {
    var classes = element.className;

    // If the classes are on an SVG
    if(classes instanceof SVGAnimatedString)
    {
      classes = classes.baseVal;
    }

    classes = classes.split(" ");

    // Loop through the classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      // If the classes match
      if(className == classes[i])
      {
        classes.splice(i, 1);

        // If the classes are on an SVG
        if(element.className instanceof SVGAnimatedString)
        {
          element.className.baseVal = classes.join(" ").trim();
        }
        else
        {
          element.className = classes.join(" ").trim();
        }

        break;
      }
    }
  }
};

// Removes all matching elements from a document
WebDeveloper.Common.removeMatchingElements = function(selector, contentDocument)
{
  var matchingElement  = null;
  var matchingElements = contentDocument.querySelectorAll(selector);

  // Loop through the matching elements
  for(var i = 0, l = matchingElements.length; i < l; i++)
  {
    matchingElement = matchingElements[i];

    // If the matching element has a parent node
    if(matchingElement.parentNode)
    {
      matchingElement.parentNode.removeChild(matchingElement);
    }
  }
};

// Removes the reload parameter from a URL
WebDeveloper.Common.removeReloadParameterFromURL = function(url)
{
  // If the URL is set
  if(url)
  {
    return url.replace(/(&|\?)web-developer-reload=\d+/, "");
  }

  return null;
};

// Removes a substring from a string
WebDeveloper.Common.removeSubstring = function(string, substring)
{
  // If the string and substring are not empty
  if(string && substring)
  {
    var substringStart = string.indexOf(substring);

    // If the substring is found in the string
    if(substring && substringStart != -1)
    {
      return string.substring(0, substringStart) + string.substring(substringStart + substring.length, string.length);
    }

    return string;
  }

  return "";
};

// Sorts two images
WebDeveloper.Common.sortImages = function(imageOne, imageTwo)
{
  // If both images are set
  if(imageOne && imageTwo)
  {
    var imageOneSrc = imageOne.src;
    var imageTwoSrc = imageTwo.src;

    // If the images are equal
    if(imageOneSrc == imageTwoSrc)
    {
      return 0;
    }
    else if(imageOneSrc < imageTwoSrc)
    {
      return -1;
    }
  }

  return 1;
};

// Toggles a class on an element
WebDeveloper.Common.toggleClass = function(element, className, value)
{
  // If the value is set
  if(value)
  {
    WebDeveloper.Common.addClass(element, className);
  }
  else
  {
    WebDeveloper.Common.removeClass(element, className);
  }
};

// Toggles a style sheet in a document
WebDeveloper.Common.toggleStyleSheet = function(url, id, contentDocument, insertFirst)
{
  var styleSheet = contentDocument.getElementById(id);

  // If the style sheet is already in the document
  if(styleSheet)
  {
    WebDeveloper.Common.removeMatchingElements("#" + id, contentDocument);
  }
  else
  {
    var headElement = WebDeveloper.Common.getDocumentHeadElement(contentDocument);
    var firstChild  = headElement.firstChild;
    var linkElement = contentDocument.createElement("link");

    linkElement.setAttribute("href", WebDeveloper.Common.getChromeURL(url));
    linkElement.setAttribute("id", id);
    linkElement.setAttribute("rel", "stylesheet");

    // If there is a first child
    if(insertFirst && firstChild)
    {
      headElement.insertBefore(linkElement, firstChild);
    }
    else
    {
      headElement.appendChild(linkElement);
    }
  }
};

// Handles the completion of a URL content request
WebDeveloper.Common.urlContentRequestComplete = function(content, urlContentRequest, configuration)
{
  urlContentRequest.content = content;

  configuration.urlContentRequestsRemaining--;

  // If there are no URL content requests remaining
  if(configuration.urlContentRequestsRemaining === 0)
  {
    configuration.callback();
  }
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.CSS = WebDeveloper.CSS || {};

// Formats a style property
WebDeveloper.CSS.formatStyleProperty = function(styleProperty)
{
  // Switch on the style property
  switch(styleProperty)
  {
    case "margin-bottom-value":
      return "margin-bottom";
    case "margin-left-value":
      return "margin-left";
    case "margin-right-value":
      return "margin-right";
    case "margin-top-value":
      return "margin-top";
    case "padding-bottom-value":
      return "padding-bottom";
    case "padding-left-value":
      return "padding-left";
    case "padding-right-value":
      return "padding-right";
    case "padding-top-value":
      return "padding-top";
    case "-x-background-x-position":
      return "background-x-position";
    case "-x-background-y-position":
      return "background-y-position";
    default:
      return styleProperty;
  }
};

// Formats a style value
WebDeveloper.CSS.formatStyleValue = function(styleValue)
{
  // If the style value is set
  if(styleValue)
  {
    var rgbRegularExpression = new RegExp("rgb\\((\\d{1,3}),\\s(\\d{1,3}),\\s(\\d{1,3})\\)", "gi");
    var styleValueColor      = rgbRegularExpression.exec(styleValue);

    // If the style value is a color
    if(styleValueColor)
    {
      var blue  = parseInt(styleValueColor[3], 10).toString(16);
      var green = parseInt(styleValueColor[2], 10).toString(16);
      var red   = parseInt(styleValueColor[1], 10).toString(16);

      // If the blue color is only 1 character long
      if(blue.length == 1)
      {
        blue = "0" + blue;
      }

      // If the green color is only 1 character long
      if(green.length == 1)
      {
        green = "0" + green;
      }

      // If the red color is only 1 character long
      if(red.length == 1)
      {
        red = "0" + red;
      }

      return "#" + red + green + blue;
    }
  }

  return styleValue;
};

// Returns an array of style sheets imported in the given style sheet
WebDeveloper.CSS.getImportedStyleSheets = function(styleSheet)
{
  var styleSheets = [];

  // If the style sheet is set
  if(styleSheet)
  {
    // Try to access the style sheet rules
    try
    {
      var cssRules = styleSheet.cssRules;

      // If there are CSS rules
      if(cssRules)
      {
        var cssRule            = null;
        var importedStyleSheet = null;

        // Loop through the style sheet rules
        for(var i = 0, l = cssRules.length; i < l; i++)
        {
          cssRule = cssRules[i];

          // If this is an import rule
          if(cssRule.type == 3)
          {
            importedStyleSheet = cssRule.styleSheet;

            // If this style sheet is valid
            if(WebDeveloper.CSS.isValidStyleSheet(importedStyleSheet))
            {
              styleSheets.push(importedStyleSheet.href);

              styleSheets = styleSheets.concat(WebDeveloper.CSS.getImportedStyleSheets(importedStyleSheet));
            }
          }
        }
      }
    }
    catch(exception)
    {
      WebDeveloper.Common.log("Could not access the style sheet rules for " + styleSheet.href + ".", exception);
    }
  }

  return styleSheets;
};

// Returns true if this is an alternate style sheet
WebDeveloper.CSS.isAlternateStyleSheet = function(styleSheet)
{
  // If the style sheet is set
  if(styleSheet)
  {
    var ownerNode = styleSheet.ownerNode;

    // If the owner node is set
    if(ownerNode)
    {
      // If the owner node is a processing instruction
      if(ownerNode.nodeType == Node.PROCESSING_INSTRUCTION_NODE)
      {
        // If the processing instruction data contains alternate="yes"
        if(ownerNode.data.indexOf('alternate="yes"') != -1)
        {
          return true;
        }
      }
      else if(ownerNode.hasAttribute("rel") && ownerNode.getAttribute("rel").toLowerCase() == "alternate stylesheet")
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if this style sheet is for this media type
WebDeveloper.CSS.isMediaStyleSheet = function(styleSheet, mediaType)
{
  // If the style sheet and media type are set
  if(styleSheet && mediaType)
  {
    var media               = styleSheet.media;
    var mediaLength         = media.length;
    var styleSheetMediaType = null;

    // If there is no media
    if(mediaLength === 0)
    {
      return true;
    }

    // Loop through the media
    for(var i = 0; i < mediaLength; i++)
    {
      styleSheetMediaType = media.item(i).toLowerCase();

      // If the style sheet media type is all or matches the media type
      if(styleSheetMediaType == "all" || styleSheetMediaType == mediaType)
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if this is a valid rule style
WebDeveloper.CSS.isValidRuleStyle = function(ruleStyles, ruleStyle)
{
  // If the rule style is set
  if(ruleStyle)
  {
    // If the rule style is an invalid rule style
    if(ruleStyle.indexOf("-moz-") === 0 || ruleStyle.indexOf("-x-") === 0 || ruleStyles.getPropertyValue(ruleStyle).indexOf("-moz-") === 0 || ((ruleStyle.indexOf("-ltr-source") !== 0 || ruleStyle.indexOf("-rtl-source") !== 0) && ruleStyles.getPropertyValue(ruleStyle) === "physical")) // eslint-disable-line no-extra-parens
    {
      return false;
    }

    return true;
  }

  return false;
};

// Returns true if this is a valid style sheet
WebDeveloper.CSS.isValidStyleSheet = function(styleSheet)
{
  // If the style sheet is set
  if(styleSheet)
  {
    var styleSheetHref = styleSheet.href;

    // If the style sheet href is not set or this is not a chrome or data style sheet
    if(!styleSheetHref || styleSheetHref.indexOf("about:") !== 0 && styleSheetHref.indexOf("chrome://") !== 0 && styleSheetHref.indexOf("chrome-extension://") !== 0 && styleSheetHref.indexOf("data:") !== 0 && styleSheetHref.indexOf("moz-extension://") !== 0 && styleSheetHref.indexOf("resource://") !== 0)
    {
      return true;
    }
  }

  return false;
};

// Toggles all the style sheets in a document
WebDeveloper.CSS.toggleAllStyleSheets = function(disable, contentDocument)
{
  var styleSheet  = null;
  var styleSheets = contentDocument.styleSheets;

  // Loop through the style sheets
  for(var i = 0, l = styleSheets.length; i < l; i++)
  {
    styleSheet = styleSheets[i];

    // If this is a valid style sheet and is not an alternate style sheet or style sheets are being disabled
    if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && (!WebDeveloper.CSS.isAlternateStyleSheet(styleSheet) || disable))
    {
      styleSheet.disabled = disable;
    }
  }
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Common = WebDeveloper.Common || {};

// Displays a notification
WebDeveloper.Common.displayNotification = function(message, parameters)
{
  chrome.runtime.sendMessage({ message: message, parameters: parameters, type: "display-notification" });
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.CSS = WebDeveloper.CSS || {};

// Reloads the linked style sheets in a document
WebDeveloper.CSS.reloadLinkedStyleSheets = function(documents)
{
  var contentDocument = null;
  var ownerNode       = null;
  var styleSheet      = null;
  var styleSheets     = null;
  var styleSheetURL   = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    styleSheets     = contentDocument.styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet    = styleSheets[j];
      styleSheetURL = styleSheet.href;

      // If this is a valid style sheet, is not an inline style sheet and is not an alternate style sheet or style sheets are being disabled
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI && !styleSheet.disabled && !WebDeveloper.CSS.isAlternateStyleSheet(styleSheet))
      {
        ownerNode     = styleSheet.ownerNode;
        styleSheetURL = WebDeveloper.Common.removeReloadParameterFromURL(styleSheetURL);

        // If the style sheet URL does not have query parameters
        if(styleSheetURL.indexOf("?") == -1)
        {
          styleSheetURL += "?";
        }
        else
        {
          styleSheetURL += "&";
        }

        // If the owner node is set
        if(ownerNode)
        {
          ownerNode.href = styleSheetURL + "web-developer-reload=" + new Date().getTime();
        }
      }
    }
  }

  WebDeveloper.Common.displayNotification("reloadLinkedStyleSheetsResult");
};

// Toggles all the styles in a document
WebDeveloper.CSS.toggleAllStyles = function(disable, documents)
{
  var contentDocument = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.CSS.toggleAllStyleSheets(disable, contentDocument);
    WebDeveloper.CSS.toggleElementInlineStyles(contentDocument.documentElement, disable);
  }
};

// Toggles the browser default styles in a document
WebDeveloper.CSS.toggleBrowserDefaultStyles = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("/features/style-sheets/css/disable-browser-default-styles.css", "web-developer-disable-browser-default-styles", documents[i], true);
  }
};

// Toggles all the inline styles in elements under an element
WebDeveloper.CSS.toggleElementInlineStyles = function(node, disable)
{
  // If the node exists and is an element
  if(node && node.nodeType == Node.ELEMENT_NODE)
  {
    var childNodes = node.childNodes;

    // If disabling styles and the node has a style attribute
    if(disable && node.hasAttribute("style"))
    {
      node.setAttribute("web-developer-inline-style", node.getAttribute("style"));
      node.removeAttribute("style");
    }
    else if(!disable && node.hasAttribute("web-developer-inline-style"))
    {
      node.setAttribute("style", node.getAttribute("web-developer-inline-style"));
      node.removeAttribute("web-developer-inline-style");
    }

    // Loop through the child nodes
    for(var i = 0, l = childNodes.length; i < l; i++)
    {
      WebDeveloper.CSS.toggleElementInlineStyles(childNodes[i], disable);
    }
  }
};

// Toggles all the embedded styles in a document
WebDeveloper.CSS.toggleEmbeddedStyles = function(disable, documents)
{
  var styleSheet  = null;
  var styleSheets = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    styleSheets = documents[i].getElementsByTagName("style");

    // Loop through all the stylesheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet = styleSheets[j].sheet;

      // If this is a valid style sheet
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet))
      {
        styleSheet.disabled = disable;
      }
    }
  }
};

// Toggles all the inline styles in elements in a document
WebDeveloper.CSS.toggleInlineStyles = function(disable, documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.CSS.toggleElementInlineStyles(documents[i].documentElement, disable);
  }
};

// Toggles all the linked style sheets in a document
WebDeveloper.CSS.toggleLinkedStyleSheets = function(disable, documents)
{
  var contentDocument = null;
  var styleSheet      = null;
  var styleSheets   = null;
  var styleSheetURL = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    styleSheets   = contentDocument.styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet    = styleSheets[j];
      styleSheetURL = styleSheet.href;

      // If this is a valid style sheet, is not an inline style sheet and is not an alternate style sheet or style sheets are being disabled
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI && (!WebDeveloper.CSS.isAlternateStyleSheet(styleSheet) || disable))
      {
        styleSheet.disabled = disable;
      }
    }
  }
};

// Toggles all the styles for this media type in a document
WebDeveloper.CSS.toggleMediaTypeStyles = function(mediaType, display, documents)
{
  var media       = null;
  var styleSheet  = null;
  var styleSheets = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    styleSheets = documents[i].styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet = styleSheets[j];

      // If the style sheet is valid and not an alternate style sheet
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && !WebDeveloper.CSS.isAlternateStyleSheet(styleSheet))
      {
        media = styleSheet.media;

        // If displaying the styles for this media type
        if(display)
        {
          // If the style sheet matches this media type
          if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, mediaType))
          {
            // If the style sheet does not have the screen media type
            if(!WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen"))
            {
              media.appendMedium("web-developer-appended-screen");
              media.appendMedium("screen");
            }
          }
          else if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen"))
          {
            // If the media length is not 0
            if(media.length !== 0)
            {
              media.deleteMedium("screen");
            }

            media.appendMedium("web-developer-deleted-screen");
          }
        }
        else if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "web-developer-appended-screen"))
        {
          media.deleteMedium("web-developer-appended-screen");
          media.deleteMedium("screen");
        }
        else if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "web-developer-deleted-screen"))
        {
          media.appendMedium("screen");
          media.deleteMedium("web-developer-deleted-screen");
        }

        // Force the styles to reapply by disabling and enabling the style sheet
        styleSheet.disabled = true;
        styleSheet.disabled = false;
      }
    }
  }
};

// Toggles all the print styles in a document
WebDeveloper.CSS.togglePrintStyles = function(disable, documents)
{
  var styleSheet  = null;
  var styleSheets = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    styleSheets = documents[i].styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet = styleSheets[j];

      // If this is a valid style sheet, is not an inline style sheet, is not an alternate style sheet or style sheets are being disabled and is a print style sheet, but not a screen style sheet
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && (!WebDeveloper.CSS.isAlternateStyleSheet(styleSheet) || disable) && WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "print"))
      {
        styleSheet.disabled = disable;
      }
    }
  }
};

// Uses the border box model
WebDeveloper.CSS.useBorderBoxModel = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("/features/style-sheets/css/use-border-box-model.css", "web-developer-use-border-box-model", documents[i], false);
  }
};

void(0);