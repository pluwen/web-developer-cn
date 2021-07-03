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

WebDeveloper.Dashboard          = WebDeveloper.Dashboard || {};
WebDeveloper.Dashboard.resizing = false;

// Adjusts the bottom margin of the body
WebDeveloper.Dashboard.adjustBodyBottomMargin = function(contentDocument, height)
{
  WebDeveloper.Common.getDocumentBodyElement(contentDocument).style.setProperty("margin-bottom", parseInt(height, 10) + 20 + "px", "important");
};

// Closes a dashboard tab
WebDeveloper.Dashboard.closeDashboardTab = function(tabId, contentDocument)
{
  var dashboardDocument = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;

  WebDeveloper.Common.removeMatchingElements("#" + tabId + "-panel, #" + tabId + "-tab", dashboardDocument);

  // If the last tab on the dashboard was closed
  if(dashboardDocument.querySelectorAll("#web-developer-dashboard-tabs > li").length === 0)
  {
    WebDeveloper.Dashboard.removeDashboard(contentDocument);
  }
};

// Converts a title to an id
WebDeveloper.Dashboard.convertTitleToId = function(title)
{
  return "web-developer-" + title.toLowerCase().replace(" ", "-");
};

// Create the dashboard
WebDeveloper.Dashboard.createDashboard = function(contentDocument, dashboardHTML)
{
  var dashboard         = contentDocument.createElement("iframe");
  var dashboardDocument = null;
  var resizer           = null;

  dashboard.setAttribute("id", "web-developer-dashboard");

  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(dashboard);
  dashboard.contentWindow.stop();

  dashboardDocument                           = dashboard.contentDocument;
  window.WebDeveloperEvents                   = window.WebDeveloperEvents || {};
  window.WebDeveloperEvents.Dashboard         = window.WebDeveloperEvents.Dashboard || {};
  window.WebDeveloperEvents.Dashboard.mouseUp = WebDeveloper.Dashboard.mouseUp;

  WebDeveloper.Common.toggleStyleSheet("/dashboard/style-sheets/dashboard.css", "web-developer-dashboard-styles", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("/dashboard/style-sheets/common.css", "web-developer-dashboard-styles", dashboardDocument, false);

  WebDeveloper.Common.getDocumentBodyElement(dashboardDocument).innerHTML = dashboardHTML;

  WebDeveloper.Common.includeJavaScript("/common/javascript/jquery/jquery.js", dashboardDocument, function()
  {
    WebDeveloper.Common.includeJavaScript("/common/javascript/bootstrap/tab.js", dashboardDocument, function()
    {
      WebDeveloper.Common.includeJavaScript("/dashboard/javascript/html/dashboard.js", dashboardDocument);
    });
  });

  resizer = dashboardDocument.getElementById("web-developer-dashboard-resizer");

  contentDocument.addEventListener("mouseup", window.WebDeveloperEvents.Dashboard.mouseUp, false);
  dashboardDocument.addEventListener("mousemove", WebDeveloper.Dashboard.mouseMove, false);
  dashboardDocument.addEventListener("mouseup", WebDeveloper.Dashboard.mouseUp, false);
  resizer.addEventListener("mousedown", WebDeveloper.Dashboard.resizerMouseDown, false);

  // Get the dashboard templates
  chrome.runtime.sendMessage({ item: "dashboard_height", type: "get-storage-item" }, function(response)
  {
    var height = response.value;

    // If the dashboard height value was returned
    if(height)
    {
      var pixels = height.indexOf("px");

      // If there are pixels in the height
      if(pixels != -1)
      {
        height = height.substring(0, pixels);
      }

      WebDeveloper.Dashboard.resize(height);
    }
  });
};

// Formats a URL
WebDeveloper.Dashboard.formatURL = function(url)
{
  // If the URL is set
  if(url)
  {
    var lastSlashIndex   = 0;
    var queryStringIndex = 0;

    // Required to fix memory corruption (?) resulting in garbled URL in Firefox 52+
    url = " " + url;

    lastSlashIndex   = url.lastIndexOf("/");
    queryStringIndex = url.indexOf("?", lastSlashIndex);

    // If there is no query string
    if(queryStringIndex == -1)
    {
      return url.substring(lastSlashIndex + 1);
    }

    return url.substring(lastSlashIndex + 1, queryStringIndex);
  }

  return url;
};

// Returns the dashboard
WebDeveloper.Dashboard.getDashboard = function(contentDocument)
{
  return contentDocument.getElementById("web-developer-dashboard");
};

// Handles the mouse move event
WebDeveloper.Dashboard.mouseMove = function(event)
{
  // If resizing the dashboard
  if(WebDeveloper.Dashboard.resizing)
  {
    WebDeveloper.Dashboard.resize(WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument()).offsetHeight - event.pageY);
  }
};

