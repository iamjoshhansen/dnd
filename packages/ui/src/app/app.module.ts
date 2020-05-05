import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellsComponent } from './pages/spells/spells.component';
import { SpellComponent } from './pages/spells/spell/spell.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ClassComponent } from './pages/classes/class/class.component';
import { PlayerComponent } from './pages/player/player.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { ModifierPipe } from './pipes/modifier/modifier.pipe';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: `http://${window.location.hostname}:4145`,
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    SpellsComponent,
    SpellComponent,
    LoadingComponent,
    ClassComponent,
    PlayerComponent,
    CharacterSheetComponent,
    ModifierPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
