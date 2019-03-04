"use strict";

// Using a namespace to use everywhere without a nodejs environment
var myAppIO = {};

/**
 *  IntersectionObserver to intelligently determine when to lazy-load offscreen images.
 */
((win, doc, log, si, ci, sto, loc) => {

  const isIntersectionObserverSupported = "IntersectionObserver" in window;
  // Add Polyfill minified if not supported
  if(!isIntersectionObserverSupported){
    !function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.USE_MUTATION_OBSERVER=!0,i.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(r(t,"resize",this._checkForIntersections,!0),r(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(i){var r=i.element,s=h(r),c=this._rootContainsTarget(r),a=i.entry,u=e&&c&&this._computeTargetAndRootIntersection(r,n),l=i.entry=new o({time:t.performance&&performance.now&&performance.now(),target:r,boundingClientRect:s,rootBounds:n,intersectionRect:u});a?e&&c?this._hasCrossedThreshold(a,l)&&this._queuedEntries.push(l):a&&a.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,o){if("none"!=t.getComputedStyle(n).display){for(var i,r,s,c,u,l,p,d,g=h(n),f=a(n),_=!1;!_;){var v=null,m=1==f.nodeType?t.getComputedStyle(f):{};if("none"==m.display)return;if(f==this.root||f==e?(_=!0,v=o):f!=e.body&&f!=e.documentElement&&"visible"!=m.overflow&&(v=h(f)),v&&(i=v,r=g,s=void 0,c=void 0,u=void 0,l=void 0,p=void 0,d=void 0,s=Math.max(i.top,r.top),c=Math.min(i.bottom,r.bottom),u=Math.max(i.left,r.left),l=Math.min(i.right,r.right),d=c-s,!(g=(p=l-u)>=0&&d>=0&&{top:s,bottom:c,left:u,right:l,width:p,height:d})))break;f=a(f)}return g}},i.prototype._getRootRect=function(){var t;if(this.root)t=h(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==n||r==o||r<n!=r<o)return!0}},i.prototype._rootIsInDom=function(){return!this.root||c(e,this.root)},i.prototype._rootContainsTarget=function(t){return c(this.root||e,t)},i.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},i.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=o}function o(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?Number((i/n).toFixed(4)):this.isIntersecting?1:0}function i(t,e){var n,o,i,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),o=this.THROTTLE_TIMEOUT,i=null,function(){i||(i=setTimeout(function(){n(),i=null},o))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function h(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function c(t,e){for(var n=e;n;){if(n==t)return!0;n=a(n)}return!1}function a(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e&&e.assignedSlot?e.assignedSlot.parentNode:e}}(window,document);
  }

  // There are, however, additional use cases that the default configuration will not detect.
  // These include target elements intersecting with a root element due to:

  // CSS changes on :hover, :active, or :focus states.
  // CSS changes due to transitions or animations with a long initial delay.
  // Resizable <textarea> elements that cause other elements to move around.
  // Scrolling of non-document elements in browsers that don't support the event capture phase.

  // To observe the before changes to ALL elements use:
  // IntersectionObserver.prototype.POLL_INTERVAL = 100; // Time in milliseconds.
  // Or to a single element
  // var io = new IntersectionObserver(callback);
  // io.POLL_INTERVAL = 100; // Time in milliseconds.
  // io.observe(someTargetElement);

  /**
   * Our constructor
   */
  myAppIO.createObserver = function() {

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1 // means that when 100% of the target is visible within the element specified by the root option, the callback is invoked
    };

    // Only one instance in our project
    myAppIO.observer = new IntersectionObserver(myAppIO.handleIntersect, options);

  };

  /**
   * Our method to observe new images with data-io-bg attribute
   * which has a url image in there
   */
  myAppIO.observe = function() {

    const images = document.querySelectorAll('[data-io-bg]');

    images.forEach(image => {
      // Some fade in effect CSS classes
      if(!image.classList.contains('s-layout-fade'))
        image.classList.add('s-layout-fade', 's-layout-fade-init');
      myAppIO.observer.observe(image);
    });

  };

  /**
   * The Handler to get the url image and load it in style bg-image attribute
   * @param entries
   * @param observer
   */
  myAppIO.handleIntersect = function(entries, observer) {

    entries.forEach(function(entry) {

      // If element is in the viewport
      if (entry.intersectionRatio > 0) {

        // Take the data-img and apply a background-image to load the image
        // Check if current element has our data atttribute
        if(entry.target.hasAttribute('data-io-bg')) {

          // Get the data attribute
          const ioBg = entry.target.getAttribute('data-io-bg');
          // Probably we could also create a virtual image so we preload it and then add the bg as below
          entry.target.setAttribute('style', 'background-repeat: no-repeat;background-size: cover;background-image:url("'+ioBg+'");');
          // Remove the class
          entry.target.classList.remove('s-layout-fade');
          // Stop observing the observed one
          observer.unobserve(entry.target);
          // Remove this data-io attr
          entry.target.removeAttribute('data-io-bg');

        }

      }

    });

  };

  // Create our observer
  myAppIO.createObserver();
  // Run a first time.
  // We can use everywhere, e.g. AJAX responses where new items are appended into the DOM
  myAppIO.observe();

})(
  window,
    document,
    console,
    setInterval,
    clearInterval,
    setTimeout,
    window.location
);