// Handles the mouse up event
WebDeveloper.Dashboard.mouseUp = function()
{
  WebDeveloper.Dashboard.resizing = false;
};

// Opens a dashboard tab
WebDeveloper.Dashboard.openDashboardTab = function(tabId, title, contentDocument, templates)
{
  var dashboard         = WebDeveloper.Dashboard.getDashboard(contentDocument);
  var dashboardDocument = null;
  var panels            = null;
  var tabs              = null;

  // If the dashboard does not already exist
  if(!dashboard)
  {
    WebDeveloper.Dashboard.createDashboard(contentDocument, templates.dashboard);

    dashboard = WebDeveloper.Dashboard.getDashboard(contentDocument);
  }

  dashboardDocument = dashboard.contentDocument;

  panels = dashboardDocument.getElementById("web-developer-dashboard-panels");
  tabs   = dashboardDocument.getElementById("web-developer-dashboard-tabs");

  WebDeveloper.Common.removeClass(panels.querySelector(".active"), "active");
  WebDeveloper.Common.removeClass(tabs.querySelector(".active"), "active");

  WebDeveloper.Common.appendHTML(templates.panel, panels, dashboardDocument);
  WebDeveloper.Common.appendHTML(templates.tab, tabs, dashboardDocument);

  return dashboardDocument.getElementById(tabId + "-panel");
};

// Removes the dashboard
WebDeveloper.Dashboard.removeDashboard = function(contentDocument)
{
  WebDeveloper.Common.removeMatchingElements("#web-developer-dashboard", contentDocument);
  WebDeveloper.Common.toggleStyleSheet("/dashboard/style-sheets/dashboard.css", "web-developer-dashboard-styles", contentDocument, false);

  contentDocument.removeEventListener("mouseup", window.WebDeveloperEvents.Dashboard.mouseUp, false);

  window.WebDeveloperEvents.Dashboard = null;
};

// Resizes the dashboard
WebDeveloper.Dashboard.resize = function(height)
{
  var contentDocument = WebDeveloper.Common.getContentDocument();
  var dashboard       = WebDeveloper.Dashboard.getDashboard(contentDocument);

  dashboard.style.setProperty("height", height + "px", "important");

  WebDeveloper.Dashboard.adjustBodyBottomMargin(contentDocument, height);
  WebDeveloper.EditCSS.resize(dashboard);
  WebDeveloper.ElementInformation.resize(dashboard);

  // Store the dashboard height
  chrome.runtime.sendMessage({ item: "dashboard_height", type: "set-storage-item", value: height }, function()
  {
    // Ignore
  });
};

// Handles the resizer mouse down event
WebDeveloper.Dashboard.resizerMouseDown = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    WebDeveloper.Dashboard.resizing = true;
  }
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.EditCSS                 = WebDeveloper.EditCSS || {};
WebDeveloper.EditCSS.contentDocument = null;
WebDeveloper.EditCSS.interval        = null;
WebDeveloper.EditCSS.updateFrequency = 500;

// Adds a tab
WebDeveloper.EditCSS.addTab = function(title, css, tabs, panels, position, contentDocument)
{
  var active = "";

  if(position == 1)
  {
    active = "active";
  }

  // Get the edit CSS tab templates
  chrome.runtime.sendMessage({ active: active, css: css, position: position, title: title, type: "get-edit-css-tab-templates" }, function(response)
  {
    WebDeveloper.Common.appendHTML(response.panel, panels, contentDocument);
    WebDeveloper.Common.appendHTML(response.tab, tabs, contentDocument);
  });
};

// Applies the CSS
WebDeveloper.EditCSS.apply = function()
{
  // If the content document is set
  if(WebDeveloper.EditCSS.contentDocument)
  {
    WebDeveloper.EditCSS.applyCSS();
  }
};

// Applies the CSS
WebDeveloper.EditCSS.applyCSS = function()
{
  var headElement      = WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.EditCSS.contentDocument);
  var styleBase        = null;
  var styleElement     = null;
  var styles           = null;
  var stylesContainer  = null;
  var stylesContainers = WebDeveloper.EditCSS.getStylesContainers();
  var stylesUpdated    = false;

  // Loop through the styles containers
  for(var i = 0, l = stylesContainers.length; i < l; i++)
  {
    styleElement    = WebDeveloper.EditCSS.contentDocument.getElementById("web-developer-edit-css-styles-" + i);
    stylesContainer = stylesContainers[i];
    styles          = WebDeveloper.EditCSS.getStylesFromContainer(stylesContainer);

    // If the style element does not exist
    if(!styleElement)
    {
      styleBase    = stylesContainer.getAttribute("web-developer-base");
      styleElement = WebDeveloper.EditCSS.contentDocument.createElement("style");

      styleElement.setAttribute("id", "web-developer-edit-css-styles-" + i);
      styleElement.setAttribute("class", "web-developer-edit-css-styles");

      // If the style base is set
      if(styleBase)
      {
        styleElement.setAttribute("xml:base", styleBase);
      }

      headElement.appendChild(styleElement);
    }

    // If the styles have changed
    if(styleElement.textContent != styles)
    {
      styleElement.textContent = styles;
      stylesUpdated            = true;
    }
  }

  return stylesUpdated;
};

