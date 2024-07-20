import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicDetailModalComponent } from './comic-detail-modal.component';


describe('ComicDetailModalComponent', () => {
  let component: ComicDetailModalComponent;
  let fixture: ComponentFixture<ComicDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
