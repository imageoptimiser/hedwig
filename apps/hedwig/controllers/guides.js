// ==========================================================================
// Project:   Hedwig.guidesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
// for now, we are hard-coding the guide in...
Hedwig.guidesController = SC.ObjectController.create(
/** @scope Hedwig.guidesController.prototype */ {
  
  currentGuide: null,
  loadGuide: function(path) {
    // quick hack to make things work offline, properly.
    var g = window.localStorage["hedwig-current-guide"];
    if (g) {
      this.set("currentGuide", g);
    }
    
    
    SC.Request.getUrl(path).json().notify(this, "didLoadGuide").send();
  },
  
  didLoadGuide: function(response) {
    // obviously I have no error handling right now. Did I mention I'm in a bit of a hurry?
    // /me crosses fingers
    if (SC.ok(response)) {
      window.localStorage["hedwig-current-guide"] = response.get("body");
      this.set("currentGuide", response.get("body"));
    }
  }
}) ;
