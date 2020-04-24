import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpellsComponent } from './pages/spells/spells.component';
import { SpellComponent } from './pages/spells/spell/spell.component';
import { ClassComponent } from './pages/classes/class/class.component';
import { PlayerComponent } from './pages/player/player.component';

const routes: Routes = [
  {
    path: 'spells',
    component: SpellsComponent,
  },
  {
    path: 'spell/:index',
    component: SpellComponent,
  },
  {
    path: 'class/:index',
    component: ClassComponent,
  },
  {
    path: 'player',
    component: PlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
