import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
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
         items-start justify-center pt-8 lg:pt-12 lg:gap-24
         px-6 lg:px-20 text-slate-100 max-w-7xl mx-auto">

  <!-- ─────────── HERO / NAV (left) ─────────── -->
  <aside class="flex flex-col items-start w-full max-w-md lg:sticky lg:top-12 lg:h-screen lg:max-h-screen">

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
    <nav class="mt-16 text-sm tracking-widest font-semibold uppercase">
      <a *ngFor="let item of navItems"
         href="#"
         (click)="goto($event, item.id)"
         class="group flex items-center gap-3 transition-colors mb-6
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
    <ul class="mt-auto flex gap-6 pt-12 pb-12">
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
        <br>
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

    <hr class="my-16 border-slate-600/30" />

    <!-- PROJECTS -->
    <section id="projects" class="space-y-16 max-w-[38rem] w-full">
      <h2 class="sr-only">Projects</h2>

      <article *ngFor="let project of projects" class="space-y-5">
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-semibold">{{ project.title }}</h3>
          <div class="flex gap-2">
            <a *ngIf="project.github" 
               [href]="project.github"
               target="_blank" 
               rel="noopener noreferrer"
               class="text-slate-400 hover:text-white transition-colors"
               aria-label="View source code">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
              </svg>
            </a>
            <a *ngIf="project.live" 
               [href]="project.live"
               target="_blank" 
               rel="noopener noreferrer"
               class="text-slate-400 hover:text-white transition-colors"
               aria-label="View live demo">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

        <p class="leading-7 text-slate-300" [innerHTML]="project.description"></p>

        <ul class="flex flex-wrap gap-2">
          <li *ngFor="let tag of project.tags"
              class="px-2 py-0.5 rounded-full bg-slate-700/60
                     text-xs font-medium">
            {{ tag }}
          </li>
        </ul>
      </article>
    </section>
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
export class HomeComponent implements OnInit, OnDestroy {
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
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24">
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
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
                         0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
                         1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
                         7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063
                         2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225
                         0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792
                         24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
             </svg>`
    },
    {
      label: 'Instagram',
      href : 'https://instagram.com/in/yourname',
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2h9c3.038 0 5.5 2.462 5.5 5.5v9c0 3.038-2.462 5.5-5.5 5.5h-9C4.462 22 2 19.538 2 16.5v-9C2 4.462 4.462 2 7.5 2zM7.5 4C5.567 4 4 5.567 4 7.5v9c0 1.933 1.567 3.5 3.5 3.5h9c1.933 0 3.5-1.567 3.5-3.5v-9C20 5.567 18.433 4 16.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
             </svg>`
    },
    {
      label: 'X / Twitter',
      href : 'https://twitter.com/yourname',
      svg  : `<svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
     I'm currently pursuing my <strong>M.S.</strong> through ECU's accelerated
     program, deepening my expertise in <strong>full-stack development</strong>
     and <strong>reproducible research</strong>.`,
    `Experience highlights include
     <strong>fine-tuning LLMs</strong> for dialect identification, leading a
     <strong>Django&nbsp;+&nbsp;Nix</strong> capstone with
     <strong>CI/CD pipelines</strong>, and building an
     <strong>election-prediction app</strong> with PyTorch & Flask.`,
    `When I'm not developing, you'll find me exploring
     <strong>Linux / NixOS</strong>, diving into technical literature, or
     hanging out with friends. I thrive where
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

  /* ─────────── PROJECTS DATA ─────────── */
  projects = [
    {
      title: 'AI Election Predictor',
      description: `Built a <strong>machine learning web app</strong> using PyTorch and Flask 
                    that predicts election outcomes based on historical data and polling trends. 
                    Features real-time visualization and <strong>95% accuracy</strong> on test data.`,
      tags: ['PyTorch', 'Flask', 'Python', 'Machine Learning', 'Data Visualization'],
      github: 'https://github.com/yourname/election-predictor',
      live: 'https://election-predictor.yoursite.com'
    },
    {
      title: 'LLM Dialect Classifier',
      description: `Fine-tuned a <strong>transformer model</strong> to identify regional dialects 
                    in text with 87% accuracy. Implemented custom tokenization and 
                    <strong>transfer learning</strong> techniques for multilingual support.`,
      tags: ['Transformers', 'HuggingFace', 'NLP', 'PyTorch', 'BERT'],
      github: 'https://github.com/yourname/dialect-classifier',
      live: null
    },
    {
      title: 'Django Research Platform',
      description: `Led development of a <strong>collaborative research platform</strong> 
                    with Django backend, PostgreSQL database, and automated CI/CD pipeline. 
                    Serves 200+ active researchers with <strong>99.9% uptime</strong>.`,
      tags: ['Django', 'PostgreSQL', 'Docker', 'CI/CD', 'Nix', 'Redis'],
      github: 'https://github.com/yourname/research-platform',
      live: 'https://research.youruni.edu'
    }
  ];

  /* nav highlight + centre scroll */
  goto(ev: Event, id: string) {
    ev.preventDefault();
    this.active = id;
    document.getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* scroll spy for active nav */
  ngOnInit() {
    this.setupScrollSpy();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    const sections = this.navItems.map(item => ({
      id: item.id,
      element: document.getElementById(item.id)
    })).filter(section => section.element);

    let currentSection = '';
    const scrollPosition = window.scrollY + 200; // offset for better UX

    for (const section of sections) {
      if (section.element && section.element.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }
    }

    if (currentSection && currentSection !== this.active) {
      this.active = currentSection;
    }
  }

  private setupScrollSpy() {
    window.addEventListener('scroll', this.handleScroll);
    // Set initial active section
    this.handleScroll();
  }

  /* spotlight */
  @HostListener('mousemove', ['$event'])
  track(e: MouseEvent) {
    const el = document.getElementById('spot');
    el?.style.setProperty('--x', `${e.clientX}px`);
    el?.style.setProperty('--y', `${e.clientY}px`);
  }
}