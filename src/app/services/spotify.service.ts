import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { }


  getToken() {
    const client_id = 'faa5b0fb33b444c2bf44e38c8ee08b82';
    const client_secret = 'bcc6a6ad769243569d1701e92d81181a';

    const url = `http://marta.vidimensional.es:3000/spotify/${client_id}/${client_secret}`;

    const prom = this.http.get(url).toPromise().then((data: any) => data.access_token);
    return prom;
  }


  async getQuery(query: string) {

    const token = await this.getToken();
    const url = 'https://api.spotify.com/v1/' + query;

    console.log('el token directo', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(url, {headers});
  }


  async getNewReleases() {

    const obs =  await this.getQuery('browse/new-releases?limit=50');

    return obs.pipe(map((data: any) => data.albums.items));
   }



async getArtistas( termino: string ) {



    const obs =  await this.getQuery(`search?q=${ termino }&type=artist&limit=15`);

    return obs.pipe( map((data: any) => data.artists.items));
      }

  getArtista( id: string ) {
        return this.getQuery(`artists/${ id }`);

          }

  async getTopTracks( id: string ) {

    const obs = await this.getQuery(`artists/${ id }/top-tracks?country=us`);

        return obs.pipe( map((data: any) => data.tracks));

              }


}