// Edits the CSS of the page
WebDeveloper.EditCSS.editCSS = function(edit, contentDocument, locale)
{
  // If editing the CSS
  if(edit)
  {
    WebDeveloper.EditCSS.contentDocument = contentDocument;

    WebDeveloper.EditCSS.loadDashboardTemplates(locale);
  }
  else
  {
    WebDeveloper.EditCSS.contentDocument = contentDocument;

    WebDeveloper.EditCSS.stopUpdate();
    WebDeveloper.EditCSS.resetDocument();
    WebDeveloper.Dashboard.closeDashboardTab("edit-css", contentDocument);

    WebDeveloper.EditCSS.contentDocument = null;
  }
};

// Returns the styles containers
WebDeveloper.EditCSS.getStylesContainers = function()
{
  var dashboard        = WebDeveloper.Dashboard.getDashboard(WebDeveloper.EditCSS.contentDocument);
  var stylesContainers = [];

  // If the dashboard was found
  if(dashboard)
  {
    stylesContainers = dashboard.contentDocument.getElementById("edit-css-panel").getElementsByTagName("textarea");
  }

  return stylesContainers;
};

// Returns the styles in a container
WebDeveloper.EditCSS.getStylesFromContainer = function(stylesContainer)
{
  return stylesContainer.value;
};

// Loads the dashboard templates
WebDeveloper.EditCSS.loadDashboardTemplates = function(locale)
{
  // Get the dashboard templates
  chrome.runtime.sendMessage({ dashboardTitle: locale.dashboardTitle, tabId: "edit-css", title: locale.editCSS, type: "get-edit-css-dashboard-templates" }, function(response)
  {
    // If the dashboard template was returned - sometimes this fails
    if(response.dashboard)
    {
      var dashboardPanel = WebDeveloper.Dashboard.openDashboardTab("edit-css", locale.editCSS, WebDeveloper.EditCSS.contentDocument, response);

      WebDeveloper.EditCSS.retrieveCSS(dashboardPanel, response.editCSS, locale);
      WebDeveloper.CSS.toggleAllStyleSheets(true, WebDeveloper.EditCSS.contentDocument);
      WebDeveloper.EditCSS.update();
    }
    else
    {
      WebDeveloper.EditCSS.loadDashboardTemplates(WebDeveloper.EditCSS.contentDocument, locale);
    }
  });
};

// Resets a document
WebDeveloper.EditCSS.resetDocument = function()
{
  WebDeveloper.Common.removeMatchingElements(".web-developer-edit-css-styles", WebDeveloper.EditCSS.contentDocument);
  WebDeveloper.CSS.toggleAllStyleSheets(false, WebDeveloper.EditCSS.contentDocument);
};

// Resizes the edit CSS elements
WebDeveloper.EditCSS.resize = function(dashboard)
{
  var editCSSPanels = dashboard.contentDocument.getElementById("web-developer-edit-css-panels");

  // If the edit CSS panels exist
  if(editCSSPanels)
  {
    editCSSPanels.style.height = dashboard.offsetHeight - editCSSPanels.offsetTop - 1 + "px";
  }
};

// Retrieves the CSS for the document
WebDeveloper.EditCSS.retrieveCSS = function(dashboardPanel, editCSSPanel, locale)
{
  var documentCSS = WebDeveloper.Content.getDocumentCSS(WebDeveloper.EditCSS.contentDocument, true);

  dashboardPanel.innerHTML = editCSSPanel;

  // Get the style sheet content
  chrome.runtime.sendMessage({ errorMessage: "/* " + locale.couldNotLoadCSS + " */", type: "get-url-contents", urls: documentCSS.styleSheets }, function(response)
  {
    var dashboardDocument = WebDeveloper.Dashboard.getDashboard(WebDeveloper.EditCSS.contentDocument).contentDocument;
    var panels            = dashboardDocument.getElementById("web-developer-edit-css-panels");
    var position          = 1;
    var styleSheet        = null;
    var tabs              = dashboardDocument.getElementById("web-developer-edit-css-tabs");

    // Loop through the style sheets
    for(var i = 0, l = response.length; i < l; i++)
    {
      styleSheet = response[i];

      WebDeveloper.EditCSS.addTab(WebDeveloper.Dashboard.formatURL(styleSheet.url), styleSheet.content, tabs, panels, position, dashboardDocument);

      position++;
    }

    // If there are embedded styles
    if(documentCSS.embedded)
    {
      WebDeveloper.EditCSS.addTab(locale.embeddedStyles, documentCSS.embedded, tabs, panels, position, dashboardDocument);
    }

    // If there is no CSS
    if(!documentCSS.styleSheets.length && !documentCSS.embedded)
    {
      WebDeveloper.EditCSS.addTab(locale.editCSS, "", tabs, panels, position, dashboardDocument);
    }

    window.setTimeout(function() { WebDeveloper.EditCSS.resize(WebDeveloper.Dashboard.getDashboard(WebDeveloper.EditCSS.contentDocument)); }, 100);
  });
};

