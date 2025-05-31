/* ───────────────────────────────────────────────────────────────
   HomeComponent  –  stand-alone, single file
   • Tailwind styling
   • flex layout (one scrollbar)
   • IntersectionObserver scroll-spy
   • cursor "spot-light"
   • mb-* spacing throughout
   ─────────────────────────────────────────────────────────── */
import {
  Component, AfterViewInit, OnDestroy, HostListener,
  ChangeDetectionStrategy, ViewEncapsulation,
  ChangeDetectorRef, NgZone,
} from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  /* ───────────────────────── TEMPLATE ───────────────────────── */
  template: `
<!-- 🎨  background + spot-light -->
<div class="fixed inset-0 -z-10 overflow-hidden">
  <div class="absolute -top-1/3 -left-1/3 w-[160vw] h-[160vw]
              bg-[conic-gradient(at_top_left,theme(colors.violet.600)_0%,transparent_60%,theme(colors.violet.700)_100%)]
              blur-3xl opacity-20"></div>
  <div id="spot" class="absolute inset-0 pointer-events-none transition-[background] duration-150"></div>
</div>

<!-- 📐  page layout  (flex on lg) -->
<div class="min-h-screen pt-16 lg:pt-24 px-6 lg:px-20
            text-slate-100 max-w-7xl mx-auto
            flex flex-col lg:flex-row lg:gap-24 items-start">

  <!-- 🡆 LEFT COLUMN (sticky) -->
  <aside class="flex flex-col items-start w-full max-w-md flex-shrink-0
              lg:sticky lg:top-24 lg:self-start">

    <!-- Adjusted H1 for mobile size -->
    <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">Samuel Hale</h1>
    <!-- Adjusted H2 for mobile size -->
    <h2 class="text-lg lg:text-xl font-semibold text-slate-300 mb-6">AI Software Engineer</h2>

    <!-- socials - NOW ALWAYS FLEX (visible on mobile) -->
    <ul class="flex gap-6 pt-0 pb-8" *ngIf="sanitizedSocials && sanitizedSocials.length > 0">
      <li *ngFor="let s of sanitizedSocials">
        <a [href]="s.href" target="_blank" rel="noopener"
          [attr.aria-label]="s.label"
          class="text-white hover:text-violet-300 transition-colors inline-flex items-center justify-center">
          <span [innerHTML]="s.svg" class="w-5 h-5 block"></span>
        </a>
      </li>
    </ul>

    <p class="text-base text-slate-400 max-w-sm mb-16">
      I build intelligent, user-focused software solutions that seamlessly
      integrate AI to enhance functionality, accessibility, and performance on
      the web.
    </p>

    <!-- section nav - HIDDEN ON MOBILE, BLOCK ON LG+ -->
    <nav class="hidden lg:block text-sm tracking-widest font-semibold uppercase mb-auto">
      <a *ngFor="let item of navItems"
         [href]="'#' + item.id"
         (click)="goto(item.id, $event)"
         class="group flex items-center gap-3 transition-colors mb-6
                text-slate-400 hover:text-slate-200"
         [ngClass]="{ 'text-white': active === item.id }">
        <span class="before:block before:h-px before:bg-slate-400
                     before:transition-all before:w-0
                     group-hover:before:w-12"
              [ngClass]="{ 'before:!w-12': active === item.id }"></span>
        {{ item.label }}
      </a>
    </nav>
    
  </aside>

  <!-- 🡆 RIGHT COLUMN (flex-1; no inner scroll bar) -->
  <main class="flex-1 w-full pr-2">

    <!-- ABOUT -->
    <section id="about"
             class="prose prose-lg leading-8 prose-slate dark:prose-invert
                    prose-p:mb-5 max-w-[38rem] w-full mb-16">
      <!-- Section header: visible on mobile, sr-only on lg+ -->
      <h2 class="mb-8 text-3xl font-bold lg:sr-only">About me</h2>
      <ng-container *ngFor="let p of about">
        <p [innerHTML]="p" class="mb-5"></p>
      </ng-container>
    </section>

    <hr class="border-slate-600/30 mb-16"/>

    <!-- EXPERIENCE -->
    <section id="experience" class="mb-16 max-w-[38rem] w-full">
      <!-- Section header: visible on mobile, sr-only on lg+ -->
      <h2 class="mb-8 text-3xl font-bold lg:sr-only">Experience</h2>
      <div class="space-y-16">
        <article *ngFor="let job of experience" class="p-6">
          <div class="mb-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">{{ job.period }}</p>
            <h3 class="text-lg font-semibold mb-3">
              {{ job.title }} <span class="font-normal text-slate-300">· {{ job.company }}</span>
            </h3>
            <p class="leading-7 text-slate-300 mb-4" [innerHTML]="job.summary"></p>
            <ul class="flex flex-wrap gap-2">
              <li *ngFor="let tag of job.tags"
                  class="px-2 py-0.5 rounded-full bg-slate-700/60 text-xs font-medium">{{ tag }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <hr class="border-slate-600/30 mb-16"/>

    <!-- PROJECTS -->
    <section id="projects" class="mb-16 max-w-[38rem] w-full">
      <!-- Section header: visible on mobile, sr-only on lg+ -->
      <h2 class="mb-8 text-3xl font-bold lg:sr-only">Projects</h2>
      <div class="space-y-16">
        <article *ngFor="let project of projects"
                 class="group relative transition-all block rounded-lg p-6
                        hover:bg-slate-800/60 hover:shadow-xl
                        hover:border-violet-500/30 border border-transparent">

          <!-- Full-cover link for GitHub (only if github exists) -->
          <a *ngIf="project.github"
             [href]="project.github" target="_blank" rel="noopener"
             class="absolute inset-0 z-0"
             [attr.aria-label]="'View project ' + project.title + ' on GitHub'">
          </a>

          <!-- Content of the card, needs z-index to be above the full-cover link -->
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-3">
              <h3 class="text-lg font-semibold">{{ project.title }}</h3>
              <div class="flex gap-2">
                <a *ngIf="project.github"
                   [href]="project.github" target="_blank" rel="noopener"
                   class="text-slate-400 hover:text-white transition-colors relative z-20"
                   aria-label="View source code">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58
                             0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61
                             -.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74
                             1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1
                             .11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93
                             0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.17
                             0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4 11.5 11.5
                             0 0 1 3 .4c2.28-1.55 3.29-1.23 3.29-1.23 .66 1.65
                             .25 2.87 .12 3.17 .77.84 1.23 1.92 1.23 3.221
                             0 4.61-2.81 5.63-5.49 5.93 .43.37 .81 1.1 .81 2.22
                             0 1.6-.01 2.88-.01 3.27 0 .32 .21.69 .82.57A12 12 0 0 0 12 .5z"/>
                  </svg>
                </a>
                <a *ngIf="project.live"
                   [href]="project.live" target="_blank" rel="noopener"
                   class="text-slate-400 hover:text-white transition-colors relative z-20"
                   aria-label="View live demo">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0
                             0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
            <p class="leading-7 text-slate-300 mb-4" [innerHTML]="project.description"></p>
            <ul class="flex flex-wrap gap-2">
              <li *ngFor="let tag of project.tags"
                  class="px-2 py-0.5 rounded-full bg-slate-700/60 text-xs font-medium">{{ tag }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

  </main>
</div>
  `,

  /* ───────────────────────── STYLES ───────────────────────── */
  styles: [`
#spot {
  background: radial-gradient(
    450px at var(--x, 50%) var(--y, 50%),
    rgba(147, 51, 234, 0.35),
    transparent 70%
  );
}

a:focus-visible {
  outline: 2px dashed theme('colors.violet.400');
  outline-offset: 2px;
}

/* Navigation line animation */
.group span::before {
  content: '';
  display: block;
  height: 1px;
  background-color: rgb(148 163 184);
  transition: all 0.3s ease;
  width: 0;
}

.group:hover span::before,
.group.active span::before {
  width: 3rem;
}

/* Make strong tags purple on hover */
main strong:hover {
  color: theme('colors.violet.400'); /* Using violet-400 for consistency */
  transition: color 0.15s ease-in-out;
}


/* Fallback spacing styles in case Tailwind classes are purged */
.projects-section {
  margin-bottom: 4rem;
}

.project-item {
  margin-bottom: 4rem;
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-header {
  margin-bottom: 0.75rem;
}

.project-description {
  margin-bottom: 1rem;
}

/* Force spacing for space-y utilities */
.space-y-16 > * + * {
  margin-top: 4rem;
}

.space-y-5 > * + * {
  margin-top: 1.25rem;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Ensure proper text rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  /* ─────── public data  (fully typed) ─────── */

  navItems = [
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
  ];
  active = 'about';

  socials: Array<{ label: string; href: string; svg: string }> = [
    {
      label: 'GitHub',
      href: 'https://github.com/SamuelH98',
      svg: `<svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58
                       0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61
                       -.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74
                       1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1
                       .11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93
                       0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.17
                       0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4 11.5 11.5
                       0 0 1 3 .4c2.28-1.55 3.29-1.23 3.29-1.23 .66 1.65
                       .25 2.87 .12 3.17 .77.84 1.23 1.92 1.23 3.221
                       0 4.61-2.81 5.63-5.49 5.93 .43.37 .81 1.1 .81 2.22
                       0 1.6-.01 2.88-.01 3.27 0 .32 .21.69 .82.57A12 12 0 0 0 12 .5z"/>
            </svg>`
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/samuel-hale-10562a262/',
      svg: `<svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.047-.393-1.75-1.375-1.75-1.03 0-1.637.766-1.637 1.75V19h-3v-9h2.973v1.365c.465-.67 1.256-1.615 2.766-1.615 2.012 0 3.535 1.303 3.535 4.195V19z"/>
            </svg>`
    }
  ];

  sanitizedSocials: Array<{ label: string; href: string; svg: SafeHtml }> = [];


  about = [
    `I'm a software engineer with a strong foundation in
     <strong>AI</strong> and <strong>machine learning</strong>, passionate
     about building <strong class="font-semibold">intelligent, practical
     systems</strong> that solve real-world problems.`,
    `I hold a <strong>B.S.</strong> in Software Engineering (Data Science) and
     I'm currently pursuing my <strong>M.S.</strong> through ECU's accelerated
     program, deepening my expertise in
     <strong>full-stack development</strong> and
     <strong>reproducible research</strong>.`,
    `Experience highlights include
     <strong>fine-tuning LLMs</strong> for dialect identification, leading a
     <strong>Django + Nix</strong> capstone with
     <strong>CI/CD pipelines</strong>, and building an
     <strong>election-prediction app</strong> with PyTorch & Flask.`,
    `When I'm not developing, you'll find me exploring
     <strong>Linux / NixOS</strong>, diving into technical literature, or
     hanging out with friends. I thrive where
     <strong>AI, software engineering, and systems thinking</strong> meet.`,
  ];

  experience: Array<{
    period: string;
    title: string;
    company: string;
    summary: string;
    tags: string[];
  }> = [
    {
      period : 'Dec 2022 — Jan 2023',
      title  : 'Frontend Developer',
      company: 'ECU · REU Program',
      summary: `Built and improved <strong>internal research dashboards</strong>
                with HTML, CSS, and Bootstrap — focusing on
                <strong>accessibility</strong> & responsive design.`,
      tags   : ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Accessibility'],
    },
  ];

  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    github?: string;
    live?: string;
  }> = [
    {
      title: '2024 AI Election Predictor',
      description: `Built a <strong>machine-learning web app</strong> using
                    PyTorch and Flask that predicts 2024 election outcome with
                    <strong>82% accuracy</strong>.`,
      tags: ['PyTorch', 'Flask', 'Python', 'Machine Learning', 'Data Viz'],
      github: 'https://github.com/SamuelH98/CSCI6020-final-project',
      
    },
    {
      title: 'Cython Data Preprocessor for english-corpora.org',
      description: 'A <strong>high-performance</strong> data preprocessing tool written in <strong>Cython</strong>, designed to efficiently parse and clean large corpora from <strong>english-corpora.org</strong>. The tool accelerates <strong>tokenization</strong> and <strong>formatting</strong> tasks to support downstream <strong>NLP pipelines</strong>.',
      tags: ['Cython'],
      github: 'https://github.com/SamuelH98/data-preprocessor',
    },
    {
      title: 'Dictionary program with AI assistant',
      description: 'An interactive <strong>dictionary application</strong> featuring an <strong>AI-powered assistant</strong> capable of understanding user input and providing <strong>definitions</strong>, <strong>synonyms</strong>, and <strong>usage examples</strong>. Built using <strong>PyTorch</strong> for the assistant’s <strong>intent recognition</strong>, with NLP support from <strong>nltk</strong> and <strong>Numpy</strong>.',
      tags: ['PyTorch', 'Numpy', 'nltk', 'Python'],
      github: 'https://github.com/SamuelH98/SENG-1020-Project',
    }


  ];

  /* ───── constructor / DI ───── */
  constructor(
    private readonly cd  : ChangeDetectorRef,
    private readonly zone: NgZone,
    private readonly sanitizer: DomSanitizer
  ) {}

  /* ───── scroll-spy (IntersectionObserver) ───── */
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    // Sanitize social SVGs when the view initializes
    this.socials.forEach(s => {
      this.sanitizedSocials.push({
        label: s.label,
        href: s.href,
        svg: this.sanitizer.bypassSecurityTrustHtml(s.svg)
      });
    });

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          this.zone.run(() => {
            const visible = entries
              .filter(e => e.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            
            if (visible && visible.target.id !== this.active) {
              this.active = visible.target.id;
              this.cd.markForCheck();
            }
          });
        },
        {
          threshold: [0.3],
          rootMargin: '-64px 0px -66% 0px'
        }
      );

      // Observe all navigation sections
      this.navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          this.observer!.observe(element);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /* ───── nav link click helper ───── */
  goto(id: string, event?: MouseEvent): void {
    event?.preventDefault();


    if (id === 'about') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }



    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /* ───── spot-light tracking ───── */
  @HostListener('mousemove', ['$event'])
  track(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const spotElement = document.getElementById('spot');
    if (spotElement) {
      spotElement.style.setProperty('--x', `${clientX}px`);
      spotElement.style.setProperty('--y', `${clientY}px`);
    }
  }
}