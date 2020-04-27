import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artistas:any[] = [];
  nuevasCanciones: any;
  loading: boolean;


  constructor(private spotify: SpotifyService, private router:Router) { }

  async buscar(termino:string){
    this.loading = true;
    (await this.spotify.getArtistas(termino))
                     .subscribe((data: any) => {
                      this.loading = false;
                      this.nuevasCanciones = data;
                      this.artistas = data;
                     });

  }


  verArtista(item:any){
    console.log(item);
    let artistaId;

    if (item.type === 'artist') {
      artistaId = item.id;
    }else{
      artistaId = item.artists[0].id;
    }
  this.router.navigate(['/artist', artistaId]);
  }

}
