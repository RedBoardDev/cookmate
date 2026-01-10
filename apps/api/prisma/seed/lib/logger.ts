const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

export const logger = {
  info: (msg: string) =>
    console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg: string) =>
    console.log(`${colors.green}[OK]${colors.reset} ${msg}`),
  warn: (msg: string) =>
    console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`),
  error: (msg: string) =>
    console.error(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  debug: (msg: string) =>
    console.log(`${colors.gray}[DEBUG]${colors.reset} ${msg}`),
  phase: (num: number, name: string) =>
    console.log(
      `\n${colors.cyan}━━━ Phase ${num}: ${name} ━━━${colors.reset}`
    ),
};
