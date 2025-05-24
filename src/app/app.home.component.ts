import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor],
  /* ───────────────────────── TEMPLATE ───────────────────────── */
  template: `
<!-- BACKGROUND -->
<div class="fixed inset-0 -z-10 overflow-hidden">
  <div
    class="absolute -top-1/3 -left-1/3 w-[160vw] h-[160vw]
           bg-[conic-gradient(at_top_left,theme(colors.violet.600)_0%,transparent_60%,theme(colors.violet.700)_100%)]
           blur-3xl opacity-20"></div>
  <div id="spot"
       class="absolute inset-0 pointer-events-none
              transition-[background] duration-150"></div>
</div>

<!-- PAGE GRID -->
<div
  class="min-h-screen grid grid-cols-1 lg:grid-cols-2
         items-start pt-16 lg:pt-24 lg:gap-24
         px-6 lg:px-20 text-slate-100">

  <!-- ─────────── HERO / NAV (left) ─────────── -->
  <aside class="flex flex-col items-start w-full max-w-md">

    <!-- name + tagline -->
    <h1 class="text-5xl font-extrabold leading-tight">Samuel&nbsp;Hale</h1>
    <h2 class="mt-4 text-xl font-semibold text-slate-300">
      AI&nbsp;Software&nbsp;Engineer
    </h2>
    <p class="mt-6 text-base text-slate-400 max-w-sm">
      I build intelligent, user-focused software&nbsp;solutions that seamlessly
      integrate AI to enhance functionality, accessibility, and performance on
      the web.
    </p>

    <!-- section nav -->
    <nav class="mt-16 space-y-6 text-sm tracking-widest font-semibold uppercase">
      <a *ngFor="let item of navItems"
         href="#"
         (click)="goto($event, item.id)"
         class="group flex items-center gap-3 transition-colors
                text-slate-400 hover:text-slate-200"
         [class.text-white]="active === item.id">
        <span class="before:content-[''] before:block before:h-px before:w-0
                     before:bg-slate-400 before:transition-all
                     group-hover:before:w-12"
              [class.before\\:!w-12]="active === item.id"></span>
        {{ item.label }}
      </a>
    </nav>

    <!-- ─────────── SOCIAL ICONS (bottom) ─────────── -->
    <ul class="mt-auto flex gap-6 pt-12">
      <li *ngFor="let s of socials">
        <a [href]="s.href"
           target="_blank" rel="noopener noreferrer"
           [attr.aria-label]="s.label"
           class="text-white hover:text-violet-300 transition-colors">
          <span [innerHTML]="s.svg" class="w-5 h-5 block"></span>
        </a>
      </li>
    </ul>
  </aside>

  <!-- ─────────── CONTENT (right) ─────────── -->
  <div class="w-full lg:max-h-screen lg:overflow-y-auto pr-2">
    <!-- ABOUT -->
    <section id="about"
             class="prose prose-lg leading-8 prose-slate dark:prose-invert
                    prose-p:my-5 max-w-[38rem] w-full">
      <h2 class="sr-only">About me</h2>
      <ng-container *ngFor="let paragraph of about">
        <p [innerHTML]="paragraph"></p>
      </ng-container>
    </section>

    <hr class="my-16 border-slate-600/30" />

    <!-- EXPERIENCE -->
    <section id="experience" class="space-y-16 max-w-[38rem] w-full">
      <h2 class="sr-only">Experience</h2>

      <article *ngFor="let job of experience" class="space-y-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {{ job.period }}
        </p>

        <h3 class="text-lg font-semibold">
          {{ job.title }}
          <span class="font-normal text-slate-300">· {{ job.company }}</span>
        </h3>

        <p class="leading-7 text-slate-300" [innerHTML]="job.summary"></p>

        <ul class="flex flex-wrap gap-2">
          <li *ngFor="let tag of job.tags"
              class="px-2 py-0.5 rounded-full bg-slate-700/60
                     text-xs font-medium">
            {{ tag }}
          </li>
        </ul>
      </article>
    </section>
  </div>
</div>
  `,
  /* ───────────────────────── STYLES ───────────────────────── */
  styles: [`
    #spot{
      background: radial-gradient(
        450px at var(--x,50%) var(--y,50%),
        rgba(147,51,234,.35),
        transparent 70%
      );
    }
    /* optional: give icons a subtle focus ring for a11y */
    a:focus-visible { outline: 2px dashed theme('colors.violet.400'); outline-offset: 2px; }
  `],
})
export class HomeComponent {
  /* ─────────── NAV ─────────── */
  navItems = [
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
  ];
  active = 'about';