// Stops the CSS updating
WebDeveloper.EditCSS.stopUpdate = function()
{
  // If the interval id is set
  if(WebDeveloper.EditCSS.interval)
  {
    window.clearInterval(WebDeveloper.EditCSS.interval);

    WebDeveloper.EditCSS.interval = null;
  }
};

// Updates the CSS
WebDeveloper.EditCSS.update = function()
{
  // If the update frequency is greater than 0
  if(WebDeveloper.EditCSS.updateFrequency > 0)
  {
    WebDeveloper.EditCSS.interval = window.setInterval(function() { WebDeveloper.EditCSS.apply(); }, WebDeveloper.EditCSS.updateFrequency);
  }
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.ElementInformation                  = WebDeveloper.ElementInformation || {};
WebDeveloper.ElementInformation.breadcrumbHeight = 37;
WebDeveloper.ElementInformation.currentElement   = null;
WebDeveloper.ElementInformation.locale           = null;
WebDeveloper.ElementInformation.selfClosingTags  = ["area", "br", "col", "hr", "img", "input", "param"];

// Adds a CSS property
WebDeveloper.ElementInformation.addCSSProperty = function(element, property, contentDocument)
{
  var cssProperty = WebDeveloper.Common.getPropertyCSSValue(contentDocument.defaultView.getComputedStyle(element, null), property);

  // If the CSS property is set
  if(cssProperty)
  {
    return property + ": " + WebDeveloper.Common.getCSSText(cssProperty) + ";\n";
  }

  return "";
};

// Handles the click event
WebDeveloper.ElementInformation.click = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set and has a string class name
    if(eventTarget && eventTarget.className.split)
    {
      var tagName = eventTarget.tagName;

      // If the event target is not a scrollbar
      if(tagName && tagName.toLowerCase() != "scrollbar")
      {
        WebDeveloper.ElementInformation.currentElement = eventTarget;

        WebDeveloper.ElementInformation.displayElementInformation(eventTarget);
      }
    }

    event.stopPropagation();
    event.preventDefault();
  }
};

// Handles the click event inside the output
WebDeveloper.ElementInformation.clickOutput = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      // If the event target is the copy ancestor path button
      if(eventTarget.hasAttribute("id") && eventTarget.getAttribute("id") == "web-developer-copy-ancestor-path")
      {
        WebDeveloper.ElementInformation.copyAncestorPath();
      }
      else
      {
        var tagName = eventTarget.tagName;

        // If the event target is a link
        if(tagName && tagName.toLowerCase() == "a")
        {
          var tagClasses = eventTarget.className;

          // If the event target is an ancestor
          if(tagClasses.indexOf("web-developer-ancestor") != -1)
          {
            WebDeveloper.ElementInformation.selectParentElement(eventTarget);
          }
          else if(tagClasses.indexOf("web-developer-child") != -1)
          {
            WebDeveloper.ElementInformation.selectChildElement(eventTarget);
          }

          event.preventDefault();
        }
      }
    }
  }
};

// Displays the information for an element
WebDeveloper.ElementInformation.displayElementInformation = function(element)
{
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var generatedDocument  = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;
  var elementInformation = generatedDocument.getElementById("element-information-content");
  var dispatchEvent      = generatedDocument.createEvent("Events");

  WebDeveloper.Common.empty(elementInformation);
  elementInformation.appendChild(WebDeveloper.ElementInformation.generateElementInformation(element, contentDocument, generatedDocument, "none"));

  dispatchEvent.initEvent("web-developer-initialize-ancestors-event", true, false);
  generatedDocument.querySelector("#element-information-content .breadcrumb").dispatchEvent(dispatchEvent);
};

