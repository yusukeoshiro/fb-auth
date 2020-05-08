import { Component, OnInit } from '@angular/core';
declare var firebase: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cip-client';
  public idTokenIdProvider: string;
  public idTokenFirebase: string;

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

  public async onAuthLogin(authName) {
    const auth = firebase.auth();
    const oAuthProvider = this.authProviderMap[authName];
    const provider = (authName == 'google')
      ? new firebase.auth.GoogleAuthProvider()
      : new firebase.auth.OAuthProvider(oAuthProvider);

    const result = await auth.signInWithPopup(provider);
    this.idTokenIdProvider = result.credential.idToken;
    this.idTokenFirebase   = await firebase.auth().currentUser.getIdToken(true);

  }
}