  /* ─────────── SOCIALS ─────────── */
  socials = [
    {
      label: 'GitHub',
      href : 'https://github.com/yourname',
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58
                         0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61
                         -.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74
                         1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1
                         .11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93
                         0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.17
                         0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4 11.5 11.5
                         0 0 1 3 .4c2.28-1.55 3.29-1.23 3.29-1.23 .66 1.65
                         .25 2.87 .12 3.17 .77.84 1.23 1.92 1.23 3.23
                         0 4.61-2.81 5.63-5.49 5.93 .43.37 .81 1.1 .81 2.22
                         0 1.6-.01 2.88-.01 3.27 0 .32 .21.69 .82.57A12 12 0 0 0 12 .5z"/>
             </svg>`
    },
    {
      label: 'LinkedIn',
      href : 'https://linkedin.com/in/yourname',
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 8.98h5V21.5h-5V8.98ZM9.5 8.98h4.8v1.71h.07
                         c.67-1.26 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68v5.73h-5v-5.08
                         c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.69v5.16h-5V8.98Z"/>
             </svg>`
    },
    {
      label: 'Instagram',
      href : 'https://instagram.com/yourname',
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2
                         c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7
                         1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2
                         a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a1.2 1.2 0 1 0 0-2.4
                         1.2 1.2 0 0 0 0 2.4z"/>
             </svg>`
    },
    {
      label: 'X / Twitter',
      href : 'https://twitter.com/yourname',
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M19.633 3H4.367A1.37 1.37 0 0 0 3 4.367v15.266A1.37 1.37 0 0 0 4.367 21h15.266A1.37 1.37 0 0 0 21
                         19.633V4.367A1.37 1.37 0 0 0 19.633 3ZM8.49 17H6.296V9h2.194v8Zm-1.097-9.14a1.268 1.268 0 1 1 0-2.536
                         1.268 1.268 0 0 1 0 2.536Zm10.311 9.14h-2.193v-3.818c0-.911-.018-2.084-1.27-2.084-1.27
                         0-1.464.99-1.464 2.015V17h-2.193V9h2.106v1.097h.03c.293-.556 1.012-1.142 2.083-1.142
                         2.226 0 2.638 1.466 2.638 3.372V17Z"/>
             </svg>`
    }
  ];

  /* ─────────── ABOUT / EXPERIENCE DATA ─────────── */
  about = [
    `I'm a software engineer with a strong foundation in
     <strong>AI</strong> and <strong>machine learning</strong>, passionate
     about building <strong class="font-semibold">intelligent, practical
     systems</strong> that solve real-world problems.`,
    `I hold a <strong>B.S.</strong> in Software Engineering (Data Science) and
     I'm currently pursuing my <strong>M.S.</strong> through ECU’s accelerated
     program, deepening my expertise in <strong>full-stack development</strong>
     and <strong>reproducible research</strong>.`,
    `Experience highlights include
     <strong>fine-tuning LLMs</strong> for dialect identification, leading a
     <strong>Django&nbsp;+&nbsp;Nix</strong> capstone with
     <strong>CI/CD pipelines</strong>, and building an
     <strong>election-prediction app</strong> with PyTorch & Flask.`,
    `When I’m not developing, you’ll find me exploring
     <strong>Linux / NixOS</strong>, diving into technical literature, or
     hanging out with my two cats. I thrive where
     <strong>AI, software engineering, and systems thinking</strong> meet.`,
  ];

  experience = [
    {
      period : 'Dec 2022 — Jan 2023',
      title  : 'Frontend Developer',
      company: 'ECU · REU Program',
      summary: `Built and improved <strong>internal research dashboards</strong>
                with HTML, CSS, JavaScript, and Bootstrap—focusing on
                <strong>accessibility</strong> & responsive design.`,
      tags   : ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Accessibility'],
    },
  ];

  /* nav highlight + centre scroll */
  goto(ev: Event, id: string) {
    ev.preventDefault();
    this.active = id;
    document.getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* spotlight */
  @HostListener('mousemove', ['$event'])
  track(e: MouseEvent) {
    const el = document.getElementById('spot');
    el?.style.setProperty('--x', `${e.clientX}px`);
    el?.style.setProperty('--y', `${e.clientY}px`);
  }
}
