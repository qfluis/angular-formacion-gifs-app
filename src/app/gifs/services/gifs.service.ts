import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = "yN8WtDyAPJq8jZY0jeoN1SrgzT0Uzc6m";
  private _historial: string[] = []

  // TODO: cambiar tipado
  public resultados:any[]=[];

  
  get historial() {
    return [...this._historial];
  }

  buscarGifs( query:string) {

    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      if (this._historial.length > 10) this._historial.pop();
    }
    
    console.log(this._historial);
    
    /* FETCH
    fetch('https://api.giphy.com/v1/gifs/search?api_key=yN8WtDyAPJq8jZY0jeoN1SrgzT0Uzc6m&q=dragon ball z&limit=10&offset=0&rating=g&lang=es')
      .then( resp => {
        resp.json().then(data => {
          console.log(data.data[0].images.downsized_large.url);
        });
      }); */

    /* Await (habría que hacer la función buscarGifs async )
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=yN8WtDyAPJq8jZY0jeoN1SrgzT0Uzc6m&q=dragon ball z&limit=10&offset=0&rating=g&lang=es');
    const data = await resp.json();
    console.log(data.data[0].images.downsized_large.url);
    */

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10&offset=0&rating=g&lang=es`)
      .subscribe( (resp:any) => {
        console.log(resp.data);
        this.resultados = resp.data
      });

    
  
  
  }

  constructor( private http:HttpClient){}



}
