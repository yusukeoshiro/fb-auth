import { Component, OnInit } from '@angular/core';
declare var firebase: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cip-client';
  public myCred = {};

  private authProviderMap = {
    'yahoo' : 'oidc.yahoo!-japan',
    'line' : 'oidc.line-login'
  };

  constructor() {}

  ngOnInit() {
    const config = {
      apiKey: "AIzaSyDrbZlqsz6DDYJYC5cAZ6AKu0fShIBE1ZE",
      authDomain: "gke-demo-oshiro-app.firebaseapp.com",
    };
    firebase.initializeApp(config);
  }

  public onAuthLogin(authName) {

    let provider;

    if (authName == 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else {
      const oAuthProvider = this.authProviderMap[authName];
      provider = new firebase.auth.OAuthProvider(oAuthProvider);
    }

    const auth = firebase.auth();

    auth.signInWithPopup(provider).then(
      (result) => {
        console.log(result);
        console.log(result.credential);
        console.log(result.credential.idToken);
        this.myCred = result.credential;
      }
    )
  }
}
