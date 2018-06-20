import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HttpRequestProvider } from "../../providers/http-request/http-request";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private requestProvider: HttpRequestProvider,
    private nativeStorage: NativeStorage
  ) {}

  items = [];
  index: number = 20;

  ionViewDidLoad() {
    this.requestProvider.getBooks(0).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.items.length; i++) {
        this.items.push(data.items[i].volumeInfo);
      }
      console.log(this.items);
    });
  }

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");

    this.requestProvider.getBooks(this.index).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.items.length; i++) {
        this.items.push(data.items[i].volumeInfo);
      }
      console.log(this.items);
      console.log("Async operation has ended");
      this.index += 20;
      infiniteScroll.complete();
    });
  }

  set() {
    this.nativeStorage
      .setItem("myitem", {
        title: this.items[0].title,
        description: this.items[0].description
      })
      .then(
        () => {
          console.log("Stored item!");
          alert("Stored item!");
        },
        error => console.error("Error storing item", error)
      );
  }

  get() {
    this.nativeStorage
      .getItem("myitem")
      .then(data => {
        console.log(data);
        alert(JSON.stringify(data))
      }, error => console.error(error));
  }
}
