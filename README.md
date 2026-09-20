<div align="center">

<img src="./docs/logo.png" alt="The Swain Office" width="140">

# The Swain Office

Local-first desktop app that turns the coding CLIs you already run into a coordinated office of agents on your machine.

<img src="./docs/media/floor-dusk.png" alt="The Swain Office in After Hours dusk — agents on the floor and the Command Center" width="920">

</div>

Talk to **one** orchestrator (Michael). He assigns work, routes messages, and only asks you about spend, destructive ops, or scope changes. Everyone else sits at a desk with a real terminal, long-term memory, and a mailbox.

Works with [Claude Code](https://claude.com/claude-code), [Codex](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), Antigravity, [Grok](https://x.ai/cli), Kimi, Qwen, OpenCode, Crush, pi.dev, GitHub Copilot CLI, [Cursor](https://cursor.com/docs/cli/install), plus your own command, API keys, or a local model (Ollama / LM Studio / vLLM).

## Run it

**App:** download a macOS, Windows, or Linux build from [Releases](https://github.com/SuchitraSwain/The-Swain-Office/releases). You need at least one agent CLI on your PATH — **Settings → Prerequisites** can install missing ones.

**From source:**

```bash
git clone https://github.com/SuchitraSwain/The-Swain-Office.git
cd The-Swain-Office
npm install
npm run dev
```

Requires Node 18+, a C/C++ toolchain (`xcode-select --install` on Mac), and at least one supported CLI. First launch opens the setup wizard.

## What you get

- Real PTY terminals (`node-pty` + xterm), not a simulated chat
- A Pixi office floor — agents walk, envelopes fly, click a desk to type
- A local hive: markdown memory, file mailboxes, a task board, an event log
- Approvals and a circuit breaker so runaway agents stop
- Slack / webhooks, shareable roles, a built-in Monaco IDE, optional worktrees

## Docs

| | |
| --- | --- |
| Hive, routing, memory | [`HIVE.md`](./HIVE.md) |
| Terminals and events | [`SPEC.md`](./SPEC.md) |
| Visual system | [`DESIGN.md`](./DESIGN.md) |
| Code layout | [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) |
| Contributing | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Telemetry (opt-out) | [`TELEMETRY.md`](./TELEMETRY.md) |
| Changelog | [`CHANGELOG.md`](./CHANGELOG.md) |

PRs welcome. Show a before and after — see the contributing guide.

## License

Source is **MIT** ([`LICENSE`](./LICENSE)). Bundled office tilesets are LimeZu *Modern Interiors* — credit required ([`LICENSE-ASSETS`](./LICENSE-ASSETS)). *The Swain Office* is a parody and is not affiliated with NBC's *The Office*.
