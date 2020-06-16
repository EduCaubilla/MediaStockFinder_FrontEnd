import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPhotoComponent } from './search-photo.component';

describe('SearchPhotoComponent', () => {
  let component: SearchPhotoComponent;
  let fixture: ComponentFixture<SearchPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
