import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimerPagePage } from './timer-page.page';

describe('TimerPagePage', () => {
  let component: TimerPagePage;
  let fixture: ComponentFixture<TimerPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimerPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