// Generates ancestor information for an element
WebDeveloper.ElementInformation.generateAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("div");
  var ancestorList        = contentDocument.createElement("ol");
  var hasAncestors        = false;
  var heading             = contentDocument.createElement("h3");
  var parentElement       = null;

  heading.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("ancestors")));

  // While there is a parent element
  while((parentElement = element.parentNode) !== null)
  {
    element      = parentElement;
    hasAncestors = true;

    WebDeveloper.Common.insertAsFirstChild(ancestorList, WebDeveloper.ElementInformation.getElementDescription(element, contentDocument, "web-developer-ancestor"));
  }

  ancestorInformation.setAttribute("class", "col-sm-6 web-developer-ancestors");
  ancestorInformation.appendChild(heading);

  // If there are ancestors
  if(hasAncestors)
  {
    var lastItem = contentDocument.createElement("li");

    lastItem.setAttribute("class", "last");
    ancestorList.appendChild(lastItem);
    ancestorInformation.appendChild(ancestorList);
  }

  return ancestorInformation;
};

// Generates children information for an element
WebDeveloper.ElementInformation.generateChildrenInformation = function(element, contentDocument)
{
  var childList           = contentDocument.createElement("ol");
  var childNodes          = element.childNodes;
  var childrenInformation = contentDocument.createElement("div");
  var elementDescription  = null;
  var hasChildren         = false;
  var heading             = contentDocument.createElement("h3");

  heading.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("children")));

  // Loop through the child nodes
  for(var i = 0, l = childNodes.length; i < l; i++)
  {
    elementDescription = WebDeveloper.ElementInformation.getElementDescription(childNodes[i], contentDocument, "web-developer-child");

    // If the element description is set
    if(elementDescription)
    {
      hasChildren = true;

      childList.appendChild(elementDescription);
    }
  }

  childrenInformation.setAttribute("class", "col-sm-6 web-developer-children");
  childrenInformation.appendChild(heading);

  // If there are children
  if(hasChildren)
  {
    childrenInformation.appendChild(childList);
  }

  return childrenInformation;
};

// Generates DON information for an element
WebDeveloper.ElementInformation.generateDOMInformation = function(element, contentDocument)
{
  var attribute      = null;
  var attributeName  = null;
  var attributes     = element.attributes;
  var attributeValue = null;
  var childElement   = contentDocument.createElement("h3");
  var domInformation = contentDocument.createElement("div");
  var domContent     = "<";
  var tagName        = element.tagName.toLowerCase();

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("dom")));

  domInformation.setAttribute("class", "col-sm-6");
  domInformation.appendChild(childElement);

  childElement = contentDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "htmlmixed");

  domContent += tagName;

  // Loop through the attributes
  for(var i = 0, l = attributes.length; i < l; i++)
  {
    attribute     = attributes[i];
    attributeName = attribute.name;

    // If this is the style attribute
    if(attributeName == "style")
    {
      // If the element has the Web Developer outline attribute
      if(element.hasAttribute("data-web-developer-element-ancestors-outline"))
      {
        attributeValue = WebDeveloper.Common.removeSubstring(attribute.value, "outline-width: 1px; outline-style: solid; outline-color: rgb(185, 74, 72);").trim();
        attributeValue = WebDeveloper.Common.removeSubstring(attributeValue, "outline: 1px solid rgb(185, 74, 72);").trim();
        attributeValue = WebDeveloper.Common.removeSubstring(attributeValue, "outline: rgb(185, 74, 72) solid 1px;").trim();

        // If the attribute value is set
        if(attributeValue)
        {
          domContent += " " + attributeName + '="' + attributeValue + '"';
        }
      }
      else
      {
        domContent += " " + attributeName + '="' + attribute.value + '"';
      }
    }
    else if(attributeName != "data-web-developer-element-ancestors-outline")
    {
      domContent += " " + attributeName + '="' + attribute.value + '"';
    }
  }

  domContent += ">";

  // If this is not a self-closing tag
  if(!WebDeveloper.Common.inArray(tagName, WebDeveloper.ElementInformation.selfClosingTags))
  {
    domContent += "\n...\n";
    domContent += "</" + tagName + ">";
  }

  childElement.appendChild(contentDocument.createTextNode(domContent));

  domInformation.appendChild(childElement);

  return domInformation;
};

