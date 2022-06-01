import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurantdash',
  templateUrl: './restaurantdash.component.html',
  styleUrls: ['./restaurantdash.component.css']
})
export class RestaurantdashComponent implements OnInit {
  formValue!:FormGroup
  restauranrModelObj:RestaurantData=new RestaurantData
showAdd!:boolean
showbtn!:boolean
  allRData:any;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData()
  }
clickAddResto(){
  this.formValue.reset();
  this.showAdd=true;
  this.showbtn=false;
}


  addResto(){
    this.restauranrModelObj.name=this.formValue.value.name;
    this.restauranrModelObj.email=this.formValue.value.email;
    this.restauranrModelObj.mobile=this.formValue.value.mobile;
    this.restauranrModelObj.address=this.formValue.value.address;
    this.restauranrModelObj.services=this.formValue.value.services;

    this.api.postRestaurant(this.restauranrModelObj).subscribe(
     res=>{
      console.log(res);
      alert("Restaurant Records Added Successful !!!!");
//clear fill form
    let ref=document.getElementById('clear');
    ref?.click();

      this.formValue.reset()
      this.getAllData();
    },
    err=>{
      alert("Something went wrong !!!!!!!")
    }
  
    )
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRData=res;
    })
  }

  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restaurant record deleted !!!")
      this.getAllData();
    })
  }

onEditResto(data:any){
  this.showAdd=false;
  this.showbtn=true;

  this.restauranrModelObj.id=data.id
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
}

updateResto(){
  this.restauranrModelObj.name=this.formValue.value.name;
    this.restauranrModelObj.email=this.formValue.value.email;
    this.restauranrModelObj.mobile=this.formValue.value.mobile;
    this.restauranrModelObj.address=this.formValue.value.address;
    this.restauranrModelObj.services=this.formValue.value.services;
this.api.updateRestaurant(this.restauranrModelObj,this.restauranrModelObj.id).subscribe(res=>{
  alert("Restaurant records updated !!!")
  let ref=document.getElementById('clear');
    ref?.click();

      this.formValue.reset()
      this.getAllData();
})
}

}
