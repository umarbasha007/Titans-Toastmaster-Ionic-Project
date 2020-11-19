import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterEducationSessionPage } from './enter-education-session.page';

describe('EnterEducationSessionPage', () => {
  let component: EnterEducationSessionPage;
  let fixture: ComponentFixture<EnterEducationSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterEducationSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterEducationSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