// Generates the information for an element
WebDeveloper.ElementInformation.generateElementInformation = function(element, contentDocument, generatedDocument, theme)
{
  var divElement         = generatedDocument.createElement("div");
  var elementInformation = generatedDocument.createDocumentFragment();

  elementInformation.appendChild(WebDeveloper.ElementAncestors.generateAncestorInformation(element, generatedDocument));

  divElement.setAttribute("class", "row");
  divElement.appendChild(WebDeveloper.ElementInformation.generateDOMInformation(element, generatedDocument, theme));
  divElement.appendChild(WebDeveloper.ElementInformation.generateLayoutInformation(element, generatedDocument));
  elementInformation.appendChild(divElement);

  divElement = generatedDocument.createElement("div");

  divElement.setAttribute("class", "row");
  divElement.appendChild(WebDeveloper.ElementInformation.generatePositionInformation(element, contentDocument, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateTextInformation(element, contentDocument, generatedDocument));
  elementInformation.appendChild(divElement);

  divElement = generatedDocument.createElement("div");

  divElement.setAttribute("class", "row");
  divElement.appendChild(WebDeveloper.ElementInformation.generateAncestorInformation(element, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateChildrenInformation(element, generatedDocument));
  elementInformation.appendChild(divElement);

  return elementInformation;
};

// Generates layout information for an element
WebDeveloper.ElementInformation.generateLayoutInformation = function(element, contentDocument)
{
  var childElement      = contentDocument.createElement("h3");
  var layoutInformation = contentDocument.createElement("div");

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("layout")));

  layoutInformation.setAttribute("class", "col-sm-6 web-developer-css");
  layoutInformation.appendChild(childElement);

  childElement = contentDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  childElement.appendChild(contentDocument.createTextNode("height: " + element.offsetHeight + "px;\nwidth: " + element.offsetWidth + "px;"));

  layoutInformation.appendChild(childElement);

  return layoutInformation;
};

// Generates position information for an element
WebDeveloper.ElementInformation.generatePositionInformation = function(element, contentDocument, generatedDocument)
{
  var childElement        = generatedDocument.createElement("h3");
  var positionInformation = generatedDocument.createElement("div");
  var positionContent     = "";

  childElement.appendChild(generatedDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("position")));
  positionInformation.setAttribute("class", "col-sm-6 web-developer-css");
  positionInformation.appendChild(childElement);

  childElement = generatedDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  positionContent += WebDeveloper.ElementInformation.addCSSProperty(element, "display", contentDocument);
  positionContent += WebDeveloper.ElementInformation.addCSSProperty(element, "float", contentDocument);
  positionContent += WebDeveloper.ElementInformation.addCSSProperty(element, "position", contentDocument);

  // If the position content was set
  if(positionContent)
  {
    positionContent = positionContent.trim();
  }

  childElement.appendChild(generatedDocument.createTextNode(positionContent));
  positionInformation.appendChild(childElement);

  return positionInformation;
};

// Generates text information for an element
WebDeveloper.ElementInformation.generateTextInformation = function(element, contentDocument, generatedDocument)
{
  var childElement    = generatedDocument.createElement("h3");
  var textInformation = generatedDocument.createElement("div");
  var textContent     = "";

  childElement.appendChild(generatedDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("text")));
  textInformation.setAttribute("class", "col-sm-6 web-developer-css");
  textInformation.appendChild(childElement);

  childElement = generatedDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  textContent += WebDeveloper.ElementInformation.addCSSProperty(element, "font-family", contentDocument);
  textContent += WebDeveloper.ElementInformation.addCSSProperty(element, "font-size", contentDocument);
  textContent += WebDeveloper.ElementInformation.addCSSProperty(element, "line-height", contentDocument);

  // If the text content was set
  if(textContent)
  {
    textContent = textContent.trim();
  }

  childElement.appendChild(generatedDocument.createTextNode(textContent));
  textInformation.appendChild(childElement);

  return textInformation;
};

// Returns the element description
WebDeveloper.ElementInformation.getElementDescription = function(element, contentDocument)
{
  var description = null;

  // If the element and tag name are set
  if(element && element.tagName)
  {
    var classList = element.className.split(" ");
    var link      = contentDocument.createElement("a");
    var linkText  = element.tagName.toLowerCase();

    description = contentDocument.createElement("li");

    link.setAttribute("class", "type");
    link.setAttribute("href", "#");

    // If the element has an id attribute
    if(element.hasAttribute("id"))
    {
      linkText += "#" + element.getAttribute("id");
    }

    // If the element has an class attribute
    if(element.hasAttribute("class"))
    {
      var className = null;

      // Loop through the classes
      for(var i = 0, l = classList.length; i < l; i++)
      {
        className = classList[i].trim();

        // If the class name is set
        if(className)
        {
          linkText += "." + className;
        }
      }
    }

    link.appendChild(contentDocument.createTextNode(linkText));

    description.appendChild(link);
  }

  return description;
};

// Returns a string from the locale
WebDeveloper.ElementInformation.getLocaleString = function(name)
{
  return WebDeveloper.ElementInformation.locale[name];
};

