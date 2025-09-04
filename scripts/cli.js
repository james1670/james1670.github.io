document.getElementById('guiSwitch').addEventListener('change', function () {
  if (this.checked) {
    setTimeout(() => {
      window.location.href = 'gui.html';
    }, 300);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("commandInput");
  const output = document.getElementById("output");
  const terminal = document.getElementById("terminal-container");
  const hint = document.getElementById("autocompleteHint");
  const mirror = document.getElementById("inputMirror");

  let commandHistory = [];
  let historyIndex = -1;

  const helpMessage = `
  <b>💻 System Commands:</b><br>
  <b>help or h</b>        - Show available commands<br>
  <b>clear or cls</b>       - Clear the terminal<br>
  <b>neofetch or fetch</b>    - Display system info (Linux style)<br>
  <br>
  <b>👤 Personal Information:</b><br>
  <b>whoami</b>      - Display my identity<br>
  <b>skills</b>      - Show my technical skills<br>
  <b>projects</b>    - List my featured projects<br>
  <b>others</b>      - Show my management/soft skills<br>
  <!-- <b>awards</b>      - Show my achievements --> <!-- COMMENTED: awards section not in HTML --><br>
  <br>
  <b>🌐 Online Profiles:</b><br>
  <b>linkedin or ln</b>    - Open my LinkedIn profile<br>
  <b>github or gh</b>      - Open my GitHub profile<br>
  <br>
  <b>📄 Documents:</b><br>
  <b>resume or r</b>      - Download my resume<br>
  `;

  const commands = {
      help: helpMessage,
      neofetch: () => {
        let currentTime = new Date().toLocaleTimeString();
        return `<pre>
        <span class="blue">                   </span>  User: jamesbright
        <span class="blue">      ██╗ ██████╗  </span>  OS: Linux JB
        <span class="blue">      ██║ ██╔══██╗ </span>  Hostname: notyet.jb
        <span class="blue">      ██║ ██████╔╝ </span>  Time: ${currentTime}
        <span class="blue">███╗  ██║ ██╔══██╗ </span>  Email: <a href="mailto:jamesbright2004@gmail.com" class="custom-link">jamesbright2004@gmail.com</a>
        <span class="blue">╚█████╔╝  ██████╔╝ </span>  GitHub: <a href="https://github.com/james1670" target="_blank" class="custom-link">GitHub.com/james1670</a>
        <span class="blue"> ╚════╝   ╚═════╝  </span>  LinkedIn: <a href="https://www.linkedin.com/in/james-bright-jb" target="_blank" class="custom-link">LinkedIn.com/in/james-bright-jb</a>
        </pre>`;
        },
    
      github: () => {
          window.open("https://github.com/james1670", "_blank");
          return `Opening <a href="https://github.com/james1670" target="_blank" class="custom-link">GitHub/james1670</a>...`; // CHANGED: updated GitHub reference
      },

      linkedin: () => {
          window.open("https://www.linkedin.com/in/james-bright-jb", "_blank");
          return `Opening <a href="https://www.linkedin.com/in/james-bright-jb" target="_blank" class="custom-link">LinkedIn/james-bright-jb</a>...`; // CHANGED: updated LinkedIn reference
      },

      projects: `
        <b>Group Projects:</b><br>
        - <b>My Bus</b> : MERN Stack - Bus tracking system with real-time route management<br> <!-- CHANGED: added description -->
        - <b>CineHub</b> : MERN Stack - Movie streaming platform with listings and filtering<br> <!-- CHANGED: added description -->
        <br>
        <b>Individual Projects:</b><br>
        - <b>School Website (Freelance)</b> : WordPress, Elementor, Hostinger<br> <!-- CHANGED: new project -->
        - <b>Expense Tracker</b> : Python, Matplotlib, Tabulate, CSV<br> <!-- CHANGED: updated tech stack -->
        - <b>E-commerce Website</b> : Django, SQLite, HTML, CSS, JS<br> <!-- CHANGED: updated tech stack -->
        - <b>AI Task Manager</b> : NodeJS, React, PostgreSQL, Cohere AI, Slack<br> <!-- CHANGED: new project -->
        - <b>GitHub Webhook Listener</b> : Flask, MongoDB, GitHub Webhooks<br> <!-- CHANGED: new project -->
        `,

      // awards: ` <!-- COMMENTED OUT: Not present in HTML portfolio -->
      // - Well currently working on some technical awards<br>
      // - Student of the Year 2022, GIETU<br>
      // - Powerlifter for 74 Kg division
      // `,

      skills: `
        <b>Programming Languages:</b><br>
        - <b>Python</b> (Intermediate – Backend, Scripting, Automation)<br> <!-- CHANGED: updated skill level and details -->
        - <b>SQL</b> (MySQL, SQLite – Queries, Joins, Debugging)<br> <!-- CHANGED: added specific databases -->
        - <b>C & Java</b><br> <!-- CHANGED: updated format -->
        <br>
        <b>Web Development:</b><br>
        - <b>Django & Flask</b> (Web development & APIs)<br> <!-- CHANGED: updated framework details -->
        - <b>HTML, CSS, JavaScript</b><br> <!-- CHANGED: separated web technologies -->
        <br>
        <b>DevOps & Tools:</b><br>
        - <b>Git & GitHub</b> (Version control, CI/CD basics)<br> <!-- CHANGED: added CI/CD -->
        - <b>Linux</b> (Ubuntu, Kali, Parrot – CLI & troubleshooting)<br> <!-- CHANGED: added specific distros -->
        - <b>Docker</b> (Fundamentals)<br> <!-- CHANGED: new skill -->
        <br>
        <b>Cybersecurity Tools:</b><br>
        - <b>Network Analysis:</b> Nmap, Wireshark, BurpSuite<br> <!-- CHANGED: new category -->
        - <b>Wireless Security:</b> Aircrack-ng Suite, Wifite, Hydra<br> <!-- CHANGED: new category -->
        `,

      others: `
        <b>Soft Skills & Management:</b><br>
        - Rapid learner with strong ability to adapt to new technologies<br> <!-- CHANGED: updated description -->
        - Clear communicator with solid interpersonal collaboration skills<br>
        - Strong analytical and problem-solving abilities<br>
        - Comfortable working both independently and in team settings<br>
        - <b>Continuous Learning:</b> Currently expanding DevOps and cloud knowledge<br> <!-- CHANGED: added learning focus -->
      `,      

      whoami: `<a href="https://www.linkedin.com/in/james-bright-jb" class="custom-link">James Bright</a> | DevOps & Python Backend Enthusiast | Cybersecurity Hobbyist | Lifelong Learner`, // CHANGED: updated with full name and tagline from HTML

      resume: () => {
          const link = document.createElement("a");
          link.href = "/JB_Resume.pdf"; // CHANGED: updated resume filename
          link.download = "JB_Resume.pdf"; // CHANGED: updated download filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return "Downloading James Bright Das Resume..."; // CHANGED: updated download message
      },

      clear: () => resetTerminal(),
      exit: () => resetTerminal(),
  };

  const aliases = {
      gh: "github",
      ln: "linkedin",
      r: "resume",
      cls: "clear",
      ls: "help",
      h: "help",
      fetch: "neofetch"
  };

  const commandList = Object.keys(commands).concat(Object.keys(aliases));

  function processCommand(cmd) {
      cmd = cmd.toLowerCase();
      if (cmd === "") {
          output.scrollTop = output.scrollHeight;
          return;
      }

      commandHistory.push(cmd);
      historyIndex = commandHistory.length;

      if (aliases[cmd]) cmd = aliases[cmd];

      if (cmd === "clear" || cmd === "exit") {
          resetTerminal();
          return;
      }

      let response = typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd] || getClosestCommand(cmd);
      appendCommand(cmd, response);
  }

  function resetTerminal() {
      output.innerHTML = `<div class="help-message">Type 'help' to see available commands.</div>`;
      input.value = "";
      hint.textContent = "";
  }

  function appendCommand(command, result) {
      let commandLine = document.createElement("div");
      commandLine.classList.add("command-line");
      commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
      output.appendChild(commandLine);

      let resultLine = document.createElement("div");
      resultLine.classList.add("command-result");
      resultLine.innerHTML = result;
      output.appendChild(resultLine);

      input.scrollIntoView({ behavior: "smooth" });
  }

  function getClosestCommand(inputCmd) {
      let closestMatch = commandList.find(cmd => cmd.startsWith(inputCmd));
      return closestMatch ? `Did you mean <b>${closestMatch}</b>?` : `Command not found: ${inputCmd}`;
  }

  function updateAutocompleteHint() {
      let currentInput = input.value;
      if (!currentInput) {
          hint.textContent = "";
          return;
      }
      let match = commandList.find(cmd => cmd.startsWith(currentInput));
      if (match) {
          hint.textContent = match.slice(currentInput.length);
          mirror.textContent = currentInput;
          hint.style.left = mirror.offsetWidth + "px";
      } else {
          hint.textContent = "";
      }
  }

  function autocompleteCommand() {
      let currentInput = input.value;
      if (!currentInput) return;
      let match = commandList.find(cmd => cmd.startsWith(currentInput));
      if (match) input.value = match;
      hint.textContent = "";
  }

  input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          event.preventDefault();
          processCommand(input.value.trim());
          input.value = "";
          hint.textContent = "";
      } else if (event.key === "ArrowRight" || event.key === "Tab") {
          event.preventDefault();
          autocompleteCommand();
      } else if (event.key === "ArrowUp") {
          event.preventDefault();
          if (historyIndex > 0) {
              historyIndex--;
              input.value = commandHistory[historyIndex];
          }
      } else if (event.key === "ArrowDown") {
          event.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
              historyIndex++;
              input.value = commandHistory[historyIndex];
          } else {
              historyIndex = commandHistory.length;
              input.value = "";
          }
      }
  });

  input.addEventListener("input", updateAutocompleteHint);

  terminal.addEventListener("click", function () {
      input.focus();
  });

  resetTerminal();
});