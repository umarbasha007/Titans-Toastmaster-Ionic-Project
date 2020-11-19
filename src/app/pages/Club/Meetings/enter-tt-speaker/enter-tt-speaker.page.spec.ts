import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterTtSpeakerPage } from './enter-tt-speaker.page';

describe('EnterTtSpeakerPage', () => {
  let component: EnterTtSpeakerPage;
  let fixture: ComponentFixture<EnterTtSpeakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterTtSpeakerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterTtSpeakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
