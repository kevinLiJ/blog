import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'edit-article',
  styleUrls:['./editArticle.component.css'],
  templateUrl: './editArticle.component.html'
})


export class EditArticleComponent {
  articleContent:string = ``;
  textareaAllowTab(e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        var indent = '    ';
        var thisTextarea = e.target;
        var start = thisTextarea.selectionStart;
        var end = thisTextarea.selectionEnd;
        var selected = window.getSelection().toString();
        selected = indent + selected.replace(/\n/g, '\n' + indent);
        thisTextarea.value = thisTextarea.value.substring(0, start) + selected
                + thisTextarea.value.substring(end);
        thisTextarea.setSelectionRange(start + indent.length, start
                + selected.length);
    }
  }
}
