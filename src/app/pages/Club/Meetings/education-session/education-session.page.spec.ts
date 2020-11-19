import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationSessionPage } from './education-session.page';

describe('EducationSessionPage', () => {
  let component: EducationSessionPage;
  let fixture: ComponentFixture<EducationSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
