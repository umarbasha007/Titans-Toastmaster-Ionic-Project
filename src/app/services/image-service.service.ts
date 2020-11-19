import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(
    private afStorage: AngularFireStorage
  ) { }

public   uploadToStorage(information,filename) {
  return new Promise<any>((resolve, reject) => {
  var metadata = {
    contentType: 'image/jpeg',
  };
  const upload= this.afStorage.ref(`files/${filename}`).put(information,metadata).then(snap=>{
  const storageRef = firebase.storage().ref();
  storageRef.child('files/bestspeaker.png').getDownloadURL().then(function(url) {
    console.log(url);
    resolve(url);
  });
});
});
} 
/*
 public  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.getDownloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }
  */
}
