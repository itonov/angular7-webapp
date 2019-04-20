import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private selectedFiles: Array<File> = new Array<File>();
  @Output() fileListChanged: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    for (let i = 0; i < event.length; i++) {
      const selectedFile = event.item(i);

      this.selectedFiles.push(selectedFile);
    }
    this.fileListChanged.emit(this.selectedFiles);
  }

  constructor() {
  }

  ngOnInit() {
  }

  handleRemove(file: File): void {
    if (this.selectedFiles.length === 1) {
      this.selectedFiles = new Array<File>();
    } else {
      this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1);
    }
    this.fileListChanged.emit(this.selectedFiles);
  }

}