// Initializes the display element information dashboard
WebDeveloper.ElementInformation.initialize = function(display, contentDocument, locale)
{
  // If displaying the element information dashboard
  if(display)
  {
    WebDeveloper.ElementInformation.locale                 = locale;
    window.WebDeveloperEvents                              = window.WebDeveloperEvents || {};
    window.WebDeveloperEvents.ElementInformation           = window.WebDeveloperEvents.ElementInformation || {};
    window.WebDeveloperEvents.ElementInformation.click     = WebDeveloper.ElementInformation.click;
    window.WebDeveloperEvents.ElementInformation.mouseOver = WebDeveloper.ElementAncestors.mouseOver;

    WebDeveloper.ElementInformation.loadDashboardTemplates(contentDocument, locale);

    contentDocument.addEventListener("click", window.WebDeveloperEvents.ElementInformation.click, true);
    contentDocument.addEventListener("mouseover", window.WebDeveloperEvents.ElementInformation.mouseOver, false);
  }
  else
  {
    WebDeveloper.Dashboard.closeDashboardTab("element-information", contentDocument);

    contentDocument.removeEventListener("click", window.WebDeveloperEvents.ElementInformation.click, true);
    contentDocument.removeEventListener("mouseover", window.WebDeveloperEvents.ElementInformation.mouseOver, false);
    WebDeveloper.ElementAncestors.removeOutline(contentDocument);

    window.WebDeveloperEvents.ElementInformation = null;
  }

  WebDeveloper.Common.toggleStyleSheet("/toolbar/element-ancestors.css", "web-developer-element-information-styles", contentDocument, false);
};

// Loads the dashboard templates
WebDeveloper.ElementInformation.loadDashboardTemplates = function(contentDocument, locale)
{
  // Get the dashboard templates
  chrome.runtime.sendMessage({ dashboardTitle: locale.dashboardTitle, selectAnElementDisplayInformation: locale.selectAnElementDisplayInformation, tabId: "element-information", title: locale.elementInformation, type: "get-element-information-dashboard-templates" }, function(response)
  {
    // If the dashboard template was returned - sometimes this fails
    if(response.dashboard)
    {
      var dashboardPanel = WebDeveloper.Dashboard.openDashboardTab("element-information", locale.elementInformation, contentDocument, response);

      dashboardPanel.innerHTML = response.elementInformation;

      dashboardPanel.addEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);

      window.setTimeout(function() { WebDeveloper.ElementInformation.resize(WebDeveloper.Dashboard.getDashboard(contentDocument)); }, 100);
    }
    else
    {
      WebDeveloper.ElementInformation.loadDashboardTemplates(contentDocument, locale);
    }
  });
};

// Resizes the element information elements
WebDeveloper.ElementInformation.resize = function(dashboard)
{
  var elementInformationPanel = dashboard.contentDocument.getElementById("element-information-panel");

  // If the element information panel exists
  if(elementInformationPanel)
  {
    elementInformationPanel.style.height = dashboard.offsetHeight - elementInformationPanel.offsetTop - WebDeveloper.ElementInformation.breadcrumbHeight + "px";
  }
};

// Handles a child element being selected
WebDeveloper.ElementInformation.selectChildElement = function(eventTarget)
{
  var childCount    = 0;
  var childNodes    = WebDeveloper.ElementInformation.currentElement.childNodes;
  var counter       = 0;
  var element       = eventTarget.parentNode;
  var ownerDocument = eventTarget.ownerDocument;

  // Loop through the previous siblings
  while((element = element.previousSibling) !== null)
  {
    childCount++;
  }

  // Loop through the child nodes
  for(var i = 0, l = childNodes.length; i < l; i++)
  {
    element = childNodes[i];

    // If the element and tag name are set
    if(element && element.tagName)
    {
      // If the counter matches the child count
      if(counter == childCount)
      {
        WebDeveloper.ElementInformation.displayElementInformation(element);

        // If the owner document is set
        if(ownerDocument)
        {
          element = ownerDocument.getElementById("element-information-panel");

          // If the element is found
          if(element)
          {
            element.scrollTop = 0;
          }
        }

        break;
      }

      counter++;
    }
  }
};

