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
          return `Opening <a href="https://github.com/james1670" target="_blank" class="custom-link">GitHub/KartikJain14</a>...`;
      },

      linkedin: () => {
          window.open("https://www.linkedin.com/in/james-bright-jb", "_blank");
          return `Opening <a href="https://www.linkedin.com/in/james-bright-jb" target="_blank" class="custom-link">LinkedIn/KartikJain1410</a>...`;
      },

      projects: `
        - My Bus : MongoDB, Express, React, Node.js<br>
        - CineHub : MERN Stack Movie App<br>
        - Portfolio Website : JavaScript, HTML, CSS<br>
        - Expense Tracker : Python, CSV<br>
        - E-commerce Website : Django, SQLite<br>
        - Quiz App : Python, Tabulate<br>
        - ToDo-Summary Assistant : JS, PostgreSQL, Cohere AI, Slack<br>
        `,

      awards: `
      - Well currently working on some technical awards<br>
      - Student of the Year 2022, GIETU<br>
      - Powerlifter for 74 Kg division
      `,
      skills: `
        - Programming: Python, C, Java<br>
        - Web: Django, JavaScript, PHP, HTML, CSS<br>
        - Databases: SQL, MySQL, SQLite<br>
        - OS: Windows, Unix, macOS<br>
        - Tools: Git, VS Code, Command Line & Scripting<br>
        - Other: System Troubleshooting, Incident Management, RCA
        `,
        others: `
        - Rapid learner with a strong ability to adapt to new technologies<br>
        - Clear communicator with solid interpersonal collaboration skills<br>
        - Strong analytical and problem-solving abilities<br>
        - Comfortable working both independently and in team settings<br>
      `,      
      whoami: `<a href="https://www.linkedin.com/in/james-bright-jb" class="custom-link">James Bright</a> | Lifelong Learner`,

      resume: () => {
          const link = document.createElement("a");
          link.href = "/JB_Resume.pdf";
          link.download = "JB_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return "Downloading resume...";
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
