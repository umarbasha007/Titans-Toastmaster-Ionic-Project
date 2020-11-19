import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTmodPage } from './edit-tmod.page';

describe('EditTmodPage', () => {
  let component: EditTmodPage;
  let fixture: ComponentFixture<EditTmodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTmodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTmodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
