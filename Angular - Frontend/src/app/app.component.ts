import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { FileService } from './Services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  selectedImage: any = null;

  url:string;
  id:string;
  file:string;

  constructor( @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getImageDetailList();
  }

  showPreview(event: any) {
      this.selectedImage = event.target.files[0];
  }

  save() {
      var name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.fileService.insertImageDetails(this.id,this.url);
            alert('Upload Successful');
          })
        })
      ).subscribe();
  }

  view()
  {
    this.fileService.getImage(this.file);
  }

}
