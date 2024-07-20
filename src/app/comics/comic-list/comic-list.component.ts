import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';
import { Comic } from 'src/app/models/Comic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComicDetailModalComponent } from '../comic-detail-modal/comic-detail-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
  comics: Comic[] = [];
  favorites: any[] = [];
  loadingMessages: string[] = [
    "Cargando tus héroes favoritos de Marvel...",
    "Recuperando datos del Universo Marvel...",
    "Espera un momento, tu aventura Marvel está por comenzar...",
    "Reuniendo a los héroes más poderosos de Marvel...",
    "El Universo Marvel se está ensamblando, solo para ti..."
  ];
  modalLoadingMessages: string[] = [
    "Sumergiéndonos en el Universo Marvel...",
    "Invocando a los héroes más poderosos...",
    "El poder de Marvel está en camino...",
    "Desbloqueando secretos de SHIELD...",
    "Accediendo al archivo de Tony Stark...",
    "Recolectando energía del Teseracto...",
    "Conectando con el Bifrost...",
    "Cargando la sabiduría del Doctor Strange...",
    "Explorando los confines del Multiverso...",
    "Reuniendo a los Vengadores...",
  ];

  currentMessageIndex = 0;
  modalMessageIndex = 0;
  loadingMessageInterval: any;
  modalLoadingMessageInterval: any;
  isLoadingComicDetail: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(
    private comicService: ComicService,
    private userService: UserService,
    public loadingService: LoadingService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadComics();
    this.loadFavorites();
    this.isLoading$ = this.loadingService.loading$.pipe(
      map(isLoading => isLoading || this.isLoadingComicDetail)
    );
  }

  loadComics() {
    this.loadingService.startLoading();
    this.startLoadingMessages();
    this.comicService.getComics().subscribe(comics => {
      this.comics = comics;
      this.matchFavorites();
      this.loadingService.stopLoading();
      this.stopLoadingMessages();
    });
  }

  loadFavorites() {
    this.userService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.matchFavorites();
    });
  }

  matchFavorites() {
    if (this.comics.length > 0 && this.favorites.length > 0) {
      this.comics.forEach(comic => {
        comic.isFavorite = this.favorites.some(fav => fav.comicId === comic.id.toString());
      });
    }
  }

  startLoadingMessages() {
    this.currentMessageIndex = 0;
    this.loadingMessageInterval = setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
    }, 3000);
  }

  stopLoadingMessages() {
    clearInterval(this.loadingMessageInterval);
  }

  startModalLoadingMessages() {
    this.modalMessageIndex = 0;
    Swal.fire({
      title: this.modalLoadingMessages[this.modalMessageIndex],
      imageUrl: 'assets/img/iron-man.gif',
      imageWidth: 150,
      imageHeight: 'auto',
      showConfirmButton: false,
      allowOutsideClick: false,
      backdrop: true,
      willOpen: () => {
        this.modalLoadingMessageInterval = setInterval(() => {
          this.modalMessageIndex = (this.modalMessageIndex + 1) % this.modalLoadingMessages.length;
          Swal.update({
            title: this.modalLoadingMessages[this.modalMessageIndex]
          });
        }, 3000);
      },
      willClose: () => {
        clearInterval(this.modalLoadingMessageInterval);
      }
    });
  }

  stopModalLoadingMessages() {
    Swal.close();
    clearInterval(this.modalLoadingMessageInterval);
  }

  openComicDetail(comicId: string) {
    if (this.isLoadingComicDetail) return;

    this.isLoadingComicDetail = true;
    this.startModalLoadingMessages(); // Use SweetAlert2 for loading messages

    this.comicService.getComicById(comicId).subscribe(
      (comic: Comic) => {
        this.stopModalLoadingMessages();
        this.isLoadingComicDetail = false;
        const modalRef = this.modalService.open(ComicDetailModalComponent, { size: 'xl' });
        modalRef.componentInstance.comic = comic;
        modalRef.componentInstance.loading = false;
      },
      (error) => {
        this.stopModalLoadingMessages();
        this.isLoadingComicDetail = false;
        // Handle error
      }
    );
  }

  addFavorite(comic: Comic, event: Event) {
    event.stopPropagation();
    this.userService.addFavorite(comic.id.toString(), comic.title, comic.thumbnail.path + '.' + comic.thumbnail.extension).subscribe(() => {
      this.loadFavorites(); // Reload favorites after adding
      comic.isFavorite = true;
      this.toastr.success('Se agregó a favoritos', comic.title);
    });
  }

  removeFavorite(comic: Comic, event: Event) {
    event.stopPropagation();
    this.userService.removeFavorite(comic.id.toString()).subscribe(() => {
      this.loadFavorites(); // Reload favorites after removing
      comic.isFavorite = false;
      this.toastr.info('Se ha eliminado de favoritos.', comic.title);
    });
  }
}
