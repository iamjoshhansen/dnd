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
import { AdventurerComponent } from './components/adventurer/adventurer.component';
import { ModifierPipe } from './pipes/modifier/modifier.pipe';

@NgModule({
  declarations: [AppComponent, SpellsComponent, SpellComponent, LoadingComponent, ClassComponent, PlayerComponent, AdventurerComponent, ModifierPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
