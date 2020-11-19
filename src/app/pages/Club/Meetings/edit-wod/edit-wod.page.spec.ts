import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWodPage } from './edit-wod.page';

describe('EditWodPage', () => {
  let component: EditWodPage;
  let fixture: ComponentFixture<EditWodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