// Handles a parent element being selected
WebDeveloper.ElementInformation.selectParentElement = function(eventTarget)
{
  var ancestorCount = 0;
  var element       = eventTarget.parentNode;
  var ownerDocument = eventTarget.ownerDocument;
  var parentElement = WebDeveloper.ElementInformation.currentElement;

  // Loop through the next siblings
  while((element = element.nextSibling) !== null)
  {
    ancestorCount++;
  }

  // Loop through the ancestors
  for(var i = 0; i < ancestorCount; i++)
  {
    parentElement = parentElement.parentNode;
  }

  WebDeveloper.ElementInformation.displayElementInformation(parentElement);

  // If the owner document is set
  if(ownerDocument)
  {
    element = ownerDocument.getElementById("element-information-panel");

    // If the element is found
    if(element)
    {
      element.scrollTop = 0;
    }
  }
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.ElementAncestors         = WebDeveloper.ElementAncestors || {};
WebDeveloper.ElementAncestors.element = null;

// Displays the ancestors of an element
WebDeveloper.ElementAncestors.displayElementAncestors = function(element)
{
  var dashboard = WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument());

  // If the dashboard exists
  if(dashboard)
  {
    // If the element is not the dashboard
    if(!element.hasAttribute("id") || element.getAttribute("id") != dashboard.getAttribute("id"))
    {
      var generatedDocument = dashboard.contentDocument;
      var dispatchEvent     = generatedDocument.createEvent("Events");
      var elementAncestors  = generatedDocument.getElementById("current-element-ancestors");

      WebDeveloper.Common.empty(elementAncestors);
      elementAncestors.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, generatedDocument));

      dispatchEvent.initEvent("web-developer-initialize-ancestors-event", true, false);
      generatedDocument.querySelector("#current-element-ancestors .breadcrumb").dispatchEvent(dispatchEvent);
    }
  }
};

// Generates ancestor information for an element
WebDeveloper.ElementAncestors.generateAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("div");

  ancestorInformation.setAttribute("id", "web-developer-ancestors");
  ancestorInformation.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, contentDocument));

  return ancestorInformation;
};

// Returns the ancestor information for an element
WebDeveloper.ElementAncestors.getAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("ol");
  var parentElement       = null;

  ancestorInformation.setAttribute("class", "breadcrumb");
  WebDeveloper.Common.insertAsFirstChild(ancestorInformation, WebDeveloper.ElementAncestors.getElementDescription(element, contentDocument, true));

  // While there is a parent element
  while((parentElement = element.parentNode) !== null)
  {
    element = parentElement;

    WebDeveloper.Common.insertAsFirstChild(ancestorInformation, WebDeveloper.ElementAncestors.getElementDescription(element, contentDocument, false));
  }

  return ancestorInformation;
};

// Returns the description for an element
WebDeveloper.ElementAncestors.getElementDescription = function(element, contentDocument, active)
{
  var description = null;

  // If the element and tag name are set
  if(element && element.tagName)
  {
    var classList = element.className.split(" ");

    description = contentDocument.createElement("li");

    // If this is the active element
    if(active)
    {
      description.setAttribute("class", "active");
    }

    description.setAttribute("data-web-developer-element-tag", element.tagName.toLowerCase());

    // If the element has an id attribute
    if(element.hasAttribute("id"))
    {
      description.setAttribute("data-web-developer-element-id", "#" + element.getAttribute("id"));
    }

    // If the element has an class attribute
    if(element.hasAttribute("class"))
    {
      var className = null;
      var classes   = "";

      // Loop through the classes
      for(var i = 0, l = classList.length; i < l; i++)
      {
        className = classList[i].trim();

        // If the class name is set
        if(className)
        {
          classes += "." + className;
        }
      }

      description.setAttribute("data-web-developer-element-classes", classes);
    }

    // If this is not the active element
    if(!active)
    {
      var childElement = contentDocument.createElement("a");

      childElement.setAttribute("href", "#");
      childElement.setAttribute("class", "web-developer-ancestor");
      description.appendChild(childElement);
    }
  }

  return description;
};

// Handles the mouse over event
WebDeveloper.ElementAncestors.mouseOver = function(event)
{
  var eventTarget = event.target;

  // If the event target is set
  if(eventTarget)
  {
    var ownerDocument = eventTarget.ownerDocument;

    // If the owner document is set
    if(ownerDocument)
    {
      // If the event target is not the element
      if(eventTarget != WebDeveloper.ElementAncestors.element)
      {
        // If the event target has a string class name and style property
        if(eventTarget.className.split && eventTarget.style)
        {
          WebDeveloper.ElementAncestors.removeOutline(ownerDocument);

          eventTarget.style.outline             = "1px solid #b94a48";
          WebDeveloper.ElementAncestors.element = eventTarget;

          WebDeveloper.ElementAncestors.displayElementAncestors(eventTarget);

          // Needed for Chrome to keep track of
          eventTarget.setAttribute("data-web-developer-element-ancestors-outline", "true");
        }
      }
    }
  }
};

// Removes the outline
WebDeveloper.ElementAncestors.removeOutline = function(contentDocument)
{
  var element = contentDocument.querySelector("[data-web-developer-element-ancestors-outline=true]");

  // If the element is set
  if(element)
  {
    element.style.outline = "";

    // If the element has an empty style attribute
    if(element.hasAttribute("style") && element.getAttribute("style").trim() === "")
    {
      element.removeAttribute("style");
    }

    // Needed for Chrome to keep track of
    element.removeAttribute("data-web-developer-element-ancestors-outline");
  }
};

void(0);