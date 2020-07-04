hotkeys.filter = function(event){
    return true;
  }
  //How to add the filter to edit labels. <div contentEditable="true"></div>
  //"contentEditable" Older browsers that do not support drops
  hotkeys.filter = function(event) {
    var tagName = (event.target || event.srcElement).tagName;
    return !(tagName.isContentEditable || tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  hotkeys.filter = function(event){
    var tagName = (event.target || event.srcElement).tagName;
    hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
    return true;
  }

  function surroundTxt(txtarea,surround){
    var st = txtarea.selectionStart;
    var end = txtarea.selectionEnd;
    if ((st !== end)){
      var text = txtarea.value;
      var newSel = surround + text.substring(st, end) + surround;
      var text = text.substring(0, st) + newSel + text.substring(end, text.length);
      return text;
    } else {
      return "";
    }
  }

  hotkeys('ctrl+b,r,f', function (event, handler){
    switch (handler.key) {
      case 'ctrl+b': 
        // Bold selected text
        var txtareas = document.getElementsByClassName("textarea");
        for (var i in txtareas){
          var txtarea = txtareas[i];
          var txt = surroundTxt(txtarea,"\*\*");
          if (txt !== ""){
            txtarea.value = txt;
          }
        }
        break;
      case 'ctrl+i': 
        // Italize selected text
        var txtareas = document.getElementsByClassName("textarea");
        for (var i in txtareas){
          var txtarea = txtareas[i];
          var txt = surroundTxt(txtarea,"__");
          if (txt !== ""){
            txtarea.value = txt;
          }
        }
        break;
      case 'ctrl+m': 
        // Surround as latex formula selected text
        var txtareas = document.getElementsByClassName("textarea");
        for (var i in txtareas){
          var txtarea = txtareas[i];
          var txt = surroundTxt(txtarea,"$");
          if (txt !== ""){
            txtarea.value = txt;
          }
        }
        break;
    }
  });