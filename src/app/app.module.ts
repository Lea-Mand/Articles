import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ArticleListComponent } from './article-list/article-list.component';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { CommentsListComponent } from './comments-list/comments-list.component';

const routes: Routes = [
  { path: 'comment', component: CommentsListComponent },
  { path: '', component: ArticleListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    CommentsListComponent
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule
  ],
  exports: [RouterModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }
