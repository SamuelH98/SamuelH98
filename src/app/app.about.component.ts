import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container mx-auto p-6 text-white">
      <div class="bg-black bg-opacity-50 p-8 rounded-lg shadow-xl backdrop-blur-md">
        <h1 class="text-4xl font-bold mb-6 text-center">About Samuel Hale</h1>
        <p class="mb-4 text-lg">
          My name is Samuel Hale. I am a dedicated and forward-thinking student currently pursuing a Bachelor of Science in Software Engineering with a concentration in Data Science at East Carolina University, expecting to graduate in May 2025. My foundational education includes an Associate in Computer Design/Programming from Wake Technical Community College, which I completed in May 2020.
        </p>
        <p class="mb-4 text-lg">
          I have practical experience as a Frontend Developer through the Research Experiences for Undergraduates program at East Carolina University, where I developed new pages for the Apache HTTP Server. My academic journey is further enriched by a series of engaging projects that showcase my diverse interests.
        </p>
        <p class="mb-4 text-lg">
          My upcoming coursework and capstone projects will allow me to delve deeper into Natural Language Processing with a project on Dialect Identification using LLMs, and full-stack web development as the Lead Maintainer for the NCEMPT Online Capstone project, utilizing Python, Django, GitLab CI/CD, and Nix. I will also be exploring Machine Learning through a 2024 Election Prediction App, applying models like Logistic Regression, k-Nearest Neighbors, and Neural Networks (PyTorch) to U.S. Census and voter data. Additionally, I actively maintain a personal NixOS configuration project, demonstrating my passion for declarative systems and customized desktop environments.
        </p>
        <p class="mb-4 text-lg">
          I am proficient in a range of programming languages including Python, Java, C/C++, SQL (Postgres), MongoDB, JavaScript, HTML/CSS, Nim, and Nix. My experience extends to frameworks such as Django, Express.js, React, Node.js, and Flask. I am adept with developer tools like Git, Docker, Nix, Nvim, Linux, WSL2, and cloud platforms, and I'm familiar with libraries like pandas, NumPy, Matplotlib, Pytorch, and Tensorflow.
        </p>
        <p class="mb-4 text-lg">
          I am driven by a desire to solve complex problems and build innovative software solutions. I am always eager to learn new technologies and contribute to impactful projects.
        </p>
      </div>
    </div>
  `
})
export class AboutComponent {
}