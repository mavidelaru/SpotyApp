import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};
  loadingArtist: boolean;
  topTracks: any[] = [];


  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {

    this.loadingArtist = true;

    this.router.params.subscribe( params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }

  async getArtista(id:any) {

      this.loadingArtist = true;

      (await this.spotify.getArtista(id))
      .subscribe(artista => {
      console.log(artista);

      this.artista=artista;
      this.loadingArtist = false;


    });
  }

  async getTopTracks(id:string){

    (await this.spotify.getTopTracks(id))
      .subscribe(topTracks => {
      console.log(topTracks);

      this.topTracks = topTracks;
      this.loadingArtist = false;

  });
  }
}

