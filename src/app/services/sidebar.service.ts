import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any [] = [
    {
      titulo : 'Dashboard',
      icono : 'mdi mdi-gauge',
      submenu : [
        {titulo: 'Main', url:'/'},  
        {titulo: 'Gráficas', url:'grafica1'},         
        {titulo: 'Promesas', url:'promesas'},
        {titulo: 'ProgressBar', url:'progress'} ,
        {titulo: 'Rxjs', url:'rxjs'}
      ]      
    },
    {
      titulo : 'Dashboard2',
      icono : 'mdi mdi-gauge',
      submenu : [
        {titulo: 'Main', url:'/'},        
        {titulo: 'ProgressBar', url:'progress'},        
        {titulo: 'Gráficas', url:'grafica1'}
      ]      
    }
  ];

  constructor() { }
}
