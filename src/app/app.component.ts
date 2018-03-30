import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {LoadingService} from './pharos-services/loading.service';
import {ResponseParserService} from './pharos-services/response-parser.service';


@Component({
  selector: 'app-root',
  template: '<router-outlet fxFlexAlign="stretch"></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;
  navIsFixed: boolean;
  title = 'Pharos';

  constructor(
    private loadingService: LoadingService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) {
  }
  ngOnInit() {
    this.loadingService.loading$.subscribe(res => this.loading = res);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  scrollToTop() { (function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
  }
}
