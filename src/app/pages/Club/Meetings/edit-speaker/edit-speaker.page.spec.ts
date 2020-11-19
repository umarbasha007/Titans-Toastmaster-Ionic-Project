import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSpeakerPage } from './edit-speaker.page';

describe('EditSpeakerPage', () => {
  let component: EditSpeakerPage;
  let fixture: ComponentFixture<EditSpeakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpeakerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSpeakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
