import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comic } from 'src/app/models/Comic';

@Component({
  selector: 'app-comic-detail-modal',
  templateUrl: './comic-detail-modal.component.html',
  styleUrls: ['./comic-detail-modal.component.scss']
})
export class ComicDetailModalComponent implements OnInit {
  @Input() comic!: Comic;
  @Input() loading: boolean = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.comic) {
      this.loading = false;
    }
  }

  getFormattedDate(dates: any[], type: string): string {
    const dateObj = dates.find(date => date.type === type);
    if (dateObj) {
      return new Date(dateObj.date).toLocaleDateString();
    }
    return 'N/A';
  }

  getCreators(creators: any, role: string): string {
    const creatorNames = creators.items
      .filter((creator: any) => creator.role === role)
      .map((creator: any) => creator.name);
    return creatorNames.length > 0 ? creatorNames.join(', ') : 'N/A';
  }
}
