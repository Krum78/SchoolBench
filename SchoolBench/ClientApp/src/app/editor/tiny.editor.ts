import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainApiClient } from "../services/main.api.client";
import { ServiceLocator } from "../services/locator.service";

@Component({
  selector: 'tyni-editor',
  template: '<editor class="tiny-editor" [init]="tinyMceSettings" [(ngModel)]="model" (ngModelChange)="modelChange.emit(model)"></editor>',
  styleUrls: ['tiny.editor.css']
})
export class TinyEditor {

  @Input() model: string;
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  public tinyMceSettings = {
    inline: true,
    statusbar: true,
    browser_spellcheck: true,
    height: 320,
    autoresize_bottom_margin: 50,
    media_live_embeds: true,
    plugins: 'print preview code lists advlist anchor autolink autoresize charmap codesample colorpicker contextmenu fullscreen help hr image imagetools link media nonbreaking paste searchreplace table textcolor textpattern toc visualblocks visualchars wordcount',
    toolbar1: 'undo redo | formatselect | bold italic strikethrough forecolor backcolor | fontselect fontsizeselect | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    contextmenu: 'cut copy paste',
    //images_upload_handler: function (blobInfo, success, failure) {

    //  var xhr, formData;

    //  xhr = new XMLHttpRequest();
    //  xhr.withCredentials = false;
    //  xhr.open('POST', 'postAcceptor.php');

    //  xhr.onload = function () {
    //    var json;

    //    if (xhr.status != 200) {
    //      failure('HTTP Error: ' + xhr.status);
    //      return;
    //    }

    //    json = JSON.parse(xhr.responseText);

    //    if (!json || typeof json.location != 'string') {
    //      failure('Invalid JSON: ' + xhr.responseText);
    //      return;
    //    }

    //    success(json.location);
    //  };

    //  formData = new FormData();
    //  formData.append('file', blobInfo.blob(), blobInfo.filename());

    //  xhr.send(formData);
    //},
    images_upload_handler: this.uploadFile
  };

  uploadFile(blobInfo, success, failure) : void {
    let client = ServiceLocator.injector.get(MainApiClient);
    client.uploadFile(blobInfo).subscribe((response) => {
      console.log(response);
      success(response.location);
    }, (error) => {
      console.error(error);
      failure(error);
    });
  }
}
