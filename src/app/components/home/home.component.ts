import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  FormBuilder, Validators, CheckboxControlValueAccessor  } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
    this.setItems();
  }

  data={  
    gunlukIsler:[],
    haftalikIsler:[],
    aylikIsler:[],
    isCompletedDaily:[],
    isCompletedWeekly:[],
    isCompletedMonth:[],
    tarihAy:'',
    tarihGun:'',
    haftaBaslangic:'',
    haftaBitis:''
  };

  // ------------------------  Tamamlanan görevleri tamamlananlar listesine atma ----------------------
  taskDoneDaily(task){
    
    const index=this.data.gunlukIsler.indexOf(task); //buradan itemın indexi geldi
    this.data.isCompletedDaily.push(task);
    this.data.gunlukIsler.splice(index, 1);
    localStorage.setItem('isCompletedDaily',JSON.stringify(this.data.isCompletedDaily));
    localStorage.setItem('gunlukIsler',JSON.stringify(this.data.gunlukIsler));
    
  }

  taskDoneWeekly(task){
    
    const index=this.data.haftalikIsler.indexOf(task); //buradan itemın indexi geldi
    this.data.isCompletedWeekly.push(task);
    this.data.haftalikIsler.splice(index, 1);
    localStorage.setItem('isCompletedWeekly',JSON.stringify(this.data.isCompletedWeekly));
    localStorage.setItem('haftalikIsler',JSON.stringify(this.data.haftalikIsler));
    
  }

  taskDoneMonth(task){
    
    const index=this.data.aylikIsler.indexOf(task); //buradan itemın indexi geldi
    this.data.isCompletedMonth.push(task);
    this.data.aylikIsler.splice(index, 1);
    localStorage.setItem('isCompletedMonth',JSON.stringify(this.data.isCompletedMonth));
    localStorage.setItem('aylikIsler',JSON.stringify(this.data.aylikIsler));
    
  }

// --------------------- delete completely completed items from localstorage  -----------

  deleteDoneDaily(task){
    const index=this.data.isCompletedDaily.indexOf(task); //buradan itemın indexi geldi
    this.data.isCompletedDaily.splice(index, 1);
    localStorage.setItem('isCompletedDaily',JSON.stringify(this.data.isCompletedDaily));
  }

 
  deleteDoneWeekly(task){
    const index=this.data.isCompletedWeekly.indexOf(task); //buradan itemın indexi geldi
    this.data.isCompletedWeekly.splice(index, 1);
    localStorage.setItem('isCompletedWeekly',JSON.stringify(this.data.isCompletedWeekly));
  }

  
  deleteDoneMonth(task){
    const index=this.data.isCompletedMonth.indexOf(task); //buradan itemın indexi geldi
    this.data.isCompletedMonth.splice(index, 1);
    localStorage.setItem('isCompletedMonth',JSON.stringify(this.data.isCompletedMonth));
  }

  
  //---------------------------  delete unfinished items from localstorage --------------------------------------
  deleteDailyTask(item){
    if(confirm('Bu maddeyi silmek istediğinize emin misiniz ?')){
      const index=this.data.gunlukIsler.indexOf(item); //buradan itemın indexi geldi
      this.data.gunlukIsler.splice(index, 1);
      localStorage.setItem('gunlukIsler',JSON.stringify(this.data.gunlukIsler));
    }
  }

  deleteWeeklyTask(item){
    if(confirm('Bu maddeyi silmek istediğinize emin misiniz ?')){
      const index=this.data.haftalikIsler.indexOf(item); 
      this.data.haftalikIsler.splice(index, 1);
      localStorage.setItem('haftalikIsler',JSON.stringify(this.data.haftalikIsler));
    }
  }

  deleteMonthTask(item){
    if(confirm('Bu maddeyi silmek istediğinize emin misiniz ?')){
      const index=this.data.aylikIsler.indexOf(item); 
      this.data.aylikIsler.splice(index, 1);
      localStorage.setItem('aylikIsler',JSON.stringify(this.data.aylikIsler));
    }
  }

  //----------------------- save dates to localStorage---------------------------------------------

  ayKaydet(tarih){
    this.data.tarihAy=tarih.value;
    tarih.value='';
    localStorage.setItem('tarihAy',JSON.stringify(this.data.tarihAy));
  }

  gunKaydet(tarih){
    this.data.tarihGun=tarih.value;
    tarih.value='';
    localStorage.setItem('tarihGun',JSON.stringify(this.data.tarihGun));
  }

  haftaKaydet(baslangic,bitis){
    this.data.haftaBaslangic=baslangic.value;
    this.data.haftaBitis=bitis.value;
    localStorage.setItem('haftaBaslangic',JSON.stringify(this.data.haftaBaslangic));
    localStorage.setItem('haftaBitis',JSON.stringify(this.data.haftaBitis));
  }

  //---------------------------------------------------------------------------------
  angularForm = new FormGroup ({
    date: new FormControl()
  }); 
  constructor(private fb: FormBuilder , private formBuilder: FormBuilder,) {
    this.createForm();
  }
  createForm() {
    this.angularForm = this.fb.group({
      date: '',
    });
  }

  // ------------------------------ save tasks to localStorage  -------------------------------

  addToDoDaily(task){ 
    if(task.value!=''){
      this.data.gunlukIsler.push(task.value);
    task.value='';
    localStorage.setItem('gunlukIsler',JSON.stringify(this.data.gunlukIsler));
    }
    
  }

  addToDoWeekly(task){
    if(task.value!=''){
      this.data.haftalikIsler.push(task.value);
      task.value='';
      localStorage.setItem('haftalikIsler',JSON.stringify(this.data.haftalikIsler));
    }
  }

  addToDoMonth(task){ 
    if(task.value!=''){
      this.data.aylikIsler.push(task.value);
      task.value='';
      localStorage.setItem('aylikIsler',JSON.stringify(this.data.aylikIsler));
    }
  }

  setItems(){
    // sayfayı yenilediğimizde diziye eklediğimiz elemanların sıfırlanmaması için
    Object.keys(this.data).forEach((key)=>{ 
      if(!localStorage.getItem(key)){
        localStorage.setItem(key,JSON.stringify(this.data[key]));
      }
      else{
        this.data[key]=JSON.parse(localStorage.getItem(key));
      }
    })
  }

}
