import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ComicService } from '../../services/comic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComicDetailModalComponent } from '../comic-detail-modal/comic-detail-modal.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comic-favorites',
  templateUrl: './comic-favorites.component.html',
  styleUrls: ['./comic-favorites.component.scss']
})
export class ComicFavoritesComponent implements OnInit {
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
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private comicService: ComicService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.startLoadingMessages();
    this.userService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.stopLoadingMessages();
      this.isLoading = false;
    });
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
    this.startModalLoadingMessages();

    this.comicService.getComicById(comicId).subscribe(
      (comic) => {
        this.stopModalLoadingMessages();
        const modalRef = this.modalService.open(ComicDetailModalComponent, { size: 'xl' });
        modalRef.componentInstance.comic = comic;
        modalRef.componentInstance.loading = false;
      },
      (error) => {
        this.stopModalLoadingMessages();
        this.toastr.error('Error al cargar los detalles del cómic.');
      }
    );
  }

  removeFavorite(comic: any, event: Event) {
    event.stopPropagation();
    this.userService.removeFavorite(comic.comicId).subscribe(() => {
      this.favorites = this.favorites.filter(fav => fav.comicId !== comic.comicId);
      this.toastr.info('Se ha eliminado de favoritos.', comic.title);
    });
  }
}
