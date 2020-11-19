import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableTopicsPage } from './table-topics.page';

describe('TableTopicsPage', () => {
  let component: TableTopicsPage;
  let fixture: ComponentFixture<TableTopicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTopicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTopicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
