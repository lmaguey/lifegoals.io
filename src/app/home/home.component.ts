import { Component } from '@angular/core';
import { MetaService } from '../services/home-service/home.service';
import { Meta } from '../models/meta.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 

    meta: Meta[] = [];
    nuevaMeta: string = '';
    metaCount!: number;

  constructor(public metaService: MetaService)

  {
    console.log('esta corriendo home.component.ts' + this.metaService);
    

this.metaService.getMetas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
           ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
       )
      ).subscribe(data => {
        this.meta = data;
        console.log(this.meta);
       });

    
/*
   this.metaService.getMetas().subscribe(data => {
       if (data && data.length > 0) {
         this.meta = data; // obtienes el primer documento de la colección
         console.log('meta recibido:', this.meta);
    } else {
         console.warn('No se encontró ningún meta en Firestore');
   }
   });
  */  

   }

   agregarMeta() {
     if (this.nuevaMeta.trim() !== '') {
        const meta: Meta = { meta: this.nuevaMeta };
        this.metaService.addMeta(meta).then(() => {
          this.nuevaMeta = ''; // limpiar input
       });
      }
     }

   eliminarMeta(id: string) {
      this.metaService.deleteMeta(id);
    }

    ngOnInit() {
      this.metaService.countMetas().subscribe(count => {
        this.metaCount = count;
      });
    }

}
