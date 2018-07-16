import { Component, OnInit } from '@angular/core';
import { SecurityService } from './../security.service';


/**
 * image info : 45 images in each animation 
 */

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {
  groupIndex: number;
  imgName: string;
  intvID: any;
  basePath: string;
  imgGroup: Array<string>[];

  constructor(private security: SecurityService) { }

  ngOnInit() {
    this.groupIndex = 0;
    this.imgName = 'lock0001.png';
    this.basePath = "/assets/img/vault/";
    this.imgGroup = []; 
    this.createImgGroups();
  }

  createImgGroups(): void {
    let imgNames = [];
    for (let i = 1; i < 457; i++) {
      imgNames.push(this.nextImage(i-1));
      if (i % 46 === 0) {
        this.imgGroup.push(imgNames);
        imgNames = [];
      }
    }
    this.imgGroup.push(imgNames);
  }

  unlockNext() {
    console.log(this.security.getQuestion());
    let intv = 50;
    let index = 0;
    this.intvID = setInterval(() => {
      intv += 2;
      this.imgName = this.imgGroup[this.groupIndex][index++];
      if (index >= this.imgGroup[this.groupIndex].length) {
        clearInterval(this.intvID);
        this.groupIndex++;
      }
    }, intv);
  }

  nextImage(imgIndex: number): string {
    let baseName = "lock0000";
    let imgName = baseName.substring(0, baseName.length - ((++imgIndex).toString().length)) + imgIndex + ".png";
    return imgName;
  }

  ngOnDestroy() {
    if (this.intvID) {
      clearInterval(this.intvID);
    }
  }

}
