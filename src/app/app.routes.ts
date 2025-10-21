import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { AboutUs } from './components/about-us/about-us';
import { Program } from './components/program/program';
import { Contact } from './components/contact/contact';
import { Imprint } from './components/imprint/imprint';
import { Privacy } from './components/privacy/privacy';

export const routes: Routes = [
    {
        path: '',
        component: Main,
    },
    {
        path: 'about-us',
        component: AboutUs,
        title: 'Über uns',
    },
    {
        path: 'program',
        component: Program,
        title: 'Programm',
    },
    {
        path: 'contact',
        component: Contact,
        title: 'Kontakt',
    },
    {
        path: 'imprint',
        component: Imprint,
        title: 'Impressum',
    },
    {
        path: 'privacy',
        component: Privacy,
        title: 'Datenschutz'
    },
    {
        path: '**',
        redirectTo: ''
    },
];
