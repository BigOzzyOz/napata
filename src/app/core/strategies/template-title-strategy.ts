import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);

    override updateTitle(routerState: RouterStateSnapshot): void {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`Napata | ${title}`);
        }
        else {
            this.title.setTitle('Napata – Survival, Wildnis und indigene Pädagogik');
        }
        this.meta.updateTag({ name: 'description', content: 'Erlebe die Natur wie indigene Gemeinschaften: Lerne Survival, Wildnispädagogik und Naturhandwerk. Stärke Gemeinschaft, Identität & Stressabbau.' });
        this.meta.updateTag({ name: 'keywords', content: 'wildnispädagogik, survival, survival training, survivel, survival urlaub, outdoor survival camp, wildnispädagogik ausbildung, wildnispädagogik, wildnisschule, wildnispädagogik ausbildung, wildnispädagogik'});
    }
}
