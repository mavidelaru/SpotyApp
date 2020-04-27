import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {


  constructor( private spotify: SpotifyService, private router:Router) {

    this.loading = true;
    this.error = false;

    }

  nuevasCanciones: any[] = [];

  loading: boolean;
  error: boolean;
  mensajeError: any;
  artista: any;
  id: any;

  animationDelay = 2500;

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
      this.getNewReleases();
      this.animateHeadline($('.cd-headline'));
    }

    async getNewReleases() {
      (await this.spotify.getNewReleases())
       .subscribe((data: any) => {
        this.loading = false;
        this.nuevasCanciones = data;
       }, (e) => {
        this.loading = false;
        this.error = true;
        this.mensajeError = e.error.error.message;
        console.log(e);
       });
    }






 animateHeadline($headlines) {

       let self=this;
       $headlines.each(function() {
          const headline = $(this);
          setTimeout(() => { self.hideWord( headline.find('.is-visible') ) }, 3000);
       });
    }


 hideWord($word: any) {
      let self = this;
      const nextWord = self.takeNext($word);
      self.switchWord($word, nextWord);
      setTimeout(() => { self.hideWord(nextWord) } , 3000);
   }

 takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
   }

 switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
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

