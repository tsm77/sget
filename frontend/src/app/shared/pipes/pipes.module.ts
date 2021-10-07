import { NgModule } from '@angular/core';
import { DataPipe } from './data.pipe';


const PIPES = [
  DataPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})

export class PipesModule {
}
