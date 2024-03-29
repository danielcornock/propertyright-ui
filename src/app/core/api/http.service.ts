import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = "https://property-right-api.herokuapp.com/api/v1/";
    } else {
      this.apiUrl = "http://localhost:2000/api/v1/";
    }
  }

  private apiUrl: string;

  private addAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt_token") ||
        sessionStorage.getItem("jwt_token")}`
    });
  }

  private processUrl(url: string): string {
    return url[0] === "/" ? url.slice(1) : url;
  }

  public post(url: string, data: object) {
    return this.http.post(this.apiUrl + this.processUrl(url), data, {
      headers: this.addAuthHeaders()
    });
  }

  public put(url: string, data: object) {
    return this.http.put(this.apiUrl + this.processUrl(url), data, {
      headers: this.addAuthHeaders()
    });
  }

  public get(url: string) {
    return this.http.get(this.apiUrl + this.processUrl(url), {
      headers: this.addAuthHeaders()
    });
  }

  public delete(url: string) {
    return this.http.delete(this.apiUrl + this.processUrl(url), {
      headers: this.addAuthHeaders()
    });
  }
}
