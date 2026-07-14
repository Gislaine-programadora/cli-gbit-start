import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";

// Reconhece URLs tipo http://localhost:3000, http://127.0.0.1:5173, etc.
const URL_REGEX = /https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?[^\s]*/;

export default async function startProject() {
  const arg = process.argv[2];
  let projectPath = process.cwd();

  // 1. Se recebeu um link de repositório (https://... ou termina em .git), clona primeiro
  if (arg && (arg.startsWith("http") || arg.endsWith(".git"))) {
    const folderName = arg.split("/").pop().replace(".git", "");

    console.log(chalk.cyan(`→ Clonando ${arg}...`));
    try {
      execSync(`git clone ${arg}`, { stdio: "inherit" });
    } catch {
      console.log(chalk.red("✖ Não foi possível clonar o repositório."));
      return;
    }

    projectPath = path.join(process.cwd(), folderName);
  } else if (arg) {
    // Se recebeu o caminho de uma pasta local
    projectPath = path.resolve(arg);
  }

  if (!fs.existsSync(path.join(projectPath, "package.json"))) {
    // Sem package.json: tenta tratar como site estático (HTML puro)
    if (fs.existsSync(path.join(projectPath, "index.html"))) {
      process.chdir(projectPath);
      console.log(chalk.gray(`  Pasta: ${projectPath}`));
      console.log(chalk.yellow("⚠ Nenhum package.json encontrado — tratando como site estático (HTML puro)."));
      console.log("");
      console.log(chalk.cyan("→ Iniciando servidor estático (npx serve)..."));
      console.log("");
      runAndDetectUrl(null, ["npx", "serve", "."]);
      return;
    }

    console.log(chalk.red("✖ Nenhum package.json nem index.html encontrado nessa pasta."));
    console.log(chalk.gray("  Uso: gbit-start [pasta-ou-link-do-repositorio]"));
    return;
  }

  process.chdir(projectPath);
  console.log(chalk.gray(`  Pasta: ${projectPath}`));
  console.log("");

  // 2. Instala dependências, tentando resolver conflitos automaticamente
  const installed = installDependencies();
  if (!installed) return;

  // 3. Descobre qual comando rodar, lendo o package.json
  const pkg = JSON.parse(
    fs.readFileSync(path.join(projectPath, "package.json"), "utf-8")
  );
  const scripts = pkg.scripts || {};
  const runScript = ["dev", "start", "serve"].find((s) => scripts[s]);

  if (!runScript) {
    console.log(
      chalk.yellow(
        "⚠ Nenhum script 'dev', 'start' ou 'serve' encontrado no package.json."
      )
    );
    console.log(chalk.gray("  Rode manualmente o comando certo pra esse projeto."));
    return;
  }

  console.log(chalk.cyan(`→ Iniciando o projeto (npm run ${runScript})...`));
  console.log("");

  runAndDetectUrl(runScript);
}

function installDependencies() {
  const attempts = [
    { label: "npm install", cmd: "npm install" },
    {
      label: "npm install --legacy-peer-deps",
      cmd: "npm install --legacy-peer-deps",
    },
    { label: "npm install --force", cmd: "npm install --force" },
  ];

  for (const attempt of attempts) {
    const spinner = ora(`Instalando dependências (${attempt.label})...`).start();
    try {
      execSync(attempt.cmd, { stdio: "pipe" });
      spinner.succeed(`Dependências instaladas com "${attempt.label}"`);
      return true;
    } catch {
      spinner.fail(`Falhou com "${attempt.label}"`);
    }
  }

  console.log(chalk.red("✖ Não foi possível instalar as dependências automaticamente."));
  console.log(chalk.gray("  Tente investigar o erro rodando manualmente: npm install --force"));
  return false;
}

function runAndDetectUrl(script, customCommand) {
  const [cmd, args] = customCommand
    ? [customCommand[0], customCommand.slice(1)]
    : ["npm", ["run", script]];

  const child = spawn(cmd, args, { shell: true });

  let urlShown = false;

  child.stdout.on("data", (data) => {
    const text = data.toString();
    process.stdout.write(text);

    if (!urlShown) {
      const match = text.match(URL_REGEX);
      if (match) {
        urlShown = true;
        printReadyBanner(match[0]);
      }
    }
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(data.toString());
  });

  child.on("close", (code) => {
    if (code !== 0) {
      console.log(chalk.red(`✖ O projeto encerrou com erro (código ${code}).`));
    }
  });
}

const CONFETTI_CHARS = ["✦", "✧", "✩", "★", "☆", "✺", "❋", "•"];
const CONFETTI_COLORS = [
  chalk.magenta,
  chalk.cyan,
  chalk.yellow,
  chalk.green,
  chalk.blue,
  chalk.red,
];

function printConfetti() {
  let line = "";
  for (let i = 0; i < 36; i++) {
    const char =
      CONFETTI_CHARS[Math.floor(Math.random() * CONFETTI_CHARS.length)];
    const color =
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    line += color(char) + " ";
  }
  console.log(line);
}

function pad(str, width) {
  return str + " ".repeat(Math.max(0, width - str.length));
}

function printReadyBanner(url) {
  console.log("");
  printConfetti();
  printConfetti();
  console.log("");

  const lines = ["✔ Projeto pronto!", `🔗 ${url}`];

  const innerWidth = Math.max(...lines.map((l) => l.length)) + 2;
  const top = "╔" + "═".repeat(innerWidth) + "╗";
  const bottom = "╚" + "═".repeat(innerWidth) + "╝";

  console.log(chalk.green(top));
  console.log(
    chalk.green("║ ") + chalk.bold.white(pad(lines[0], innerWidth - 1)) + chalk.green("║")
  );
  console.log(
    chalk.green("║ ") + chalk.cyan.underline(pad(lines[1], innerWidth - 1)) + chalk.green("║")
  );
  console.log(chalk.green(bottom));
  console.log("");
}
