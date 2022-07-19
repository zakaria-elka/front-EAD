import { Component, Input, OnChanges } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { switchMap,filter} from 'rxjs/operators';
@Component({
    selector: 'secured-image',
    template: `
    <a [href]="dataUrl$|async" target="_blank"><img width="150" height="150" [src]="dataUrl$|async"/></a>
    `
})
export class SecuredImageComponent implements OnChanges {
    public dataUrl: any;
    // This part just creates an rxjs stream from the src
    // this makes sure that we can handle it when the src changes
    // or even when the component gets destroyed
    @Input() private href: string;
    @Input() private src: string;
    private src$ = new BehaviorSubject(this.src);
    private href$ = new BehaviorSubject(this.href);
    ngOnChanges(): void {
        this.src$.next(this.src);
        this.href$.next(this.href);
    }
    // this stream will contain the actual url that our img tag will load
    // everytime the src changes, the previous call would be canceled and the
    // new resource would be loaded
    dataUrl$ = this.src$
    .pipe(
        filter((value) => value !== null),
        switchMap(
            (url) => this.loadImage(url),
        ),
    );
    
    // we need HttpClient to load the image and DomSanitizer to trust the url
    constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
    }

    private loadImage(url: string): Observable<any> {
        return this.httpClient
            .get(url, {responseType: 'blob'})
            .map((e) => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))        
    }
    
}
