import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Data } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = "yN8WtDyAPJq8jZY0jeoN1SrgzT0Uzc6m";
  private servicioUrl:string = "https://api.giphy.com/v1/gifs";


  private _historial: string[] = []

  // TODO: cambiar tipado
  public resultados:Data[]=[];

  
  get historial() {
    return [...this._historial];
  }

  buscarGifs( query:string) {

    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      if (this._historial.length > 10) this._historial.pop();

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    //console.log(this._historial);
    
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
    
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query)
        .set('offset', '0')
        .set('rating','g')
        .set('lang','es');


    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params}) // {params} === {params:params}
      .subscribe( (resp:SearchGifsResponse) => {
        //console.log(resp);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });  
  }

  constructor( private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem("historial") || "[]");
    this.resultados = JSON.parse(localStorage.getItem("resultados") || "[]");

  }



}
